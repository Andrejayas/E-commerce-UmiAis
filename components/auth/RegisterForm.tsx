'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@/lib/validations';
import { registerAction } from '@/app/actions/auth-actions';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setServerError('');

    const result = await registerAction(data);

    setIsLoading(false);

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    // Registration succeeded — send to login with success notice
    router.push('/login?registered=1');
  };

  return (
    <Card variant="bordered" padding="lg">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <Input
          label="Nama Lengkap"
          type="text"
          name="name"
          placeholder="Nama kamu"
          required
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="nama@email.com"
          required
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Min. 8 karakter, huruf besar, dan angka"
          required
          error={errors.password?.message}
          {...register('password')}
        />

        <Input
          label="Nomor Telepon"
          type="tel"
          name="phone"
          placeholder="08xx-xxxx-xxxx (opsional)"
          error={errors.phone?.message}
          {...register('phone')}
        />

        {serverError && (
          <p role="alert" className="text-sm text-red-500 text-center">
            {serverError}
          </p>
        )}

        <Button type="submit" variant="primary" size="lg" disabled={isLoading}>
          {isLoading ? 'Mendaftar...' : 'Buat Akun'}
        </Button>

        <p className="text-sm text-center text-gray-500">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-terracotta-500 hover:underline font-medium">
            Masuk di sini
          </Link>
        </p>
      </form>
    </Card>
  );
}
