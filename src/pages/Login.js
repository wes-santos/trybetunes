import React from 'react';
import PropTypes from 'prop-types';
import './css/Login.css';
import trybetunesLogo from './images/trybetunesLogo.png';

class Login extends React.Component {
  render() {
    const { enableButton, onChange, onClick } = this.props;
    return (
      <div data-testid="page-login" className="page-login-wrapper">
        <div className="image-wrapper">
          <img src={ trybetunesLogo } alt="trybetunesLogoV1" />
        </div>
        <form className="login-form">
          <div className="input-login-wrapper">
            <label htmlFor="name-input">
              <input
                type="text"
                id="name-input"
                name="name-input"
                data-testid="login-name-input"
                placeholder="Nome"
                onChange={ onChange }
              />
            </label>
          </div>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ enableButton }
            onClick={ onClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  enableButton: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Login;
