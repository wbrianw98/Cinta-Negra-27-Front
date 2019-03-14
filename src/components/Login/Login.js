import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Input } from '../../common/input';
import './Login.css'
import netflix from '../../common/netflix.jpg'

const LOGIN = gql`
    mutation LOGIN($email:String!, $password:String!){
        login(email:$email, password:$password){
            token
        }
    }
`
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email:"",
            password:""
         }
    }

    handleInput = e => {
        const { id, value } = e.target
        this.setState({
            [id]:value
        })
    }

    handleForm = (e, login) => {
        e.preventDefault();
        login({ variables: { ...this.state } });
    }

    catchData = (data) => {
        console.log(data);
        const { token } = data.login;
        localStorage.setItem("appToken", token);
        this.props.history.push('/');
    }

    catchError = error => {
        console.log(error);
    }

    render() { 
        return ( 
            <Mutation mutation={LOGIN}>
                {
                    (login, { data,error, loading }) => {
                        if(data) this.catchData(data)
                        if(error) this.catchError(error)
                        return( 
                            <div className="login-view">
                            <form className="form-login" onSubmit={e => this.handleForm(e, login)}>
                                    <p className="sesion">Inicia sesion</p>
                                    <Input 
                                        className="in"
                                        type="email"
                                        id="email"
                                        name="Email"
                                        value={this.state.email}
                                        setInput={this.handleInput}
                                        required
                                        placeholder="Correo"
                                    />
                                    <Input
                                        type="password"
                                        id="password"
                                        name="Password"
                                        value={this.state.password}
                                        setInput={this.handleInput}
                                        required
                                        placeholder="Pass"
                                    />
                                <button type="submit" className="btn btn-success">
                                    Iniciar Sesión
                                </button>
                            </form>
                            </div>
                        );
                    }
                }
            </Mutation>
         );
    }
}
 
export default Login;