import React,  { useState }  from 'react'; 
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { ApolloClient, InMemoryCache, ApolloProvider, } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (true) {  
  loadDevMessages();
  loadErrorMessages();
}

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql', // Replace with your GraphQL API URI
    cache: new InMemoryCache(),
  });

const App = () => {


    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPlace, setSelectedPlace] = useState(null);

    const handleSearch = (query) => {
        // Update the searchQuery state when the search bar changes
        setSearchQuery(query);
    };

    const handlePlaceSelect = (place) => {
        // Update the selectedPlace state when a place is selected
        setSelectedPlace(place);
    };

    return (
        <>
            <ApolloProvider client={client}>
            <CssBaseline />

            <Header searchQuery={searchQuery} onSearch={handleSearch} onPlaceSelect={handlePlaceSelect}/>

            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12} md={4}> 
                    <List /> 
                </Grid>

                <Grid item xs={12} md={8}> 
                    <Map searchQuery={searchQuery} selectedPlace={selectedPlace}/> 
                </Grid>

            </Grid>
            </ApolloProvider>
        </>
    );
}

export default App; 