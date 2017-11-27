import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import ProfileShow from './profile_show';
import {requestUser, requestAllUsers, updateUser} from '../../actions/user_actions';
import {selectMomentsByUserId} from '../../reducers/selectors';


const mapStateToProps = (state, ownProps) => {
  
    return {

    
   moments: selectMomentsByUserId(state, ownProps.match.params.userId),
   user: state.entities.users[ownProps.match.params.userId],
   currentUser: state.session.currentUser, 
   users: state.entities.users
    };
};

const mapDispatchToProps = dispatch => ({
   requestUser: userId => dispatch(requestUser(userId)), 
   requestAllUsers: () => dispatch(requestAllUsers()), 
   updateUser: user => dispatch(updateUser(user))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileShow));