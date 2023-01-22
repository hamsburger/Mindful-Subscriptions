// @ts-nocheck
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';  
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';  
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DoorbellIcon from '@mui/icons-material/Doorbell';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { ISubActionTypes, ISubActionCreator, ISubState } from 'models/ISubscriptions';

function GetRandomIcon(){
    let num = Math.floor(Math.random() * 6);
    console.log(num)
    switch(num){
        case 0:
            return <NotificationsActiveIcon/> 
        case 1:
            return <NotificationsNoneIcon/>
        case 2:
            return <DoorbellIcon/>
        case 3:
            return <LightbulbIcon/>
        case 4: 
            return <LocalAirportIcon/>
        default:
            return <ElectricBoltIcon/>
    }
}

function SubscriptionCard({ subscription, edit, deletion, setTrackEdit, setOpen } ){
    const dispatch = useDispatch();

    const editClick = () => {
        setOpen(true);
        setTrackEdit(subscription);
    }
    
    const deleteClick = () => {
        dispatch(deleteAction(subscription["company"]))
    }
    const deleteAction = (company) => (dispatch) => {
        dispatch({ type: ISubActionTypes.DELETE, payload: { "company" : company}})
    }

    return <Grid item xs={12} sx={{
        paddingX: 2,
        paddingY: 2
    }}>
        <Paper sx={{
            paddingX: 2,
            paddingY: 2
        }}>
            <Grid container item xs={12} justifyContent="space-between">
                <Grid container item flexDirection="column" xs={8}>
                    <Grid container item flexDirection="row" justifyContent="flex-start">
                        <Grid item xs={1.5}>
                            { (edit) && 
                                <Button onClick={
                                    editClick
                                }
                                startIcon={<RemoveCircleIcon sx={{ color: "orange" }}></RemoveCircleIcon>}>                                    
                                </Button>}
                            { (deletion) && 
                                <Button onClick={
                                    deleteClick
                                }
                                startIcon={<DeleteIcon sx={{ color: "red" }}></DeleteIcon>}></Button>}
                        </Grid>
                        <Grid item xs={2}>
                        <Typography variant="h2">
                            {subscription["company"]}
                        </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Divider variant="middle" sx={{
                            marginX: 1,
                            marginY: 1,
                            paddingY: 1,
                            backgroundColor: "white",
                        }}/>
                    </Grid>
                    <Grid container item justifyContent="space-between">
                        <Grid item>
                            {`Last Payment: ${subscription["lastest_payment_dt"]}`}
                        </Grid>
                        <Grid item>
                            {`Next Payment: ${subscription["next_payment_dt"]}`}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item flexDirection="column" alignItems="end" justifyContent="start" 
                    xs={4}
                    sx={{
                        marginY: 1,
                    }}>
                    <Grid item>
                        <GetRandomIcon/> 
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" fontWeight={600}>
                        {`$${subscription["cost"]} ${subscription["currency"].toUpperCase()} ${subscription["freq"]}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </Grid>
}

export default SubscriptionCard;