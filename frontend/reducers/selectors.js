export const selectAllGroups = state => {
    console.log(state);
    const groups = Object.keys(state.entities.groups).map(groupId => {
     
        return state.entities.groups[groupId];
    });
    return groups;

};