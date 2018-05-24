import React from 'react';
import { Grid, Image, Header, Feed, Icon, Menu, Item } from 'semantic-ui-react';
import { Route, Switch, Link } from 'react-router-dom';

class ChatBox extends React.Component {
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
        let groupMessagesArr = {};


        if (this.state.groups) {

            // generate a hash table filled with arrays of messages corresponding to group id's

            for (let i = 0; i < messagesArr.length; i++) {
                let message = messagesArr[i];
                let groupMessages = groupMessagesArr[messagesArr[i].group_id];

                if (groupMessages) {
                    groupMessages.push(message);
                } else {
                    groupMessages = [];
                }
            }

            groups = this.state.groups.slice(0, this.state.groups.length - 1).map(group => {

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
                                        </Item.Content>
                                    </div>
                                </Item>

                            </Item.Group>
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
                <div>
                    {groups}
                </div>
            </div>
        );
    }


}

export default ChatBox; 