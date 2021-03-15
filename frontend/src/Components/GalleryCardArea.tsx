import React, { useState } from 'react';
import GalleryCard from '../Reuse/GalleryCard';
import { Typography, Paper, Switch } from '@material-ui/core';
import  { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Button, Col, Row } from 'react-bootstrap';
import Gallery from './Gallery';

function GalleryCardArea() {

    const [dark, setDark] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: dark ? 'dark': 'light',
    },
  });

  return (
      
    <ThemeProvider theme={theme}>
      <Paper style={{ height: '100vh', width: '100%' }}>
        <Row>
            <Col xs={11} sm={11} md={11} lg={11} xl={11} />
            <Col xs={1} sm={1} md={1} lg={1} xl={1}>
            <Switch checked={dark} onChange={ ()=> setDark(!dark) } /> 
            </Col>
        </Row>
        <GalleryCard />   
      </Paper>
    </ThemeProvider>
  );
}

export default GalleryCardArea;
