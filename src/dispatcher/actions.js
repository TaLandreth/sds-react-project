import axios from "axios";

const BASE_URL = "http://localhost:5000/api/tanya_project"

//RETRIEVE - ALL BOOKS; initial load, no filter/view criteria yet
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

//RETRIEVE - get books as we page, update view, and sort
export function getPagedBooks(dispatch, instructions) {

    //console.log(instructions)

    dispatch({
        type: "GET_PAGE_STARTED"
    })

    axios.post(BASE_URL + "/pg", instructions)
        .then((response) => {
            dispatch({ type: "GET_PAGE_FINISHED", payload: response.data })
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
    

//ADD
export function addABook(dispatch, newBook) {
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
//SEARCH
export function searchFor(dispatch, forThis) {

    dispatch({
        type: "SEARCH_STARTED"
    })

    axios.get("http://localhost:5000/api/search/" + forThis)
        .then((response) => {
            dispatch({ type: "SEARCH_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })

}

//SORT
export function sortBy(dispatch, instructions) {

    console.log('Sort instructions:')
    console.log(instructions)

    dispatch({
        type: "SORT_STARTED"
    })

    console.log("In dispatcher:")
    console.log(instructions)

    axios.post(BASE_URL + "/pg", instructions)
        .then((response) => {

            console.log(response.data)

            dispatch({ type: "SORT_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })

}

//SORT
export function filterBy(dispatch, instructions) {
    
        console.log('Filter instructions:')
        console.log(instructions)
    
        dispatch({
            type: "FILTER_STARTED"
        })
    
        console.log("In dispatcher:")
        console.log(instructions)
    
        axios.post(BASE_URL + "/pg", instructions)
            .then((response) => {
    
                console.log(response.data)
    
                dispatch({ type: "FILTER_FINISHED", payload: response.data })
            })
            .catch((err) => {
                dispatch({ type: "CALL_FAILED", payload: err })
            })
    
    }


/* //GET NEW VIEW
export function changeView(dispatch, criteria) { //how many to view, where to start from

    console.log("Query Criteria - dispatcher")
    console.log(criteria)

    dispatch({
        type: "GET_VIEW_STARTED"
    })

    axios.post(BASE_URL + "/pg/", criteria)
        .then((response) => {
            dispatch({ type: "GET_VIEW_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
} */


