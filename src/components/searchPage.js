import React, { Component } from 'react'
import '../App.css'

export default class SearchPage extends Component {

    changeInputs = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="table-display">
                <table>
                    <tbody>
                        <tr><td colSpan="6">Books:</td></tr>

                        {this.props.searchResults === !null ? this.props.searchResults.map((b) =>
                            <tr key={b.id + b.author + b.title + b.genre + b.year}>
                                <td key={b.author}>{b.author}</td>
                                <td key={b.title}>{b.title}</td>
                                <td key={b.genre}>{b.genre}</td>
                                <td key={b.year}>{b.year}</td>

                                <td className="actions"><button
                                    onClick={this.props.onEditBook.bind(this, b)}>Edit</button></td>
                                <td className="actions"><button
                                    onClick={this.delete.bind(this, b)}>Delete</button></td>
                            </tr>) : <tr><td colSpan="6">"No results found"</td></tr>
                        }
                        <tr>
                            <td colSpan="6"><button onClick={this.props.onCancel}>Return</button></td></tr>
                    </tbody>
                </table>
            </div>)//end return
    }// end render
}//end BookShelf component