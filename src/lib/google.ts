export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  site_url: string;
  category: string;
  created_at: string;
};

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

export async function getProjects(): Promise<Project[]> {
  try {
    if (!APPS_SCRIPT_URL) {
      console.warn("APPS_SCRIPT_URL is missing. Please add it to your .env.local");
      return [];
    }

    // Pass the action 'GET' in query param or rely on HTTP GET
    const response = await fetch(`${APPS_SCRIPT_URL}?action=get`, {
      method: 'GET',
      next: { revalidate: 0 } // Disable caching to always get fresh data
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

export async function addProject(project: Omit<Project, 'id' | 'created_at'>) {
  try {
    if (!APPS_SCRIPT_URL) throw new Error("APPS_SCRIPT_URL is missing");

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
        project: newProject
      }),
    });

    const result = await response.json();
    return { success: result.success };
  } catch (error) {
    console.error('Error adding project via Apps Script:', error);
    return { success: false, error };
  }
}

export async function deleteProject(id: string) {
  try {
    if (!APPS_SCRIPT_URL) throw new Error("APPS_SCRIPT_URL is missing");

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'delete',
        id: id
      }),
    });

    const result = await response.json();
    return { success: result.success };
  } catch (error) {
    console.error('Error deleting project via Apps Script:', error);
    return { success: false, error };
  }
}
