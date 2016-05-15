import test from 'ava'
import sinon from 'sinon';
import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate,
        renderIntoDocument,
        findRenderedDOMComponentWithTag,
        scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils';

import SelectForm from '../src/SelectForm.jsx';

test('should populate the select', t => {
  const values = [
    { id: 37024234, name: 'react-bem-mixin' },
    { id: 32397723, name: 'react-timetable' }
  ];
  const selectForm = renderIntoDocument(<SelectForm values={values} />);
  const options = scryRenderedDOMComponentsWithTag(selectForm, 'option');

  t.is(options.length, 2);
  t.is(options[0].textContent, 'react-bem-mixin');
  t.is(options[1].textContent, 'react-timetable');
});

test('should disable the form', t => {
  const selectForm = renderIntoDocument(<SelectForm disabled={true} />);
  const select = findRenderedDOMComponentWithTag(selectForm, 'select');
  const button = findRenderedDOMComponentWithTag(selectForm, 'button');

  t.true(select.disabled);
  t.true(button.disabled);
});

test('should handle the form submit', t => {
  const values = [
    { id: 37024234, name: 'react-bem-mixin' }
  ];
  const handleSubmit = sinon.spy();
  const selectForm = renderIntoDocument(<SelectForm values={values} handleSubmit={handleSubmit} />);

  Simulate.submit(ReactDOM.findDOMNode(selectForm));

  t.true(handleSubmit.calledOnce);
  t.true(handleSubmit.calledWith('react-bem-mixin'));
});
