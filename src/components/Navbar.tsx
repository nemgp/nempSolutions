'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-md px-8 py-3 rounded-full border border-white/40 shadow-sm">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image src="/nempSolutions/logo.png" alt="nemgpSolutions" fill className="object-contain" />
          </div>
          <span className="text-xl font-black tracking-tighter text-anthracite">
            nemgp<span className="text-accent">Solutions</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">Accueil</Link>
          <Link href="#projets" className="text-sm font-medium hover:text-accent transition-colors">Projets</Link>
          <Link href="#expertises" className="text-sm font-medium hover:text-accent transition-colors">Expertises</Link>
        </div>

        <Link 
          href="mailto:mnguemkam.polytechvalor@gmail.com"
          className="bg-accent text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          Contact
          <Mail size={16} />
        </Link>
      </div>
    </nav>
  );
}
