
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GroupShowMoments from './group_show_moments';
import { requestGroup, updateGroup } from "../../../../actions/group_actions";
import { selectUsers, selectMoments } from "../../../../reducers/selectors";
import { createComment } from '../../../../actions/comment_actions';
import { createLike } from '../../../../actions/like_actions';


const mapStateToProps = (state, ownProps) => {
    console.log("groupshowcontainer state");
    console.log(state);

    return {

        currentUser: state.session.currentUser,
        errors: state.errors.groups,
        groupId: ownProps.match.params.groupId,
        usersArr: selectUsers(state),
        users: state.entities.users,
        groups: state.entities.groups,
        currentGroup: state.entities.groups.currentGroup,
        moments: selectMoments(state),
        messages: state.entities.messages, 
    };

};

const mapDispatchToProps = dispatch => {

    return {
        requestGroup: groupId => dispatch(requestGroup(groupId)),
        updateGroup: group => dispatch(updateGroup(group)),
        createComment: comment => dispatch(createComment(comment)),
        createLike: like => dispatch(createLike(like))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupShowMoments));