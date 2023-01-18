import { Box } from '@mui/material';
import './App.css';
import { Posts } from './Components/Posts';

function App() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Posts />
    </Box>
  );
}

export default App;
