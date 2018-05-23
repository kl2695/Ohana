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
            currentGroup: this.props.currentGroup,
            messagesArr: this.props.messagesArr,
        };
    }

    componentDidMount() {
        this.props.requestAllGroups();
    }

    static getDerivedStateFromProps(props, state) {
        return {
            groups: props.groups,
            messagesArr: props.messagesArr,
        };
    }

    render(){

        const { usersArr, messagesArr, messages, users, moments, createComment, currentUser } = this.props; 
        const {activeItem} = this.state; 
        let groups; 


       if(this.state.groups){
           groups = this.state.groups.slice(0, this.state.groups.length-1).map(group => {
               let groupMessagesArr; 
               let lastMessage;
               for(let i=messagesArr.length-1; i>=0; i--){
                   if(messagesArr[i].group_id === group.id){
                        lastMessage = messagesArr[i].body;
                        break;
                   }
               }

               if (group.userIds.includes(this.props.currentUser.id)) {
                   if (!group.img_url) {
                       group.img_url = 'https://image.flaticon.com/icons/png/512/33/33308.png';
                   }
                   return (
                       <div className="group-index-item">
                           <Item.Group>
                               <Item className="group-index-item-container">
                                   <div className="thumbnail">
                                       <Item.Image size="tiny" src={group.img_url} />
                                   </div>


                                   <div className="group-index-item-1">
                                       <Item.Content verticalAlign="middle">
                                           <Item.Header>
                                               <Link
                                                    to={`/groups/${group.id}`}
                                                    >{group.name}
                                               </Link>
                                           </Item.Header>
                                           
                                           <Item.Description className="item-messages">{lastMessage}</Item.Description>
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
        );
    }


}

export default GroupShow; 