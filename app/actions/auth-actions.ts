'use server';

import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { registerSchema, type RegisterInput } from '@/lib/validations';

type ActionResult =
  | { success: true; message: string }
  | { success: false; error: string };

/**
 * Registers a new customer account.
 * - Validates input with Zod
 * - Checks for duplicate email
 * - Hashes password with bcrypt (12 rounds) before storing
 */
export async function registerAction(input: RegisterInput): Promise<ActionResult> {
  // 1. Validate input
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? 'Input tidak valid';
    return { success: false, error: firstError };
  }

  const { name, email, password, phone } = parsed.data;

  // 2. Check for existing email
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: 'Email sudah terdaftar. Silakan gunakan email lain.' };
  }

  // 3. Hash password — never store plain text
  const passwordHash = await hashPassword(password);

  // 4. Persist new user
  await db.user.create({
    data: {
      name,
      email,
      passwordHash,
      phone: phone || null,
      role: 'CUSTOMER',
    },
  });

  return { success: true, message: 'Akun berhasil dibuat. Silakan login.' };
}
