# Frontend

Ohana uses React.js on the frontend and conforms to the standard Redux frontend architechture framework. 

## Package Manager

Node package manager (npm) is used to install all of the frontend dependencies.


## Webpack

Webpack is used to bundle all of the frontend components of the app. The bundled file is located in `/app/assets/javascripts` and included in the main `application.js` file.

## React and Redux

All of the React components, Redux action creators, API utilities, dispatcher, and stores are located in the [frontend](../frontend) directory.

## jQuery

jQuery is used to make AJAX requests to the Rails backend server.

## Semantic-Ui-React 

Much of the site's front end components were imported from semantic-ui-react, a React integration for the Semantic-Ui library.


## Others

The rest of the project's major frontend dependencies are:

- React DOM
- React Router
- React History to manipulating the browser history
- React-Redux
- React Router Dom 
- Babel for transpiling JSX into JavaScript.   
- FileStack for image attachment, processing, and hosting 
- Semantic-Ui-React for component styling 
- React-ChatView for rendering feed/chat components with infinite scrolling
