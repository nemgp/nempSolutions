'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="soft-card w-full max-w-md p-10">
          <h1 className="text-3xl font-black mb-2">Espace Admin</h1>
          <p className="text-muted mb-8">Connectez-vous pour gérer vos projets.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none transition-all"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-accent text-white font-bold shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
