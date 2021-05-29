import React, { useEffect, useState } from 'react';
import './index.css';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Films from './Components/Films';
import Species from './Components/Species';
import Vehicles from './Components/Vehicles';
import Starships from './Components/Starships';

function Person() {
  const root_url = 'https://swapi.py4e.com/api';
  const { id } = useParams();
  const [user, setUser] = useState('');
  const history = useHistory();

  // some random star wars images to keep changinf background everytime
  const images = [
    's1.jpg',
    's4.jpg',
    's3.jpg',
    's5.jpg',
    's6.jpg',
    's7.jpg',
    's8.jpg',
    's9.jpg',
  ];
  const randomImage = Math.floor(Math.random() * images.length);

  // if desired character id is more than the total id we will redirect user to not found page
  if (id >= 89) {
    history.push('/err');
  }

  // else find specific character
  useEffect(() => {
    axios.get(`${root_url}/people/${id}`).then((res) => {
      setUser((user) => res.data);
    });
  }, [id]);

  return (
    <div
      className='person'
      style={{ backgroundImage: `url(/Images/${images[randomImage]})` }}
    >
      <h1 className='person-name'>{user.name}</h1>

      <Films {...user} />
      <Species {...user} />
      <Vehicles {...user} />
      <Starships {...user} />
    </div>
  );
}

export default Person;
