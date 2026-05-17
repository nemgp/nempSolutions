'use client';

import { loginAction } from '../actions';
import { Lock } from 'lucide-react';
import { useActionState } from 'react';
import { useState } from 'react';

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      // Because server actions throwing an error might be tricky to catch nicely 
      // without useActionState, let's just await it.
      await loginAction(formData);
    } catch (err: any) {
      setError(err.message || "Erreur de connexion");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-6">
      <div className="soft-card p-10 max-w-md w-full bg-white rounded-3xl shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-orange-100 text-accent rounded-2xl flex items-center justify-center">
            <Lock size={32} />
          </div>
        </div>
        
        <h1 className="text-2xl font-black text-center mb-2">Accès <span className="text-accent">Admin</span></h1>
        <p className="text-muted text-center mb-8 text-sm text-gray-500">
          Veuillez entrer votre mot de passe pour accéder au dashboard.
        </p>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-center"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </main>
  );
}
