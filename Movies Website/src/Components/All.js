import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
// import itemData from './itemData';

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
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
//  const itemData = [
//        {
//          img: image,
//          title: 'Image',
//          author: 'author',
//          cols: 2,
//        },
//        {
//          [etc...]
//        },
//      ];

export default function All({movies}) {
  const classes = useStyles();
  console.log(movies);
  return (
    <div className={classes.root}>
      <ImageList rowHeight={400} className={classes.imageList} cols={12}>
        {movies.map((movie) => (
          <ImageListItem key={movie.id} cols={4}>
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
