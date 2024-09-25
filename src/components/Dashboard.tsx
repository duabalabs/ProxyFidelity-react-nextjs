"use client";

import { useState, useEffect } from 'react';
import { useAppData } from '@lib';
import { CreateProjectModal, ManagerList, MessageList, ProjectList } from '@components';

export const Dashboard = () =>{
  const { role, projects, managers, fetchProjects, fetchManagers, user } = useAppData();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchProjects();
    if (role === 'admin') {
      fetchManagers();
    }
  }, [role, fetchProjects, fetchManagers]);

  const handleCreateProject = (newProject: { name: string; description: string }) => {
    // Logic to add the new project to the project list or server
    // Example: projects.push(newProject) or a server request
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Grid Layout for New Messages, Projects, and Managers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

        {/* New Messages Section */}
        <MessageList user={user} />

        {/* Project List Section */}
        <ProjectList
          projects={projects}
          onCreateProject={() => setModalOpen(true)}
        />

        {/* Manager List Section (only for admins) */}
        {role === 'admin' && <ManagerList managers={managers} />}
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
}