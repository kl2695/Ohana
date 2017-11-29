
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import GroupShow from './group_show';
// import { requestGroup, updateGroup } from "../../../actions/group_actions";
// import { selectUsers, selectMoments, selectMessages } from "../../../reducers/selectors";
// import { createComment } from '../../../actions/comment_actions';
// import { createLike } from '../../../actions/like_actions';


// const mapStateToProps = (state, ownProps) => {

//     return {

//         currentUser: state.session.currentUser,
//         errors: state.errors.groups,
//         groupId: ownProps.match.params.groupId,
//         usersArr: selectUsers(state),
//         users: state.entities.users,
//         groups: state.entities.groups,
//         moments: selectMoments(state),
//         messages: state.entities.messages,
//         messagesArr: selectMessages(state),
//     };

// };

// const mapDispatchToProps = dispatch => {

//     return {
//         requestGroup: groupId => dispatch(requestGroup(groupId)),
//         updateGroup: group => dispatch(updateGroup(group)),
//         createComment: comment => dispatch(createComment(comment)),
//         createLike: like => dispatch(createLike(like))
//     };
// };

// export default withRouter(connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(GroupShow));