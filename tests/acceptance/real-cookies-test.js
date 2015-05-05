import Ember from 'ember';
import { module, test } from 'qunit';
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
    document.cookie = 'Brooklyn=Hipsters';
    application = startApp();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
    var yesterday = getYesterday();
    document.cookie = 'Scott=; expires=' + yesterday;
    document.cookie = 'Queens=; expires=' + yesterday;
    document.cookie = 'Brooklyn=; expires=' + yesterday;
  }
});

test('cookie values show up on the page', function(assert) {
  visit('/');
  andThen(function() {
    assert.ok(matcher('Awesome').test(find('.the-scott-cookie').text()), 'the scott cookie is displayed');
    assert.ok(matcher('Great').test(find('.the-queens-cookie').text()), 'the queens cookie is displayed');
    assert.ok(matcher('Hipsters').test(find('.the-brooklyn-cookie').text()), 'the brooklyn cookie is displayed');
  });
});
