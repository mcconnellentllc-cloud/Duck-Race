import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Purchase from '@/lib/models/Purchase';

export async function GET() {
  try {
    await dbConnect();
    const purchases = await Purchase.find({}).sort({ purchaseDate: -1 });
    return NextResponse.json(purchases);
  } catch (error) {
    console.error('Failed to fetch purchases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch purchases' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const { buyerName, phone, email, address, tier, numDucks, paymentMethod, notes } = body;

    if (!buyerName || !phone || !email || !address || !tier || !numDucks || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate tier
    const validTiers = [10, 25, 50, 100];
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier. Must be 10, 25, 50, or 100' },
        { status: 400 }
      );
    }

    // Get the highest duck number for THIS tier only (each tier has separate numbering)
    const allPurchasesInTier = await Purchase.find({ tier }).select('duckNumbers');
    const allDuckNumbers = allPurchasesInTier.flatMap(p => p.duckNumbers);

    let nextDuckNumber = 1;
    if (allDuckNumbers.length > 0) {
      nextDuckNumber = Math.max(...allDuckNumbers) + 1;
    }

    const duckNumbers: number[] = [];
    for (let i = 0; i < numDucks; i++) {
      duckNumbers.push(nextDuckNumber + i);
    }

    // Calculate amount (tier price × number of ducks)
    const amountPaid = tier * numDucks;

    const purchase = new Purchase({
      buyerName,
      phone,
      email,
      address,
      tier,
      numDucks,
      amountPaid,
      paymentMethod,
      notes: notes || '',
      duckNumbers,
      purchaseDate: new Date(),
    });

    await purchase.save();

    return NextResponse.json({
      success: true,
      tier,
      duckNumbers: purchase.duckNumbers,
      amountPaid: purchase.amountPaid,
      purchaseId: purchase._id,
    }, { status: 201 });

  } catch (error) {
    console.error('Failed to create purchase:', error);
    return NextResponse.json(
      { error: 'Failed to create purchase' },
      { status: 500 }
    );
  }
}
