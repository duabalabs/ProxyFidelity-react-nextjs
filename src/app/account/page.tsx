"use client";

import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useAppData } from '@lib';

export default function AccountPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const {  user } = useAppData();

  const handleUpdate = async () => {
    if(!user) {
      return
    }
    if (name) user.username = name;
    if (password) user.password = password;

    try {
      await user.save();
      alert('Account updated successfully!');
    } catch (error) {
      console.error('Error while updating account:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update Account
      </Button>
    </div>
  );
}