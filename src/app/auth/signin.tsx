"use client";

import {  useState } from 'react';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useAppData } from '@lib';

export default function SigninModal({ onClose }: { onClose: (success?: boolean) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAppData(); 

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      setLoading(false);
      onClose(true); // Close the modal after sign-in
    } catch (err) {
      setError(`Invalid login credentials ${err}`);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        type="password"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
        {loading ? <CircularProgress size={24} /> : 'Sign In'}
      </Button>
    </form>
  );
}