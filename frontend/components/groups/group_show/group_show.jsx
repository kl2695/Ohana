import React from 'react';
import { Grid, Image, Header, Feed, Icon, Menu, Item } from 'semantic-ui-react';
import { Route, Switch, Link } from 'react-router-dom';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import MomentShow from '../../moments/moments_show/moment_show';
import SideBar from './group_show_sidebar';
import GroupShowMomentsContainer from './group_show_moments/group_show_moments_container'; 
import GroupShowMessagesContainer from './group_show_messages/group_show_messages_container';
import GroupIndexItem from '../group_index/group_index_item';


class GroupShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            groups: this.props.groups,
        };
        
     

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    componentDidMount() {
        this.props.requestAllGroups();
    }


    componentWillReceiveProps(newProps) {
        this.setState({groups:newProps.groups});
    }



    handleItemClick(e, { name }) {
        e.preventDefault();
        this.setState({ activeItem: name });
        this.props.history.push(`${this.state.groups.currentGroup.id}/${name}`);
    }

    
    render(){

        console.log(this.state);
        
        const { usersArr, messagesArr, users, moments, createComment, currentUser } = this.props; 
        const {activeItem} = this.state; 
        let groups; 


       if(this.state.groups){
           groups = this.state.groups.slice(0, this.state.groups.length - 1).map(group => {
               if (group.userIds.includes(this.props.currentUser.id)) {
                   if (!group.img_url) {
                       group.img_url = 'https://image.flaticon.com/icons/png/512/33/33308.png';
                   }
                   return (
                       <div className="group-index-item">
                           <Item.Group divided>
                               <Item className="group-index-item-container">
                                   <div className="thumbnail">
                                       <Item.Image size="tiny" src={group.img_url} />
                                   </div>
                                   <div className="group-index-item-1">
                                       <Item.Content verticalAlign="middle">
                                           <Link to={`/groups/${group.id}`}>{group.name}</Link>
                                           {/* <GroupIndexItem className="group-index-item-content" group={group} groupId={group.id} /> */}
                                       </Item.Content>
                                   </div>
                               </Item>

                           </Item.Group>
                       </div>
                   );
               }
           });
       }else{
           groups = (
               <div></div>
           );
       }
     

        return(

            <div className="groupshow-container">
                <div className="left-groupshow">
                    <div>
                        {groups}
                    </div>
                    
                    <Switch>
                        <Route 
                            exact path='/groups/:groupId' 
                            component={GroupShowMomentsContainer}
                                
                        />
                        <Route 
                            path='/groups/:groupId/messages'
                            component={GroupShowMessagesContainer} 
                        />
                    </Switch>
                </div>
            </div>
        );
    }


}

export default GroupShow; 