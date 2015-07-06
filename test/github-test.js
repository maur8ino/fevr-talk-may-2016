let expect = require('chai').expect;

let github = require('../src/github');

describe('github module', () => {
  it('should generate the correct user\'s list of repositories endpoint url using encodeURIComponent', () => {
    expect(github.getUserReposListURL('maur8ino')).to.equal('https://api.github.com/users/maur8ino/repos');
    expect(github.getUserReposListURL('maur/8i&no')).to.equal('https://api.github.com/users/maur%2F8i%26no/repos');
  });

  it('should generate the correct specific user\'s repository endpoint url using encodeURIComponent', () => {
    expect(github.getUserRepoURL('maur8ino', 'react-bem-mixin')).to.equal('https://api.github.com/repos/maur8ino/react-bem-mixin');
    expect(github.getUserRepoURL('maur/8i&no', 'rea/ct-bem-\mixin')).to.equal('https://api.github.com/repos/maur%2F8i%26no/rea%2Fct-bem-mixin');
  });
});
