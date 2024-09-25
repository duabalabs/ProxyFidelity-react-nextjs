import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, CircularProgress, List, ListItem, ListItemText, Button } from '@mui/material';
import Parse from 'parse';

export default function ProjectsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [projects, setProjects] = useState<Parse.Object[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const Project = Parse.Object.extend('Project');
      const query = new Parse.Query(Project);
      query.equalTo('contractUserId', 'your-user-id'); // Use actual user ID
      const results = await query.find();
      setProjects(results);
      setLoading(false);
    };

    if (isMounted) {
      fetchProjects();
    }
  }, [isMounted]);

  if (!isMounted || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Typography variant="h4" gutterBottom>
        Select a Project
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ mb: 4 }} 
        onClick={() => router.push('/projects/create')}
      >
        Create New Project
      </Button>
      {projects.length === 0 ? (
        <Typography>No projects found</Typography>
      ) : (
        <List>
          {projects.map((project) => (
            <ListItem button key={project.id} onClick={() => router.push(`/projects/${project.id}`)}>
              <ListItemText primary={project.get('name')} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}