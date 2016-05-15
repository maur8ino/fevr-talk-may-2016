import test from 'ava';
import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument,
        scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils';

import DisplayInfo from '../src/DisplayInfo.jsx';

test('should display the correct info', t => {
  const value = {
    name: 'quill',
    description: 'A cross browser rich text editor with an API',
    homepage: 'http://quilljs.com',
    language: 'CoffeeScript',
    stargazers_count: 5280,
  };

  const displayInfo = renderIntoDocument(<DisplayInfo value={value} />);
  const lis = scryRenderedDOMComponentsWithTag(displayInfo, 'li');

  t.is(lis.length, 5);
  t.regex(lis[0].textContent, /quill/);
  t.regex(lis[1].textContent, /cross browser/);
  t.regex(lis[2].textContent, /quilljs\.com/);
  t.regex(lis[3].textContent, /CoffeeScript/);
  t.regex(lis[4].textContent, /5280/);
});
