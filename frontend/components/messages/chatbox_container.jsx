
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChatBox from './chatbox';
import { selectMessages, selectAllGroups } from '../../reducers/selectors';
import { requestAllGroups } from '../../actions/group_actions';


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
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatBox));