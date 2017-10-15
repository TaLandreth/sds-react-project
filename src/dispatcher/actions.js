import axios from "axios";

const BASE_URL = "http://localhost:5000/api/tanya_project"

//RETRIEVE
export function getTheBooks(dispatch) {

    dispatch({
        type: "GET_BOOKS_STARTED"
    })

    axios.get(BASE_URL)
        .then((response) => {
            dispatch({ type: "GET_BOOKS_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}

//GET COUNT
export function getCount(dispatch) {
    
        dispatch({
            type: "GET_COUNT_STARTED"
        })
    
        axios.get("http://localhost:5000/api/search")
            .then((response) => {
                dispatch({ type: "GET_COUNT_FINISHED", payload: response.data })
            })
            .catch((err) => {
                dispatch({ type: "CALL_FAILED", payload: err })
            })
    }

//RETRIEVE - PAGES
export function getPagedBooks(dispatch, qty, start) {

    dispatch({
        type: "GET_PAGE_STARTED"
    })

    axios.get(BASE_URL + "/pg/" + qty + "/" + start)
        .then((response) => {
            dispatch({ type: "GET_PAGE_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}

//GET NEW VIEW
export function changeView(dispatch, qty, start) { //how many to view, where to start from

    dispatch({
        type: "GET_VIEW_STARTED"
    })

    axios.get(BASE_URL + "/view/" + qty + "/" + start)
        .then((response) => {
            dispatch({ type: "GET_VIEW_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}





//ADD
export function addABook(dispatch, newBook) {
    dispatch({
        type: "ADD_BOOK_STARTED"
    })
    axios.post(BASE_URL, newBook)
        .then((response) => {
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
            dispatch({ type: "EDIT_BOOK_FINISHED", payload: book })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}

//SEARCH ---------------------- BETA
export function searchFor(dispatch, author) {

    dispatch({
        type: "SEARCH_STARTED"
    })

    axios.get("http://localhost:5000/api/search/" + author)
    .then((response) => {
        dispatch({ type: "SEARCH_FINISHED", payload: response.data })
    })
    .catch((err) => {
        dispatch({ type: "CALL_FAILED", payload: err })
    })

}

//SORT ---------------------- BETA
export function sortBy(dispatch, num, sortObj) {
    
        dispatch({
            type: "SORT_STARTED"
        })

        console.log("In dispatcher:")
        console.log(sortObj)
    
        axios.post(BASE_URL + "/sorting/" + num, sortObj)
        .then((response) => {
            dispatch({ type: "SORT_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
    
    }