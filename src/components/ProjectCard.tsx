'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Badge from './Badge';
import { Project } from '@/lib/google';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="soft-card overflow-hidden group"
    >
      <div className="p-6">
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100">
          {project.image_url ? (
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 italic">
              Aperçu indisponible
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-start mb-3">
          <Badge category={project.category} />
          <span className="text-[10px] text-gray-400 uppercase tracking-widest">
            {new Date(project.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })}
          </span>
        </div>

        <h3 className="text-2xl mb-3 leading-tight group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted text-sm line-clamp-3 mb-6 leading-relaxed">
          {project.description}
        </p>

        <a
          href={project.site_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-accent transition-colors"
        >
          Voir le projet
          <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}
