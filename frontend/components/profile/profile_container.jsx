import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import ProfileShow from './profile_show';
import {requestUser, requestAllUsers, updateUser} from '../../actions/user_actions';
import { selectMoments } from '../../reducers/selectors';


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
   updateUser: user => dispatch(updateUser(user))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileShow));