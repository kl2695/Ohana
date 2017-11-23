
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GroupShow from './group_show';
import { requestGroup } from "../../../actions/group_actions";
import { selectAllGroups } from "../../../reducers/selectors";


const mapStateToProps = (state, ownProps) => {

return {

    currentUser: state.session.currentUser,
    errors: state.errors.groups, 
    groupId: ownProps.match.params.groupId,
    group: state.entities.groups
    };
};

const mapDispatchToProps = dispatch => {

    return {
        requestGroup: group => dispatch(requestGroup(group))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupShow));