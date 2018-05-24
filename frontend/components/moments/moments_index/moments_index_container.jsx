
import { connect } from "react-redux";
import MomentsIndex from './moments_index';
import { requestAllMoments } from "../../../actions/moment_actions";
import { requestAllUsers } from "../../../actions/user_actions";
import { clearSessionErrors } from "../../../actions/error_actions";
import { createComment } from "../../../actions/comment_actions";
import { createLike } from '../../../actions/like_actions';
import { requestAllMessages } from '../../../actions/message_actions';
import { selectMoments } from '../../../reducers/selectors';



const mapStateToProps = (state, ownProps) => {
    
        return {
            currentUser: state.session.currentUser,
            errors: state.errors.session, 
            moments: selectMoments(state).reverse(),
            users: state.entities.users, 
            comments: state.entities.comments 
        };
};

const mapDispatchToProps = dispatch => {

    return {
        requestAllMoments: () => dispatch(requestAllMoments()),
        requestAllMessages: () => dispatch(requestAllMessages()), 
        requestAllUsers: () => dispatch(requestAllUsers()), 
        createComment: comment => dispatch(createComment(comment)), 
        createLike: like => dispatch(createLike(like)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MomentsIndex);