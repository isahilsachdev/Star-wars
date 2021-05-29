import React, { useState, useEffect, useRef } from 'react';
import logo from './star-wars-logo.png';
import { GoSearch } from 'react-icons/go';
import axios from 'axios';
import { GiCancel } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';
import './index.css';

function HomePage() {
  const [name, setName] = useState('');
  const [matchResult, setMatchResult] = useState([]);
  const History = useHistory();
  const [cursor, setCursor] = useState(-1);
  const searchContainerRef = useRef(null);
  const searchResultRef = useRef(null);

  // to search as user writes
  useEffect(() => {
    if (name !== '') {
      axios
        .get(`https://swapi.py4e.com/api/people?search=${name}`)
        .then((res) => {
          setMatchResult(res.data.results);
        });
    } else {
      setMatchResult([]);
    }
  }, [name]);

  // to redirect to the individual person
  const HandlePerson = (url) => {
    url = url.split('/');
    let id = url[url.length - 2];
    History.push(`/person/${id}`);
  };

  // for navigation with keyboard
  const keyboardNav = (e) => {
    if (e.key === 'ArrowDown') {
      setCursor((c) => (c < matchResult.length - 1 ? c + 1 : c));
    }
    if (e.key === 'ArrowUp') {
      setCursor((c) => (c > 0 ? c - 1 : 0));
    }
    if (e.key === 'Enter' && cursor >= 0) {
      HandlePerson(matchResult[cursor].url);
    }
  };

  const scrollView = (position) => {
    searchResultRef.current.parentNode.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  };

  // to maintain the scroll as user navigate down the list
  useEffect(() => {
    let listItems = Array.from(searchResultRef.current.children);
    if (cursor <= 1 || cursor > matchResult.length || !searchResultRef) {
      return () => {};
    } else if (cursor < 5 && cursor !== 4) {
      listItems[cursor] && scrollView(0);
    } else if (cursor % 4 === 0) {
      listItems[cursor] && scrollView(listItems[cursor].offsetTop);
    }
  }, [cursor]);

  return (
    <div className='home-main'>
      <div className='logo'>
        <img src={logo} alt='Star Wars Logo' />
      </div>
      <div>
        <div className='search-input-component' ref={searchContainerRef}>
          <div className='search-input-box'>
            <input
              placeholder='Search by name'
              onChange={(e) => setName(e.target.value)}
              value={name}
              onKeyDown={(e) => keyboardNav(e)}
            />
            {name.length > 0 && (
              <div className='cancel-icon' onClick={() => setName('')}>
                <GiCancel />
              </div>
            )}
            {/* if user click search , it will fetch the details og the first matched user */}
            <div
              className='search-icon'
              onClick={() => HandlePerson(matchResult[0].url)}
            >
              <GoSearch />
            </div>
          </div>
          <hr color='black' />
          <div className='autocomplete-box' ref={searchResultRef}>
            {matchResult.map((user, i) => (
              <div
                className={`searched-user ${
                  i === cursor ? 'activeHighlight' : ''
                } `}
                key={i}
                onClick={() => HandlePerson(user.url)}
              >
                <div>
                  <h5>{user.name}</h5>
                  <h6>{user.gender}</h6>
                </div>
                <p>{user.birth_year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
