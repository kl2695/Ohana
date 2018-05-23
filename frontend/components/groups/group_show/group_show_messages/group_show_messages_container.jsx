
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GroupShowMessages from './group_show_messages';
import { requestGroup, updateGroup } from '../../../../actions/group_actions';
import { selectUsers, selectMoments, selectMessages, selectCurrentMessages } from '../../../../reducers/selectors';
import { createComment } from '../../../../actions/comment_actions';
import { createLike } from '../../../../actions/like_actions';
import { createMessage } from '../../../../actions/message_actions';


const mapStateToProps = (state, ownProps) => {
    console.log(state);

    return {
        currentUser: state.session.currentUser,
        errors: state.errors.groups,
        groupId: ownProps.match.params.groupId,
        usersArr: selectUsers(state),
        users: state.entities.users,
        groups: state.entities.groups,
        currentGroup: state.entities.groups.currentGroup,
        messages: state.entities.messages,
        currentMessagesArr: selectCurrentMessages(state),
    };

};

const mapDispatchToProps = dispatch => {

    return {
        requestGroup: groupId => dispatch(requestGroup(groupId)),
        updateGroup: group => dispatch(updateGroup(group)),
        createComment: comment => dispatch(createComment(comment)),
        createLike: like => dispatch(createLike(like)), 
        createMessage: message => dispatch(createMessage(message)),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupShowMessages));