import * as MessageApiUtil from '../util/message_api_util';
import { receiveMesageErrors } from '../actions/error_actions';

export const RECEIVE_ALL_MESSAGES = 'RECEIVE_ALL_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'; 
export const RECEIVE_OPEN_CHAT = 'OPEN_CHAT';


export const receiveAllMessages = messages => ({
    type: RECEIVE_ALL_MESSAGES, 
    messages
});

export const receiveMessage = message => ({
    type: RECEIVE_MESSAGE, 
    message 
});

export const receiveOpenChat = groupId => ({
    type: RECEIVE_OPEN_CHAT, 
    groupId
});

export const createMessage = formMessage => dispatch => {
    return MessageApiUtil.createMessage(formMessage)
        .then(message => dispatch(receiveMessage(message)));
};


export const requestAllMessages = () => dispatch => {
    return MessageApiUtil.fetchAllMessages()
        .then(messages => dispatch(receiveAllMessages(messages)));
};

export const openChat = (groupId) => dispatch => {
    return dispatch(receiveOpenChat(groupId));
};
