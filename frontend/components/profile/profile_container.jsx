import { connect } from "react-redux";
import ProfileIndex from '../profile/profile_index';
import { login, logout, signup } from "../../actions/session_actions";


const mapStateToProps = state => ({
   
});

const mapDispatchToProps = dispatch => ({
   
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileIndex);