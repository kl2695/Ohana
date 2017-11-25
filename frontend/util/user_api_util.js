
export const fetchAllUsers = () => {
    return $.ajax({
        url: '/api/users',
        method: 'GET',
    });
};

export const fetchUser = user => {
    return $.ajax({
        url: `/api/users/${user.id}`,
        method: 'GET',
        data: { user },
    });
};

