
import { connect } from "react-redux";
import MomentsIndex from './moments_index';
import { login, logout, signup } from "../../actions/session_actions";
import { clearSessionErrors } from "../../actions/error_actions";


const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => {

    return {
        login: user => dispatch(login(user)),
        signup: user => dispatch(signup(user)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MomentsIndex);