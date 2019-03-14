import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import MovieCard from './MovieCard';
import loader from '../../common/loading.gif'

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
                <Query query = {ALLMOVIES}>
                       {
                           ({data, error, loading}) => {
                               if(error) return <h4>{error}</h4>
                               if(loading) return <img src={loader}/>
                               const movie = data.Movie.map((movie, index) => (
                                   <div className="row" index={index}>
                                        {/* <MovieCard
                                            id={movie._id}
                                            title={movie.title}
                                            // first_name={movie.author.first_name}
                                        /> */}
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
        )
    }
}