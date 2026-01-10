import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Purchase from '@/lib/models/Purchase';

const PAYOUT_RATES: Record<number, number> = {
  10: 0.30,
  25: 0.35,
  50: 0.40,
  100: 0.50,
};

export async function GET() {
  try {
    await dbConnect();

    // Get stats grouped by tier
    const tierStats = await Purchase.aggregate([
      {
        $group: {
          _id: '$tier',
          ducks: { $sum: '$numDucks' },
          total: { $sum: '$amountPaid' },
          purchases: { $sum: 1 },
        },
      },
    ]);

    // Build pots object
    const pots: Record<number, { ducks: number; total: number; winnerPot: number; scholarshipPot: number }> = {
      10: { ducks: 0, total: 0, winnerPot: 0, scholarshipPot: 0 },
      25: { ducks: 0, total: 0, winnerPot: 0, scholarshipPot: 0 },
      50: { ducks: 0, total: 0, winnerPot: 0, scholarshipPot: 0 },
      100: { ducks: 0, total: 0, winnerPot: 0, scholarshipPot: 0 },
    };

    let totalDucks = 0;
    let totalAmount = 0;
    let totalPurchases = 0;

    for (const stat of tierStats) {
      const tier = stat._id as number;
      if (tier && pots[tier] !== undefined) {
        const payoutRate = PAYOUT_RATES[tier];
        pots[tier] = {
          ducks: stat.ducks,
          total: stat.total,
          winnerPot: Math.floor(stat.total * payoutRate),
          scholarshipPot: Math.floor(stat.total * (1 - payoutRate)),
        };
        totalDucks += stat.ducks;
        totalAmount += stat.total;
        totalPurchases += stat.purchases;
      }
    }

    return NextResponse.json({
      totalDucks,
      totalAmount,
      totalPurchases,
      pots,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
