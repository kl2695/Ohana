
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChatSideBar from './chat_sidebar';
import { selectMessages, selectAllGroups } from '../../reducers/selectors';
import { requestAllGroups, selectGroup } from '../../actions/group_actions';

const mapStateToProps = (state, ownProps) => {

    return {
        currentUser: state.session.currentUser,
        errors: state.errors.groups,
        groups: selectAllGroups(state),
        currentGroup: state.entities.groups.currentGroup,
        messages: state.entities.messages,
        messagesArr: selectMessages(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestAllGroups: () => dispatch(requestAllGroups()),
        selectGroup: (groupId) => dispatch(selectGroup(groupId)),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatSideBar));