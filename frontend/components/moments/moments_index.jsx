import React from 'react';
import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import GroupIndexItem from './group_index_item';
class MomentIndex extends React.Component{
    constructor(props){
        super(props);
    }

    render(){


         <Feed>
    <Feed.Event>
      <Feed.Label>
        <img src='/assets/images/avatar/small/elliot.jpg' />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>Elliot Fu</Feed.User> added you as a friend
          <Feed.Date>1 Hour Ago</Feed.Date>
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />
            4 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
        return(
            <div>
                Moments
            </div>
        );
    }


}

export default MomentIndex; 