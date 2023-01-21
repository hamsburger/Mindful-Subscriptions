/* eslint-disable */

import { ISubActionTypes, ISubActionCreator, ISubState } from 'models/ISubscriptions';

const initialState : ISubState = {
    data: JSON.parse(localStorage.getItem("data") || "{}")
}

// Assume one person can only have one account per company.

// IN THE FUTURE: Produce multiple subscription reports 
const reducer = (state = initialState, { type, payload } : ISubActionCreator) => {
    let newState;

    switch(type){
        case ISubActionTypes.ADD:
            newState = { 
                ...(state),
                data: [
                    ...(state.data),
                    payload
                ]
            }
            
            return newState;
        case ISubActionTypes.DELETE:
            newState = {
                ...(state),
                data: [
                    ...(state.data.filter(subscription => subscription["company"] !== payload["company"]))
                ]
            }
            return newState;
        case ISubActionTypes.EDIT:
            newState = {
                ...(state),
                data : [
                    state.data.map(subscription => {
                        return (
                            subscription["company"] === payload["company"] 
                            ? payload : subscription
                        )
                    }) 
                ]
            }
            return newState;
        
        case ISubActionTypes.REVERT:
            return JSON.parse(localStorage.getItem("data") || "{}");
        
        case ISubActionTypes.SAVE:
            return localStorage.setItem("data", JSON.stringify(newState));
    }
};

export default reducer; 