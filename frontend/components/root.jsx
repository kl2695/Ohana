import { Provider } from 'react-redux';
import React from 'react'; 
import { HashRouter, Route, Link } from 'react-router-dom';
import App from './app'; 

const Root = ({ store }) => {
    return (
        <Provider store={store}>
            <HashRouter>
               <App />
            </HashRouter>
        </Provider>
    );
};

export default Root; 