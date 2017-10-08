import axios from "axios";


const BASE_URL = "http://localhost:5000/"

//var AXIOS_CONFIG = { headers: { 'Authorization': '' } }

export function addBook(dispatch, book) {

    dispatch({
        type: "ADD_BOOK_STARTED"
    })

    axios.post(BASE_URL + "api/", {
        username: user.username,
        password: user.password
    }, )
        .then((response) => {
            //Set the header to be used for future authentication
            AXIOS_CONFIG.headers.Authorization = response.data.id
            dispatch({ type: "LOGIN_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "LOGIN_FAILED", payload: err })
        })
}