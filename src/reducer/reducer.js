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
            console.log(action.payload)
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
            console.log('### Edit finished! Payload:')
            console.log(action.payload)
            return { ...store, bookData: edit(store.bookData, action.payload), APICallInProgress: false }
        }

        //DELETE
        case "DELETE_BOOK_STARTED": {
            console.log("### Deleting a book.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "DELETE_BOOK_FINISHED": {
            console.log('Reducer - Store Before delete:')
            console.log(store.bookData)
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

    console.log("In reducer helper, to add:")
    console.log(newBookArr)

    return newBookArr
}

//---------- EDIT ------------------
export function edit(books, edit) {
    let newCollection = books.slice()

    console.log("In helper: new array")
    console.log(newCollection)

    newCollection.map(function (b) {
        if (b.id === edit.id) {
            b.author = edit.author;
            b.title = edit.title;
            b.genre = edit.genre;
            b.year = edit.year
        }

    })

    console.log("In helper: edit result")
    console.log(newCollection)
    return newCollection;
}

//---------- DELETE ------------------
export function remove(books, newbook) {

    let newBookArr = books.slice();
    console.log("In helper, copy of store array:")
    console.log(newBookArr)

    newBookArr = books.filter(b => b.id !== newbook.id)

    console.log("In helper, return to store after delete:")
    console.log(newBookArr)

    return newBookArr;
}

//---------- SEARCHING ------------------
export function searching(books, thing) {
    let bookies = books.slice()
    console.log(bookies)
    var obj = Object.assign({})
    var results = []

    //loop through array
    //for every B, find which one matching the condition
    bookies.forEach(function (b) {

        obj = Object.assign({},bookies.find(b => b.author === thing.author));

        results.push(obj)
    })

    console.log("In reducer: search result")
    console.log(results)
    return results;
}

