import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css';
import TableData from "./tabledata"
import { getTheBooks, addABook, deleteBook, editBook, searchFor } from "../dispatcher/actions"

class Books extends Component {
    constructor(props) {
        super(props);
        this.addData = this.addData.bind(this)
        this.editData = this.editData.bind(this)
        this.deleteData = this.deleteData.bind(this)
        this.searchData = this.searchData.bind(this)
    }

    componentDidMount() {
        getTheBooks(this.props.dispatch)
    }//end startup

    addData(newBook) {
        addABook(this.props.dispatch, newBook)
    }//end add

    deleteData(book) {
        deleteBook(this.props.dispatch, book)
    }//end delete

    editData(book) {
        editBook(this.props.dispatch, book)
    }//end edit

    searchData(data) { //BETA
        console.log("Sending to dispatcher:")
        console.log(data)
        searchFor(this.props.dispatch, data)
    }

    render() {
        let bookies = this.props.bookList
        let searchies = this.props.searchResults

        return (
            <div className="table-display">
                <TableData books={bookies}
                    onEdit={this.editData}
                    onDelete={this.deleteData}
                    onAdd={this.addData}
                    onSearch={this.searchData}
                    search={searchies} />
            </div>
        )
    }
}

export default connect(
    store => ({
        bookList: store.bookData,
        searchResults: store.searchList //beta
    })
)(Books);