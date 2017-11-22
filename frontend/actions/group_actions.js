
import * as GroupApiUtil from "../util/group_api_util";
import { receiveSessionErrors, receiveGroupErrors } from "./error_actions";

export const RECEIVE_ALL_GROUPS = 'RECEIVE_ALL_GROUPS';
export const RECEIVE_CURRENT_GROUP = 'RECEIVE_CURRENT_GROUP';
export const REMOVE_GROUP = 'REMOVE_GROUP';






export const receiveAllGroups = groups => ({
    type: RECEIVE_ALL_GROUPS,
    groups,
});
export const receiveCurrentGroup = group => ({
    type: RECEIVE_CURRENT_GROUP,
    group,
});

export const removeGroup = group => ({
    type: REMOVE_GROUP, 
    group 
});

export const requestGroups = () => dispatch => {
    return GroupApiUtil.fetchGroups()
        .fail(errors => dispatch(receiveGroupErrors(errors.responseJSON)))
        .then(group => dispatch(receiveCurrentGroup(group)));
};

export const requestGroup = (formGroup) => dispatch => {
    return GroupApiUtil.login(formGroup)
        .fail(errors => dispatch(receiveGroupErrors(errors.responseJSON)))
        .then(group => dispatch(receiveCurrentGroup(group)));
};

export const createGroup = (formGroup) => dispatch => {
    return GroupApiUtil.createGroup(formGroup)
        .fail(errors => dispatch(receiveGroupErrors(errors.responseJSON)))
        .then(group => dispatch(receiveCurrentGroup(group)));
};
export const updateGroup = (formGroup) => dispatch => {
    return GroupApiUtil.updateGroup(formGroup)
        .fail(errors => dispatch(receiveGroupErrors(errors.responseJSON))) 
        .then(group => dispatch(receiveCurrentGroup(group)));
};
export const deleteGroup = (formGroup) => dispatch => {
    return GroupApiUtil.deleteGroup(formGroup)
        .fail(errors => dispatch(receiveGroupErrors(errors.responseJSON)))
        .then(group => dispatch(receiveCurrentGroup(group)));
};
