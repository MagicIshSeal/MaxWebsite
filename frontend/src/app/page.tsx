import { getAbout, getProjects, getExperiences } from '@/lib/api';
import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const [about, projects, experiences] = await Promise.all([
    getAbout(),
    getProjects(),
    getExperiences(),
  ]);

  return (
    <div className="flex flex-col">
      <Hero about={about} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
    </div>
  );
}
