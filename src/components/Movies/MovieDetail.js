import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const SINGLEMOVIE = gql`
    query SingleMovie($id:ID!){
        getMovieById(id:$id){
          _id,
          title,
          sipnosis,
          categories,
          director  
        }
    }
`

export default class MovieDetail extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            id:props.match.params.id     
        }
    }

    render() { 
        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Query query={SINGLEMOVIE} variables={{id:this.state.id}}>
                            {
                                ({loading,data,error})=>{
                                    if(error) return <h4>{error}</h4>
                                    if(loading) return <h2>Loading...</h2>
                                    return(
                                        <React.Fragment>
                                            <h1>{data.getMovieById.title}</h1>
                                            <h2>{data.getMovieById.content}</h2>
                                            <h4>{data.getMovieById.category}</h4>
                                            <h4>{data.getMovieById.author.first_name}</h4>
                                        </React.Fragment>
                                    )
                                }
                            }
                        </Query>                        
                    </div>
                </div>
            </div>
         );
    }
}