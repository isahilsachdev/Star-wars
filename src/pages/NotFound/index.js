import React from 'react';
import { useHistory } from 'react-router';
import './index.css';
// import
function NotFound() {
  const history = useHistory();
  const GoHome = () => {
    history.push('/');
  };
  return (
    <div className='not-found'>
      <button onClick={GoHome} className='back-button'>
        Return to home page
      </button>
    </div>
  );
}

export default NotFound;
