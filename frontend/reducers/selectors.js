export const selectAllGroups = state => {
    const groups = Object.keys(state.entities.groups).map(groupId => {
     
        return state.entities.groups[groupId];
    });
    return groups;

};
export const selectAllMoments = state => {
    const moments = Object.keys(state.entities.moments).map(momentId => {
     
        return state.entities.moments[momentId];
    });
    return moments;

};
