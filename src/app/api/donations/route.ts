import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Donation from '@/models/Donation';

export async function GET() {
  try {
    await dbConnect();
    const donations = await Donation.find({}).sort({ donationDate: -1 });
    return NextResponse.json({ donations });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { donorName, phone, email, address, amount, paymentMethod, notes, anonymous } = body;

    // Validate required fields
    if (!donorName || !phone || !email || !amount || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate amount
    if (amount < 1) {
      return NextResponse.json({ error: 'Minimum donation is $1' }, { status: 400 });
    }

    // Create the donation
    const donation = await Donation.create({
      donorName,
      phone,
      email,
      address: address || '',
      amount,
      paymentMethod,
      notes: notes || '',
      anonymous: anonymous || false,
    });

    return NextResponse.json({
      success: true,
      donation,
      message: `Thank you for your donation of $${amount}!`,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating donation:', error);
    return NextResponse.json({ error: 'Failed to process donation' }, { status: 500 });
  }
}
