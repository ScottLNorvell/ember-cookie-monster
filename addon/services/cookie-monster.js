import Ember from 'ember';


var on = Ember.on;
var computed = Ember.computed;
export default Ember.Service.extend({
  _bakeCookies: on('init', function() {
    var cookieDough = this.get('_cookieDough');
    if (Ember.isPresent(cookieDough)) {
      // parse all cookies and set them to cookies object
    } else {
      // Do nothing
    }
  }),

  cookies: computed(function() {
    // I wonder if this should be it's own service?
    return Ember.Object.create();
  }),

  _cookieDough: computed(function() {
    // Figure out how to stub...
    return document.cookie;
  }),


});
