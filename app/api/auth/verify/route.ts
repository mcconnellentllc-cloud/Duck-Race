import { NextRequest, NextResponse } from 'next/server';
import { getAdminUsers } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const adminUser = request.cookies.get('admin_user')?.value;

  if (!token || !adminUser) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  // Verify the user is a valid admin
  const validUsers = getAdminUsers();
  if (!validUsers.some(u => u.toLowerCase() === adminUser.toLowerCase())) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  // Check token expiry (24 hours)
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [, timestamp] = decoded.split(':');
    const tokenTime = parseInt(timestamp, 10);
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours in ms

    if (now - tokenTime > maxAge) {
      return NextResponse.json({ authenticated: false, expired: true }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: { username: adminUser },
  });
}
