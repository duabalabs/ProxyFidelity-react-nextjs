"use client";

import { useState } from 'react';
import Parse from 'parse';
import { Project } from '@lib';

interface DocumentUploadProps {
  project: Project;
}

export const DocumentUpload = ({ project }: DocumentUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    try {
      // Create a Parse File object
      const parseFile = new Parse.File(file.name, file);
      await parseFile.save(); // Save to DigitalOcean Spaces via Parse

      // Create a ProjectFile object and attach file details
      const ProjectFile = Parse.Object.extend('ProjectFile');
      const projectFile = new ProjectFile();

      projectFile.set('file', parseFile); // Set the actual file
      projectFile.set('name', file.name); // Set the actual file
      projectFile.set('project', project); // Link to the project
      projectFile.set('fileType', file.type.includes('image') || file.type.includes('video') ? 'media' : 'document'); // Set file type for categorization

      // Save the project file object
      await projectFile.save();

      // Optionally update the project object if necessary
      project.add('files', projectFile);
      await project.save();

      setFile(null); // Clear file input
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />

      {file && (
        <div className="mt-4">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            {isUploading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
      )}
    </div>
  );
};