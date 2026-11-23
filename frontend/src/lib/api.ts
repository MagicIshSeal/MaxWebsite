import axios from 'axios';

// TypeScript interfaces for API responses
export interface AboutAttributes {
  name: string;
  tagline: string;
  bio: string;
  detailedBio?: string;
  email?: string;
  phone?: string;
  location?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  profileImage?: {
    data?: {
      attributes: {
        url: string;
      };
    };
  };
  heroMedia?: {
    data?: {
      attributes: {
        url: string;
        mime?: string;
      };
    };
  };
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  skills?: string[];
}

import aboutData from '../../content/about.json';
import projectsData from '../../content/projects.json';
import experiencesData from '../../content/experiences.json';
import toolsData from '../../content/tools.json';

// Live mode (local dev against Strapi): USE_STRAPI=1. Otherwise read the committed snapshot
// produced by `npm run export-content`.
const USE_STRAPI = process.env.USE_STRAPI === '1';
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

async function live(endpoint: string) {
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`${endpoint}: ${res.status}`);
  return (await res.json()).data;
}

export async function getAbout() {
  if (!USE_STRAPI) return aboutData as any;
  try { return await live('/about?populate=*'); } catch (e) { console.error(e); return null; }
}

export async function getProjects() {
  if (!USE_STRAPI) return projectsData as any[];
  try { return await live('/projects?populate=*&sort=order:asc'); } catch (e) { console.error(e); return []; }
}

export async function getProject(id: string) {
  const projects = await getProjects();
  return projects.find((p: any) => String(p.id) === String(id)) ?? null;
}

export async function getExperiences() {
  if (!USE_STRAPI) return experiencesData as any[];
  try { return await live('/experiences?populate=*&sort=startDate:desc'); } catch (e) { console.error(e); return []; }
}

export async function getTools() {
  if (!USE_STRAPI) return toolsData as any[];
  try { return await live('/tools?populate=*&sort=order:asc'); } catch (e) { console.error(e); return []; }
}

export function getStrapiMedia(url: string | null) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  // Snapshot media lives in public/content/media; live mode points at Strapi.
  return USE_STRAPI ? `${STRAPI_URL}${url}` : `${BASE_PATH}${url}`;
}
