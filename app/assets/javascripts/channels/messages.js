

// App.messages = App.cable.subscriptions.create('MessagesChannel', {

//     received: function (data) {
//         // $("#messages").removeClass('hidden');

//         console.log('im here');
//         return $("#messages").append(this.renderMessage(data));
//     },

//     renderMessage: function (data) {
//         return "<p> <b>" + data.user + ": </b>" + data.message + "</p>";
//     }
// });