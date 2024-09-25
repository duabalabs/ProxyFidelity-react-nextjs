import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ADD8E6',  // Light blue color for the company's theme
    },
    secondary: {
      main: '#ffffff',  // White for contrast
    },
  },
  shape: {
    borderRadius: 12,  // Rounded edges for all components
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',  // Remove uppercase text on buttons
          boxShadow: 'none',
          padding: '12px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,  // More rounded edges for cards
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',  // Soft shadow
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',  // Shadow on hover
          },
        },
      },
    },
  },
});

export default theme;