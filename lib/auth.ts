import bcrypt from 'bcryptjs';

// Admin users - passwords are hashed versions of 'buckaduck'
const ADMIN_USERS = [
  { username: 'Jan', name: 'Jan Toyne', passwordHash: '$2b$10$dfJc07fJ0xk11VgskoDneO8t.s7cXfu5xKiw5ijKGosFrCcGAe/1i' },
  { username: 'Vance', name: 'Vance McCormick', passwordHash: '$2b$10$dfJc07fJ0xk11VgskoDneO8t.s7cXfu5xKiw5ijKGosFrCcGAe/1i' },
  { username: 'Kyle', name: 'Kyle McConnell', passwordHash: '$2b$10$dfJc07fJ0xk11VgskoDneO8t.s7cXfu5xKiw5ijKGosFrCcGAe/1i' },
];

export interface AdminUser {
  username: string;
  name: string;
}

export async function verifyCredentials(username: string, password: string): Promise<AdminUser | null> {
  const user = ADMIN_USERS.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return null;
  }

  return { username: user.username, name: user.name };
}

export function getAdminUsers(): string[] {
  return ADMIN_USERS.map(u => u.username);
}

// Helper to generate hash (for reference)
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
