import { ISubActionTypes, ISubActionCreator, ISubState } from 'models/ISubscriptions';

const initialState : ISubState = {
    data: []
}

// Assume one person can only have one account per company
const reducer = (state = initialState, { type, payload } : ISubActionCreator) => {
    switch(type){
        case ISubActionTypes.ADD:
            return { 
                ...(state),
                data: [
                    ...(state.data),
                    payload
                ]
            }
        case ISubActionTypes.DELETE:
            return {
                ...(state),
                data: [
                    ...(state.data.filter(subscription => subscription["company"] !== payload["company"]))
                ]
            }
        case ISubActionTypes.EDIT:
            return {
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
    }
};

export default reducer; 