"use client";

import { useState, useEffect } from 'react';
import { Typography, List, ListItem, Button, Dialog, DialogContent } from '@mui/material';
import Parse from 'parse';
import { Project, ProjectFile } from '@lib';

export const ProjectFiles = ({ project }: { project: Project }) => {
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null); // For viewing files in a modal

  useEffect(() => {
    const fetchFiles = async () => {
      const query = new Parse.Query(ProjectFile);
      query.equalTo('project', project);
      const results = await query.find();
      setFiles(results);
    };

    fetchFiles();
  }, [project]);

  const openFile = (fileUrl: string) => {
    setSelectedFile(fileUrl);
  };

  const closeFile = () => {
    setSelectedFile(null);
  };

  const renderFileLink = (file: ProjectFile) => {
    const fileUrl = file.get('file').url();
    return (
      <ListItem key={file.id}>
        <Typography variant="body1">{file.get('name')}</Typography>
        <Button onClick={() => openFile(fileUrl)}>View</Button>
      </ListItem>
    );
  };

  // Categorize files by type
  const documents = files.filter((file) => file.get('fileType') === 'document');
  const media = files.filter((file) => file.get('fileType') === 'media');

  return (
    <div>
      {/* Render Documents Section only if there are documents */}
      {documents.length > 0 && (
        <>
          <Typography variant="h6">Documents</Typography>
          <List>
            {documents.map(renderFileLink)}
          </List>
        </>
      )}

      {/* Render Media Section only if there are media files */}
      {media.length > 0 && (
        <>
          <Typography variant="h6" className="mt-4">Media</Typography>
          <List>
            {media.map(renderFileLink)}
          </List>
        </>
      )}

      {/* Modal to view files */}
      <Dialog open={!!selectedFile} onClose={closeFile} maxWidth="lg" fullWidth>
        <DialogContent>
          {selectedFile && (
            <iframe src={selectedFile} width="100%" height="500px" title="File Preview" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};