import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function MainBar(props) {
  
  return (
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ flexGrow: 1, justifyContent: "space-between" }}>
   
          <Typography variant="h6" component="div" sx={{fontWeight:"bold"}}>
            SURREALISTIC
          </Typography>
          <Button color="inherit" variant="outlined" onClick={()=>props.onConnectBtnClick()}>{props.status}</Button>
        </Toolbar>
      </AppBar>
    </Box>  )
}
