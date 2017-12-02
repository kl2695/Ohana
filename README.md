# Ohana

[Ohana](https://kevinsfullstack.herokuapp.com) is a social media web application for friends to send messages to, share content with, and follow the activity of their close friends. The original idea behind Ohana (a hawaiian which roughly translates to "family") came from the recognization that most of today's current social media platforms encourage their users to interact with as many other users as possible. What's different about Ohana is that it's made for exactly the opposite purpose: interact and share only with the select group(s) of people you actually want to stay in touch with. Users can post "moments" with text and photos, upload pictures to their profile page, create groups with other users and message those groups, and like and comment on other users' posts. 


![Ohana Home Page](https://github.com/kl2695/Ohana/blob/master/docs/images/home_page.png)

## Features

- User accounts with secure authentication
- Post Moments with text and photo upload 
- Photo upload for profile pictures
- Like and comment on other users moments
- Feed of user moments, comments, and likes 
- Create groups of users with messaging and moments capability 


### User Moments
![user moments](https://github.com/kl2695/Ohana/blob/master/docs/images/moments.png)

User Moments by themselves were not particularly troublesome; however, I used moments in three separate contexts within my app: the moments feed, the group feed, and the user profile page, so making the moments component flexible enough to handle three different use cases with different inputs didn't require innovative solutions necessarily, it just required more careful attention to management of the state and passing down of props.

One more tricky part of implementing moments was getting the moments feed to load in a reasonable amount of time, since I was essentially querying the database for the entire list of all users moments as well as each moment's corresponding list of comments and all users corresponding to those comments. To help make the app's UI a little more bearable, I implemented an infinite scroll feature, which I also used for the group chat. That topic is covered in more detail below:

### Group Chat
![group chat](https://github.com/kl2695/Ohana/blob/master/docs/images/group_chat.png)

The real-time chat was a particularly tough feature to implement. The first part consisted of setting up websocket connections with the backend. Rails uses a middleware called Redis essentially as a data store. Once the connection is established, the front end subscribes to a channel that is constantly listening to streams of data coming from Redis.

One of the challenges of creating this chat feature was adapting an implementation of web sockets to React. Upon mounting of the component, I created a subscription to the messages channel and I used a react component called React ChatView to implement the infinite scrolling feature. 

```javascript
 componentDidMount() {

        const App = window.App; 
        let fn = this; 
        App.messages = App.cable.subscriptions.create('MessagesChannel', {

            received: function (data) {
                const message = this.renderMessage(data); 
                const messages = fn.state.messages; 
                messages.push(message);
                return fn.setState({messages: messages});
            },

            renderMessage: function (data) {
                return data.user + ": " + data.message;
            }
        });

        this.props.requestGroup(this.props.groupId);

    }
```

Whenever the scroll position of the div element went past the scroll threshold, the component received a callback called loadMoreHistory that incremented the "position" of the current chat history to receive previous messages via asynchronous requests to the backend. 

```javascript 
 loadMoreHistory() {
        return new Promise((resolve, reject) => {
            this.props.updateGroup({
                id: this.props.groupId,
                name: this.props.groups.name,
                img_url: this.props.groups.img_url,
                position:this.state.position + 30
            });
            this.setState({position: this.state.position + 30});
            resolve();
        });
    }
```
This meant that I was passing down params to my groups controller on the backend. Once the position was received as params on the backend, I used that position to conditionally return slices of messages as json objects back to the frontend. Here's a snippet from my rails backend group show view: 

```ruby 
@position ||= 30

json.messages do 
    @group.messages[0..@position].each do |message|
        json.set! message.id do 
            json.partial!('api/messages/message', message: message)
        end 
    end 
end 
```



## Project Design

The database schema can be found [here](https://github.com/kl2695/Ohana/wiki/Database-Schema) along with [a list of mvps](https://github.com/kl2695/Ohana/wiki/MVP-List) and [a sample state](https://github.com/kl2695/Ohana/wiki/Sample-State)

## Technology

Ohana is a single-page application with its backend built on Ruby on Rails and its frontend built with React.js following a Redux architechture framework.
- [Backend technology](https://github.com/kl2695/Ohana/blob/master/docs/backend.md)
- [Frontend technology](https://github.com/kl2695/Ohana/blob/master/docs/frontend.md)

## Future Implementations

Ohana's full range of features is far from being complete. As of right now, only MVP features have been implemented. 
The following is a list of features that plan to be implemented in the future: 

- shared files and photos 
- separate popup chat sidebar 
- embedded links,photos, videos 
