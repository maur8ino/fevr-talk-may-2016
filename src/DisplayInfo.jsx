let React = require('react');

let DisplayInfo = React.createClass({
  render() {
    let value = this.props.value;

    return (
      <ul className="repo-info">
        <li><b>Name:</b> {value.name}</li>
        <li><b>Description:</b> {value.description}</li>
        <li><b>Homepage:</b> {value.homepage}</li>
        <li><b>Language:</b> {value.language}</li>
        <li><b>Stars:</b> {value.stargazers_count}</li>
      </ul>
    );
  }
});

module.exports = DisplayInfo
