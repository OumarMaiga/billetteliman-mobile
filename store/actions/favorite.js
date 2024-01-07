export const TOGGLE_FAVORITE_FILM = "TOGGLE_FAVORITE_FILM";

export const toggle_favorite_film = (film) => ({
    type: TOGGLE_FAVORITE_FILM,
    payload: film
});