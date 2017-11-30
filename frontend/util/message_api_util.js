
export const fetchAllMessages = () => {
    return $.ajax({
        url: '/api/users', 
        method: 'GET',
    });
};

export const createMessage = message => {
    return $.ajax({
        url: '/api/messages', 
        method: 'POST', 
        data: { message },
    });
};

 
