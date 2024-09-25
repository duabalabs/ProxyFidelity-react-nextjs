import { useState } from 'react';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import { Project } from '@lib';

export default function ProjectRequestModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const project = new Project();
      project.name = name;
      project.email = email;
      project.description = description;
      await project.save();

      setLoading(false);
      onClose(); // Close the modal after project submission
    } catch (err) {
      setError(`Failed to submit request ${err}`);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
        {loading ? <CircularProgress size={24} /> : 'Submit Request'}
      </Button>
    </form>
  );
}