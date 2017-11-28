import * as MessageApiUtil from '../util/message_api_util';

export const RECEIVE_ALL_MESSAGES = 'RECEIVE_ALL_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'; 


export const receiveAllMessages = messages => ({
    type: RECEIVE_ALL_MESSAGES, 
    messages
});

export const receiveMessage = message => ({
    type: RECEIVE_MESSAGE, 
    message 
});

export const createMessage = formMessage => dispatch => {
    return MessageApiUtil.createMessage(formMessage)
    .then(message => dispatch(receiveMessage(message)));
};

