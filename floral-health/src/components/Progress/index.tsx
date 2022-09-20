import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Progress() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 30}}>
      <CircularProgress  size={40}
        thickness={4} value={100} color="success"/>
    </Box>
  );
}