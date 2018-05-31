
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChatBox from './chatbox';
import { requestGroup, deSelectGroup, updateGroup } from '../../actions/group_actions';
import { selectUsers, selectMoments, selectMessages, selectCurrentMessages } from '../../reducers/selectors';
import { createMessage } from '../../actions/message_actions';


const mapStateToProps = (state, ownProps) => {

    console.log(state);
    console.log(ownProps);
    return {
        currentUser: state.session.currentUser,
        errors: state.errors.groups,
        groupId: ownProps.groupId,
        group: ownProps.group, 
        users: ownProps.users, 
        messages: state.entities.messages,
        selectedMessages: ownProps.selectedMessages,
        currentMessagesArr: selectCurrentMessages(state),
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