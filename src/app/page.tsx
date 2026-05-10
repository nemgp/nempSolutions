import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import Footer from '@/components/Footer';
import { supabase, type Project } from '@/lib/supabase';

// Mock data for initial preview if Supabase is not connected
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Analyse IA Prédictive',
    description: 'Solution de maintenance prédictive utilisant le machine learning pour anticiper les pannes industrielles avant qu&apos;elles ne surviennent.',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    site_url: '#',
    category: 'IA',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Plateforme E-Commerce Pro',
    description: 'Une solution SaaS complète pour la gestion de stocks et la vente multicanale avec une expérience utilisateur ultra-fluide.',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    site_url: '#',
    category: 'Web App',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Audit Stratégique Digital',
    description: 'Accompagnement complet pour la transformation numérique d&apos;un grand groupe logistique européen.',
    image_url: 'https://images.unsplash.com/photo-1454165833767-0274b24f48a8?auto=format&fit=crop&q=80&w=800',
    site_url: '#',
    category: 'Consulting',
    created_at: new Date().toISOString()
  }
];

async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error || !data || data.length === 0) {
      console.warn('Supabase fetch failed or empty, using mock data:', error);
      return mockProjects;
    }
    
    return data as Project[];
  } catch (err) {
    console.error('Error fetching projects:', err);
    return mockProjects;
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <Hero />

      <section id="projets" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl mb-6">Nos réalisations</h2>
            <p className="text-lg text-muted">
              Découvrez comment nous aidons nos clients à transformer leurs idées en solutions concrètes et performantes.
            </p>
          </div>
          <div className="flex gap-2">
            {['Tous', 'IA', 'Web App', 'Consulting'].map((cat) => (
              <button 
                key={cat}
                className="px-5 py-2 rounded-full text-sm font-semibold bg-white border border-gray-100 hover:border-accent hover:text-accent transition-all shadow-sm"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <section id="expertises" className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-4xl bg-[#F0F2F5] border border-white">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-accent mb-6">
                {/* Lucide icon placeholder */}
                <span className="font-bold">IA</span>
              </div>
              <h3 className="text-2xl mb-4">Intelligence Artificielle</h3>
              <p className="text-muted leading-relaxed">
                Développement de modèles sur mesure, intégration de LLM et automatisation intelligente des processus.
              </p>
            </div>
            
            <div className="p-8 rounded-4xl bg-[#F0F2F5] border border-white">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <span className="font-bold">W</span>
              </div>
              <h3 className="text-2xl mb-4">Développement Web</h3>
              <p className="text-muted leading-relaxed">
                Applications web modernes, performantes et scalables utilisant les dernières technologies React/Next.js.
              </p>
            </div>

            <div className="p-8 rounded-4xl bg-[#F0F2F5] border border-white">
              <div className="w-12 h-12 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-700 mb-6">
                <span className="font-bold">C</span>
              </div>
              <h3 className="text-2xl mb-4">Conseil Stratégique</h3>
              <p className="text-muted leading-relaxed">
                Accompagnement dans la définition de votre roadmap technologique et optimisation de votre stack logicielle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
