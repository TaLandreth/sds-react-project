import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import '../App.css'

export default class BookFunctions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Search:
            search: '',
            //Update view: - not really used w/o pagination
            //viewAmt: 22,
            //Normal fields
            author: '',
            title: '',
            genre: '',
            year: 0,
            //Filter:
            selectVar: ''
        }
    }

    changeInputs = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addHandler() {
        //make me a new object from what's in the fields
        let newBook =
            {
                author: this.inputAuthor.value,
                title: this.inputTitle.value,
                genre: this.inputGenre.value,
                year: Number(this.inputYear.value)
            }

        //Handle issues & send to bookshelf:
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

    setFilter = (e) => {
        let filterValue = ''
        this.setState({
            selectVar: e.target.value
        })
        filterValue = e.target.value

        console.log(filterValue)

        this.props.onFilter(filterValue)
    }

    render() {
        return (
            <div>
            <div className="function">
                <div className="f-search">
                    <input type="text" className="s" name="search" placeholder="Search" value={this.state.search} onChange={this.changeInputs} />
                    <button onClick={this.props.onSearch.bind(this, this.state.search)}>Go!</button>
                    <br />
                </div>

                {/* <div className="f-view" name="Update to how many records to view">
                    <input type="text" name="viewAmt"
                        onChange={this.changeInputs} placeholder={this.state.viewAmt} className="view-input"
                        ref={TableData => this.inputView = TableData} />
                    <button onClick={this.props.onViewChange.bind(this, this.state.viewAmt)}>View</button>
                </div> */}

                <MediaQuery query="(min-device-width: 1224px)">
                    <div className="f-add">
                        <input type="text" ref={TableData => this.inputAuthor = TableData}
                            name="author" placeholder="Author" onChange={this.changeInputs} /><br />
                        <input type="text" ref={TableData => this.inputTitle = TableData}
                            name="title" placeholder="Title" onChange={this.changeInputs} /><br />
                        <input type="text" ref={TableData => this.inputGenre = TableData}
                            name="genre" placeholder="Genre" onChange={this.changeInputs} /><br />
                        <input type="text" ref={TableData => this.inputYear = TableData}
                            name="year" placeholder="Year" onChange={this.changeInputs} /><br />
                        <button onClick={this.addHandler.bind(this)}>Add A Book</button></div>
                </MediaQuery>

                <div className="f-filter">
                    <select value={this.state.value} onChange={this.setFilter.bind(this)}>
                        <option>Filter By: ---- </option>
                        <option value="clear">--(clear filter)--</option>
                        {/*<option value="M">Author, A-M</option>
                        <option value="Z">Author, N-Z</option> */}
                        <option value="Fiction">Genre, Fiction</option>
                        <option value="NonFiction">Genre, Non-Fiction</option>
                        <option value="1950">Year, up to 1950</option>
                        <option value="2000">Year, 1951 to 2000</option>
                        <option value="2017">Year, 2001 to 2017</option>
                    </select>
                </div>

            </div>

                <div className="table-display">
                    <div className="f-sort" onClick={this.props.onSort.bind(this, "author")}>Author</div>
                    <div className="f-sort" onClick={this.props.onSort.bind(this, "title")}>Title</div>
                    <div className="f-sort" onClick={this.props.onSort.bind(this, "genre")}>Genre</div>
                    <div className="f-sort" onClick={this.props.onSort.bind(this, "year")}>Year</div>
                    <MediaQuery query="(min-device-width: 1224px)">
                    <div className="action-div">Actions:</div>
                    </MediaQuery>

                </div>

            </div>
        )//end return
    }//end render
}//end class
