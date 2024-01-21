import React, { useRef, useEffect } from 'react';
import { Autocomplete, loadScript } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useLazyQuery, gql } from '@apollo/client';
import useStyles from './styles';

const FIND_PLACE_BY_NAME = gql`

query findPlaceByName($input: String!, $apiKey: String!) {
    findPlaceByName(input: $input, apiKey: $apiKey) {
      candidates {
        formatted_address
        geometry {
          location {
            lat
            lng
          }
          viewport {
            northeast {
              lat
              lng
            }
            southwest {
              lat
              lng
            }
          }
        }
        name
        opening_hours {
          open_now
        }
        rating
      }
      status
    }
  } 
`;

function checkIfInNewYork() {

}

const Header = ({ searchQuery, onSearch, onPlaceSelect }) => {
    const classes = useStyles();
    const autocompleteRef = useRef(null);
    const [findPlace, { loading, error, data }] = useLazyQuery(FIND_PLACE_BY_NAME);

    useEffect(() => {
        if (data) {
            console.log(data);
            // Process your data here
        }
        if (error) {
            console.error(error);
        }
    }, [data, error]);


    const handleSubmit = (e) => {
        e.preventDefault();
        // Your logic when the form is submitted
        console.log('Form submitted with search query:', searchQuery);

        let input = " ";
        if(searchQuery){
            input = searchQuery;
        }
        
        console.log(input);

        findPlace({
            variables: { input: input, apiKey: "AIzaSyBzxmHTkERSiiHFwiRkrfjEuUYU_GtX2fk" },
          });
        

    };


    return (
        <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
            <Typography variant='h5' className={classes.title}>
            City Safe
            </Typography>
            <Box display="flex">
            <Typography variant='h6' className={classes.title}>
                Explore Destinations
            </Typography>

                <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>

                <form onSubmit={handleSubmit}>
                <InputBase
                    placeholder='Search...'
                    classes={{ root: classes.inputRoot, input: classes.inputInput }}
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                />
                </form>

                </div>

            </Box>
        </Toolbar>
        </AppBar>
    );
};

export default Header;
