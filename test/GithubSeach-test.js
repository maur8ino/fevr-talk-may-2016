let expect = require('chai').expect;
let sinon = require('sinon');

let React = require('react');
let TestUtils = require('react-addons-test-utils');

let GithubSearch = require('../src/GithubSearch.jsx');

describe('GithubSearch component', () => {
  let mockSearchForm, mockSelectForm, mockGithub, GithubSearchSUT;

  beforeEach(() => {
    mockSearchForm = React.createClass({
      render() { return <div/>; }
    });
    mockSelectForm = React.createClass({
      render() { return <div/>; }
    });
    mockGithub = {};

    GithubSearch.__set__('SearchForm', mockSearchForm);
    GithubSearch.__set__('SelectForm', mockSelectForm);
    GithubSearch.__set__('github', mockGithub);

    GithubSearchSUT = TestUtils.renderIntoDocument( <GithubSearch /> );
  });

  it('should call the github getUserReposList', (done) => {
    let response = [{
      id: 35957173,
      name: 'angular-post-message'
    }, {
      id: 37024234,
      name: 'react-bem-mixin'
    }];
    let promise = new Promise((resolve) => {
      resolve(response);
    });

    mockGithub.getUserReposList = sinon.stub().withArgs('maur8ino').returns(promise);

    // Triggers getUserReposList method in sut component
    TestUtils.findRenderedComponentWithType(GithubSearchSUT, mockSearchForm)
             .props.handleSubmit('maur8ino');

    expect(GithubSearchSUT.state.selectedUser).to.equal('maur8ino');
    expect(GithubSearchSUT.state.loading).to.be.true;

    promise.then(() => {}).catch(() => {}).then(() => {
      expect(GithubSearchSUT.state.repoList).to.equal(response);
      expect(GithubSearchSUT.state.loading).to.be.false;
      done();
    });
  });

  it('should call the github getUserRepo', (done) => {
    let response = {
      id: 37024234,
      name: 'react-bem-mixin',
      full_name: 'maur8ino/react-bem-mixin',
      html_url: 'https://github.com/maur8ino/react-bem-mixin',
      description: 'A React.js mixin for generating BEM class names'
    };
    let promise = new Promise((resolve) => {
      resolve(response);
    });

    mockGithub.getUserRepo = sinon.stub().withArgs('maur8ino', 'react-bem-mixin').returns(promise);

    GithubSearchSUT.setState({
      selectedUser: 'maur8ino',
      repoList: [{
        id: 37024234,
        name: 'react-bem-mixin'
      }]
    });

    // Triggers getUserRepo method in sut component
    TestUtils.findRenderedComponentWithType(GithubSearchSUT, mockSelectForm)
             .props.handleSubmit('maur8ino', 'react-bem-mixin');

    expect(GithubSearchSUT.state.loading).to.be.true;

    promise.then(() => {}).catch(() => {}).then(() => {
      expect(GithubSearchSUT.state.selectedRepo).to.equal(response);
      expect(GithubSearchSUT.state.loading).to.be.false;
      done();
    });
  });
});
