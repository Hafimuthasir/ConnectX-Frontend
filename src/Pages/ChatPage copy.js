import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SimpleBottomNavigation from '../components/BtAppbar/BtAppBar';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
// import type {} from "@mui/lab/themeAugmentation";
import { createTheme } from "@mui/material/styles";

import { ThemeProvider } from '@mui/material/styles';

export default function FixedContainer() {

  
  
  const theme = createTheme({
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "*::-webkit-scrollbar": {
            width: "5px"
          },
          "*::-webkit-scrollbar-track": {
            background: "black"
          },
          "*::-webkit-scrollbar-thumb": {
            background: "red",
            borderRadius: "2px"
          }
        }
      }
    }
  });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <React.Fragment>
      <CssBaseline />
      
      <Container sx={{pt:1,}} >

      
        <Box sx={{ bgcolor: '#5e5e5e',ml:-2,mr:-2, height: '85vh',borderRadius:2 }}>
            <Box sx={{bgcolor:'#383838',height:"12vh",width:"45vh",}}></Box>
            <ThemeProvider theme={theme}>

        <Box sx={{ bgcolor: '#252626',width:"45vh",height:"73vh",overflowY:"scroll"}} >
        
        <Grid container-fluid >
        <Grid  xs={12}>
          <Item sx={{height:"50px",borderRadius:0,bgcolor:"grey", borderBottom: 1 }}>1</Item>
        </Grid>
        <Grid xs={12}>
          <Item sx={{height:"50px",borderRadius:0,bgcolor:"grey", borderBottom: 1 }}>2</Item>
        </Grid>
        <Grid xs={12}>
          <Item sx={{height:"50px",borderRadius:0,bgcolor:"grey",borderBottom: 1 }}>3</Item>
        </Grid>
        <Grid xs={12}>
          <Item sx={{height:"50px",borderRadius:0,bgcolor:"grey",borderBottom: 1 }}>4</Item>
        </Grid>
        <Grid xs={12}>
          <Item sx={{height:"50px",borderRadius:0,bgcolor:"grey",borderBottom: 1 }}>4</Item>
        </Grid>
        <Grid xs={12}>
          <Item sx={{height:"50px",borderRadius:0,bgcolor:"grey",borderBottom: 1 }}>4</Item>
        </Grid>
        <Grid xs={12}>
          <Item sx={{height:"50px",borderRadius:0,bgcolor:"grey",borderBottom: 1 }}>4</Item>
        </Grid>
        <Grid xs={12}>
          <Item sx={{height:"50px",borderRadius:0,bgcolor:"grey",borderBottom: 1 }}>4</Item>
        </Grid>
      </Grid>

            </Box>
            </ThemeProvider>

        </Box>
      </Container>
      
      <SimpleBottomNavigation/>
    </React.Fragment>
  );
}