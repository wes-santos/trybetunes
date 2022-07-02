import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import trybetunesLogoV2 from './images/trybetunesLogoV2.png';
import './css/Header.css';

class Header extends React.Component {
  state = {
    getUserResponse: '',
    loading: false,
  }

  async componentDidMount() {
    this.setState({ loading: true });
    this.response = await getUser();
    this.setState({ getUserResponse: this.response, loading: false });
  }

  render() {
    const { getUserResponse, loading } = this.state;
    return (
      <header data-testid="header-component" className="header-container">
        <div data-testid="header-user-name" className="user-wrapper">
          <img src={ trybetunesLogoV2 } alt="trybetunes-logo" />
          <span className="user-name">
            {loading ? <Loading /> : getUserResponse.name}
          </span>
        </div>
        <div className="nav-header-menu">
          <span className="search-header">
            <Link to="/search" data-testid="link-to-search">
              Pesquisar
            </Link>
          </span>
          <span>
            <Link to="/favorites" data-testid="link-to-favorites">
              Favoritos
            </Link>
          </span>
          <span>
            <Link to="/profile" data-testid="link-to-profile">
              Perfil
            </Link>
          </span>
        </div>
      </header>
    );
  }
}

export default Header;
