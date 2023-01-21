export const ISubActionTypes = {
    ADD: 'SUBSCRIPTION/ADD',
    DELETE: 'SUBSCRIPTION/DELETE',
    EDIT: "SUBSCRIPTION/EDIT"
};

export type ISubState = {
    data : []
}

export type ISubActionCreator = {
    type: string; 
    payload: any;
}