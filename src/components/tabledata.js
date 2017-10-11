import React, { Component } from 'react'
import '../App.css';
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
            search: ''
        }
    }

    //View Change handlers:
    onChangeAuthor = e => { this.setState({ author: e.target.value }) };
    onChangeTitle = e => { this.setState({ title: e.target.value }) };
    onChangeGenre = e => { this.setState({ genre: e.target.value }) };
    onChangeYear = e => { this.setState({ year: e.target.value }) };

    //Edit Change handlers:
    onChangeEAuthor = e => { this.setState({ eauthor: e.target.value }) };
    onChangeETitle = e => { this.setState({ etitle: e.target.value }) };
    onChangeEGenre = e => { this.setState({ egenre: e.target.value }) };
    onChangeEYear = e => { this.setState({ eyear: e.target.value }) };

    //Search Change handler:
    onChangeSearch = e => { this.setState({ search: e.target.value }) };


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

        //Send to books:
        this.props.onAdd(newBook)

        //Clear inputs:
        this.inputAuthor.value = ""
        this.inputTitle.value = ""
        this.inputGenre.value = ""
        this.inputYear.value = ""
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
        this.props.onEdit(saveBook)
        this.setState({ editFlag: false })
    }

    cancel = e => {
        this.setState({ editFlag: false, searchFlag: false })
    }

    remove(book) {
        this.props.onDelete(book)

    }

    searchFor(a) {
        console.log("Search initiating: for--")
        console.log(a)
        this.props.onSearch(a)

        let results = this.props.searchResults

        console.log("Any result?")
        console.log(results)

        if ((this.props.searchResults).length > 0) {
            this.setState({ searchFlag: true })
        }
        else {
            alert("No results")
        }
    }


    render() {
        //IF IN EDITING MODE ----------------------------------------------------:
        if (this.state.editFlag) {
            return (
                <div className="table-display">
                    <input type="hidden" value={this.state.eid}
                        ref={TableData => this.iputEId = TableData} />

                    <input type="text" value={this.state.eauthor}
                        ref={TableData => this.inputEAuthor = TableData}
                        name="eauthor" placeholder="Author" onChange={this.onChangeEAuthor} /><br />

                    <input type="text" value={this.state.etitle}
                        ref={TableData => this.inputETitle = TableData}
                        name="etitle" placeholder="Title" onChange={this.onChangeETitle} /><br />

                    <input type="text" value={this.state.egenre}
                        ref={TableData => this.inputEGenre = TableData}
                        name="egenre" placeholder="Genre" onChange={this.onChangeEGenre} /><br />

                    <input type="text" value={this.state.eyear}
                        ref={TableData => this.inputEYear = TableData}
                        name="eyear" placeholder="Year" onChange={this.onChangeEYear} /> <br />

                    <button onClick={this.save.bind(
                        this, this.state.eid,
                        this.state.eauthor,
                        this.state.etitle,
                        this.state.egenre,
                        this.state.eyear)}>Save</button>
                    <button onClick={this.cancel}>Cancel</button>
                </div>)

        }//IF IN SEARCH RESULTS ----------------------------------------------------:
        if (this.state.searchFlag) {
            console.log("search completed")
            return (
                <div className="table-display">
                    <table>
                        <tbody>
                            <tr><td colSpan="6">Books:</td></tr>
                            <tr className="shade"><td>Author</td><td>Title</td><td>Genre</td><td>Year</td>
                                <td colSpan="2">Actions:</td></tr>
                            {this.props.searchResults ? this.props.searchResults.map((b) =>
                                <tr key={b.id + b.author + b.title + b.genre + b.year}>
                                    <td key={b.author}>{b.author}</td>
                                    <td key={b.title}>{b.title}</td>
                                    <td key={b.genre}>{b.genre}</td>
                                    <td key={b.year}>{b.year}</td>

                                    <td className="actions"><button
                                        onClick={this.editing.bind(this, b)}>Edit</button></td>
                                    <td className="actions"><button
                                        onClick={this.remove.bind(this, b)}>Delete</button></td>
                                </tr>) : "No books found"
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
                        <input type="text" name="search" placeholder="Search By Author"
                            onChange={this.onChangeSearch} />
                        <button onClick={this.searchFor.bind(this, this.state.search)}>Go!</button>
                        <br />
                    </div>
                <div className="tabled">
                    <table>
                        <tbody>
                            <tr><td colSpan="6" className="intro">Books:</td></tr>
                            <tr className="shade"><td>Author</td><td>Title</td><td>Genre</td><td>Year</td>
                                <td colSpan="2">Actions:</td></tr>
                            {this.props.books ? this.props.books.map((b) =>
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

                            <tr><td colSpan="6" className="actions">
                                <input type="text" ref={TableData => this.inputAuthor = TableData}
                                    name="author" placeholder="Author" onChange={this.onChangeAuthor} /><br />
                                <input type="text" ref={TableData => this.inputTitle = TableData}
                                    name="title" placeholder="Title" onChange={this.onChangeTitle} /><br />
                                <input type="text" ref={TableData => this.inputGenre = TableData}
                                    name="genre" placeholder="Genre" onChange={this.onChangeGenre} /><br />
                                <input type="text" ref={TableData => this.inputYear = TableData}
                                    name="year" placeholder="Year" onChange={this.onChangeYear} /><br />
                                <button onClick={this.adding.bind(this)}>Add A Book</button></td></tr>
                        </tbody>
                    </table>
                </div>
                </div>
            )//end return
        }//else
    }//end render
}//end class

//CONCERNS/TWEAKS:
//REF causes whatever was in state last to be added again
//able to add BLANK DATA
//want to press ENTER & handle event to send data