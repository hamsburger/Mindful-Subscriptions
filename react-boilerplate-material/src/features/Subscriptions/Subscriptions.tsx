import React, { useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ISubActionTypes, ISubActionCreator, ISubState } from 
'models/ISubscriptions';


function Subscriptions(){
    // const store = useStore();
    // const dispatch = useDispatch();

    // // store.subscriptions
    // // dispatch({ type : ISubActionTypes.ADD});

    // return (
    //     <Grid container spacing={2}>
    //         <Grid justifyContent="space-between">

    //         </Grid>
    //     </Grid>
    // );
    return (
        <div>
            Subscriptions
        </div>
    );
}

export default Subscriptions;