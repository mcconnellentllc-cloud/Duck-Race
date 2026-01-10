import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Purchase from '@/lib/models/Purchase';

export async function GET() {
  try {
    await dbConnect();

    const stats = await Purchase.aggregate([
      {
        $group: {
          _id: null,
          totalDucks: { $sum: '$numDucks' },
          totalAmount: { $sum: '$amountPaid' },
          totalPurchases: { $sum: 1 },
        },
      },
    ]);

    if (stats.length === 0) {
      return NextResponse.json({
        totalDucks: 0,
        totalAmount: 0,
        totalPurchases: 0,
      });
    }

    return NextResponse.json({
      totalDucks: stats[0].totalDucks,
      totalAmount: stats[0].totalAmount,
      totalPurchases: stats[0].totalPurchases,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
