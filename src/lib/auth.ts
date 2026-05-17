import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.ADMIN_SECRET || 'nemp-solutions-super-secret-key-change-me';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function login(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  if (password !== adminPassword) {
    return false;
  }

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ admin: true, expires });

  (await cookies()).set('admin_session', session, { expires, httpOnly: true, path: '/' });
  return true;
}

export async function logout() {
  (await cookies()).set('admin_session', '', { expires: new Date(0), path: '/' });
}

export async function getSession() {
  const session = (await cookies()).get('admin_session')?.value;
  if (!session) return null;
  try {
    const parsed = await decrypt(session);
    return parsed;
  } catch (error) {
    return null;
  }
}
