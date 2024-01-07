import { TOGGLE_FAVORITE_FILM } from '../actions/favorite';

const initialState = {  favoritesFilm: [], loading: true };

export default (state = initialState, action) => {
  const { type, payload } = action;
  let nextState;
  switch (type) {
    case TOGGLE_FAVORITE_FILM:
      const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === payload.id)
      if (favoriteFilmIndex !== -1)
      {
        // On supprime le film des favories
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter((item, index) => index !== favoriteFilmIndex),
          loading: false
        }
      }
      else
      {
        // On ajoute le film des favories
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, payload],
          loading: false
        }
      }
      return nextState || state;
    default:
      return state;
  }
};
