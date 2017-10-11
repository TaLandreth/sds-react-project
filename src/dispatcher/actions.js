import axios from "axios";

const BASE_URL = "http://localhost:5000/api/tanya_project"

//RETRIEVE
export function getTheBooks(dispatch) {

    dispatch({
        type: "GET_BOOKS_STARTED"
    })

    axios.get(BASE_URL)
        .then((response) => {
            //Set the header to be used for future authentication
            console.log(response.data)
            dispatch({ type: "GET_BOOKS_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}


//ADD
export function addABook(dispatch, newBook) {

    console.log("actions - ")
    console.log(newBook)

    dispatch({
        type: "ADD_BOOK_STARTED"
    })
    axios.post(BASE_URL, newBook)
        .then((response) => {
            console.log(response.data)
            dispatch({ type: "ADD_BOOK_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}


//DELETE
export function deleteBook(dispatch, book) {

    dispatch({
        type: "DELETE_BOOK_STARTED"
    })

    axios.delete(BASE_URL + "/" + book.id)
        .then((response) => {
            //Set the header to be used for future authentication
            dispatch({ type: "DELETE_BOOK_FINISHED", payload: book })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}

//EDIT
export function editBook(dispatch, book) {

    dispatch({
        type: "EDIT_BOOK_STARTED"
    })

    axios.put(BASE_URL + "/" + book.id, book)
        .then((response) => {
            //Set the header to be used for future authentication
            dispatch({ type: "EDIT_BOOK_FINISHED", payload: book })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}

//SEARCH
export function searchFor(dispatch, author) {

    dispatch({
        type: "SEARCH_STARTED"
    })

    axios.get("http://localhost:5000/api/search", author)
        .then((response) => {
            //Set the header to be used for future authentication
            dispatch({ type: "SEARCH_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}