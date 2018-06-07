import React from 'react';
import { Grid, Image, Header, Feed, Icon, Menu, Item, Popup } from 'semantic-ui-react';
import { Route, Switch, Link } from 'react-router-dom';

class MessagesSideBar extends React.Component {
    constructor(props) {
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

    render() {

        const { usersArr, messagesArr, messages, users, moments, createComment, currentUser } = this.props;
        let groups;


        if (this.state.groups) {
            groups = this.state.groups.slice(0, this.state.groups.length - 1).map(group => {
                let groupMessagesArr;
                let lastMessage;
                for (let i = messagesArr.length - 1; i >= 0; i--) {
                    if (messagesArr[i].group_id === group.id) {
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
                            <Popup
                                trigger={<Item.Group>
                                    <Link to={`/groups/${group.id}`}>
                                    
                                        <Item className="group-index-item-container">
                                            <div className="thumbnail">
                                                <Item.Image size="tiny" src={group.img_url} />
                                            </div>


                                            <div className="group-index-item-1">
                                                <Item.Content verticalAlign="middle">
                                                    <Item.Header>
                                                    {group.name}
                                                    </Item.Header>

                                                    <Item.Description className="item-messages">{lastMessage}</Item.Description>
                                                </Item.Content>
                                            </div>
                                        </Item>
                                    </Link>

                                </Item.Group>}
                                content="Click to see moments and messages from this group!"
                                on="hover"
                                position="right center"
                            />
                        </div>
                    );
                }
            });
        } else {
            groups = (
                <div></div>
            );
        }


        return (

          
                <div className="messages-sidebar">
                        {groups}
                </div>
        );
    }


}

export default MessagesSideBar; 