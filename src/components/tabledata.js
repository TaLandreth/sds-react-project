import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import '../App.css'
import BookModel from '../models/bookmodel'

export default class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editFlag: false,
            searchFlag: false,
            //Edit Fields
            eid: '',
            eauthor: '',
            etitle: '',
            egenre: '',
            eyear: '',

            //Normal fields
            id: '',
            author: '',
            title: '',
            genre: '',
            year: '',

            //Search
            search: '',
            countOf: '',

            //Paging:
            pg: 0, //position viewing
            numberOf: 10, //how many to view
            pgNumbers: 5, //how many page #s to display
            activePage: 0,

            //Sorting:
            //query object - 
            sortFlag: true,
            column: 'id',
            direction: 'ASC'
        }
    }



    //CONSOLIDATE CHANGE HANDLERS:
    //copied from Kristen's fantastic idea!
    changeInputs = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    //Initial click handlers:
    adding = e => {
        //make me a new object from what's in the fields
        let newBook = Object.assign(new BookModel(),
            {
                author: this.inputAuthor.value,
                title: this.inputTitle.value,
                genre: this.inputGenre.value,
                year: this.inputYear.value
            })

        //Handle issues & send to books:
        if (newBook.author === "" ||
            newBook.title === "" ||
            newBook.genre === "" ||
            newBook.year === "" || null) {
            alert("Please enter book data")
        }
        else if (isNaN(newBook.year)) {
            alert("Please enter a valid year")
        }
        else {
            this.props.onAdd(newBook)

            //Clear inputs:
            this.inputAuthor.value = ""
            this.inputTitle.value = ""
            this.inputGenre.value = ""
            this.inputYear.value = ""
        }
    }

    editing(book) {
        this.setState({
            editFlag: true,
            eid: book.id,
            eauthor: book.author,
            etitle: book.title,
            egenre: book.genre,
            eyear: book.year
        })
    }

    save(i, a, t, g, y) {
        let saveBook = Object.assign({}, { id: i, author: a, title: t, genre: g, year: y })

        if (saveBook.author === "" ||
            saveBook.title === "" ||
            saveBook.genre === "" ||
            saveBook.year === "" || null) {
            alert("Please enter book data")
        }
        else if (isNaN(saveBook.year)) {
            alert("Please enter a valid year")
        }
        else {
            this.props.onEdit(saveBook)
            this.setState({ editFlag: false })
        }
    }

    cancel = e => {
        this.setState({ editFlag: false, searchFlag: false })
    }

    remove(book) {

        var decision = window.confirm("Delete \"" + book.title + "\", by \"" + book.author + "\"?");
        if (decision === true) {
            this.props.onDelete(book)
        }

    }

    //----------------------- ** ALSO NEED TO ENACT PAGING FOR SEARCH RESULTS
    searchFor(a) {

        console.log("Search initiating: for--")
        console.log(a)

        String.isEmpty = function () {
            return (a.length === 0 || !a.trim());
        }

        if (/\S/.test(a)) { //check for just whitespace, thank you stack overflow
            this.setState({ searchFlag: true })
            this.props.onSearch(a)
        }

        else {
            alert("Please enter a valid search term")

        }

    }

    //SET VIEW NUMBER
    setView() {
        console.log("How many to view:")
        console.log(this.inputView.value)

        let num = this.inputView.value //how many to view
        let start = this.state.pg //where to start from

        if (isNaN(this.inputView.value) || (num % 1) !== 0 || !/\S/.test(this.inputView.value)) {
            alert("Please enter a valid number")
        }
        else {
            this.setState({ numberOf: this.inputView.value })
            this.props.changeView(num, start)
        }
    }

    //TRYING TO SHOW PAGES TO VIEW;
    handlePageChange(pageNumber) {

        let currentPage = this.state.pg           //current position
        let qty = this.state.numberOf               //set how many you're viewing        
        let fwdPage = currentPage + (pageNumber.selected * qty)

        let sortCriteria = {
            column: this.state.column,
            direction: this.state.direction
        }

        if (pageNumber.selected === 0) {
            this.setState({
                pg: pageNumber.selected,
                activePage: pageNumber.selected
            })

            console.log("Changing to 1s pg:")
            console.log(sortCriteria)
            this.props.next(qty, currentPage, sortCriteria)
        }
        if (currentPage < fwdPage) {
            let where = fwdPage
            this.setState({
                pg: currentPage,
                activePage: fwdPage
            })

            console.log("Changing to another pg:")
            console.log(sortCriteria)

            this.props.next(qty, where, sortCriteria)
        }      //updating set + position to change to next set

    }

    sortOn(what) { //Use POST to pass in query object with values to sort by

        let column = what
        let direction = ''

        this.setState({
            sortFlag: !this.state.sortFlag,
        }) //on invocation, switch flag

        if (this.state.sortFlag) {
            direction = "ASC"
        } else { direction = "DESC" }

        let num = this.state.numberOf //how many to view

        let sortInstructions = {
            column: column,
            direction: direction
        }

        this.props.sortRecords(num, sortInstructions)

        this.setState({
            column: column,
            direction: direction
        })
    }//end sort

    render() {

        let records = Math.ceil(this.props.recordCount / this.state.numberOf)

        //IF IN EDITING MODE ----------------------------------------------------:
        if (this.state.editFlag) {
            return (
                <div className="edit-display">
                    <h1>Editing:</h1>
                    <input type="hidden" value={this.state.eid}
                        ref={TableData => this.iputEId = TableData} />

                    <input type="text" value={this.state.eauthor}
                        ref={TableData => this.inputEAuthor = TableData}
                        name="eauthor" placeholder="Author" onChange={this.changeInputs} /><br />

                    <input type="text" value={this.state.etitle}
                        ref={TableData => this.inputETitle = TableData}
                        name="etitle" placeholder="Title" onChange={this.changeInputs} /><br />

                    <input type="text" value={this.state.egenre}
                        ref={TableData => this.inputEGenre = TableData}
                        name="egenre" placeholder="Genre" onChange={this.changeInputs} /><br />

                    <input type="text" value={this.state.eyear}
                        ref={TableData => this.inputEYear = TableData}
                        name="eyear" placeholder="Year" onChange={this.changeInputs} /> <br />

                    <div className="edit-btns">
                        <button onClick={this.save.bind(
                            this, this.state.eid,
                            this.state.eauthor,
                            this.state.etitle,
                            this.state.egenre,
                            this.state.eyear)}>Save</button>
                        <button onClick={this.cancel}>Cancel</button>
                    </div>
                </div>)

        }
        //IF IN SEARCH RESULTS ----------------------------------------------------:
        if (this.state.searchFlag) {
            console.log("search completed")
            return (
                <div className="table-display">
                    <table>
                        <tbody>
                            <tr><td colSpan="6">Books:</td></tr>
                            <tr>
                                <td onClick={this.sortOn.bind(this, "author")} className="shade">Author</td>
                                <td onClick={this.sortOn.bind(this, "title")} className="shade">Title</td>
                                <td onClick={this.sortOn.bind(this, "genre")} className="shade">Genre</td>
                                <td onClick={this.sortOn.bind(this, "year")} className="shade">Year</td>
                                <td colSpan="2">Actions:</td></tr>
                            {this.props.search ? this.props.search.map((b) =>
                                <tr key={b.id + b.author + b.title + b.genre + b.year}>
                                    <td key={b.author}>{b.author}</td>
                                    <td key={b.title}>{b.title}</td>
                                    <td key={b.genre}>{b.genre}</td>
                                    <td key={b.year}>{b.year}</td>

                                    <td className="actions"><button
                                        onClick={this.editing.bind(this, b)}>Edit</button></td>
                                    <td className="actions"><button
                                        onClick={this.remove.bind(this, b)}>Delete</button></td>
                                </tr>) : <tr><td colSpan="6">"No results found"</td></tr>
                            }
                            <tr>
                                <td colSpan="6"><button onClick={this.cancel}>Return</button></td></tr>
                        </tbody>
                    </table>
                </div>
            )

        }
        else { //OTHERWISE SHOW BOOK DATA & ADD FORM ----------------------------------------------------
            return (
                <div className="table-display">
                    <br />
                    <div className="search">
                        <input type="text" className="s" name="search" placeholder="Search"
                            onChange={this.changeInputs} />
                        <button onClick={this.searchFor.bind(this, this.state.search)}>Go!</button>
                        <br />
                    </div>
                    <div className="tabled">
                        <table>
                            <tbody>
                                <tr><td colSpan="6" className="intro">Books:</td></tr>
                                <tr className="shade">
                                    <td onClick={this.sortOn.bind(this, "author")}>Author</td>
                                    <td onClick={this.sortOn.bind(this, "title")}>Title</td>
                                    <td onClick={this.sortOn.bind(this, "genre")}>Genre</td>
                                    <td onClick={this.sortOn.bind(this, "year")}>Year</td>
                                    <td colSpan="2">Actions:</td></tr>
                                {this.props.page ? this.props.page.map((b) =>
                                    <tr key={b.id + b.author + b.title + b.genre + b.year}>
                                        <td key={b.author}>{b.author}</td>
                                        <td key={b.title}>{b.title}</td>
                                        <td key={b.genre}>{b.genre}</td>
                                        <td key={b.year}>{b.year}</td>

                                        <td className="actions"><button
                                            onClick={this.editing.bind(this, b)}>Edit</button></td>
                                        <td className="actions"><button
                                            onClick={this.remove.bind(this, b)}>Delete</button></td>
                                    </tr>) : null
                                }

                                <tr><td colSpan="6" className="view-buttons">
                                    <div id="react-paginate">
                                        <ReactPaginate previousLabel={"previous"}
                                            nextLabel={"next"}
                                            breakLabel={<a>...</a>}
                                            breakClassName={"break-me"}
                                            pageCount={records}
                                            marginPagesDisplayed={1}
                                            pageRangeDisplayed={5}
                                            onPageChange={this.handlePageChange.bind(this)}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"activePage"} />
                                    </div></td></tr>

                                <tr><td colSpan="6" className="view-buttons">
                                    <input type="text" name="howmany"
                                        onChange={this.changeInputs} placeholder="10" className="view-input"
                                        ref={TableData => this.inputView = TableData} />
                                    <button onClick={this.setView.bind(this)}>View</button>

                                </td></tr>

                                <tr><td colSpan="6" className="add">
                                    <input type="text" ref={TableData => this.inputAuthor = TableData}
                                        name="author" placeholder="Author" onChange={this.changeInputs} /><br />
                                    <input type="text" ref={TableData => this.inputTitle = TableData}
                                        name="title" placeholder="Title" onChange={this.changeInputs} /><br />
                                    <input type="text" ref={TableData => this.inputGenre = TableData}
                                        name="genre" placeholder="Genre" onChange={this.changeInputs} /><br />
                                    <input type="text" ref={TableData => this.inputYear = TableData}
                                        name="year" placeholder="Year" onChange={this.changeInputs} /><br />
                                    <button onClick={this.adding.bind(this)}>Add A Book</button></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div >
            )//end return
        }//else
    }//end render
}//end class

//CONCERNS/TWEAKS:
//REF causes whatever was in state last to be added again
//able to add BLANK DATA
//want to press ENTER & handle event to send data