import React from 'react';
import './css/NotFound.css';
import trybetunesLogo from './images/trybetunesLogo.png';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="notfound-container">
        <div className="image-wrapper">
          <img src={ trybetunesLogo } alt="trybetunes-logo-v1" />
        </div>
        <div className="not-found-text-wrapper">
          <p className="alert1">Ops!</p>
          <p className="alert2">A página que você está procurando não foi encontrada.</p>
        </div>
      </div>
    );
  }
}

export default NotFound;
