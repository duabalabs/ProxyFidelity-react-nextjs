"use client";

import { useState } from 'react';
import Parse from 'parse';

interface ProjectUpdateProps {
  updates: Parse.Object[];
  onAddUpdate: (newUpdate: string) => void;
  canAddUpdate: boolean;
}

export const ProjectUpdate = ({ updates, onAddUpdate, canAddUpdate }: ProjectUpdateProps) => {
  const [newUpdate, setNewUpdate] = useState<string>("");

  const handleAddUpdate = () => {
    if (newUpdate.trim()) {
      onAddUpdate(newUpdate); // Add the new update
      setNewUpdate(""); // Clear the input field
    }
  };

  return (
    <div>
      {/* Display existing updates */}
      <ul className="space-y-4">
        {updates?.map((update, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
            <p>{update.get('content')}</p>
            <p className="text-sm text-gray-500">Updated at {new Date(update.get('createdAt')).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      {/* Admins and managers can add new updates */}
      {canAddUpdate && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            value={newUpdate}
            onChange={(e) => setNewUpdate(e.target.value)}
            placeholder="Add a new project update"
          />
          <button onClick={handleAddUpdate} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
            Add Update
          </button>
        </div>
      )}
    </div>
  );
};
