require('whatwg-fetch');
let Promise = require('es6-promise').Promise;

const githubBaseURL = 'https://api.github.com';

let getUserReposListURL = (username) => {
  if (!username) {
    throw new Error('Username is undefined, null or an empty string');
  }
  return `${githubBaseURL}/users/${encodeURIComponent(username)}/repos`;
};

let getUserRepoURL = (username, reponame) => {
  if (!username || !reponame) {
    throw new Error('Username or repository name is undefined, null or an empty string');
  }
  return `${githubBaseURL}/repos/${encodeURIComponent(username)}/${encodeURIComponent(reponame)}`;
};

let cache = {};

let get = (url) => {
  let options = {};

  if (cache[url] && cache[url].ETag) {
    options.headers = { 'If-None-Match': cache[url].ETag };
  }

  return fetch(url, options).then((response) => {
    if (response.status === 200) {
      if (response.headers.get('ETag')) {
        cache[url] = { ETag: response.headers.get('ETag') };
      }
      return response.json();
    } else if (response.status === 304) {
      if (cache[url].json) {
        return Promise.resolve(cache[url].json);
      }
    } else {
      return Promise.reject(Error('Error', response));
    }
  }).then((json) => {
    if (cache[url]) {
      cache[url].json = json;
    }
    return Promise.resolve(json);
  });
};

let getUserReposList = (username) => {
  try {
    return get(getUserReposListURL(username));
  }
  catch(error) {
    return Promise.reject(error);
  }
};

let getUserRepo = (username, reponame) => {
  try {
    return get(getUserRepoURL(username, reponame));
  }
  catch(error) {
    return Promise.reject(error);
  }
};

module.exports = {
  getUserReposListURL: getUserReposListURL,
  getUserRepoURL: getUserRepoURL,
  getUserReposList: getUserReposList,
  getUserRepo: getUserRepo
};
