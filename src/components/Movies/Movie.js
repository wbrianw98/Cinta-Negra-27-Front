import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import MovieCard from './MovieCard';
import loader from '../../common/loading.gitf'

const ALLMOVIES = gql `
    query{
        Movie{
            title
            categories
            sipnosis
            is_active
        }
    }
`

export default class Movies extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <Query query = {ALLMOVIES}>
                       {
                           ({data, error, loading}) => {
                               if(error) return <h4>Hubo un error</h4>
                               if(loading) return <img src="../../common/loading.gif"/>
                               const movie = data.Movie.map((movie, index) => (
                                   <div index={index}>
                                    <MovieCard
                                        id={movie._id}
                                        title={movie.title}
                                        // first_name={movie.author.first_name}
                                    />
                                   </div>
                               ))
                                return(
                                    <React.Fragment>
                                        {movie}
                                    </React.Fragment>
                                )
                           }
                       } 
                    </Query>
                </div>
            </div>
        )
    }
}