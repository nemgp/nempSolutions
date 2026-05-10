'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 mb-8 rounded-full bg-orange-100 text-accent text-xs font-bold uppercase tracking-widest"
        >
          Intelligence Artificielle & Consulting
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-anthracite mb-8 leading-[1.1] tracking-tight"
        >
          L&apos;alliance de l&apos;expertise <br />
          <span className="text-accent italic">et du futur technologique.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Nous accompagnons les entreprises dans leur transformation digitale en combinant 
          analyse stratégique et solutions logicielles de pointe basées sur l&apos;IA.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a 
            href="#projets"
            className="px-8 py-4 rounded-full bg-anthracite text-white font-bold hover:bg-black transition-all shadow-xl shadow-black/10"
          >
            Découvrir nos projets
          </a>
          <a 
            href="#expertises"
            className="px-8 py-4 rounded-full bg-white text-anthracite font-bold border border-gray-200 hover:border-accent hover:text-accent transition-all shadow-sm"
          >
            Nos expertises
          </a>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
