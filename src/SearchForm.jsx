import React from 'react';

const SearchForm = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.refs.input.value);
  },

  render() {
    let {value, disabled} = this.props;
    return (
      <form className="username" onSubmit={this.handleSubmit}>
        <input type="text" ref="input" defaultValue={value} disabled={disabled}/>
        <button type="submit" disabled={disabled}>Search</button>
      </form>
    );
  }
});

export default SearchForm;
