/* eslint-disable */

export const ISubActionTypes = {
    ADD: 'SUBSCRIPTION/ADD',
    DELETE: 'SUBSCRIPTION/DELETE',
    EDIT: "SUBSCRIPTION/EDIT", 
    REVERT: "SUBSCRIPTION/REVERT",
    SAVE: "SUBSCRIPTION/SAVE"
};

export type ISubState = {
    data : Array<Object>;
}

export type ISubActionCreator = {
    type: string; 
    payload: any;
}