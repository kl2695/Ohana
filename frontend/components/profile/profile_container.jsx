import { connect } from "react-redux";
import ProfileShow from './profile_show';
import { login, logout, signup } from "../../actions/session_actions";
import selectMomentsByUserId from '../../reducers/selectors';


const mapStateToProps = (state, ownProps) => ({
   moments: selectMomentsByUserId(state, ownProps),
   user: ownProps.user
});

const mapDispatchToProps = dispatch => ({
   
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileShow);