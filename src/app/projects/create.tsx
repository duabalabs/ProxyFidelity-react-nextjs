import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import Parse from 'parse';
import { useAppData } from '@lib';

export const CreateProjectPage = () => {
  const { user, initialLoad } =  useAppData();
  const router = useRouter();
  
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName) {
      setError('Project name is required');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const Project = Parse.Object.extend('Project');
      const project = new Project();
      
      project.set('name', projectName);
      project.set('description', projectDescription);
      project.set('managerId', user?.id); // Assign the manager (current user) to the project

      await project.save();

      setLoading(false);
      router.push('/projects'); // Redirect to projects list after creation
    } catch (err) {
      setError('Failed to create project');
      setLoading(false);
    }
  };

  if (initialLoad) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom>
            Create a New Project
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Project Description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />

            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
              {loading ? 'Creating Project...' : 'Create Project'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
