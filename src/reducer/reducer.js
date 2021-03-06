let initialState = {
    bookData: [],
    searchList: [],
    bookshelfContent: [],
    recordCount: null
}
export default function reducer(store = initialState, action) {

    switch (action.type) {
        case "CALL_FAILED": {
            console.log("### API Call Failed: " + action.payload)
            return { ...store, APICallInProgress: false, APICallFailed: action.payload }
        }
        //GET COUNT
        case "GET_COUNT_STARTED": {
            console.log("### Counting books.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "GET_COUNT_FINISHED": {
            console.log('### Counting finished!')
            return { ...store, recordCount: action.payload, APICallInProgress: false }
        }

        //GET PAGE:
        case "GET_PAGE_STARTED": {
            console.log("### Retrieving books.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "GET_PAGE_FINISHED": {
            console.log('### Retrieval finished!')
            //console.log(store.recordCount)
            var newContent = store.bookshelfContent.slice()
            if (store.bookshelfContent.length > store.recordCount) {
                newContent = store.bookshelfContent.slice()
            }
            else { action.payload.forEach(a => newContent.push(a)) }

            return { ...store, bookshelfContent: newContent, APICallInProgress: false }
        }

        //ADD
        case "ADD_BOOK_STARTED": {
            console.log("### Adding a book.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "ADD_BOOK_FINISHED": {
            console.log('### Add finished!')
            console.log(action.payload)

            return { ...store, bookshelfContent: add(store.bookshelfContent, action.payload), APICallInProgress: false }
        }

        //EDIT
        case "EDIT_BOOK_STARTED": {
            console.log("### Edit a book.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "EDIT_BOOK_FINISHED": {
            console.log('### Edit finished!')
            return { ...store, bookshelfContent: edit(store.bookshelfContent, action.payload), APICallInProgress: false }
        }

        //DELETE
        case "DELETE_BOOK_STARTED": {
            console.log("### Deleting a book.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "DELETE_BOOK_FINISHED": {
            console.log('### Delete finished!')
            return { ...store, bookshelfContent: remove(store.bookshelfContent, action.payload), APICallInProgress: false }
        }

        //SEARCH ------------------------
        case "SEARCH_STARTED": {
            console.log("### Searching for.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "SEARCH_FINISHED": {
            console.log('### Search finished!')
            return { ...store, searchList: action.payload, APICallInProgress: false }
        }

        //SORT
        case "SORT_STARTED": {
            console.log("### Sorting.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "SORT_FINISHED": {
            console.log('### Sort finished!')
            return { ...store, bookshelfContent: action.payload, APICallInProgress: false }
        }

        //SORT
        case "FILTER_STARTED": {
            console.log("### Sorting.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "FILTER_FINISHED": {
            console.log('### Sort finished!')
            return { ...store, bookshelfContent: action.payload, APICallInProgress: false }
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

/* //---------- SEARCHING ------------------
export function searching(books, thing) {
    let bookies = books.slice()

    var term = thing.toLowerCase()

    var i = 0
    var searchBooks
    for (i; i < bookies.length; i++) {

        searchBooks = bookies.filter((b) => {
            if (b.author.toLowerCase().includes(term)) { return b.author.toLowerCase().includes(term); }
            if (b.title.toLowerCase().includes(term)) { return b.title.toLowerCase().includes(term); }
            if (b.genre.toLowerCase().includes(term)) { return b.genre.toLowerCase().includes(term); }
            if (b.year.toString().includes(thing)) { return b.year.toString().includes(thing); }
        })
    }
    return searchBooks;

} */

/* 

        //GET VIEW:
        case "GET_VIEW_STARTED": {
            console.log("### Retrieving books.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "GET_VIEW_FINISHED": {
            console.log('### Retrieval finished!')
            console.log(action.payload)
            return { ...store, page: action.payload, APICallInProgress: false }
        } */


/*         //SORT ------------------------
 */