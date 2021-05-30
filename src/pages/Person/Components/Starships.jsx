import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../index.css';
const Starships = ({ starships }) => {
  const [starshipsData, setStarshipsData] = useState([]);

  // find info for all starships
  useEffect(() => {
    async function fetchAll() {
      setStarshipsData(
        await Promise.all(
          starships?.map((url) => axios.get(url).then((r) => r.data))
        )
      );
    }
    starships && fetchAll();
  }, [starships]);

  return (
    <div className='background-image'>
      {starshipsData.length ? <h1 className='text-shadow'>Starships</h1> : null}
      <div className='box-container-row'>
        {starshipsData?.map((startship, i) => (
          <div
            key={i}
            style={{ backgroundImage: 'url(/Images/ship.jpg)' }}
            className='box-container background-image'
          >
            <div className='box-head'>
              <h2>{startship.name}</h2>
            </div>
            <div className='box-content'>
              <div>
                <span>Model :</span>
                <p>{startship.model}</p>
              </div>

              <div>
                <span>Creator : </span>
                <p>{startship.manufacturer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Starships;
