
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GroupShow from './group_show';
import { selectUsers, selectMoments, selectMessages, selectAllGroups } from "../../../reducers/selectors";
import { requestGroup, updateGroup, requestAllGroups } from "../../../actions/group_actions";
import { createComment } from '../../../actions/comment_actions';
import { createLike } from '../../../actions/like_actions';


const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.session.currentUser,
        errors: state.errors.groups, 
        groupId: ownProps.match.params.groupId,
        usersArr: selectUsers(state),
        users: state.entities.users, 
        groups: selectAllGroups(state),
        currentGroup: state.entities.groups.currentGroup,
        moments: selectMoments(state), 
        messages: state.entities.messages,
        messagesArr: selectMessages(state),
    };

};

const mapDispatchToProps = dispatch => {
    return {
        requestAllGroups: () => dispatch(requestAllGroups()), 
        requestGroup: groupId => dispatch(requestGroup(groupId)), 
        updateGroup: group => dispatch(updateGroup(group)), 
        createComment: comment => dispatch(createComment(comment)), 
        createLike: like => dispatch(createLike(like))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupShow));