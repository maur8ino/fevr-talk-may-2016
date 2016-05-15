import test from 'ava'
import sinon from 'sinon';
import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate,
        renderIntoDocument,
        findRenderedDOMComponentWithTag} from 'react-addons-test-utils';

import SearchForm from '../src/SearchForm.jsx';

test('should be initialized with a default value', t => {
  const searchForm = renderIntoDocument(<SearchForm value="maur8ino" />);
  const input = findRenderedDOMComponentWithTag(searchForm, 'input');

  t.is(input.value, 'maur8ino');
});

test('should disable the form', t => {
  const searchForm = renderIntoDocument(<SearchForm disabled={true} />);
  const input = findRenderedDOMComponentWithTag(searchForm, 'input');
  const button = findRenderedDOMComponentWithTag(searchForm, 'button');

  t.true(input.disabled);
  t.true(button.disabled);
});

test('should handle the form submit', t => {
  const handleSubmit = sinon.spy();

  const searchForm = renderIntoDocument(<SearchForm handleSubmit={handleSubmit} value="maur8ino" />);

  Simulate.submit(ReactDOM.findDOMNode(searchForm));

  t.true(handleSubmit.calledOnce);
  t.true(handleSubmit.calledWith('maur8ino'));
});
