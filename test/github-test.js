import test from 'ava';
import fetchMock from 'fetch-mock';

import github from '../src/github';

test.afterEach(() => {
  fetchMock.restore();
});

test('should generate the correct user\'s list of repositories endpoint url using encodeURIComponent', t => {
  t.is(github.getUserReposListURL('maur8ino'), 'https://api.github.com/users/maur8ino/repos');
  t.is(github.getUserReposListURL('maur/8i&no'), 'https://api.github.com/users/maur%2F8i%26no/repos');
});

test('should throw an error if the username is undefined, null or an empty string', t => {
  let fn = github.getUserReposListURL.bind(github.getUserReposListURL, undefined);
  t.throws(fn, /empty string/);

  fn = github.getUserReposListURL.bind(github.getUserReposListURL, null);
  t.throws(fn, /empty string/);

  fn = github.getUserReposListURL.bind(github.getUserReposListURL, '');
  t.throws(fn, /empty string/);
});

test('should generate the correct specific user\'s repository endpoint url using encodeURIComponent', t => {
  t.is(github.getUserRepoURL('maur8ino', 'react-bem-mixin'), 'https://api.github.com/repos/maur8ino/react-bem-mixin');
  t.is(github.getUserRepoURL('maur/8i&no', 'rea/ct-bem-\mixin'), 'https://api.github.com/repos/maur%2F8i%26no/rea%2Fct-bem-mixin');
});

test('should throw an error if either the username or the repository name is undefined, null or an empty string', t => {
  let fn = github.getUserRepoURL.bind(github.getUserRepoURL, undefined, 'react-bem-mixin');
  t.throws(fn, /empty string/);

  fn = github.getUserRepoURL.bind(github.getUserRepoURL, 'maur8ino', undefined);
  t.throws(fn, /empty string/);

  fn = github.getUserRepoURL.bind(github.getUserRepoURL, undefined, undefined);
  t.throws(fn, /empty string/);
});

test.serial('should make an ajax request for user\'s repositories list and resolve it', t => {
  fetchMock.mock('https://api.github.com/users/maur8ino/repos', 'GET', [
    { "id": 35957173, "name": "angular-post-message" },
    { "id": 37024234, "name": "react-bem-mixin" }
  ]);

  return github.getUserReposList('maur8ino').then(response => {
    t.deepEqual(response, [
      { id: 35957173, name: 'angular-post-message' },
      { id: 37024234, name: 'react-bem-mixin' }
    ]);
  });
});


test.serial('should make an ajax request for user\'s repositories list and resolve it using cache', t => {
  fetchMock.mock('https://api.github.com/users/maur8ino/repos', [
    { id: 35957173, name: 'angular-post-message'},
    { id: 37024234, name: 'react-bem-mixin' }
  ]).mock('https://api.github.com/users/maur8ino/repos', {
    status: 304,
    headers: { 'Content-Type': 'application/json', 'ETag': '12345678abcd' },
    body: ''
  });

  // First request
  github.getUserReposList('maur8ino');

  // Second request same url
  return github.getUserReposList('maur8ino').then(response => {
    t.deepEqual(response, [
      { id: 35957173, name: 'angular-post-message' },
      { id: 37024234, name: 'react-bem-mixin' }
    ]);
  });
});

test.serial('should make an ajax request for user\'s repositories list and reject it', t => {
  fetchMock.mock('https://api.github.com/users/maur8ino/repos', 500);

  t.throws(github.getUserReposList('maur8ino'));
});

test('should reject the promise if the user is undefined', t => {
  t.throws(github.getUserReposList());
});

test.serial('should make an ajax request for specific user\'s repository and resolve it', t => {
  fetchMock.mock('https://api.github.com/repos/maur8ino/react-bem-mixin', {
    id: 37024234,
    name: 'react-bem-mixin',
    full_name: 'maur8ino/react-bem-mixin',
    html_url: 'https://github.com/maur8ino/react-bem-mixin',
    description: 'A React.js mixin for generating BEM class names'
  });

  return github.getUserRepo('maur8ino', 'react-bem-mixin').then(response => {
    t.deepEqual(response, {
      id: 37024234,
      name: 'react-bem-mixin',
      full_name: 'maur8ino/react-bem-mixin',
      html_url: 'https://github.com/maur8ino/react-bem-mixin',
      description: 'A React.js mixin for generating BEM class names'
    });
  });
});

test.serial('should make an ajax request for specific user\'s repository and resolve it using cache', t => {
  fetchMock.mock('https://api.github.com/repos/maur8ino/react-bem-mixin', {
    id: 37024234,
    name: 'react-bem-mixin',
    full_name: 'maur8ino/react-bem-mixin',
    html_url: 'https://github.com/maur8ino/react-bem-mixin',
    description: 'A React.js mixin for generating BEM class names'
  }).mock('https://api.github.com/repos/maur8ino/react-bem-mixin', {
    status: 304,
    headers: { 'Content-Type': 'application/json', 'ETag': '12345678abcd' },
    body: ''
  });

  // First request
  github.getUserRepo('maur8ino', 'react-bem-mixin');

  // Second request same url
  return github.getUserRepo('maur8ino', 'react-bem-mixin').then(response => {
    t.deepEqual(response, {
      id: 37024234,
      name: 'react-bem-mixin',
      full_name: 'maur8ino/react-bem-mixin',
      html_url: 'https://github.com/maur8ino/react-bem-mixin',
      description: 'A React.js mixin for generating BEM class names'
    });
  });
});

test.serial('should make an ajax request for specific user\'s repository and reject it', t => {
  fetchMock.mock('https://api.github.com/repos/maur8ino/react-bem-mixin', 500)

  t.throws(github.getUserRepo('maur8ino', 'react-bem-mixin'));
});

test('should reject the promise if the user or repo are undefined', t => {
  t.throws(github.getUserRepo());
});
