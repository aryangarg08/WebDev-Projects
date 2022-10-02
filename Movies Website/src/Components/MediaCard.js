import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    width:'100%',
    height:'45%',
    marginBottom:'15px',
  },
  media: {
    height: 450,
    backgroundSize: 'center'
  },
  content:{
    backgroundColor:'#282c3400',
    maxHeight:'180px',
    marginTop:'-180px',
    color:'white',
    fontWeight:'bold',
    marginLeft:'10%',
    marginRight:'10%',
    fontSize:'10px'
  },
  overview:{

  }
});

export default function MediaCard({movie}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom style={{fontSize:'45px',fontWeight:'bold'}}>
            {movie.title}
          </Typography>
          <Typography className={classes.overview} style={{fontSize:'15px'}}>
            {movie.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
