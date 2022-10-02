import React, { useEffect,useState,useContext} from 'react';
import axios from 'axios';
import MediaCard from './MediaCard';
import All from './All';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import EachCard from './EachCard';
import { AuthContext } from '../Context/AuthProvider';
import {database} from '../firebase';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
    root: {

        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: '90%',
        height: '30%',
    },
    cardContainer:{
        display:'flex',
        flexWrap:'wrap',
        padding:'0%',
        alignItems:'center',
        justifyContent:'center'
    }

}));

function Home() {
    const classes = useStyles();
    const {currentUser} = useContext(AuthContext); 
    const [info,setInfo] = useState({
        cpage:1,
        tpage:100,
        movies:[]
    }); 
    const [userData,setUserData] = useState(null);
    useEffect(()=>{
        let el = document.querySelector('.loader');
        observer.observe(el);
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc)=>{
            setUserData(doc.data());
        })
        return ()=>{
            observer.disconnect();
            // unsub();
        }
    },[])

    const callback = (entries, observer)=>{     
        // console.log(entries);
        entries.forEach(entry => {
            if(entry.isIntersecting && info.cpage<info.tpage){
           axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${info.cpage}`)
           .then(res=>{
               console.log(res.data);
            //    let newobj= {...info,cpage:newpage,movies:[...info.movies,...res?.data?.results]};
               setInfo(prev=>{return {...prev,cpage:prev.cpage+1,movies:[...prev.movies,...res.data.results]}})
            //    setInfo(newobj);
           })
        }
          });
    }
    let observer = new IntersectionObserver(callback, {
        threshold: 1.0
    });
    const showList = (movies) => {
        return (
            <div className={classes.root}>
              <ImageList rowHeight={400} className={classes.imageList} cols={12}>
                {movies.map((movie,index) => (
                    index!=0 &&
                  <ImageListItem key={index} cols={4}>
                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
        );
    }
    return (
        <div>
            <>
            <Navbar uid={currentUser.uid}/>
                <div className="movieContainer">
                    {info?.movies?.length>0 && <MediaCard movie={info.movies[0]}/>}
                    <h1 style={{marginLeft:'5%'}}>Trending</h1>
                    {/* {info?.movies?.length>0 && <All movies={info.movies.slice(1)}/>} */}
                    {/* {info?.movies?.length>0 && showList(info.movies)}    */}
                    <div className={classes.cardContainer}>
                        {info?.movies?.map((movie,index)=>(
                            index!=0 && 
                            <EachCard movie={movie} userData={userData}/>    
                        ))}
                    </div>
                </div>
                <div className="loader">
                    <h1>{info.cpage<info.tpage?'Loading More Images':'No more Images to display'}</h1>
                </div>
            </>
        </div>
    )
}

export default Home
