import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";

const MOVIE_REGISTER = gql`
mutation createMovie($title:String!,$duration:String,$categories:String!,$sipnosis:String!,$director:String!){
    createMovie(
        data:{
            title:$title,
            duration:$duration,
            categories:$categories,
            sinopsis:$sipnosis,
            director:$director
        }){
            _id
            is_active
            title
            sinopsis
        }
    }
}
`;

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            category: 'ACCION'
        }
    }
    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox'
            ? target.checked
            : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => console.log(this.state))
    }

    handleCreateMovie = (event, createMovie) => {
        event.preventDefault();
        createMovie({ variables: { ...this.state } })
    }

    render() {
        return (
            <div>
                <Mutation mutation={MOVIE_REGISTER}>
                    {
                        (createMovie, { data, error }) => {
                            if (data) console.log('data: ', data)
                            if (error) console.log('error: ', error)
                            return (
                                <form onSubmit={event => this.handleCreateMovie(event, createMovie)}>
                                    Titulo: <input name='title' type="text" onChange={this.handleChange}></input>
                                    desc: <input name='content' type="text" onChange={this.handleChange}></input>
                                    <button
                                        type="submit"
                                        className="waves-effect waves-light btn btn-primary">
                                        registrar movie
                                    </button>
                                </form>
                            );
                        }
                    }

                </Mutation>
            </div>
        );
    }
}

export default Home;