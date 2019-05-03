import { run } from '@ember/runloop';
import { module, skip } from 'qunit';
import { visit, andThen } from  '@ember/test-helpers';
import startApp from '../helpers/start-app';

var application;

var getYesterday = function() {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toGMTString();
};

var matcher = function(s) {
  return new RegExp(s);
};

module('Acceptance: Real Cookies test', {
  setup: function() {
    document.cookie = 'Scott=Awesome';
    document.cookie = 'Queens=Great';
    document.cookie = 'Javascript=Magic';
    application = startApp();
  },
  teardown: function() {
    run(application, 'destroy');
    var yesterday = getYesterday();
    document.cookie = 'Scott=; expires=' + yesterday;
    document.cookie = 'Queens=; expires=' + yesterday;
    document.cookie = 'Javascript=; expires=' + yesterday;
  }
});

skip('cookie values show up on the page', function(assert) {
  visit('/');
  andThen(function() {
    assert.ok(matcher('Awesome').test(find('.the-scott-cookie').text()), 'the Scott cookie is displayed');
    assert.ok(matcher('Great').test(find('.the-queens-cookie').text()), 'the Queens cookie is displayed');
    assert.ok(matcher('Magic').test(find('.the-javascript-cookie').text()), 'the Javascript cookie is displayed');
  });
});
