import React, { useState } from 'react';
import GalleryCard from '../Reuse/GalleryCard';
import { Typography, Paper, Switch, Grid, Container } from '@material-ui/core';
import  { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Button, Col, Row } from 'react-bootstrap';
import Gallery from './Gallery';
import { IGalleryQueryResult } from '../../../server/client-endpoints/src/type/client-server-type/type_gallery';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  galleryContainer: {
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '50px',
    paddingRight: '50px'
  },
})

function GalleryCardArea(props: any) {

  const [dark, setDark] = useState(false);
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      type: dark ? 'dark': 'light',
    },
  });

  const galleryData: IGalleryQueryResult[] = props.galleryData;

  return (      
    // <ThemeProvider theme={theme}>
    //   <Paper style={{ height: '100%', width: '100%' }}>
    //     <Row>
    //         <Col xs={11} sm={11} md={11} lg={11} xl={11} />
    //         <Col xs={1} sm={1} md={1} lg={1} xl={1}>
    //         <Switch checked={dark} onChange={ ()=> setDark(!dark) } /> 
    //         </Col>
    //     </Row>
    //     <Container>
          <Grid container spacing={5} className={classes.galleryContainer}>
            {galleryData.map(element => {
            const { _id, fullUrl, log_id, thumbnailUrl, logDocument } = element;
            return <GalleryCard _id={_id}
                                fullUrl={fullUrl}
                                log_id={log_id}
                                thumbnailUrl={thumbnailUrl}
                                logDocument={logDocument}/>
            })}  
            {/* <GalleryCard /> */}
          </Grid>
    //     </Container>
    //   </Paper>
    // </ThemeProvider>
  );
}

export default GalleryCardArea;
