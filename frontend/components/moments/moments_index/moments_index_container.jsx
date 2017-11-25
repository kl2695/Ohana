
import { connect } from "react-redux";
import MomentsIndex from './moments_index';
import { requestAllMoments } from "../../../actions/moment_actions";
import { requestAllUsers } from "../../../actions/user_actions";
import { clearSessionErrors } from "../../../actions/error_actions";
import {selectAllMoments} from '../../../reducers/selectors';


const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
    errors: state.errors.session, 
    moments: selectAllMoments(state), 
    users: state.entities.users
});

const mapDispatchToProps = dispatch => {

    return {
        requestAllMoments: () => dispatch(requestAllMoments()), 
        requestAllUsers: () => dispatch(requestAllUsers())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MomentsIndex);