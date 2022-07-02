import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
// import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  // state = {
  //   searchInputValue: '',
  //   disableButton: true,
  //   loading: false,
  //   showAlbums: false,
  //   artistName: '',
  //   albums: [],
  // }

  // handleKeyUp = ({ target: { value } }) => (
  //   value.length >= 2
  //     ? this.setState({ disableButton: false, searchInputValue: value })
  //     : this.setState({ disableButton: true, searchInputValue: value })
  // )

  // handleClick = () => {
  // event.preventDefault();
  // const {
  //   searchInputValue } = this.props;
  // this.setState({ loading: true });
  // const response = await searchAlbumsAPI(searchInputValue)
   responsed = (albums) => (
     albums.map((album) => (
       <div key={ album.collectionId }>
         <Link
           to={ `/album/${album.collectionId}` }
           data-testid={ `link-to-album-${album.collectionId}` }
         >
           {album.collectionName}
         </Link>
       </div>
     )));
   // this.setState((prevState) => ({
   //   searchInputValue: '',
   //   loading: false,
   //   artistName: prevState.searchInputValue,
   //   showAlbums: true,
   //   albums: response,
   // }));
   // }

   render() {
     const {
       onClick,
       onChange,
       searchInputValue,
       searchLoading,
       disableSearchButton,
       showAlbums,
       artistName,
       albums,
     } = this.props;
     return (
       <div data-testid="page-search">
         <Header />
         <div>
           <form>
             {
               searchLoading
                 ? <Loading />
                 : (
                   <div>
                     <label htmlFor="search-artist">
                       <input
                         type="text"
                         id="search-artist"
                         data-testid="search-artist-input"
                         placeholder="Nome do Artista"
                         onChange={ onChange }
                         value={ searchInputValue }
                       />
                     </label>
                     <button
                       type="submit"
                       data-testid="search-artist-button"
                       disabled={ disableSearchButton }
                       onClick={ onClick }
                     >
                       Pesquisar
                     </button>
                   </div>
                 )
             }
           </form>
           <p>
             {
               (
                 showAlbums && `
              Resultado de álbuns de:
              ${artistName}`
               )
             }
           </p>
           <section>
             { showAlbums
            && this.responsed(albums)}
             { albums.length > 0 ? '' : <p>Nenhum álbum foi encontrado</p> }
           </section>
         </div>
       </div>
     );
   }
}

Search.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  searchInputValue: PropTypes.string.isRequired,
  searchLoading: PropTypes.bool.isRequired,
  artistName: PropTypes.string.isRequired,
  showAlbums: PropTypes.bool.isRequired,
  disableSearchButton: PropTypes.bool.isRequired,
};

export default Search;
