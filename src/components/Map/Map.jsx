import React from 'react'; 
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
// import Rating from '@matieral-ui/lab';

import useStyles from './styles';

const Map = () => {
    
    const classes = useStyles(); 
    const isMobile = useMediaQuery('(min-width:600px)');
    
    
    const coordinates = {lat: 40.7766, lng: -73.97};

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys = {{ key: 'AIzaSyBWFscpF1yxirghDkSbah9-UNFEnukoaMQ' }}
                defaultCenter = {coordinates}
                center = {coordinates}
                defaultZoom = {5}
                margin = {[50, 50, 50, 50]}
                options = {''}
                onChange = {''}
                region = {'NYC'}
                zoom = {16}
                heading = {0}

                onChildClick = {''}>
            </GoogleMapReact>
        </div>
    );
}

export default Map;

