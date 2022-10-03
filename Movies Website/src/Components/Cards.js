import React,{useState} from 'react';
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
    width:'30%',
    margin:'0.3%',
    height:400,
    "&:hover":{
      opacity:'0.8',
    }
  },
  media: {
    height: 400,
  },
  content:{
    backgroundColor:'#282c3400',
    maxHeight:'180px',
    marginTop:'-380px',
    color:'white',
    fontWeight:'bold',
    marginLeft:'2%',
    fontSize:'10px'
  },
  button:{
    display:'none',
    backgroundColor:'blue',
    color:'white',
    position:'relative',
    bottom:'-250px',
    left:'60px',
  }
});

export default function Cards({movie}) {
  const classes = useStyles();
  const [show,setShow] = useState(false);
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
    // <Card className={classes.root} >
    //   <CardActionArea>
    //     <CardMedia
    //       className={classes.media}
    //       image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
    //       title="Contemplative Reptile"
    //     />
    //     <CardContent className={classes.content}>
    //       <Typography gutterBottom variant="h5" component="h2">
    //         {movie.title}
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     // {show && <Button className={classes.button} size="small" color="primary">
    //     //   Add to Favorites
    //     // </Button>} 
    //   </CardActions>
    // </Card>
  )
}
