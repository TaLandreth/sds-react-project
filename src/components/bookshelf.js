import React, { Component } from 'react'
import { connect } from "react-redux"
import InfiniteScroll from 'react-infinite-scroll-component'
import '../App.css'
import Book from "./book"
import BookFunctions from "./bookFunctions"
import EditPage from "./editPage"
import SearchPage from "./searchPage"
import { getCount, addABook, deleteBook, editBook, searchFor, getPagedBooks, sortBy, filterBy } from "../dispatcher/actions"

class Bookshelf extends Component {
    constructor(props) {
        super(props);
        this.adding = this.adding.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onSort = this.onSort.bind(this)
        this.onSave = this.onSave.bind(this)

        this.state = {
            //Editing:
            editFlag: false,
            editBook: {},
            searchFlag: false,

            //Sorting:
            sortFlag: true,

            //Instructions:
            sortVal: 'id',
            sortOrder: 'ASC',
            viewAmt: 20,
            startVal: 0,
            filterAuthorStart: '',
            filterAuthorEnd: '',
            filterGenre: '',
            filterYearStart: 1,
            filterYearEnd: 1,

            //Paging
            moreBooks: true
        }
    }

    componentDidMount() {
        let instructions = {
            sortVal: this.state.sortVal,
            sortOrder: this.state.sortOrder,
            viewAmt: this.state.viewAmt,
            startVal: this.state.startVal,
            filterAuthorStart: this.state.filterAuthorStart,
            filterAuthorEnd: this.state.filterAuthorEnd,
            filterGenre: this.state.filterGenre,
            filterYearStart: this.state.filterYearStart,
            filterYearEnd: this.state.filterYearEnd
        }

        console.log("--> loadDataPage - instructions/settings")
        getPagedBooks(this.props.dispatch, instructions)
        getCount(this.props.dispatch)
    }

    changeInputs = e => { this.setState({ [e.target.name]: e.target.value }) }

    //BOOK ITEM HANDLERS:
    cancel = e => { this.setState({ editFlag: false, searchFlag: false }) }

    onEdit(book) {

        console.log(book)
        this.setState({
            editFlag: true,
            editBook: book
        })
    }

    onSave(i, a, t, g, y) {
        let saveBook = { id: i, author: a, title: t, genre: g, year: y }

        console.log(saveBook)

        editBook(this.props.dispatch, saveBook)

        this.setState({ editFlag: false })

    }

    onDelete(book) {

        var decision = window.confirm("Delete \"" + book.title + "\", by \"" + book.author + "\"?");
        if (decision === true) {
            deleteBook(this.props.dispatch, book)

        }

    }

    //BOOK FUNCTION HANDLERS:

    adding(newBook) {
        addABook(this.props.dispatch, newBook)
    }

    searchFor(a) {

        this.setState({ searchFlag: true })

        console.log("Search initiating: for--")
        console.log(a)

        String.isEmpty = function () {
            return (a.length === 0 || !a.trim());
        }

        if (/\S/.test(a)) { //check for just whitespace, thank you stack overflow
            this.setState({ searchFlag: true })
            searchFor(this.props.dispatch, a)
        }

        else {
            alert("Please enter a valid search term")
            this.setState({ searchFlag: false })

        }

    }

    //SET VIEW NUMBER -- NOT REALLY NEEDED ANYMORE..
    setView(newView) {

        console.log(newView)

        if (isNaN(newView) || (this.state.viewAmt % 1) !== 0 || !/\S/.test(newView)) {
            alert("Please enter a valid number")
        }
        else {

            let instructions =
                {
                    sortVal: this.state.sortVal,
                    sortOrder: this.state.sortOrder,
                    viewAmt: Number(newView),
                    startVal: this.state.startVal,
                    filterAuthorStart: this.state.filterAuthorStart,
                    filterAuthorEnd: this.state.filterAuthorEnd,
                    filterGenre: this.state.filterGenre,
                    filterYearStart: this.state.filterYearStart,
                    filterYearEnd: this.state.filterYearEnd
                }

            this.setState(instructions)

            getPagedBooks(this.props.dispatch, instructions)

        }
    }

    onSort(what) { //Use POST to pass in query object with values to sort by

        console.log(what)

        let column = what
        let direction = ''

        this.setState({
            sortFlag: !this.state.sortFlag,
        }) //on invocation, switch flag

        if (this.state.sortFlag) {
            direction = "ASC"
        } else { direction = "DESC" }

        let instructions =
            {
                sortVal: column,
                sortOrder: direction,
                viewAmt: this.state.viewAmt,
                startVal: 0,
                filterAuthorStart: this.state.filterAuthorStart,
                filterAuthorEnd: this.state.filterAuthorEnd,
                filterGenre: this.state.filterGenre,
                filterYearStart: this.state.filterYearStart,
                filterYearEnd: this.state.filterYearEnd
            }

        this.setState(instructions)

        sortBy(this.props.dispatch, instructions)

    }//end sort

    onFilter(v) {
        let instructions =
            {
                sortVal: this.state.sortVal,
                sortOrder: this.state.sortOrder,
                viewAmt: this.state.viewAmt,
                startVal: 0,
                filterAuthorStart: '',
                filterAuthorEnd: '',
                filterGenre: '',
                filterYearStart: 1,
                filterYearEnd: 1
            }

        switch (v) {
            //CLEAR ALL
            case "clear":
                this.setState({
                    filterAuthorStart: '',
                    filterAuthorEnd: '',
                    filterGenre: '',
                    filterYearStart: 1,
                    filterYearEnd: 1
                })

                break;
            /*//AUTHOR FILTERS
                case "M":
                    this.setState({
                        filterAuthorStart: "A",
                        filterAuthorEnd: v,
                        filterGenre: '',
                        filterYearStart: 1,
                        filterYearEnd: 1
                    })
                    instructions.filterAuthor = v
                    break;
                case "Z":
                    this.setState({
                        filterAuthorStart: "N",
                        filterAuthorEnd: v,
                        filterGenre: '',
                        filterYearStart: 1,
                        filterYearEnd: 1
                    })
                    instructions.filterAuthor = v
                    break; */
            //GENRE FILTERS
            case "Fiction":
                this.setState({
                    filterAuthorStart: '',
                    filterAuthorEnd: '',
                    filterGenre: v,
                    filterYearStart: 1,
                    filterYearEnd: 1
                })
                instructions.filterGenre = v
                break;
            case "NonFiction":
                this.setState({
                    filterAuthorStart: '',
                    filterAuthorEnd: '',
                    filterGenre: v,
                    filterYearStart: 1,
                    filterYearEnd: 1
                })
                instructions.filterGenre = v
                break;
            //YEAR FILTERS
            case "1950":
                this.setState({
                    filterAuthorStart: '',
                    filterAuthorEnd: '',
                    filterGenre: '',
                    filterYearStart: 1,
                    filterYearEnd: Number(v)
                })
                instructions.filterYearStart = 1
                instructions.filterYearEnd = Number(v)
                break;
            case "2000":
                this.setState({
                    filterAuthorStart: '',
                    filterAuthorEnd: '',
                    filterGenre: '',
                    filterYearStart: 1951,
                    filterYearEnd: Number(v)
                })
                instructions.filterYearStart = 1951
                instructions.filterYearEnd = Number(v)
                break;
            case "2017":
                this.setState({
                    filterAuthorStart: '',
                    filterAuthorEnd: '',
                    filterGenre: '',
                    filterYearStart: 2001,
                    filterYearEnd: Number(v)
                })
                instructions.filterYearStart = 2001
                instructions.filterYearEnd = Number(v)
                break;

            default:
        }

        console.log(instructions)
        this.setState(instructions)

        filterBy(this.props.dispatch, instructions)
    }

    //--- PAGING/SCROLLING:
    handlePageChange() {

        var start = this.state.startVal
        var view = this.state.viewAmt

        let instructions = {
            sortVal: this.state.sortVal,
            sortOrder: this.state.sortOrder,
            viewAmt: this.state.viewAmt,
            startVal: start + view,
            filterAuthorStart: this.state.filterAuthorStart,
            filterAuthorEnd: this.state.filterAuthorEnd,
            filterGenre: this.state.filterGenre,
            filterYearStart: this.state.filterYearStart,
            filterYearEnd: this.state.filterYearEnd
        }

        this.setState(instructions)

        if (this.props.recordCount === this.props.bookshelfContent) {
            this.setState({ moreBooks: false })
        }

        //console.log("--> loadDataPage - instructions/settings")
        getPagedBooks(this.props.dispatch, instructions)

    }

    render() {
        //IF IN EDITING MODE ----------------------------------------------------:
        if (this.state.editFlag) {
            return (
                <EditPage
                    onCancel={this.cancel}
                    editBook={this.state.editBook}
                    onSave={this.onSave} />)
        }
        //IF IN SEARCH RESULTS ----------------------------------------------------:
        if (this.state.searchFlag) {
            console.log("search completed")
            return (
                <SearchPage
                    searchResults={this.props.searchResults}
                    onCancel={this.cancel}
                    editBook={this.state.editBook}
                    onSave={this.onSave}
                    onDelete={this.onDelete}
                />)
        }
        else { //OTHERWISE SHOW BOOK DATA ----------------------------------------------------
            return (
                <div className="app">
                    <BookFunctions
                        onSearch={this.searchFor.bind(this)}
                        onViewChange={this.setView.bind(this)}
                        onAdd={this.adding.bind(this)}
                        onFilter={this.onFilter.bind(this)}
                        onSort={this.onSort.bind(this)}
                    />

                    <InfiniteScroll
                        refreshFunction={this.refresh}
                        next={this.handlePageChange.bind(this)}
                        hasMore={this.state.moreBooks}
                        loader={<h1>Loading...</h1>}>
                        {this.props.bookshelfContent.map((b) =>
                            <Book
                                key={b.id + b.author + b.title}
                                onEdit={this.onEdit.bind(this)}
                                book={b}
                                onDelete={this.onDelete}
                                onAdd={this.addData} />)}
                    </InfiniteScroll>
                </div>
            )
        }//end return, end else
    }// end render
}//end BookShelf component

export default connect(
    store => ({
        searchResults: store.searchList,
        bookshelfContent: store.bookshelfContent,
        recordCount: store.recordCount
    })
)(Bookshelf);
