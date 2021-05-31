import React, { useState, useEffect, useRef } from 'react';
import logo from './star-wars-logo.png';
import { GoSearch } from 'react-icons/go';
import axios from 'axios';
import { GiCancel } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import './index.css';

function HomePage() {
  const [name, setName] = useState('');
  const [matchResult, setMatchResult] = useState([]);
  const History = useHistory();
  const [cursor, setCursor] = useState(-1);
  const searchContainerRef = useRef(null);
  const searchResultRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    // initialize debounce function to search once user has stopped typing every half second
    inputRef.current = _.debounce(onSearchText, 500);
  }, []);

  const onSearchText = (name) => {
    setLoading(true);
    axios
      .get(`https://swapi.py4e.com/api/people?search=${name}`)
      .then((res) => {
        setMatchResult(res.data.results);
        setLoading((prev) => false);
      })
      .catch(() => {
        setErrorMsg('Something went wrong. Try again later.');
        setLoading(false);
      });
  };

  const handleInputChange = (event) => {
    const name = event.target.value;
    setName(name);
    inputRef.current(name);
  };

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
              onChange={handleInputChange}
              value={name}
              onKeyDown={(e) => keyboardNav(e)}
            />
            {name.length > 0 && (
              <div className='cancel-icon' onClick={() => setName('')}>
                <GiCancel />
              </div>
            )}
            {/* if user click search , it will fetch the details og the first matched user */}
            {loading ? (
              <div className='loader'></div>
            ) : (
              <div
                className='search-icon'
                onClick={() => HandlePerson(matchResult[0].url)}
              >
                <GoSearch />
              </div>
            )}
          </div>
          <hr color='black' />
          {errorMsg && <p>{errorMsg}</p>}
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
