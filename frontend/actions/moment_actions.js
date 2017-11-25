
import * as MomentApiUtil from "../util/moment_api_util";
import { receiveSessionErrors, receiveMomentErrors } from "./error_actions";

export const RECEIVE_ALL_MOMENTS = 'RECEIVE_ALL_MOMENTS';
export const RECEIVE_CURRENT_MOMENT = 'RECEIVE_CURRENT_MOMENT';
export const RECEIVE_ONE_MOMENT = 'RECEIVE_ONE_MOMENT';
export const REMOVE_MOMENT = 'REMOVE_MOMENT';






export const receiveAllMoments = moments => ({
    type: RECEIVE_ALL_MOMENTS,
    moments,
});
export const receiveCurrentMoment = moment => ({
    type: RECEIVE_ONE_MOMENT,
    moment,
});

export const receiveOneMoment = moment => ({
    type: RECEIVE_ONE_MOMENT, 
    moment
});

export const removeMoment = moment => ({
    type: REMOVE_MOMENT, 
    moment
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
