"use client";

import { useState, useEffect } from 'react';
import { Project, useAppData } from '@lib';
import { CreateProjectModal, ProjectList } from '@components';

export default function ProjectsPage() {
  const { projects, fetchProjects, user } = useAppData();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchProjects(); // Fetch the list of projects when the page loads
  }, [fetchProjects]);

  const handleCreateProject = async (newProject: { name: string; description: string, email: string }) => {
    try {
      const project = new Project();

      project.set('name', newProject.name);
      project.set('description', newProject.description);
      project.set('email', newProject.email);

      // Set the accepted boolean based on the role
      if (user?.role === 'manager' || user?.role === 'admin') {
        project.set('accepted', true);
      } else {
        project.set('accepted', false);
      }

      // Save the project to Parse
      await project.save();
      console.log('Project created successfully');
    } catch (error) {
      console.error('Error while creating project:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Project List Component */}
      <ProjectList
        projects={projects}
        onCreateProject={() => setModalOpen(true)}
      />

      {/* Create Project Modal */}
      <CreateProjectModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
}