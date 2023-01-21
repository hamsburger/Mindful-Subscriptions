import React, { useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ISubActionTypes, ISubActionCreator, ISubState } from 
'models/ISubscriptions';


function Subscriptions(){
    const store = useStore();
    const dispatch = useDispatch();

    // dispatch({ type : ISubActionTypes.ADD});
    return (
        <div>
         "Subscriptions"   
        </div>
    );
}

export default Subscriptions;