import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import loader from '../../common/loading.gif';
import { Link } from 'react-router-dom';

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
                                    if(loading) return <img src={loader}/>
                                    return(
                                        <React.Fragment>
                                            <h1>{data.getMovieById.title}</h1>
                                            <h2>{data.getMovieById.content}</h2>
                                            <h4>{data.getMovieById.category}</h4>
                                            <h4>{data.getMovieById.author.first_name}</h4>
                                            <br/>
                                            <br/>
                                            {/* <img src={data.getMovieById.author.profile_image} height="42" width="42"/> */}
                                            <Link to={`/users/${data.getMovieById.author._id}`}>
                                                <h3>{data.getMovieById.author.first_name} {data.getMovieById.author.last_name}</h3>
                                            </Link>
                                            <h3>{data.getMovieById.author.email}</h3>
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