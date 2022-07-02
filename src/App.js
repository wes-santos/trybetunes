import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';
import { createUser } from './services/userAPI';
import searchAlbumsAPI from './services/searchAlbumsAPI';

const MIN_CHARACTERS = 3;

class App extends React.Component {
  state = {
    disableButton: true,
    user: '',
    activateLoader: false,
    redirect: false,
    albums: [],
    disableSearchButton: true,
    searchInputValue: '',
    searchLoading: false,
    artistName: '',
    showAlbums: false,
  }

  validateButton = ({ target: { value } }) => (
    value.length >= MIN_CHARACTERS
      ? this.setState({ disableButton: false, user: value })
      : this.setState({ disableButton: true })
  );

  saveUser = async (event) => {
    event.preventDefault();
    const { user } = this.state;
    this.setState({ activateLoader: true });
    await createUser({ name: user });
    this.setState({ activateLoader: false, redirect: true });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { searchInputValue } = this.state;
    this.setState({ searchLoading: true });
    const response = await searchAlbumsAPI(searchInputValue);
    this.setState((prevState) => ({
      searchInputValue: '',
      searchLoading: false,
      artistName: prevState.searchInputValue,
      albums: response,
      showAlbums: true,
    }));
  }

  handleChange = ({ target: { value } }) => (
    value.length >= 2
      ? this.setState({ disableSearchButton: false, searchInputValue: value })
      : this.setState({ disableSearchButton: true, searchInputValue: value })
  )

  render() {
    const {
      disableButton,
      activateLoader,
      redirect,
      albums,
      searchInputValue,
      searchLoading,
      artistName,
      showAlbums,
      disableSearchButton,
    } = this.state;
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/">
            { activateLoader ? <Loading /> : <Login
              enableButton={ disableButton }
              onChange={ this.validateButton }
              onClick={ this.saveUser }
            />}
            { redirect && <Redirect to="/search" />}
          </Route>
          <Route path="/search">
            <Search
              onClick={ this.handleClick }
              onChange={ this.handleChange }
              searchInputValue={ searchInputValue }
              searchLoading={ searchLoading }
              disableSearchButton={ disableSearchButton }
              showAlbums={ showAlbums }
              artistName={ artistName }
              albums={ albums }
              storage={ this.findSelectedAlbum }
            />
          </Route>
          <Route
            path="/album/:id"
            component={ (props) => (
              <Album
                match={ props.match }
              />
            ) }
          />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
