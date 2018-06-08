
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChatBox from './chatbox';
import { requestGroup, deSelectGroup, updateGroup } from '../../actions/group_actions';
import { selectUsers, selectMoments, selectMessages, selectCurrentMessages } from '../../reducers/selectors';
import { createMessage } from '../../actions/message_actions';


const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.session.currentUser,
        errors: state.errors.groups,
        groupId: ownProps.groupId,
        group: ownProps.group, 
        users: state.entities.users,
        selectedMessages: ownProps.selectedMessages,
        newMessages: state.selected.messages[ownProps.groupId],
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestGroup: groupId => dispatch(requestGroup(groupId)),
        createMessage: message => dispatch(createMessage(message)),
        deSelectGroup: groupId => dispatch(deSelectGroup(groupId)), 
        updateGroup: group => dispatch(updateGroup(group)),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatBox));