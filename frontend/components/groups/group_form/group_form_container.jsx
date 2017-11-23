import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GroupForm from './group_form';
import { requestGroup } from "../../../actions/group_actions";
import { selectAllGroups } from "../../../reducers/selectors";


const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
    errors: state.errors.groups, 
});

const mapDispatchToProps = dispatch => {

    return {
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupForm));