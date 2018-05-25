
import * as GroupApiUtil from "../util/group_api_util";
import { receiveSessionErrors, receiveGroupErrors } from "./error_actions";

export const RECEIVE_ALL_GROUPS = 'RECEIVE_ALL_GROUPS';
export const RECEIVE_CURRENT_GROUP = 'RECEIVE_CURRENT_GROUP';
export const RECEIVE_ONE_GROUP = 'RECEIVE_ONE_GROUP';
export const REMOVE_GROUP = 'REMOVE_GROUP';






export const receiveAllGroups = payload => ({
    type: RECEIVE_ALL_GROUPS,
    groups: payload.groups, 
    users: payload.users, 
    messages: payload.messages,
});
export const receiveCurrentGroup = payload => ({
    type: RECEIVE_CURRENT_GROUP,
    groups: payload.groups, 
    users: payload.users, 
    moments: payload.moments, 
    messages: payload.messages,
});

export const receiveOneGroup = payload => ({
    type: RECEIVE_ONE_GROUP, 
    groups: payload.groups, 
    users: payload.users, 
    moments: payload.moments, 
    messages: payload.messages,
});

export const removeGroup = group => ({
    type: REMOVE_GROUP, 
    group 
});

export const requestAllGroups = () => dispatch => {
    return GroupApiUtil.fetchAllGroups()
        .fail(errors => dispatch(receiveGroupErrors(errors.responseJSON)))
        .then(groups => dispatch(receiveAllGroups(groups)));
};

export const requestGroup = (groupId) => dispatch => {
    return GroupApiUtil.fetchGroup(groupId)
        .fail(errors => dispatch(receiveGroupErrors(errors.responseJSON)))
        .then(group => dispatch(receiveCurrentGroup(group)));
};

export const selectGroup = (groupId) => dispatch => {
    return GroupApiUtil.fetchGroup(groupId)
        .fail(errors => dispatch(receiveGroupErrors(errors.responseJSON)))
        .then(group => dispatch(receiveOneGroup(group)));
};

export const createGroup = (formGroup) => dispatch => {
    return GroupApiUtil.createGroup(formGroup)
        .fail(errors => dispatch(receiveGroupErrors(errors.responseJSON)))
        .then(group => dispatch(receiveOneGroup(group)));
};
export const updateGroup = (formGroup) => dispatch => {
    return GroupApiUtil.updateGroup(formGroup)
        .fail(errors => dispatch(receiveGroupErrors(errors.responseJSON))) 
        .then(group => dispatch(receiveOneGroup(group)));
};
export const deleteGroup = (formGroup) => dispatch => {
    return GroupApiUtil.deleteGroup(formGroup)
        .fail(errors => dispatch(receiveGroupErrors(errors.responseJSON)))
        .then(group => dispatch(receiveOneGroup(group)));
};
