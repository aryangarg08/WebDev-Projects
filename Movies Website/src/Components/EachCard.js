import React,{useState,useEffect,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from '../Context/AuthProvider';
import {database} from '../firebase';
const useStyles = makeStyles({
    root: {
      width:'22%',
      margin:'0.3%',
      height:400,
      position:'relative',
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
      backgroundColor:'blue',
      color:'white',
      position:'absolute',
      bottom:'1rem',
      left:'5rem',
      "&:hover":{
          backgroundColor:'blue',
      }
    }
  });

export default function EachCard({movie,userData}) {

  const classes = useStyles();
  const [show,setShow] = useState(false);
  const [selected,setSelected] = useState(false);
  useEffect(()=>{
    let movies = userData?.movies;
    // console.log(movies);
      if(movies?.length>0){
          let flag=false;
          movies.forEach((m=>{
              if(m.id==movie.id){flag=true}
          }))
        setSelected(flag);
      }
  },[userData]);
  const handleClick = async() => {
    if(!selected){
        await database.users.doc(userData.userId).update({
            movies:[...userData.movies,movie]
        })
    }
    else{
        let newarr = [];
        newarr = userData.movies.filter((m)=>{
            // console.log(m+" "+movie);
            return m.id!==movie.id;
        })
        // console.log(newarr);
        await database.users.doc(userData.userId).update({
            movies:[...newarr]
        });
    }
    setSelected(!selected)
  }
  return (
    <Card className={classes.root} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {show &&
        <Button className={classes.button} size="small" color="primary" onClick={handleClick}>
          {selected?"Remove from Favourites":"Add to Favourites"}
        </Button>
        }
      </CardActions>
    </Card>
  );
}
