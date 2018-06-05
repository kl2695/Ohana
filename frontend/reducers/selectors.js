export const selectAllGroups = state => {
    const groups = Object.keys(state.entities.groups).map(groupId => {
     
        return state.entities.groups[groupId];
    });
    return groups;

};
export const selectMoments = state => {
    const moments = Object.keys(state.entities.moments).map(momentId => {
     
        return state.entities.moments[momentId];
    });
    return moments;

};

export const selectUsers = state => {
    const users = Object.keys(state.entities.users).map(userId => {
        return state.entities.users[userId]; 
    });
    return users; 
};


export const selectMessages = state => {
    const messages = Object.keys(state.entities.messages).map(messageId => {
        return state.entities.messages[messageId]; 
    });
    return messages; 
};


export const selectCurrentMessages = state => {
    let messages = [];

    if(state.entities.messages.currentMessages){
        messages = Object.keys(state.entities.messages.currentMessages).map(messageId => {
            return state.entities.messages.currentMessages[messageId];
        });
    }
    return messages;
};



