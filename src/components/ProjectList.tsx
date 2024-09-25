import { Project } from "@lib";

export const ProjectList = ({ projects, onCreateProject }: { projects: Project[], onCreateProject: () => void }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Projects</h2>
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="bg-gray-100 p-4 rounded-lg shadow">
              <a href={`/projects/${project.id}`} className="block">
                <h3 className="text-lg font-semibold text-gray-700">{project.name}</h3>
                <p className="text-gray-500">{project.description}</p>
              </a>
            </li>
          ))}
        </ul>
        <button 
          onClick={onCreateProject} 
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
          + New Project
        </button>
      </div>
    );
  };
  