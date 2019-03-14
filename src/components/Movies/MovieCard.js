import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class MovieCard extends Component {
    render() { 
        return (
            <div className="card">
                <div className="card-title">
                    <link href={`/movie/${this.props.id}`}>
                        <h1>{this.props.title}</h1>
                    </link>
                </div>
                <div className="card-content">
                    <span className="card-text">
                        {this.props.first_name}
                    </span>
                </div>
            </div>
         );
    }
}