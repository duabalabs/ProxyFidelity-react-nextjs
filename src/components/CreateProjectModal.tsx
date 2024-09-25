"use client";

import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (project: { name: string; description: string, email: string }) => void;
}

export const CreateProjectModal = ({ open, onClose, onCreate }: CreateProjectModalProps) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
    const [email, setEmail] = useState<string>('');

  const handleCreate = () => {
    onCreate({ name, description, email });
    onClose(); // Close the modal after creating the project
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        <TextField
          label="Project Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Project Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          value={description}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreate}
          className="mt-4"
        >
          Create Project
        </Button>
      </DialogContent>
    </Dialog>
  );
};
