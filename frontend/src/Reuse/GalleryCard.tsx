import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
})

function GalleryCard(props: any) {

  const classes = useStyles();

  const demoAPI = 'https://picsum.photos/seed/picsum/200/300';
    
  useEffect(() =>{
  
  }, []);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.thumbnailUrl}
            title={props._id}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props._id}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.logDocument.timestamp}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions> 
          <Button size="small" color="primary">
            Show more
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default GalleryCard;
