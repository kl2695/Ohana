
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GroupShow from './group_show';
import { requestGroup, updateGroup } from "../../../actions/group_actions";
import { selectAllGroups } from "../../../reducers/selectors";


const mapStateToProps = (state, ownProps) => {

return {

    currentUser: state.session.currentUser,
    errors: state.errors.groups, 
    groupId: ownProps.match.params.groupId,
    group: state.entities.groups[ownProps.match.params.groupId]
    };
};

const mapDispatchToProps = dispatch => {

    return {
        requestGroup: group => dispatch(requestGroup(group)), 
        updateGroup: group => dispatch(updateGroup(group))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupShow));