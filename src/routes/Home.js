import React from "react";
import axios from "axios";
import Movies from "../components/Movie";
import "./Home.css";

class Home extends React.Component{
  state = {
    isLoding : true,
    movies : true
  };
  getMovie = async() => {
    const {data : { data : {movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({movies, isLoding:false})
  };
  componentDidMount(){
   this.getMovie();
  }
  render() {
     const {isLoding, movies} = this.state;
     return (
     <section className="container">
       {isLoding ? ( 
        <div className="loader">
         <span className="loader_text">Loading...</span>
       </div>
       ) : (
         <div className="movies">
           {movies.map( movie => (
            <Movies 
              key={movie.id} 
              id={movie.id} 
              year={movie.year} 
              title={movie.title} 
              summary={movie.summary} 
              poster={movie.medium_cover_image}
              genres={movie.genres}
            />
           ))}
        </div>
       )}
      </section>
     );
  }
}

export default Home;