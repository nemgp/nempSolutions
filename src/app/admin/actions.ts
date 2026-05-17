'use server';

import { addProject, deleteProject } from '@/lib/google';
import { login, logout } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;
  const success = await login(password);
  
  if (success) {
    redirect('/admin');
  }
  // If not success, we could throw an error or handle it. 
  // In Next.js Server Actions returning a plain object is the best way.
  // But wait, throwing an error is simpler if we don't have useActionState.
  throw new Error('Mot de passe incorrect');
}

export async function createProjectAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const site_url = formData.get('site_url') as string;
  const image_url = formData.get('image_url') as string;

  await addProject({
    title,
    description,
    category,
    site_url,
    image_url,
  });

  revalidatePath('/admin');
  revalidatePath('/');
}

export async function deleteProjectAction(id: string) {
  await deleteProject(id);
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function logoutAction() {
  await logout();
  redirect('/admin/login');
}
