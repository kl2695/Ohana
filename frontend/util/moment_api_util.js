

export const fetchAllMoments = position => {
    return $.ajax({
        url: '/api/moments',
        method: 'GET',
        data: { position },
    });
};

export const fetchMoment = momentId => {
    return $.ajax({
        url: `/api/moments/${momentId}`,
        method: 'GET',
    });
};



export const createMoment = moment => {
    return $.ajax({
        url: '/api/moments',
        method: 'POST',
        data: { moment }
    });
};
export const updateMoment = moment => {
    return $.ajax({
        url: `/api/moments/${moment.id}`,
        method: 'PATCH',
        data: { moment }
    });
};
export const deleteMoment = moment => {
    return $.ajax({
        url: `/api/moments/${moment.id}`,
        method: 'DELETE',
    });
};

