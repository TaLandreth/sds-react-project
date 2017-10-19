import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import '../App.css'

export default class Book extends Component {

    render() {

        return (
                <div className="table-display" key={this.props.book.id}>
                    <div className="book-div" key={this.props.book.author}>{this.props.book.author}</div>
                    <div className="book-div" key={this.props.book.title}>{this.props.book.title}</div>
                    <div className="book-div" key={this.props.book.genre}>{this.props.book.genre}</div>
                    <div className="book-div" key={this.props.book.year}>{this.props.book.year}</div>
                    <MediaQuery query="(min-device-width: 1224px)">
                    <div className="action-div"><button
                        onClick={this.props.onEdit.bind(this, this.props.book)}>Edit</button>
                    <button
                        onClick={this.props.onDelete.bind(this, this.props.book)}>Delete</button></div>
                        </MediaQuery>
                </div>
                                    
        )//end return
    }//end render
}//end class
