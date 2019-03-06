import { ApolloClient } from 'apollo-client'; //Cleinte graphql de apollo 
import { setContext } from 'apollo-link-context';//Setea headers ene el 
import { InMemoryCache } from 'apollo-cache-inmemory';//Cache Graphql
import { createUploadLink } from 'apollo-upload-client';

const API_URL = "http://localhost:8000"

const httplink = createUploadLink({
    uri: `${API_URL}/graphql`
    //credencials: "include" //solo se agregan cuando hay crendenciales en el backend
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('appToken');
    return {
        headers: {
            ...headers,
            authorization: token ? `JWT ${token}` : ''  
        }
    }
});

export default new ApolloClient({
    link: authLink.concat(httplink),
    cache: new InMemoryCache()
})