"use client";

import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export const ListCard = ({ title, description, link }) =>{
  const router = useRouter();

  return (
    <Card elevation={3}>
      <CardActionArea onClick={() => router.push(link)}>
        <CardContent>
          <Typography variant="h6" color="primary">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}