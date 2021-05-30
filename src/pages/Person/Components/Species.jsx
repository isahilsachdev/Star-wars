import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
const Species = ({ species }) => {
  const [speciesData, setSpeciesData] = useState([]);
  const [flag, setFlag] = useState(false);

  // find info for species
  useEffect(() => {
    species &&
      axios.get(species[0]).then((res) => {
        setSpeciesData(res.data);
        setFlag(true);
      });
  }, [species]);
  return (
    <div>
      {flag ? <h1 className='text-shadow'>Species</h1> : null}
      {flag ? (
        <div
          style={{ backgroundImage: 'url(/Images/species.jpg)' }}
          className='box-container background-image '
        >
          <div className='box-head'>
            <h2>{speciesData.name}</h2>
          </div>
          <div className='box-content'>
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
