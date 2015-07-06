let expect = require('chai').expect;
let sinon = require('sinon');

let React = require('react/addons');
let TestUtils = React.addons.TestUtils;

let SelectForm = require('../src/SelectForm.jsx');

describe('SelectForm component', () => {
  it('should populate the select', () => {
    let values = [{
      id: 37024234,
      name: 'react-bem-mixin'
    }, {
      id: 32397723,
      name: 'react-timetable'
    }];
    let selectForm = TestUtils.renderIntoDocument(<SelectForm values={values} />);
    let options = TestUtils.scryRenderedDOMComponentsWithTag(selectForm, 'option');

    expect(options.length).to.equal(2);
    expect(options[0].getDOMNode().textContent).to.equal('react-bem-mixin');
    expect(options[1].getDOMNode().textContent).to.equal('react-timetable');
  });

  it('should disable the form', () => {
    let selectForm = TestUtils.renderIntoDocument(<SelectForm disabled={true} />);
    let select = TestUtils.findRenderedDOMComponentWithTag(selectForm, 'select');
    let button = TestUtils.findRenderedDOMComponentWithTag(selectForm, 'button');

    expect(select.getDOMNode().disabled).to.be.ok;
    expect(button.getDOMNode().disabled).to.be.ok;
  });

  it('should handle the form submit', () => {
    let values = [{
      id: 37024234,
      name: 'react-bem-mixin'
    }];
    let handleSubmit = sinon.spy();

    let selectForm = TestUtils.renderIntoDocument(<SelectForm values={values} handleSubmit={handleSubmit} />);

    TestUtils.Simulate.submit(selectForm.getDOMNode());

    expect(handleSubmit.calledOnce).to.be.ok;
    expect(handleSubmit.calledWith('react-bem-mixin')).to.be.ok;
  });
});
