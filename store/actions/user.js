export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UPDATE = "UPDATE";

export const login = (user) => ({
    type: LOGIN,
    payload: user
});

export const logout = () => ({
    type: LOGOUT
});

export const update = (user) => ({
    type: UPDATE,
    payload: user
});