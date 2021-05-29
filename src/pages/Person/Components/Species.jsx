import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
const Species = ({ species }) => {
  const [speciesData, setSpeciesData] = useState([]);

  // find info for species
  useEffect(() => {
    species &&
      axios.get(species[0]).then((res) => {
        setSpeciesData(res.data);
      });
  }, [species]);

  return (
    <div>
      {species?.length >= 1 ? <h1>Species</h1> : null}
      {species?.length >= 1 ? (
        <div
          style={{ backgroundImage: 'url(/Images/species.jpg)' }}
          className='film-box background-image '
        >
          <div className='head'>
            <h2>{speciesData.name}</h2>
          </div>
          <div className='content'>
            <div>
              <span>Class : </span>
              <p> {speciesData.classification}</p>
            </div>
            <div>
              <span>Role : </span>
              <p> {speciesData.designation}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Species;
