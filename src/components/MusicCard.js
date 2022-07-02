import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loader: false,
    checked: false,
    favoriteSongs: [],
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    this.setState({ loader: true });
    const response = await getFavoriteSongs();
    this.setState({ loader: false, favoriteSongs: response });
  }

  removeTemporarySongFromState = (actualSong) => {
    const { favoriteSongs } = this.state;
    const filteredFavoriteSongs = favoriteSongs
      .filter((song) => song.trackId !== actualSong.trackId);
    this.setState({ favoriteSongs: filteredFavoriteSongs });
  }

  isTemporaryFavorited = (song) => {
    const { favoriteSongs } = this.state;
    if (favoriteSongs !== []) {
      return favoriteSongs.some((s) => (
        s.trackName === song.trackName
      ));
    }
  }

  addTemporarySong = (song) => {
    this.setState((prevState) => ({
      favoriteSongs: [...prevState.favoriteSongs, song] }));
  }

  handleChange = async () => {
    const { actualSong } = this.props;
    this.setState({ loader: true });
    console.log(this.isFavoritedSong(actualSong.trackName));
    if (this.isTemporaryFavorited(actualSong)) {
      await removeSong(actualSong); // remove do localStorage
      this.removeTemporarySongFromState(actualSong); // remove do estado
      this.setState({ loader: false, checked: false });
    } else {
      await addSong(actualSong);
      this.addTemporarySong(actualSong);
      this.setState({ loader: false, checked: true });
    }
  }

  isFavoritedSong = (otherSong) => {
    const { favoriteSongs } = this.state;
    return favoriteSongs.some((song) => (
      song.trackName === otherSong
    ));
  }

  listToRender = (trackName, trackId, previewUrl) => {
    const { checked } = this.state;
    if (checked || this.isFavoritedSong(trackName)) {
      return (
        <li>
          { trackName }
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            {`O seu navegador não suporta o elemento ${<code>audio</code>}.`}
          </audio>
          <label htmlFor={ trackId }>
            Favorita
            <input
              type="checkbox"
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleChange }
              defaultChecked
            />
          </label>
        </li>
      );
    }
    return (
      <li>
        { trackName }
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          {`O seu navegador não suporta o elemento ${<code>audio</code>}.`}
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleChange }
          />
        </label>
      </li>
    );
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loader } = this.state;
    return (
      <ul>
        {
          loader ? <Loading /> : this.listToRender(trackName, trackId, previewUrl)
        }
      </ul>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  actualSong: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
