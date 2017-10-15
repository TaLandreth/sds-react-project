import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css';
import TableData from "./tabledata"
import { getTheBooks, getCount, addABook, deleteBook, editBook, searchFor, getPagedBooks, changeView, sortBy } from "../dispatcher/actions"

class Books extends Component {
    constructor(props) {
        super(props);
        this.addData = this.addData.bind(this)
        this.editData = this.editData.bind(this)
        this.deleteData = this.deleteData.bind(this)
        this.searchData = this.searchData.bind(this)
        this.paging = this.paging.bind(this)
        this.view = this.view.bind(this)
        this.sort = this.sort.bind(this)
        
    }

    componentDidMount() {
        getTheBooks(this.props.dispatch)
        getCount(this.props.dispatch)
        
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

    paging(qty, position){
        console.log("Current page")
        console.log(position)
        console.log("Qty")        
        console.log(qty)
        //sending to pagePages in dispatcher the current starting record #
        getPagedBooks(this.props.dispatch, qty, position)
    }

    view(qty, start) {
        console.log("in Books change view")
        console.log("Position " + start + ", Qty " + qty )
        changeView(this.props.dispatch, qty, start) //how many to view, where to start from
    }

    sort(num, sortInst) {
        console.log("Sort Instructions:")
        console.log(sortInst)

        sortBy(this.props.dispatch, num, sortInst)
    }

    render() {
        let bookies = this.props.bookList
        let searchies = this.props.searchResults
        let page = this.props.page
        let count = this.props.recordCount

        return (
            <div className="table-display">
                <TableData books={bookies}      /*display all books; not implementing anymore*/
                    onEdit={this.editData}
                    onDelete={this.deleteData}
                    onAdd={this.addData}
                    onSearch={this.searchData}  /*search function*/
                    search={searchies}          /*Search Results*/
                    page={page}                 /*paging RESULTS -- replaces 'books'*/
                    next={this.paging}          /*handle paging*/
                    changeView={this.view}      /*change how many to view at a time*/
                    recordCount={count} 
                    sortRecords={this.sort}/>
            </div>
        )
    }
}

export default connect(
    store => ({
        bookList: store.bookData,
        searchResults: store.searchList,
        page: store.page,
        recordCount: store.recordCount
    })
)(Books);