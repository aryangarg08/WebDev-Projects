import React, { Component,useParams } from 'react'
import { getMovies } from './getMovies';
import Navbar from './Navbar';
import axios from 'axios' 
import {database} from '../firebase';
import './Movies.css'

export default class Movies extends Component {
    constructor()
    {
        super();
        this.state={
            movies:[],
            currSearchText:'',
            currPage:1,
            genres: [{ _id: 'abcd', name: 'All Genres' }],
            limit:4,
            cGenre: 'All Genres'
        }
    }
    async componentDidMount(){ 
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let temp = this.props.location.pathname.split('/')
        let uid = temp[temp.length-1];
        console.log("Component did mount");
        // const data = await database.users.where(uid, "==", uid).get()
        // console.log(data);
        const unsub = database.users.doc(uid).get().then((doc)=>{
            console.log(doc.data());
            let garr = [];
            let marr = doc.data().movies
            marr.forEach((movie)=>{
                garr.push({_id:movie.genre_ids[0],name:genreids[movie.genre_ids[0]]});
                movie['genre'] = genreids[movie.genre_ids[0]];
            })
            let fgarr = [];
            for(let key in garr){
                if(!fgarr[key])
                    fgarr[key]=garr[key];
            }
            this.setState({
                movies:marr,
                genres:[...this.state.genres,...fgarr]
            })
        })
    }
    handleChange=(e)=>{
        let val = e.target.value;
        console.log(val);
        this.setState({
            currSearchText:val
        });
    }
    onDelete =async (id)=>{
        let temp = this.props.location.pathname.split('/')
        let uid = temp[temp.length-1];
        let newarr = [];
        newarr = this.state.movies.filter((m)=>{
            return m.id!==id;
        })
        await database.users.doc(uid).update({
            movies:[...newarr]
        });
        this.setState({
            movies:newarr
        });
    }
    sortByRating = (e) => {
        let className = e.target.className;
        console.log(className);
        let sortedMovies = [];
        if(className === 'fa fa-sort-asc'){
            //ASCending
            sortedMovies = this.state.movies.sort(function(objA,objB){
                return objA.vote_average-objB.vote_average;
            })
        }
        else{
            sortedMovies = this.state.movies.sort(function(objA,objB){
                return objB.vote_average-objA.vote_average;
            })
        }
        this.setState({
            movies:sortedMovies
        })
    }
    sortByStock = (e) => {
        let className = e.target.className;
        console.log(className);
        let sortedMovies = [];
        if(className === 'fa fa-sort-asc'){
            //ASCending
            sortedMovies = this.state.movies.sort(function(objA,objB){
                return objA.popularity-objB.popularity;
            })
        }
        else{
            sortedMovies = this.state.movies.sort(function(objA,objB){
                return objB.popularity-objA.popularity;
            })
        }
        this.setState({
            movies:sortedMovies
        })
    }
    handlePageChange=(pageNumber)=>{
        this.setState({currPage:pageNumber})
    }
    handleChangeLimit=(e)=>{
        this.setState({limit:e.target.value})
    }
    handleGenreChange=(genre)=>{
        this.setState({
            cGenre:genre
        })
    }
    render() {
        // console.log(uid);
        console.log('render');
        let {movies,currSearchText,currPage,limit,genres,cGenre } =this.state; //ES6 destructuring
        let filteredArr = [];
        if(currSearchText==='')
        {
            filteredArr = movies;
        }
        else
        {
            filteredArr = movies.filter(function(movieObj) {
                let title = movieObj.original_title.toLowerCase();
                // console.log(title);
                return title.includes(currSearchText.toLowerCase());
            })
        }
        if(cGenre!='All Genres')
        {
            filteredArr = filteredArr.filter(function(movieObj){
                return movieObj.genre==cGenre
            })
        }
        let numberofPage = Math.ceil(filteredArr.length / limit);
        let pageNumberArr = [];
        for(let i=0;i<numberofPage;i++)
        {
            pageNumberArr.push(i+1);
        }
        let si = (currPage - 1)*limit;
        let ei = si + limit;
        filteredArr = filteredArr.slice(si,ei);
        // if(filteredArr.length==0){
        //     this.setState({
        //         currPage:1
        //     });
        // }
        console.log(filteredArr);
        console.log(this.state.genres);
        return (
            //JSX
            <>
            <Navbar/>
            <div className="main">
            {this.state.movies.length == 0 ? <div className="spinner-border text-primary load" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div> :
            <div className=''>
           <div className='row'>
               <div className='col-3'>
               <ul className="list-group">
                                 {
                                     genres.map((genreObj)=>(
                                         genreObj.name==this.state.cGenre ? 
                                         (
                                            <li onClick={()=>this.handleGenreChange(genreObj.name)} key={genreObj._id} className='list-group-item' style={{backgroundColor:'#3f51b5',color:'white',fontWeight:'bold'}}>
                                                {genreObj.name}
                                            </li>
                                         ) : 
                                         (
                                            <li onClick={()=>this.handleGenreChange(genreObj.name)} key={genreObj._id} className='list-group-item' style={{backgroundColor:'white',color:'#3f51b5',fontWeight:'normal'}}>
                                                {genreObj.name}
                                            </li>
                                         )
                                     ))
                                 }
                                </ul>
                                {/* <h5>Current Genre : {cGenre}</h5> */}
               </div>
               <div className='col-9'>
                    <input type='search' placeholder="Search" value={this.state.currSearchText} onChange={this.handleChange} ></input>
                    <input type='number' placeholder="Rows" value={this.state.limit} onChange={(e) => this.setState({limit:e.target.value})}></input>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">
                                <i onClick={this.sortByStock} class="fa fa-sort-asc" aria-hidden="true"></i>
                                Rating
                                <i onClick={this.sortByStock} class="fa fa-sort-desc" aria-hidden="true"></i></th>
                            <th scope="col">
                                <i onClick={this.sortByRating} class="fa fa-sort-asc" aria-hidden="true"></i>
                                Popularity
                                <i onClick={this.sortByRating} class="fa fa-sort-desc" aria-hidden="true"></i></th>
                            <th></th>
                            </tr>
                        </thead> 
                        <tbody>
                        {
                            filteredArr.map((movieObj)=>{
                                return(
                                    <tr key={movieObj._id} >
                                        <td></td>
                                        <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="img" alt="" /><strong>{movieObj.original_title}</strong></td>
                                        <td>{movieObj.genre}</td>
                                        <td>{movieObj.vote_average}</td>
                                        <td>{movieObj.popularity}</td>
                                        <td><button type="button" className="btn btn-danger" onClick={function(){
                                            this.onDelete(movieObj.id)
                                        }.bind(this)}>Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <nav aria-label="...">
                        <ul className="pagination">
                            {
                                pageNumberArr.map((pageNumber)=>{
                                    let classStyle = pageNumber===currPage?'page-item active':'page-item';
                                    return(
                                        <li key={pageNumber} onClick={()=>this.handlePageChange(pageNumber)} className={classStyle}><span className="page-link">{pageNumber}</span></li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
               </div>
           </div>
           </div>
    }
    </div>
    </>
        )
    }
}