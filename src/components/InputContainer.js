import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Refresh from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import Snackbar from '@mui/material/Snackbar';
import { shadows } from '@mui/system';

export default function InputContainer(props) {

    const [textInput, setTextInput] = useState("");
    const handleInputChange = (event) => {
        setTextInput(event.target.value);
      };
  return (
    <Box
    sx={{
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      display: "flex",
      color: "white",
      width:"100%"
    }}

  >

      <b style={{margin:10}}>Type something below and tap on the mint button to let our AI generate a NFT for you</b>
    
    <TextField
      id="filled-basic"
      label="Type something..."
      variant="filled"
      className="margin10 marginTop20"
      value={textInput}
      InputProps={{
        disableUnderline: true,
      }}
      sx={{ width: "90%", boxShadow: 3 }}
      onChange={(event)=>handleInputChange(event)}
    />
    <Box display="flex">
      <Button
        variant="contained"
        className="margin10 "
        sx={{  bgcolor: "black", color: "white"}}
        onClick={()=>props.onGenerateBtnClicked(textInput)}
      >
        Generate & Mint NFT
      </Button>
     
    </Box>
   
   
  </Box>
  )
}
