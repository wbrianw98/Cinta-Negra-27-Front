import React, { Component } from 'react';

export default class MovieCard extends Component {
    render() { 
        return (
            <div className="card">
                <div className="card-title">
                    <a href={`/movie/${this.props.id}`}>
                        <h1>{this.props.title}</h1>
                    </a>
                </div>
                <div className="card-content">
                    <span className="card-title">
                        {this.props.first_name}
                    </span>
                </div>
            </div>
         );
    }
}