import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order, { TIER_CONFIG, DuckTier } from '@/models/Order';
import Donation from '@/models/Donation';

export async function GET() {
  try {
    await dbConnect();

    // Get all orders
    const orders = await Order.find({});
    const donations = await Donation.find({});

    // Calculate stats per tier
    const tierStats: Record<DuckTier, { ducksSold: number; totalPot: number }> = {
      A: { ducksSold: 0, totalPot: 0 },
      B: { ducksSold: 0, totalPot: 0 },
      C: { ducksSold: 0, totalPot: 0 },
      D: { ducksSold: 0, totalPot: 0 },
    };

    // Aggregate duck sales by tier
    for (const order of orders) {
      for (const duck of order.ducks) {
        const tier = duck.tier as DuckTier;
        tierStats[tier].ducksSold += duck.quantity;
        tierStats[tier].totalPot += duck.quantity * TIER_CONFIG[tier].price;
      }
    }

    // Build response
    const tiers = (Object.keys(TIER_CONFIG) as DuckTier[]).map((tier) => {
      const config = TIER_CONFIG[tier];
      const stats = tierStats[tier];
      const winnerPayout = Math.floor(stats.totalPot * (config.winnerPercent / 100));
      const scholarshipFund = stats.totalPot - winnerPayout;

      return {
        tier,
        label: config.label,
        price: config.price,
        winnerPercent: config.winnerPercent,
        scholarshipPercent: config.scholarshipPercent,
        ducksSold: stats.ducksSold,
        totalPot: stats.totalPot,
        winnerPayout,
        scholarshipFund,
      };
    });

    // Calculate grand totals
    const totalDucksSold = tiers.reduce((sum, t) => sum + t.ducksSold, 0);
    const totalPot = tiers.reduce((sum, t) => sum + t.totalPot, 0);
    const totalScholarshipFromDucks = tiers.reduce((sum, t) => sum + t.scholarshipFund, 0);

    // Calculate total donations
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalScholarship = totalScholarshipFromDucks + totalDonations;

    return NextResponse.json({
      tiers,
      grandTotal: {
        ducksSold: totalDucksSold,
        totalPot,
        scholarshipFund: totalScholarship,
        donationsTotal: totalDonations,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
