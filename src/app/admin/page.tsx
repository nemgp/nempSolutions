'use client';

import { useEffect, useState } from 'react';
import { getProjects, addProject, deleteProject, type Project } from '@/lib/google';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, LogOut, Globe, ImageIcon, Tag, Type, AlignLeft } from 'lucide-react';
import Image from 'next/image';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState<string | null>(null);
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'IA',
    site_url: '',
    image_url: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const storedPass = localStorage.getItem('admin_password');
    if (!storedPass) {
      router.push('/admin/login');
      return;
    }
    setPassword(storedPass);
    fetchData();
  }, [router]);

  async function fetchData() {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    
    if (!password) return;
    
    const res = await addProject(formData, password);
    if (res.success) {
      setFormData({ title: '', description: '', category: 'IA', site_url: '', image_url: '' });
      fetchData();
    } else {
      alert('Erreur: ' + res.error);
      if (res.error === 'Mot de passe incorrect') {
        handleLogout();
      }
    }
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!password || !confirm('Supprimer ce projet ?')) return;
    
    const res = await deleteProject(id, password);
    if (res.success) {
      fetchData();
    } else {
      alert('Erreur: ' + res.error);
    }
  }

  function handleLogout() {
    localStorage.removeItem('admin_password');
    router.push('/admin/login');
  }

  if (!password) return null;

  return (
    <main className="min-h-screen bg-[#F0F2F5] pb-20">
      <header className="bg-white border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-black">Admin <span className="text-accent">Panel</span></h1>
        <button 
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          title="Déconnexion"
        >
          <LogOut size={20} />
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="lg:col-span-1">
          <div className="soft-card p-8 sticky top-24 bg-white rounded-3xl shadow-sm">
            <h2 className="text-2xl mb-6 flex items-center gap-2">
              <Plus size={24} className="text-accent" />
              Nouveau Projet
            </h2>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2"><Type size={14} /> Titre</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2"><AlignLeft size={14} /> Description</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-sm min-h-[100px]" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2"><Tag size={14} /> Catégorie</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-sm">
                  <option value="IA">IA</option><option value="Web App">Web App</option><option value="Consulting">Consulting</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2"><Globe size={14} /> URL du site</label>
                <input type="url" required value={formData.site_url} onChange={e => setFormData({...formData, site_url: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2"><ImageIcon size={14} /> URL de l'image</label>
                <input type="url" required value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-accent outline-none text-sm" />
              </div>
              <button type="submit" disabled={submitting} className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold disabled:opacity-50 mt-4">
                {submitting ? 'Ajout...' : 'Ajouter le projet'}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl mb-8 font-bold">Projets existants ({projects.length})</h2>
          <div className="space-y-4">
            {loading ? <p className="text-center text-muted">Chargement...</p> : 
             projects.length === 0 ? <p className="text-center text-muted">Aucun projet</p> : 
              projects.map(project => (
                <div key={project.id} className="soft-card p-6 flex items-center gap-6 group bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {project.image_url && <Image src={project.image_url} alt="" fill className="object-cover" />}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg">{project.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{project.category} • {project.site_url}</p>
                  </div>
                  <button onClick={() => handleDelete(project.id)} className="p-3 rounded-full text-gray-400 hover:text-red-500 transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
