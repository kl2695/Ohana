export const selectAllGroups = state => {
    return Object.keys(state.entities.groups).map(group => (
        state.entities.groups[group.id]
    ));
};