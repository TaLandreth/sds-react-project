import React, { Component } from 'react'
import '../App.css';
import TableData from "./tabledata"

export default class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "",
            title: "",
            genre: "",
            year: null,
            bookList: []
        };

        this.addData = this.addData.bind(this)
        this.editData = this.editData.bind(this)
        this.deleteData = this.deleteData.bind(this)

    }

    addData(newBook) {

        console.log("Back in books.js:")
        console.log(newBook)

        this.setState(
            {
                bookList: [...this.state.bookList,
                {
                    id: '',
                    author: newBook.author,
                    title: newBook.title,
                    genre: newBook.genre,
                    year: newBook.year
                }]
            })

        console.log("After add: state:")
        console.log(this.state.bookList)
    }

    deleteData(book) {
        //receives specific book to delete

        console.log("This book received:")
        console.log(book)

        //console.log("This book's ID:")
        //console.log(book.id)

        let allBooks = this.state.bookList

        console.log("Copy of all current books:")
        console.log(allBooks)

        //Temporary index locator & filter:

        let index = allBooks.map(obj => obj.title).indexOf(book.title);
    
        console.log("Index of the book to delete")
        console.log(index)

        //let newBooks = allBooks.splice(index, 0)

        let newBooks = allBooks.filter(b => b[index] !== allBooks[index])
        

        console.log("After delete:")
        console.log(newBooks)

/*          this.setState(
            {
                bookList: newBooks
            })

        console.log("After delete: state:")
        console.log(this.state.bookList) */
    }//end delete

    editData(book) {
        //receives whole book model
        alert('edit' + book.id)

    }//end edit

    render() {

        return (
            <div className="table-display">
                <TableData books={this.state.bookList}
                    onEdit={this.editData}
                    onDelete={this.deleteData}
                    onAdd={this.addData} />
            </div>
        )
    }


}