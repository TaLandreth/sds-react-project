import React, { Component } from 'react'
import { connect } from "react-redux"
import ReactPaginate from 'react-paginate'
import '../App.css'
import BookModel from '../models/bookmodel'
import Book from "./book"
import { getCount, addABook, deleteBook, editBook, searchFor, getPagedBooks } from "../dispatcher/actions"
import InfiniteScroll from 'react-infinite-scroll-component'

class Bookshelf extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadDataPage()
    }

    loadDataPage() {

        let instructions = {
            sortVal: "Author",
            sortOrder: "asc",
            viewAmt: 50,
            startVal: 0,
            filterAuthorStart: "",
            filterAuthorEnd: "",
            filterGenre: "",
            filterYearStart: 1,
            filterYearEnd: 5000
        }

        console.log("--> loadDataPage - instructions/settings")
        getPagedBooks(this.props.dispatch, instructions)
    }

    editing() { }
    deleteData() { }
    addData() { }

    render() {

        return (

            <InfiniteScroll
                refreshFunction={this.refresh}
                next={this.loadDataPage.bind(this)}
                hasMore={true}
                loader={<h1>Loading...</h1>}>
                <table><tbody>
                    {this.props.bookshelfContent.map((b) =>
                        <Book /*display all books on initial load*/
                            onEdit={this.editing}
                            book={b}
                            onDelete={this.deleteData}
                            onAdd={this.addData}
                        />)
                    }
                </tbody></table>
            </InfiniteScroll>

        )

    }// end render
}//end BookShelf component

export default connect(
    store => ({
        searchResults: store.searchList,
        bookshelfContent: store.bookshelfContent,
    })
)(Bookshelf);
