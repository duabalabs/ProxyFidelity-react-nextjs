"use client";

import { useState, useEffect } from 'react';
import { Button, Typography, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SigninModal from '../app/auth/signin';
import ProjectRequestModal from '../app/auth/project-request';

export const LandingPage=()=> {
  const [openSignin, setOpenSignin] = useState(false);
  const [openProjectRequest, setOpenProjectRequest] = useState(false);

  const handleOpenSignin = () => setOpenSignin(true);
  const handleCloseSignin = (success?: boolean) => {
    setOpenSignin(false);
    if (success) {
      const user = Parse.User.current();
      if (user) {
        // router.push('/');
      }
    }
  }

  const handleOpenProjectRequest = () => setOpenProjectRequest(true);
  const handleCloseProjectRequest = () => setOpenProjectRequest(false);

  return (
    <div className="container mx-auto py-8">
    <Typography variant="h2" color="primary" gutterBottom>
     PAGE TO BE REFURNISHED
    </Typography>
      <Typography variant="h2" color="primary" gutterBottom>
        Welcome to ProxyFidelity Services
      </Typography>
      <Typography variant="body1" gutterBottom>
        We provide top-notch project management and project services for Africans in the diaspora and expatriates. 
        Manage your projects remotely with our secure platform.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="primary">Service 1</Typography>
              <Typography>Project Management</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="primary">Service 2</Typography>
              <Typography>Project Management</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="primary">Service 3</Typography>
              <Typography>Financial Monitoring</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="primary">Service 4</Typography>
              <Typography>Risk Management</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleOpenSignin}>
        Sign In
      </Button>
      <Button variant="outlined" color="primary" sx={{ mt: 4, ml: 2 }} onClick={handleOpenProjectRequest}>
        Request a Project
      </Button>

      {/* Sign In Modal */}
      <Dialog open={openSignin} onClose={handleCloseSignin}>
        <DialogTitle>
          Sign In
          <IconButton
            aria-label="close"
            onClick={handleCloseSignin}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <SigninModal onClose={handleCloseSignin} />
        </DialogContent>
      </Dialog>

      {/* Project Request Modal */}
      <Dialog open={openProjectRequest} onClose={handleCloseProjectRequest}>
        <DialogTitle>
          Request a Project
          <IconButton
            aria-label="close"
            onClick={handleCloseProjectRequest}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ProjectRequestModal onClose={handleCloseProjectRequest} />
        </DialogContent>
      </Dialog>
    </div>
  );
}