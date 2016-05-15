import React from 'react';

const SelectForm = React.createClass({
  getDefaultProps() {
    return {
      values: []
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.refs.select.value);
  },

  render() {
    let {values, disabled} = this.props;
    let options = values.map((value, i) => {
      return <option key={i} value={value.name}>{value.name}</option>
    });

    return (
      <form className="repos-list" onSubmit={this.handleSubmit}>
        <select ref="select" disabled={disabled}>
          {options}
        </select>
        <button type="submit" disabled={disabled}>Search</button>
      </form>
    );
  }
});

export default SelectForm;
