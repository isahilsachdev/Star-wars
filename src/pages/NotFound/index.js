import React from 'react';
import { useHistory } from 'react-router';
import './index.css';
import { TiHome } from 'react-icons/ti';
function NotFound() {
  const history = useHistory();

  // to redirect user back to home page
  return (
    <div className='not-found'>
      <div className='logo-home'>
        <TiHome onClick={() => history.push('/')} />
      </div>
    </div>
  );
}

export default NotFound;
