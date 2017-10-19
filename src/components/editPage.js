import React, { Component } from 'react'
import '../App.css'

export default class EditPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editFlag: false,
            //Edit Fields
            id: this.props.editBook.id,
            author: this.props.editBook.author,
            title: this.props.editBook.title,
            genre: this.props.editBook.genre,
            year: this.props.editBook.year,

        }
    }

    changeInputs = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
            return (
                <div className="edit-display">
                    <h1>Editing:</h1>
                    <input type="hidden" value={this.props.editBook.id} />

                    <input type="text" value={this.state.author}
                        name="author" placeholder="Author" onChange={this.changeInputs} /><br />

                    <input type="text" value={this.state.title}
                        name="title" placeholder="Title" onChange={this.changeInputs} /><br />

                    <input type="text" value={this.state.genre}
                        name="genre" placeholder="Genre" onChange={this.changeInputs} /><br />

                    <input type="text" value={this.state.year}
                        name="year" placeholder="Year" onChange={this.changeInputs} /> <br />

                    <div className="edit-btns">
                        <button onClick={this.props.onSave.bind(
                            this, this.props.editBook.id,
                            this.state.author,
                            this.state.title,
                            this.state.genre,
                            this.state.year)}>Save</button>
                        <button onClick={this.props.onCancel}>Cancel</button>
                    </div>
                </div>)//end return
    }// end render
}//end BookShelf component