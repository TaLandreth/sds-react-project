import React, { Component } from 'react'
import '../App.css';
import TableData from "./tabledata"

export default class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: [
                {
                    id: 1,
                    author: "J.D. Salinger",
                    title: "The Catcher In The Rye",
                    genre: "Fiction",
                    year: 1951
                },
                {
                    id: 2,
                    author: "Marissa V. Snyder",
                    title: "Poison Study",
                    genre: "Fiction",
                    year: 2005
                },
                {
                    id: 3,
                    author: "Vera Nazarian",
                    title: "Cobweb Bride",
                    genre: "Fiction",
                    year: 2013
                },
                {
                    id: 4,
                    author: "Gene Stratton-Porter",
                    title: "A Girl of the Limberlost",
                    genre: "Fiction",
                    year: 1909
                }
            ]

        };
    }

    addData() {
        alert('Add')
    }

    deleteData(book, allBooks) {
        //receives specific book to delete

        console.log(book)
        console.log(book.title)
        let newBook = Object.assign({}, allBooks)
        console.log(newBook)
        
        newBook.filter(b => b.id !== book.id)
        console.log(newBook)
        this.setState({bookList: newBook})
        


    }

    editData(book) {
        //receives whole book model
        alert('edit' + book.id)

    }

    render() {

        return (
            <div className="table-display">
                <TableData books={this.state.bookList}
                onEdit={this.editData}
                onDelete={this.deleteData}
                onAdd={this.addData}/>
            </div>
        )
    }


}