import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../index.css';
const Films = ({ films }) => {
  const [movies, setMovies] = useState([]);

  // find all the movies of the character

  useEffect(() => {
    async function fetchAll() {
      setMovies(
        await Promise.all(
          films?.map((url) => axios.get(url).then((res) => res.data))
        )
      );
    }
    films && fetchAll();
  }, [films]);

  return (
    <div>
      {movies.length ? <h1>Movies</h1> : null}
      <div className='films-container'>
        {movies?.map((film, i) => (
          <div key={i} className='film-box'>
            <div className='head'>
              <h2>{film.title}</h2>
            </div>
            <div className='content'>
              <div>
                <span>Director :</span>
                <p>{film.director}</p>
              </div>

              <div>
                <span>Release :</span>
                <p>{film.release_date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Films;
