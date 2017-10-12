let initialState = {
    bookData: [],
    searchList: []
}
export default function reducer(store = initialState, action) {

    switch (action.type) {
        case "CALL_FAILED": {
            console.log("### API Call Failed: " + action.payload)
            return { ...store, APICallInProgress: false, APICallFailed: action.payload }
        }

        //RETRIEVE
        case "GET_BOOKS_STARTED": {
            console.log("### Retrieving books.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "GET_BOOKS_FINISHED": {
            console.log('### Retrieval finished!')
            return { ...store, bookData: action.payload, APICallInProgress: false }
        }

        //ADD
        case "ADD_BOOK_STARTED": {
            console.log("### Adding a book.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "ADD_BOOK_FINISHED": {
            console.log('### Add finished!')
            return { ...store, bookData: add(store.bookData, action.payload), APICallInProgress: false }
        }

        //EDIT
        case "EDIT_BOOK_STARTED": {
            console.log("### Edit a book.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "EDIT_BOOK_FINISHED": {
            console.log('### Edit finished!')
            return { ...store, bookData: edit(store.bookData, action.payload), APICallInProgress: false }
        }

        //DELETE
        case "DELETE_BOOK_STARTED": {
            console.log("### Deleting a book.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "DELETE_BOOK_FINISHED": {
            console.log('### Delete finished!')
            return { ...store, bookData: remove(store.bookData, action.payload), APICallInProgress: false }
        }

        //SEARCH
        case "SEARCH_STARTED": {
            console.log("### Searching for.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "SEARCH_FINISHED": {
            console.log('### Search finished!')
            return { ...store, searchList: searching(store.bookData, action.payload), APICallInProgress: false }
        }

        default: {
            return store
        }
    }

}

// HELPERS: ~~~~~~~~~~~~~~~~~~~~~~~~~~~

//---------- ADD ------------------
export function add(books, newbook) {

    let newBookArr = books.slice();
    newBookArr.push(newbook)

    return newBookArr
}

//---------- EDIT ------------------
export function edit(books, edit) {
    let newCollection = books.slice()

    newCollection.map((b) => {
        if (b.id === edit.id) {
            b.author = edit.author;
            b.title = edit.title;
            b.genre = edit.genre;
            b.year = edit.year
        }

    })

    return newCollection;
}

//---------- DELETE ------------------
export function remove(books, newbook) {

    let newBookArr = books.slice();

    newBookArr = books.filter(b => b.id !== newbook.id)

    return newBookArr;
}

//---------- SEARCHING ------------------
export function searching(books, thing) {
    let bookies = books.slice()

    var term = thing.toLowerCase()

    var i = 0
    var searchBooks
    for (i; i < bookies.length; i++) {

        searchBooks = bookies.filter((b) => {
                return b.author.toLowerCase().includes(term);
            })
    }
    return searchBooks;

}
