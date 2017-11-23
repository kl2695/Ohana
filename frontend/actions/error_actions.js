export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'; 
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS'; 
export const RECEIVE_GROUP_ERRORS = 'RECEIVE_GROUP_ERRORS';
export const RECEIVE_MOMENT_ERRORS = 'RECEIVE_MOMENT_ERRORS';

export const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS, 
    errors

});

export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS, 
});

export const receiveGroupErrors = errors => ({
    type: RECEIVE_GROUP_ERRORS, 
    errors
});

export const receiveMomentErrors = errors => ({
    type: RECEIVE_MOMENT_ERRORS, 
    errors
});


