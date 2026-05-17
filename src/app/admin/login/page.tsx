'use client';

import { Lock } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.trim() === '') return;
    
    // Pour les sites statiques (GitHub Pages), on sauvegarde le mot de passe côté client
    // et on le renvoie à l'Apps Script pour chaque action.
    localStorage.setItem('admin_password', password);
    router.push('/admin');
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
          Veuillez entrer le mot de passe pour accéder au dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-center"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
}
