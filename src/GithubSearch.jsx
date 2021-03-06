import React from 'react';

import SearchForm from './SearchForm.jsx';
import SelectForm from './SelectForm.jsx';
import DisplayInfo from './DisplayInfo.jsx';

import * as github from './github';

const GithubSearch = React.createClass({
  getInitialState() {
    return {
      loading: false,
      repoList: [],
      selectedUser: undefined,
      selectedRepo: undefined
    };
  },

  getUserReposList(user) {
    this.setState({
      loading: true,
      repoList: [],
      selectedUser: user,
      selectedRepo: undefined
    });
    github.getUserReposList(user).then((repoList) => {
      this.setState({
        repoList: repoList
      });
    }).catch(() => {
    }).then(() => {
      this.setState({
        loading: false
      });
    });
  },

  getUserRepo(reponame) {
    this.setState({
      loading: true,
    });
    github.getUserRepo(this.state.selectedUser, reponame).then((repo) => {
      this.setState({
        selectedRepo: repo
      });
    }).catch(() => {
    }).then(() => {
      this.setState({
        loading: false
      });
    });
  },

  render() {
    let {loading, repoList, selectedRepo} = this.state;

    let searchForm = <SearchForm handleSubmit={this.getUserReposList} disabled={loading} />;
    let selectForm = repoList.length ?
                     (<SelectForm handleSubmit={this.getUserRepo} values={repoList} disabled={loading} />) :
                     null;
    let displayInfo = selectedRepo ?
                      (<DisplayInfo value={selectedRepo} disabled={loading} />) :
                      null;

    return (
      <div className="github-search">
        {searchForm}
        {selectForm}
        {displayInfo}
      </div>
    );
  }
});

export default GithubSearch;
