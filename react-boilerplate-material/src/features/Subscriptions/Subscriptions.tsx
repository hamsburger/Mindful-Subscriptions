// @ts-nocheck

import React, { useState, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ISubActionTypes, ISubActionCreator, ISubState } from 
'models/ISubscriptions';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import SubscriptionCard from "./SubscriptionCard";


function Subscriptions(){
    const store = useStore();
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [trackEdit, setTrackEdit] = useState({});
    const [deletion, setDelete] = useState(false);
    const [localStore, setStore] = useState(store.getState());
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    // store.subscriptions
    // dispatch({ type : ISubActionTypes.ADD});
    // useEffect(() => {
    //     dispatch({type : "init"});
    // }, [])

    const addAction = (payload) => (dispatch) => {
        dispatch({ type: ISubActionTypes.ADD, payload: payload})
    }

    const editAction = (payload) => (dispatch) => {
        dispatch({ type: ISubActionTypes.EDIT, payload: payload})
    }


    
    function EditAddForm(){
        function handleSubmit(event){
            event.preventDefault();
            setOpen(false);
            let updatedEntry = {
                "company" : event.target.company.value,
                "cost" : +event.target.cost.value,
                "currency" : event.target.currency.value,
                "freq" : event.target.frequency.value,
                "lastest_payment_dt" : event.target.latest_payment_date.value,
                "next_payment_dt" : event.target.next_payment_date.value
            }

            if (add){
                dispatch(addAction(updatedEntry))
            } else {
                dispatch(editAction(updatedEntry))
            }
        }
        return <Paper sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            paddingX: 3,
            paddingY: 3,
            minHeight: "75vh"
        }}>
        <form onSubmit={handleSubmit}>
            <Grid flexDirection="column" justifyContent="space-between" alignItems="end">
                <Grid item sx={{
                    marginY: 4
                }}>
                    <Typography variant="h4" textAlign="center">
                        { (add) && "Add Your Entry" || "Modify Your Entry" }
                    </Typography>
                </Grid>
                <Grid item marginTop={2}>
                    <TextField variant="outlined" 
                            type="text" 
                            name="company"
                            label="Company"
                            defaultValue={edit && trackEdit ? trackEdit["company"] : ""}/>
                </Grid>
                
                <Grid item marginTop={2}>
                    <TextField variant="outlined"
                            type="text"
                            name="cost"
                            label="Cost"
                            defaultValue={edit && trackEdit ? trackEdit["cost"] : ""}/>
                </Grid>

                <Grid item marginTop={2}>
                    <TextField variant="outlined"
                            type="text"
                            name="currency"
                            label="Currency"
                            defaultValue={edit && trackEdit ? trackEdit["currency"] : ""}/>
                </Grid>

                <Grid item marginTop={2}>
                    <TextField variant="outlined"
                            type="text"
                            name="frequency"
                            label="Frequency"
                            defaultValue={edit && trackEdit ? trackEdit["freq"] : ""}/>
                </Grid>

                <Grid item marginTop={2}>
                    <TextField variant="outlined"
                            type="text"
                            name="latest_payment_date"
                            label="Latest Payment Date"
                            defaultValue={edit && trackEdit ? trackEdit["lastest_payment_dt"] : ""}/>
                </Grid>

                <Grid item marginTop={2}>
                    <TextField variant="outlined"
                            type="text"
                            name="next_payment_date"
                            label="Next Payment Date"
                            defaultValue={edit && trackEdit ? trackEdit["next_payment_dt"] : ""}/>
                </Grid>
                <Grid item marginTop={4}>
                    <Button type="submit">Submit</Button>
                </Grid>
            </Grid>
            
        </form>
        </Paper>
    }

    store.subscribe(() => {
        setStore(store.getState());
    });


    return <div>
    <Modal
        open={open}
        onClose={() => setOpen(false)}
    >
        <EditAddForm/>
    </Modal>

    <Grid container spacing={2}
            sx={{
                paddingX: 3,
                paddingY: 3,
            }}>
                <Grid item container justifyContent="space-between" direction="row" flexWrap="nowrap" xs={12}>
                    <Grid item>
                        <ButtonGroup variant="contained">
                            <Button onClick={() => { setAdd(true); setDelete(false); setEdit(false); setOpen(true) } }>Add</Button>
                            <Button onClick={() => { setAdd(false); setDelete(false); setEdit(true) } }>Edit</Button>
                            <Button onClick={() => { setAdd(false); setDelete(true); setEdit(false) } }>Delete</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="input-with-icon-textfield"
                            label="TextField"
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <SearchIcon/>
                                </InputAdornment>
                            ),
                            }}
                            variant="standard"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} xs={12} md={12} sx={{
                        marginY: 1,
                    }}
                >
                    {
                        localStore.subscriptions.data.map((value) => (
                            <SubscriptionCard subscription={value}
                                              edit={edit}
                                              deletion={deletion}
                                              setTrackEdit={setTrackEdit}
                                              setOpen = {setOpen}/>
                        ))
                    }       
                        
                </Grid>
        
    </Grid>
    </div>
}

export default Subscriptions;