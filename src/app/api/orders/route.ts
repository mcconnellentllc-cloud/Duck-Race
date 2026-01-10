import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order, { TIER_CONFIG, DuckTier } from '@/models/Order';
import Counter from '@/models/Counter';

interface DuckInput {
  tier: DuckTier;
  quantity: number;
}

export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ purchaseDate: -1 });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { buyerName, phone, email, address, ducks, paymentMethod, notes } = body;

    // Validate required fields
    if (!buyerName || !phone || !email || !address || !ducks || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate ducks array
    if (!Array.isArray(ducks) || ducks.length === 0) {
      return NextResponse.json({ error: 'Must select at least one duck' }, { status: 400 });
    }

    // Process each tier and assign duck numbers
    const processedDucks = [];
    let totalDucks = 0;
    let totalAmount = 0;

    for (const duck of ducks as DuckInput[]) {
      if (!['A', 'B', 'C', 'D'].includes(duck.tier)) {
        return NextResponse.json({ error: `Invalid tier: ${duck.tier}` }, { status: 400 });
      }

      if (duck.quantity <= 0) continue;

      const tierConfig = TIER_CONFIG[duck.tier];
      const duckNumbers = await Counter.getNextDuckNumbers(duck.tier, duck.quantity);

      processedDucks.push({
        tier: duck.tier,
        quantity: duck.quantity,
        duckNumbers,
      });

      totalDucks += duck.quantity;
      totalAmount += duck.quantity * tierConfig.price;
    }

    if (totalDucks === 0) {
      return NextResponse.json({ error: 'Must purchase at least one duck' }, { status: 400 });
    }

    // Create the order
    const order = await Order.create({
      buyerName,
      phone,
      email,
      address,
      ducks: processedDucks,
      totalDucks,
      amountPaid: totalAmount,
      paymentMethod,
      notes: notes || '',
    });

    return NextResponse.json({
      success: true,
      order,
      message: `Successfully purchased ${totalDucks} duck(s) for $${totalAmount}`,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
