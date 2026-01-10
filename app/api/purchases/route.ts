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

    const { buyerName, phone, email, address, numDucks, paymentMethod, notes, tierPrice } = body;

    if (!buyerName || !phone || !email || !address || !numDucks || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (numDucks < 1 || numDucks > 100) {
      return NextResponse.json(
        { error: 'Number of ducks must be between 1 and 100' },
        { status: 400 }
      );
    }

    const highestDuck = await Purchase.findOne({})
      .sort({ 'duckNumbers': -1 })
      .select('duckNumbers');

    let nextDuckNumber = 1;
    if (highestDuck && highestDuck.duckNumbers.length > 0) {
      nextDuckNumber = Math.max(...highestDuck.duckNumbers) + 1;
    }

    const allPurchases = await Purchase.find({}).select('duckNumbers');
    const allDuckNumbers = allPurchases.flatMap(p => p.duckNumbers);
    if (allDuckNumbers.length > 0) {
      nextDuckNumber = Math.max(...allDuckNumbers) + 1;
    }

    const duckNumbers: number[] = [];
    for (let i = 0; i < numDucks; i++) {
      duckNumbers.push(nextDuckNumber + i);
    }

    // Use tierPrice if provided, otherwise calculate based on duck count
    const amountPaid = tierPrice || numDucks * 25;

    const purchase = new Purchase({
      buyerName,
      phone,
      email,
      address,
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
