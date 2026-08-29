import { z } from 'zod';

// ─────────────────────────────────────────────
// AUTH SCHEMAS
// ─────────────────────────────────────────────

export const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(100),
  email: z.string().email('Format email tidak valid'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung minimal 1 huruf besar')
    .regex(/[a-z]/, 'Password harus mengandung minimal 1 huruf kecil')
    .regex(/[0-9]/, 'Password harus mengandung minimal 1 angka'),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]+$/, 'Nomor telepon tidak valid')
    .optional()
    .or(z.literal('')),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(1, 'Password tidak boleh kosong'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ─────────────────────────────────────────────
// CHECKOUT SCHEMA
// ─────────────────────────────────────────────

export const checkoutSchema = z
  .object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    email: z.string().email('Format email tidak valid').optional().or(z.literal('')),
    phone: z.string().regex(/^[0-9+\-\s()]+$/, 'Nomor telepon tidak valid'),
    deliveryMethod: z.enum(['DELIVERY', 'PICKUP']),
    address: z.string().min(10, 'Alamat minimal 10 karakter').optional().or(z.literal('')),
    city: z.string().min(2, 'Kota wajib diisi').optional().or(z.literal('')),
    postalCode: z.string().optional().or(z.literal('')),
    notes: z.string().max(500, 'Catatan maksimal 500 karakter').optional().or(z.literal('')),
  })
  .refine(
    (data) => {
      if (data.deliveryMethod === 'DELIVERY') {
        return !!data.address && !!data.city;
      }
      return true;
    },
    {
      message: 'Alamat dan kota wajib diisi untuk metode pengiriman',
      path: ['address'],
    },
  );

export type CheckoutInput = z.infer<typeof checkoutSchema>;

// ─────────────────────────────────────────────
// NEWSLETTER SCHEMA
// ─────────────────────────────────────────────

export const newsletterSchema = z.object({
  email: z.string().email('Format email tidak valid'),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

// ─────────────────────────────────────────────
// PRODUCT SCHEMA (admin)
// ─────────────────────────────────────────────

export const productVariantSchema = z.object({
  name: z.string().min(1, 'Nama varian wajib diisi'),
  price: z.coerce.number().positive('Harga harus lebih dari 0'),
  quantityLabel: z.string().optional(),
  stockQuantity: z.coerce.number().int().min(0, 'Stok tidak boleh negatif'),
  isDefault: z.boolean().default(false),
});

export const productSchema = z.object({
  name: z.string().min(2, 'Nama produk minimal 2 karakter'),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung'),
  description: z.string().optional(),
  categoryId: z.string().uuid('Kategori tidak valid').optional(),
  imageUrl: z.string().url('URL gambar tidak valid').optional().or(z.literal('')),
  isActive: z.boolean().default(true),
  isCustomPackage: z.boolean().default(false),
  customPackageBaseQty: z.coerce.number().int().positive().optional(),
  customPackageBasePrice: z.coerce.number().positive().optional(),
  customPackageExtraPrice: z.coerce.number().positive().optional(),
  variants: z.array(productVariantSchema).min(1, 'Minimal 1 varian produk'),
});

export type ProductInput = z.infer<typeof productSchema>;
