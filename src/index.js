import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


window.$primaryLanguage = 'en'; 
window.$secondaryLanguage = 'in'; 

window.$primaryLanguageIconId = 'uk-flag-icon';
window.$secondaryLanguageIconId = 'india-flag-icon';

const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.register();