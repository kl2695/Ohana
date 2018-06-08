import React from 'react';
import { Grid, Image, Header, Feed, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MomentShow from '../../../moments/moments_show/moment_show';
import MomentsFormContainer from '../../../moments/moments_form/moments_form_container';
import GroupShowHeader from '../group_show_header';


class GroupShowMoments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            groups: this.props.groups,
            currentGroup: this.props.currentGroup,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.requestGroup(this.props.groupId);
    }

    static getDerivedStateFromProps(props, state) {
        return { 
            groups: props.groups, 
            currentGroup: props.currentGroup 
        };
    }

    componentDidUpdate(prevProps){
        if (prevProps.groupId != this.props.groupId) {
            this.props.requestGroup(this.props.groupId);
        }
    }

    handleSubmit(event) {
        this.props.updateGroup(this.state.groups.currentGroup);
    }

    render() {
        let { groups, moments } = this.props;
        let name, groupShowHeader;

        if (this.state.currentGroup && moments) {
            let currentGroup = groups.currentGroup;

            moments = moments.map(moment => (
                <MomentShow
                    key={moment.id}
                    users={this.props.users}
                    moment={moment}
                    createComment={this.props.createComment}
                    createLike={this.props.createLike}
                    deleteLike={this.props.deleteLike}
                    currentUser={this.props.currentUser}
                />
            )).reverse();
            
            groupShowHeader = <GroupShowHeader currentGroup={currentGroup}/>;
        } else {
            groupShowHeader = <div></div>;
        }

        return(
            <div className="right-groupshow">
                {groupShowHeader}
                <div className="group-show-moments-container">
                    <div className="group-show-moments">
                        <MomentsFormContainer currentGroupId={groups.id} />
                        {moments}
                    </div>
                </div>
            </div>
        );
    }
}

export default GroupShowMoments;