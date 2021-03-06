
import { connect } from "react-redux";
import CommentsIndex from './comments_index';
import { requestAllMoments } from "../../../actions/comment_actions";
import {selectAllMoments} from '../../../reducers/selectors';


const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
    errors: state.errors.session, 
    moments: selectAllMoments(state),
});

const mapDispatchToProps = dispatch => {
    return {
        requestAllMoments: moments => dispatch(requestAllMoments(moments))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentsIndex);