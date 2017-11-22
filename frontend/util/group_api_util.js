
export const fetchGroups = () => {
    return $.ajax({
        url: '/api/groups',
        method: 'GET',
    });
};

export const fetchGroup = group => {
    return $.ajax({
        url: `/api/groups/${group.id}`,
        method: 'POST',
        data: { group },
    });
};

export const createGroup = group => {
    return $.ajax({
        url: '/api/groups',
        method: 'POST',
        data: { group }
    });
};
export const updateGroup = group => {
    return $.ajax({
        url: `/api/groups/${group.id}`,
        method: 'PATCH',
        data: { group }
    });
};
export const deleteGroup = group => {
    return $.ajax({
        url: `/api/groups/${group.id}`,
        method: 'DELETE',
    });
};


