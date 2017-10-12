import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css';
import TableData from "./tabledata"
import { getTheBooks, addABook, deleteBook, editBook, searchFor, getPagedBooks, changeView } from "../dispatcher/actions"

class Books extends Component {
    constructor(props) {
        super(props);
        this.addData = this.addData.bind(this)
        this.editData = this.editData.bind(this)
        this.deleteData = this.deleteData.bind(this)
        this.searchData = this.searchData.bind(this)
        this.paging = this.paging.bind(this)
        this.view = this.view.bind(this)
        
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

    searchData(data) { 
        console.log("Sending to dispatcher:")
        console.log(data)
        searchFor(this.props.dispatch, data)
    }

    paging(position, qty){

        console.log("before sending to dispatcher:")
        console.log(position)
        console.log(qty)
        //sending to pagePages in dispatcher the current starting record #
        getPagedBooks(this.props.dispatch, position, qty)
    }

    view(qty, start) {
        console.log("in Books change view")
        console.log("Position " + start + "Qty " + qty )
        changeView(this.props.dispatch, qty, start) //how many to view, where to start from
    }

    render() {
        let bookies = this.props.bookList
        let searchies = this.props.searchResults
        let page = this.props.page

        return (
            <div className="table-display">
                <TableData books={bookies}
                    onEdit={this.editData}
                    onDelete={this.deleteData}
                    onAdd={this.addData}
                    onSearch={this.searchData}
                    search={searchies}
                    page={page}
                    next={this.paging}
                    changeView={this.view} />
            </div>
        )
    }
}

export default connect(
    store => ({
        bookList: store.bookData,
        searchResults: store.searchList,
        page: store.page
    })
)(Books);