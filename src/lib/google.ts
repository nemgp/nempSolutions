export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  site_url: string;
  category: string;
  created_at: string;
};

// Use NEXT_PUBLIC_ so it's available in the browser for static export
const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

export async function getProjects(): Promise<Project[]> {
  try {
    if (!APPS_SCRIPT_URL) {
      console.warn("NEXT_PUBLIC_APPS_SCRIPT_URL is missing.");
      return [];
    }

    const response = await fetch(`${APPS_SCRIPT_URL}?action=get`, {
      method: 'GET',
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.projects || [];
  } catch (error) {
    console.error('Error fetching from Google Apps Script:', error);
    return [];
  }
}

export async function addProject(project: Omit<Project, 'id' | 'created_at'>, adminPassword?: string) {
  try {
    if (!APPS_SCRIPT_URL) throw new Error("NEXT_PUBLIC_APPS_SCRIPT_URL is missing");

    const id = crypto.randomUUID();
    const created_at = new Date().toISOString();
    
    const newProject = {
      ...project,
      id,
      created_at
    };

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'add',
        project: newProject,
        password: adminPassword || ''
      }),
    });

    const result = await response.json();
    return { success: result.success, error: result.error };
  } catch (error: any) {
    console.error('Error adding project via Apps Script:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteProject(id: string, adminPassword?: string) {
  try {
    if (!APPS_SCRIPT_URL) throw new Error("NEXT_PUBLIC_APPS_SCRIPT_URL is missing");

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'delete',
        id: id,
        password: adminPassword || ''
      }),
    });

    const result = await response.json();
    return { success: result.success, error: result.error };
  } catch (error: any) {
    console.error('Error deleting project via Apps Script:', error);
    return { success: false, error: error.message };
  }
}
