let expect = require('chai').expect;
let sinon = require('sinon');

let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils');

let SearchForm = require('../src/SearchForm.jsx');

describe('SearchForm component', () => {
  it('should be initialized with a default value', () => {
    let searchForm = TestUtils.renderIntoDocument(<SearchForm value="maur8ino" />);
    let input = TestUtils.findRenderedDOMComponentWithTag(searchForm, 'input');

    expect(input.value).to.equal('maur8ino');
  });

  it('should disable the form', () => {
    let searchForm = TestUtils.renderIntoDocument(<SearchForm disabled={true} />);
    let input = TestUtils.findRenderedDOMComponentWithTag(searchForm, 'input');
    let button = TestUtils.findRenderedDOMComponentWithTag(searchForm, 'button');

    expect(input.disabled).to.be.ok;
    expect(button.disabled).to.be.ok;
  });

  it('should handle the form submit', () => {
    let handleSubmit = sinon.spy();

    let searchForm = TestUtils.renderIntoDocument(<SearchForm handleSubmit={handleSubmit} value="maur8ino" />);

    TestUtils.Simulate.submit(ReactDOM.findDOMNode(searchForm));

    expect(handleSubmit.calledOnce).to.be.ok;
    expect(handleSubmit.calledWith('maur8ino')).to.be.ok;
  });
});
