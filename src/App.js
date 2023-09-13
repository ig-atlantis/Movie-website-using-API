import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';
import './App.css';
const API_URL = 'http://www.omdbapi.com?apikey=b4c49d8a';

function App(){

    const [movies, setMovies]=useState([]);
    const [searchTerm, setSearchTerm]=useState('');

    const searchMovies=async(title)=>{
        const response=await fetch(`${API_URL}&s=${title}`);
        const data=await response.json();
        setMovies(data.Search); //only want the search terms from the api
    }

    useEffect(()=>{
        searchMovies('Fast and Furious') //DEFAULT BATMAN MOVIES WILL BE FETCHED
    },[]);

    return(
        <div className="app">
            <h1>MovieHall</h1>

            <div className="search">
                <input 
                    placeholder="Search movies" 
                    value={searchTerm} 
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key==="Enter"){
                            searchMovies(searchTerm)
                        }
                    }}
                />
                <img src={SearchIcon} alt="search" onClick={()=>searchMovies(searchTerm)}/>
            </div>

            {movies?.length>0
                ?(
                    <div className="container">
                        {movies.map((props)=>(
                            <MovieCard props={props}/>
                        ))}
                    </div>
                )
                :(
                    <div className="empty">
                        <h2>No movies present.</h2>
                    </div>
                )
            }   
        </div>
    )
}

export default App