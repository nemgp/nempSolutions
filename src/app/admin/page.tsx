'use client';

import { useEffect, useState } from 'react';
import { supabase, type Project } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, LogOut, Globe, ImageIcon, Tag, Type, AlignLeft } from 'lucide-react';
import Image from 'next/image';

import { Session } from '@supabase/supabase-js';

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'IA',
    site_url: '',
    image_url: ''
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/admin/login');
      } else {
        setSession(session);
        fetchProjects();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) router.push('/admin/login');
    });

    return () => subscription.unsubscribe();
  }, [router]);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching projects:', error);
    else setProjects(data || []);
    setLoading(false);
  }

  async function handleAddProject(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase
      .from('projects')
      .insert([formData]);

    if (error) {
      alert('Erreur lors de l\'ajout : ' + error.message);
    } else {
      setFormData({ title: '', description: '', category: 'IA', site_url: '', image_url: '' });
      fetchProjects();
    }
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Voulez-vous vraiment supprimer ce projet ?')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) alert('Erreur lors de la suppression');
    else fetchProjects();
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (!session) return null;

  return (
    <main className="min-h-screen bg-[#F0F2F5] pb-20">
      {/* Header Admin */}
      <header className="bg-white border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-black">Admin <span className="text-accent">Panel</span></h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted hidden md:inline">{session.user.email}</span>
          <button 
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            title="Déconnexion"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Formulaire d'ajout */}
        <div className="lg:col-span-1">
          <div className="soft-card p-8 sticky top-24">
            <h2 className="text-2xl mb-6 flex items-center gap-2">
              <Plus size={24} className="text-accent" />
              Nouveau Projet
            </h2>
            
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2">
                  <Type size={14} /> Titre
                </label>
                <input
                  type="text"
                  placeholder="Ex: Analyse Prédictive"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2">
                  <AlignLeft size={14} /> Description
                </label>
                <textarea
                  placeholder="Courte description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-sm min-h-[100px]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2">
                  <Tag size={14} /> Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                  placeholder="https://..."
                  value={formData.site_url}
                  onChange={(e) => setFormData({ ...formData, site_url: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2">
                  <ImageIcon size={14} /> URL de l&apos;image
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-accent text-white font-bold shadow-lg shadow-accent/10 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-4"
              >
                {submitting ? 'Enregistrement...' : 'Ajouter le projet'}
              </button>
            </form>
          </div>
        </div>

        {/* Liste des projets */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl mb-8">Projets existants ({projects.length})</h2>
          
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-20 text-muted">Chargement...</div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20 text-muted bg-white rounded-4xl border border-dashed border-gray-200">
                Aucun projet pour le moment.
              </div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="soft-card p-6 flex items-center gap-6 group">
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {project.image_url && (
                      <Image src={project.image_url} alt="" fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg">{project.title}</h4>
                    <p className="text-xs text-muted line-clamp-1">{project.category} • {project.site_url}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-3 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
