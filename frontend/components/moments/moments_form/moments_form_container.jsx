import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MomentForm from './moments_form';
import { requestMoment, createMoment } from "../../../actions/moment_actions";

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        currentUser: state.session.currentUser,
        errors: state.errors.groups,
        currentGroupId: ownProps.currentGroupId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createMoment: group => dispatch(createMoment(group))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MomentForm));