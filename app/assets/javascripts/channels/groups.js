//= require cable
//= require_self
//= require_tree .

this.App = {};

this.App.cable = this.ActionCable.createConsumer("/cable"); 