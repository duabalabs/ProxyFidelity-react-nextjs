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

      // Save the file to DigitalOcean Spaces (through Parse)
      await parseFile.save();

      // Once uploaded, attach the file to the project and save the project
      project.add('files', parseFile);
      await project.save();
console.log("has saved finish")
      // Clear file input and reset uploading state
      setFile(null);
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
