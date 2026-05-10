import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-100 py-12 px-6 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-xl font-black text-anthracite mb-2">nemgpSolutions</h2>
          <p className="text-sm text-muted">© {new Date().getFullYear()} nemgpSolutions. Tous droits réservés.</p>
        </div>

        <div className="flex gap-8 text-sm font-medium text-gray-500">
          <Link href="/mentions-legales" className="hover:text-accent transition-colors">Mentions Légales</Link>
          <Link href="/confidentialite" className="hover:text-accent transition-colors">Confidentialité</Link>
          <Link href="mailto:mnguemkam.polytechvalor@gmail.com" className="hover:text-accent transition-colors">Contact</Link>
        </div>
      </div>

      <Link 
        href="/admin" 
        className="absolute bottom-4 right-4 text-[10px] text-gray-200 hover:text-gray-400 transition-colors bg-transparent border-none p-0"
      >
        Admin
      </Link>
    </footer>
  );
}
