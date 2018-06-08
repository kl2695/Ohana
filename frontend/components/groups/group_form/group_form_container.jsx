import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GroupForm from './group_form';
import { requestGroup, createGroup } from "../../../actions/group_actions";


const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
    errors: state.errors.groups, 
});

const mapDispatchToProps = dispatch => {

    return {
        createGroup: group => dispatch(createGroup(group))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupForm));