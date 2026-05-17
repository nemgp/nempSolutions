import { getProjects } from '@/lib/google';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Trash2, Plus, LogOut, Globe, ImageIcon, Tag, Type, AlignLeft } from 'lucide-react';
import Image from 'next/image';
import { createProjectAction, deleteProjectAction, logoutAction } from './actions';

export default async function AdminDashboard() {
  const session = await getSession();
  
  if (!session) {
    redirect('/admin/login');
  }

  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-[#F0F2F5] pb-20">
      <header className="bg-white border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-black">Admin <span className="text-accent">Panel</span></h1>
        <div className="flex items-center gap-4">
          <form action={logoutAction}>
            <button 
              type="submit"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              title="Déconnexion"
            >
              <LogOut size={20} />
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="lg:col-span-1">
          <div className="soft-card p-8 sticky top-24 bg-white rounded-3xl shadow-sm">
            <h2 className="text-2xl mb-6 flex items-center gap-2">
              <Plus size={24} className="text-accent" />
              Nouveau Projet
            </h2>
            
            <form action={createProjectAction} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2">
                  <Type size={14} /> Titre
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Ex: Analyse Prédictive"
                  className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2">
                  <AlignLeft size={14} /> Description
                </label>
                <textarea
                  name="description"
                  placeholder="Courte description..."
                  className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-sm min-h-[100px]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2">
                  <Tag size={14} /> Catégorie
                </label>
                <select
                  name="category"
                  className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-sm"
                >
                  <option value="IA">IA</option>
                  <option value="Web App">Web App</option>
                  <option value="Consulting">Consulting</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2">
                  <Globe size={14} /> URL du site
                </label>
                <input
                  type="url"
                  name="site_url"
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2">
                  <ImageIcon size={14} /> URL de l'image
                </label>
                <input
                  type="url"
                  name="image_url"
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/10 hover:scale-[1.02] active:scale-95 transition-all mt-4"
              >
                Ajouter le projet
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl mb-8 font-bold">Projets existants ({projects.length})</h2>
          
          <div className="space-y-4">
            {projects.length === 0 ? (
              <div className="text-center py-20 text-muted bg-white rounded-4xl border border-dashed border-gray-200">
                Aucun projet pour le moment.
              </div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="soft-card p-6 flex items-center gap-6 group bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {project.image_url && (
                      <Image src={project.image_url} alt="" fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg">{project.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{project.category} • {project.site_url}</p>
                  </div>
                  <form action={deleteProjectAction.bind(null, project.id)}>
                    <button
                      type="submit"
                      className="p-3 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
