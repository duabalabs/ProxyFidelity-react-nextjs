"use client";

import { useRouter } from 'next/navigation';

import { Button, CircularProgress, Card, CardContent, Typography } from '@mui/material';
import { useAppData } from '@lib';
import { Dashboard, LandingPage } from '@components';

export default function HomePage() {
  const { user, initialLoad, isInitialLoadTimeout, handlePageRefresh } = useAppData(); 
  const router = useRouter();
  
  if (initialLoad && !isInitialLoadTimeout) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (isInitialLoadTimeout) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Unable to load in time
            </Typography>
            <Button variant="contained" color="primary" fullWidth onClick={handlePageRefresh}>
              Refresh Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return user? <Dashboard /> : <LandingPage />;
}