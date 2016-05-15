import test from 'ava';
import sinon from 'sinon';
import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument,
        findRenderedComponentWithType,
        scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils';

import GithubSearch from '../src/GithubSearch.jsx';
import SearchForm from '../src/SearchForm.jsx';
import SelectForm from '../src/SelectForm.jsx';

const noop = () => {};

test.beforeEach(t => {
  t.context.mockGithub = {};

  GithubSearch.__Rewire__('github', t.context.mockGithub);
});

test.afterEach(() => {
  GithubSearch.__ResetDependency__('github');
});

test('should call the github getUserReposList', t => {
  const response = [
    { id: 35957173, name: 'angular-post-message' },
    { id: 37024234, name: 'react-bem-mixin' }
  ];
  const promise = Promise.resolve(response);

  t.context.mockGithub.getUserReposList = sinon.stub().withArgs('maur8ino').returns(promise);

  const GithubSearchSUT = renderIntoDocument( <GithubSearch /> );

  // Triggers getUserReposList method in sut component
  findRenderedComponentWithType(GithubSearchSUT, SearchForm)
    .props.handleSubmit('maur8ino');

  t.is(GithubSearchSUT.state.selectedUser, 'maur8ino');
  t.true(GithubSearchSUT.state.loading);

  return promise.then(noop).catch(noop).then(() => {
    t.is(GithubSearchSUT.state.repoList, response);
    t.false(GithubSearchSUT.state.loading);
  });
});

test('should call the github getUserRepo', t => {
  const response = {
    id: 37024234,
    name: 'react-bem-mixin',
    full_name: 'maur8ino/react-bem-mixin',
    html_url: 'https://github.com/maur8ino/react-bem-mixin',
    description: 'A React.js mixin for generating BEM class names'
  };
  const promise = Promise.resolve(response);

  t.context.mockGithub.getUserRepo = sinon.stub().withArgs('maur8ino', 'react-bem-mixin').returns(promise);

  const GithubSearchSUT = renderIntoDocument( <GithubSearch /> );
  GithubSearchSUT.setState({
    selectedUser: 'maur8ino',
    repoList: [{
      id: 37024234,
      name: 'react-bem-mixin'
    }]
  });

  // Triggers getUserRepo method in sut component
  findRenderedComponentWithType(GithubSearchSUT, SelectForm)
    .props.handleSubmit('maur8ino', 'react-bem-mixin');

  t.true(GithubSearchSUT.state.loading);

  return promise.then(noop).catch(noop).then(() => {
    t.is(GithubSearchSUT.state.selectedRepo, response);
    t.false(GithubSearchSUT.state.loading);
  });
});
