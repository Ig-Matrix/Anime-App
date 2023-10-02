import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { MdOutlineSentimentDissatisfied } from "react-icons/md";

function App() {
   const [query, setQuery] = useState("");
   const [animes, setAnimes] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [errors, setErrors] = useState("");
   const [currentFetch, setCurrentFetch] = useState(null);

   useEffect(() => {
      // checks if there is any fetch timeout ongoing
      if (currentFetch) {
         clearTimeout(currentFetch); // clears or cancels that ongoing fetch
      }

      // creates a new fetch timeout
      let newFetch = setTimeout(() => {
         const baseUrl = `https://api.jikan.moe/v4/anime?q=`;
         setIsLoading(true);
         axios
            .get(`${baseUrl}${query}`)
            .then((res) => {
               setAnimes(res.data.data);
               setErrors("");
               setIsLoading(false);
            })
            .catch((error) => {
               console.log("Error:", error);
               setIsLoading(false);
               setErrors(
                  "Error fethching animes... check the browser console for more information"
               );
            });
      }, 1000); //delays the fetch operation by 1s and prevents the axios request incase the user pauses typing within 1s

      setCurrentFetch(newFetch); //assigns the new fetch timeout to the current fetch state
   }, [query]);

   const handleQueryChange = (searchText) => setQuery(searchText);
   return (
      <div className="App">
         <header>
            <h1>
               Anime<span>Dojo</span>
            </h1>
            <SearchBar changeQuery={handleQueryChange} />
         </header>
         <main>
            <div>
               {errors ? (
                  <h2 className="error">{errors}</h2>
               ) : isLoading ? (
                  <div className="load-wrapper">
                     <div className="spinner"></div>
                  </div>
               ) : (
                  <>
                     {animes.length > 0 ? (
                        <div className="anime-list">
                           {animes.map((anime) => (
                              <div className="anime-cont" key={anime.mal_id}>
                                 <img
                                    src={anime.images.jpg.image_url}
                                    alt="anime"
                                 />
                                 <h3>{anime.title} </h3>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <div className="no-anime">
                           <MdOutlineSentimentDissatisfied />
                           <h3>Sorry, no animes match your search.</h3>
                        </div>
                     )}
                  </>
               )}
            </div>
         </main>
      </div>
   );
}

export default App;
