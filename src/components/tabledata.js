import React, { Component } from 'react'
import '../App.css';
//import BookModel from "../models/bookmodel"

export default class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "",
            title: "",
            genre: "",
            year: null
        }
    }

    //Change handlers:
        onChangeAuthor = e => {
            this.setState({ author: e.target.value })
        };
        onChangeTitle = e => {
            this.setState({ title: e.target.value })
        };
        onChangeGenre = e => {
            this.setState({ genre: e.target.value })
        };
        onChangeYear = e => {
            this.setState({ year: e.target.value })
        };

    //Action handlers:
    
    adding = e => {
        
        //make me a new object:
        var newBook = Object.assign({},
            { author: this.state.author, title: this.state.title, genre: this.state.genre, year: this.state.year })

        //Send to books:
        this.props.onAdd(newBook)

        //Clear inputs:
        this.inputAuthor.value =""
        this.inputTitle.value =""
        this.inputGenre.value =""
        this.inputYear.value =""
    }

    render() {


        return (
            <div className="table-display">
                <table>
                    <tbody>
                        <tr><td colSpan="6">Books:</td></tr>
                        <tr><td>Author</td><td>Title</td><td>Genre</td><td>Year</td><td colSpan="2">Actions:</td></tr>
                        {this.props.books ? this.props.books.map((b) =>
                            <tr>
                                <td key={b.author}>{b.author}</td>
                                <td key={b.title}>{b.title}</td>
                                <td key={b.genre}>{b.genre}</td>
                                <td key={b.year}>{b.year}</td>
                                <td className="actions"><button 
                                onClick={this.props.onEdit.bind(this, b)}>Edit</button></td>
                                <td className="actions"><button 
                                onClick={this.props.onDelete.bind(this, b, this.props.books)}>Delete</button></td>
                            </tr>) : null}
                        <tr><td colSpan="6" className="actions">
                            <input type="text" ref={TableData => this.inputAuthor = TableData} 
                            name="author" placeholder="Author" onChange={this.onChangeAuthor} />
                            <input type="text" ref={TableData => this.inputTitle = TableData} 
                            name="title" placeholder="Title" onChange={this.onChangeTitle} />
                            <input type="text" ref={TableData => this.inputGenre = TableData} 
                            name="genre" placeholder="Genre" onChange={this.onChangeGenre} />
                            <input type="text" ref={TableData => this.inputYear = TableData} 
                            name="year" placeholder="Year" onChange={this.onChangeYear} /><br />
                            <button onClick={this.adding.bind(this)}>Add A Book</button></td></tr>
                    </tbody>
                </table>

            </div>

        )//end return
    }//end render
}//end class

//REF causes whatever was in state last to be added again
//able to add BLANK DATA
//want to press ENTER & handle event to send data