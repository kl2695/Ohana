

export const fetchAllGroups = () => {
    return $.ajax({
        url: '/api/groups',
        method: 'GET',
    });
};

export const fetchGroup = groupId => {
    return $.ajax({
        url: `/api/groups/${groupId}`,
        method: 'GET',
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

