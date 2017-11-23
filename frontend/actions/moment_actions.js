
import * as MomentApiUtil from "../util/moment_api_util";
import { receiveSessionErrors, receiveGroupErrors, receiveMomentErrors } from "./error_actions";

export const RECEIVE_ALL_MOMENTS = 'RECEIVE_ALL_MOMENTS';
export const RECEIVE_CURRENT_GROUP = 'RECEIVE_CURRENT_GROUP';
export const RECEIVE_ONE_GROUP = 'RECEIVE_ONE_GROUP';
export const REMOVE_GROUP = 'REMOVE_GROUP';






export const receiveAllMoments = moments => ({
    type: RECEIVE_ALL_MOMENTS,
    moments,
});
export const receiveCurrentMoment = moments => ({
    type: RECEIVE_CURRENT_GROUP,
    moments,
});

export const receiveOneMoment = moments => ({
    type: RECEIVE_ONE_GROUP, 
    moments 
});

export const removeMoment = moments => ({
    type: REMOVE_GROUP, 
    moments 
});

export const requestAllmoments = () => dispatch => {
    return MomentApiUtil.fetchAllmoments()
        .fail(errors => dispatch(receiveGroupErrors(errors.responseJSON)))
        .then(moments => dispatch(receiveAllMoments(moments)));
};

export const requestGroup = (groupId) => dispatch => {
    return MomentApiUtil.fetchGroup(groupId)
        .fail(errors => dispatch(receiveGroupErrors(errors.responseJSON)))
        .then(moment => dispatch(receiveCurrentMoment(moment)));
};

export const createmoment = (formmoment) => dispatch => {
    return MomentApiUtil.createmoment(formmoment)
        .fail(errors => dispatch(receiveMomentErrors(errors.responseJSON)))
        .then(moment => dispatch(receiveOneMoment(moment)));
};
export const updatemoment = (formmoment) => dispatch => {
    return MomentApiUtil.updatemoment(formmoment)
        .fail(errors => dispatch(receiveMomentErrors(errors.responseJSON))) 
        .then(moment => dispatch(receiveOneMoment(moment)));
};
export const deletemoment = (formmoment) => dispatch => {
    return MomentApiUtil.deletemoment(formmoment)
        .fail(errors => dispatch(receiveMomentErrors(errors.responseJSON)))
        .then(moment => dispatch(receiveOneMoment(moment)));
};
