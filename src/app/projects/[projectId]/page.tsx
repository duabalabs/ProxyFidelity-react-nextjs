"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Correct Next.js 13+ APIs
import { useAppData } from '@lib';
import { Chat, DocumentUpload, ProjectFiles, ProjectUpdate } from '@components';

export default function ProjectPage() {
  const { projectId } = useParams(); // Get projectId from the URL using next/navigation
  const router = useRouter(); // For navigation if needed
  const { projects, role, user, fetchProjects } = useAppData();

  const [project, setProject] = useState<any | null>(null);
  useEffect(() => {
    fetchProjects(); // Fetch the list of projects when the page loads
  }, [fetchProjects]);

  useEffect(() => {
    if (projectId && projects) {
      const selectedProject = projects.find((proj) => proj.id === projectId);
      if (selectedProject) {
        setProject(selectedProject);
      } else {
        // router.push('/projects'); // Redirect if the project is not found
      }
    }
  }, [projectId, projects, router]);

  const handleAddUpdate = (newUpdate: string) => {
    // Logic to add a new project update
  };

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">{project.name}</h1>

      {/* Project Updates Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Project Updates</h2>
        <ProjectUpdate
          updates={project.updates}
          onAddUpdate={handleAddUpdate}
          canAddUpdate={role === 'admin' || role === 'manager'}
        />
      </section>

      {/* Chat Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Chat</h2>
        <Chat project={project} user={user} />
      </section>

      {/* Files Section (Documents and Media Content) */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Project Files</h2>
        <ProjectFiles project={project} />
        {(role === 'admin' || role === 'manager') && (
          <DocumentUpload project={project} />
        )}
      </section>
    </div>
  );
}