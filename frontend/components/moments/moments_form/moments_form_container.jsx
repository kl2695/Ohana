import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MomentForm from './moments_form';
import { requestMoment, createMoment } from "../../../actions/moment_actions";
import { selectAllGroups } from "../../../reducers/selectors";


const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
    errors: state.errors.groups, 
});

const mapDispatchToProps = dispatch => {

    return {
        createMoment: group => dispatch(createMoment(group))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MomentForm));