"use client";

import { useState, useEffect } from 'react';
import { Typography, List, ListItem } from '@mui/material';
import Parse from 'parse';
import { Project, ProjectFile } from '@lib';

export const ProjectFiles = ({ project }: { project: Project }) => {
  const [files, setFiles] = useState<ProjectFile[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const query = new Parse.Query(ProjectFile);
      query.equalTo('project', project); 
      const results = await query.find();
      setFiles(results);
    };

    fetchFiles();
  }, [project]);

  return (
    <div>
      <Typography variant="h6">Files</Typography>
      <List>
        {files.map((file) => (
          <ListItem key={file.id}>
            <Typography variant="body1">
              {file.get('file').name()}
            </Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
}