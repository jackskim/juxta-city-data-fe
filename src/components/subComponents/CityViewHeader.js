import React from 'react';
import styled from 'styled-components'
import fullheart from '../../assets/fullheart.png'

import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

const styles = makeStyles(theme => ({
    root: {
        height: 350,
        margin: '0 auto',
    },
    HeadingBox: {
        display: 'flex',
        alignItems: 'center',
        margin: '25px 0 0 80px'
    },
    Heart : {
            width: 20,
            height: 18
        },
    Heading: {
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 24,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20
    },
    Note: {
        marginLeft: 80,
        fontWeight: 500,
        fontSize: 16
    }
}));

export default function CityViewHeader(props){
    console.log(props)
    const classes = styles();
    return(
        <div className={classes.root}>
            <div className={classes.HeadingBox}>
                <img className={classes.Heart} src={fullheart}/>
               <h3 className={classes.Heading}>{props.cityData.city}</h3> 
            </div>
            <p className={classes.Note}>Population: {props.cityData.population}</p>
        </div>
    )
}