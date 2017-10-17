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
            pgNumbers: 5, //how many page #s to display
            activePage: 0,

            //Sorting:
            sortFlag: true,

            //Filtering:
            selectVar: '',

            sortVal: 'id',
            sortOrder: 'ASC',
            viewAmt: 10,
            startVal: 0,
            filterAuthorStart: '',
            filterAuthorEnd: '',
            filterGenre: '',
            filterYearStart: 1,
            filterYearEnd: 1
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

        if (isNaN(this.inputView.value) || (this.state.viewAmt % 1) !== 0 || !/\S/.test(this.inputView.value)) {
            alert("Please enter a valid number")
        }
        else {
            this.setState({
                sortVal: this.state.sortVal,
                sortOrder: this.state.sortOrder,
                viewAmt: num,
                startVal: this.state.startVal,
                filterAuthorStart: this.state.filterAuthorStart,
                filterAuthorEnd: this.state.filterAuthorEnd,
                filterGenre: this.state.filterGenre,
                filterYearStart: this.state.filterYearStart,
                filterYearEnd: this.state.filterYearEnd
            })

            let instructions = Object.assign({},
                {
                    sortVal: this.state.sortVal,
                    sortOrder: this.state.sortOrder,
                    viewAmt: num,
                    startVal: this.state.startVal,
                    filterAuthorStart: this.state.filterAuthorStart,
                    filterAuthorEnd: this.state.filterAuthorEnd,
                    filterGenre: this.state.filterGenre,
                    filterYearStart: this.state.filterYearStart,
                    filterYearEnd: this.state.filterYearEnd
                })

            this.props.next(instructions)
        }
    }

    //TRYING TO SHOW PAGES TO VIEW;
    handlePageChange(pageNumber) {

        let currentPage = this.state.startVal           //current position
        let qty = this.state.viewAmt                   //set how many you're viewing        
        let fwdPage = currentPage + (pageNumber.selected * qty)

        if (pageNumber.selected === 0) {
            this.setState({
                sortVal: this.state.sortVal,
                sortOrder: this.state.sortOrder,
                viewAmt: this.state.viewAmt,
                startVal: pageNumber.selected,
                filterAuthorStart: this.state.filterAuthorStart,
                filterAuthorEnd: this.state.filterAuthorEnd,
                filterGenre: this.state.filterGenre,
                filterYearStart: this.state.filterYearStart,
                filterYearEnd: this.state.filterYearEnd,
                activePage: fwdPage
            })

            let instructions = Object.assign({},
                {
                    sortVal: this.state.sortVal,
                    sortOrder: this.state.sortOrder,
                    viewAmt: Number(this.state.viewAmt),
                    startVal: Number(pageNumber.selected),
                    filterAuthorStart: this.state.filterAuthorStart,
                    filterAuthorEnd: this.state.filterAuthorEnd,
                    filterGenre: this.state.filterGenre,
                    filterYearStart: this.state.filterYearStart,
                    filterYearEnd: this.state.filterYearEnd
                })

            instructions.startVal = pageNumber.selected

            console.log("Changing back to 1st pg:")
            console.log(instructions)

            this.props.next(instructions)
        }
        if (currentPage < fwdPage) {
            //let where = fwdPage
            this.setState({
                sortVal: this.state.sortVal,
                sortOrder: this.state.sortOrder,
                viewAmt: qty,
                startVal: fwdPage,
                filterAuthorStart: this.state.filterAuthorStart,
                filterAuthorEnd: this.state.filterAuthorEnd,
                filterGenre: this.state.filterGenre,
                filterYearStart: this.state.filterYearStart,
                filterYearEnd: this.state.filterYearEnd,
                activePage: fwdPage
            })

            let instructions = Object.assign({},
                {
                    sortVal: this.state.sortVal,
                    sortOrder: this.state.sortOrder,
                    viewAmt: qty,
                    startVal: currentPage,
                    filterAuthorStart: this.state.filterAuthorStart,
                    filterAuthorEnd: this.state.filterAuthorEnd,
                    filterGenre: this.state.filterGenre,
                    filterYearStart: this.state.filterYearStart,
                    filterYearEnd: this.state.filterYearEnd
                })

            instructions.startVal = fwdPage

            console.log("Changing to another pg:")
            console.log(instructions)

            this.props.next(instructions)
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

        this.setState({
            sortVal: column,
            sortOrder: direction,
            viewAmt: this.state.viewAmt,
            startVal: this.state.startVal,
            filterAuthorStart: this.state.filterAuthorStart,
            filterAuthorEnd: this.state.filterAuthorEnd,
            filterGenre: this.state.filterGenre,
            filterYearStart: this.state.filterYearStart,
            filterYearEnd: this.state.filterYearEnd
        })

        let instructions = Object.assign({},
            {
                sortVal: column,
                sortOrder: direction,
                viewAmt: this.state.viewAmt,
                startVal: this.state.startVal,
                filterAuthorStart: this.state.filterAuthorStart,
                filterAuthorEnd: this.state.filterAuthorEnd,
                filterGenre: this.state.filterGenre,
                filterYearStart: this.state.filterYearStart,
                filterYearEnd: this.state.filterYearEnd
            })

        console.log("Sort Instructions:")
        console.log(instructions)

        this.props.next(instructions)

    }//end sort


    onFilter(v) {

        let instructions = Object.assign({},
            {
                sortVal: this.state.sortVal,
                sortOrder: this.state.sortOrder,
                viewAmt: this.state.viewAmt,
                startVal: this.state.startVal,
                filterAuthorStart: '',
                filterAuthorEnd: '',
                filterGenre: '',
                filterYearStart: 1,
                filterYearEnd: 1
            })

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
            //AUTHOR FILTERS
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
                break;
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
        }

        console.log(instructions)

        this.props.next(instructions)
    }

    setFilter = (e) => {
        let filterValue = ''
        this.setState({
            selectVar: e.target.value
        })
        filterValue = e.target.value

        console.log(filterValue)

        this.onFilter(filterValue)
    }


    render() {

        let records = Math.ceil(this.props.recordCount / this.state.viewAmt)

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
                                <tr><td colSpan="3" className="intro">Books:</td>
                                    <td colSpan="3" className="intro">
                                        <select value={this.state.value} onChange={this.setFilter.bind(this)}>
                                            <option>Filter By: ---- </option>
                                            <option value="clear">--(clear filter)--</option>
                                            <option value="M">Author, A-M</option>
                                            <option value="Z">Author, N-Z</option>
                                            <option value="Fiction">Genre, Fiction</option>
                                            <option value="NonFiction">Genre, Non-Fiction</option>
                                            <option value="1950">Year, up to 1950</option>
                                            <option value="2000">Year, 1951 to 2000</option>
                                            <option value="2017">Year, 2001 to 2017</option>
                                        </select>
                                    </td></tr>
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