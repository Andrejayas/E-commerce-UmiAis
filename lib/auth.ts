import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

/**
 * Hashes a plain-text password using bcrypt.
 * Always call this before persisting a password to the database.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compares a plain-text password against a stored bcrypt hash.
 * Returns true if they match, false otherwise.
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
