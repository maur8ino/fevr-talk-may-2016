let React = require('react');
let ReactDOM = require('react-dom');
let GithubSearch = require('./GithubSearch.jsx');

window.React = React

ReactDOM.render(<GithubSearch/>, document.getElementById('content'));
