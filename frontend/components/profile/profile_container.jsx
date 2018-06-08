import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import ProfileShow from './profile_show';
import {requestUser, requestAllUsers, updateUser} from '../../actions/user_actions';
import { selectMoments } from '../../reducers/selectors';
import { createComment } from '../../actions/comment_actions';
import { createLike, deleteLike } from '../../actions/like_actions';


const mapStateToProps = (state, ownProps) => {
    return {    
        moments: selectMoments(state),
        userId: ownProps.match.params.userId, 
        currentUser: state.session.currentUser, 
        users: state.entities.users, 
        groups: state.entities.groups 
    };
};

const mapDispatchToProps = dispatch => ({
   requestUser: userId => dispatch(requestUser(userId)), 
   requestAllUsers: () => dispatch(requestAllUsers()), 
   updateUser: user => dispatch(updateUser(user)), 
   createComment: comment => dispatch(createComment(comment)), 
   createLike: like => dispatch(createLike(like)),
   deleteLike: like => dispatch(deleteLike(like)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileShow));