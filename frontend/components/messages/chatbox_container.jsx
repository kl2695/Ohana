
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChatBox from './chatbox';
import { requestGroup } from '../../actions/group_actions';
import { selectUsers, selectMoments, selectMessages, selectCurrentMessages } from '../../reducers/selectors';
import { createMessage } from '../../actions/message_actions';


const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        currentUser: state.session.currentUser,
        errors: state.errors.groups,
        groupId: ownProps.groupId,
        users: ownProps.users, 
        currentGroup: state.entities.groups.currentGroup,
        messages: state.entities.messages,
        selectedMessages: ownProps.selectedMessages,
    };

};

const mapDispatchToProps = dispatch => {

    return {
        requestGroup: groupId => dispatch(requestGroup(groupId)),
        createMessage: message => dispatch(createMessage(message)),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatBox));