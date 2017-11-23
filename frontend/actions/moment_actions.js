
import * as MomentApiUtil from "../util/moment_api_util";
import { receiveSessionErrors, receiveMomentErrors } from "./error_actions";

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

export const requestAllMoments = () => dispatch => {
    return MomentApiUtil.fetchAllMoments()
        .fail(errors => dispatch(receiveMomentErrors(errors.responseJSON)))
        .then(moments => dispatch(receiveAllMoments(moments)));
};

export const requestMoment = (momentId) => dispatch => {
    return MomentApiUtil.fetchMoment(momentId)
        .fail(errors => dispatch(receiveMomentErrors(errors.responseJSON)))
        .then(moment => dispatch(receiveCurrentMoment(moment)));
};

export const createMoment = (formMoment) => dispatch => {
    return MomentApiUtil.createMoment(formMoment)
        .fail(errors => dispatch(receiveMomentErrors(errors.responseJSON)))
        .then(moment => dispatch(receiveOneMoment(moment)));
};
export const updateMoment = (formMoment) => dispatch => {
    return MomentApiUtil.updateMoment(formMoment)
        .fail(errors => dispatch(receiveMomentErrors(errors.responseJSON))) 
        .then(moment => dispatch(receiveOneMoment(moment)));
};
export const deleteMoment = (formMoment) => dispatch => {
    return MomentApiUtil.deleteMoment(formMoment)
        .fail(errors => dispatch(receiveMomentErrors(errors.responseJSON)))
        .then(moment => dispatch(receiveOneMoment(moment)));
};
