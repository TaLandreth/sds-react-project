import React, { Component } from 'react'
import '../App.css';
//import BookModel from "../models/bookmodel"

export default class TableData extends Component {

    render() {
        
        return (
            <div className="table-display">
                    <table>
                    <tbody>
                    <tr><td colSpan="6">Books:</td></tr>
                    <tr><td>Author</td><td>Title</td><td>Genre</td><td>Year</td><td colSpan="2">Actions:</td></tr>
                    {this.props.books.map((b) => 
                    <tr>
                    <td key={b.author}>{b.author}</td>
                    <td key={b.title}>{b.title}</td>
                    <td key={b.genre}>{b.genre}</td>
                    <td key={b.year}>{b.year}</td>
                    <td className="actions"><button onClick={this.props.onEdit.bind(this, b)}>Edit</button></td>
                    <td className="actions"><button onClick={this.props.onDelete.bind(this, b, this.props.books)}>Delete</button></td>                    
                    </tr>)}
                    <tr><td colSpan="6" className="actions">
                        <button onClick={this.props.onAdd}>Add A Book</button></td></tr>
                    </tbody>
                 </table>

            </div>

        )//end return
    }//end render
}//end class