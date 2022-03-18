import React from 'react';
import { Typography, Box, AppBar, Toolbar } from '@mui/material';

const Appbar = ({ totalSupply }) => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AsTok: An assest tokenization project
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Typography variant="h6" component="div">
              Total Supply {totalSupply} SCT
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;