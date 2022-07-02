import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    artistName: '',
    albumName: '',
    tracks: [],
  }

  // Consultei o PR e a branch da Byanca Knorst para solucionar este requisito,
  // pois não estava conseguindo encontrar a solução sozinho. Após ver o código,
  // consegui compreenderonde estava errando e corrigir meu erro, aprendendo
  // com ele. Link da branch:
  // https://github.com/tryber/sd-018-b-project-trybetunes/blob/byanca-knorst-trybetunes/src/pages/Album.js
  // Também consultei o MDN para compreender melhor o slice:
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const response = await getMusics(id);
    this.setState({
      artistName: response[0].artistName,
      albumName: response[0].collectionName,
      tracks: response.slice(1),
    });
  }

  render() {
    const { artistName, albumName, tracks } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{albumName}</p>
        {tracks.map((obj) => (
          <MusicCard
            key={ obj.trackId }
            trackName={ obj.trackName }
            previewUrl={ obj.previewUrl }
            trackId={ obj.trackId }
            actualSong={ obj }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
