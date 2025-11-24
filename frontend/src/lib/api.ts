import axios from 'axios';

// Use internal Docker network URL for server-side requests
const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://strapi:1337';
// Use localhost for client-side requests (browser)
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: `${STRAPI_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getAbout() {
  try {
    const response = await api.get('/about?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching about:', error);
    return null;
  }
}

export async function getProjects() {
  try {
    const response = await api.get('/projects?populate=*&sort=order:asc');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProject(id: string) {
  try {
    const response = await api.get(`/projects/${id}?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function getExperiences() {
  try {
    const response = await api.get('/experiences?populate=*&sort=startDate:desc');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}

export function getStrapiURL(path: string = '') {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(url: string | null) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  // For server-side rendering, use the internal Docker network URL
  if (typeof window === 'undefined') {
    return `${STRAPI_API_URL}${url}`;
  }
  // For client-side, use the public URL
  return getStrapiURL(url);
}
