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
    <div className='background-image'>
      {movies.length ? <h1 className='text-shadow'>Movies</h1> : null}
      <div className='box-container-row'>
        {movies?.map((film, i) => (
          <div
            key={i}
            style={{ backgroundImage: 'url(/Images/movie.jpg)' }}
            className='box-container background-image '
          >
            <div className='box-head'>
              <h2>{film.title}</h2>
            </div>
            <div className='box-content'>
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
