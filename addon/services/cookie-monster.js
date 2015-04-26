import Ember from 'ember';


var on = Ember.on;
var computed = Ember.computed;
export default Ember.Service.extend({
  _bakeCookies: on('init', function() {
    var cookieDough = this.get('_cookieDough');
    if (Ember.isPresent(cookieDough)) {
      // parse all cookies and set them to cookies object
      var cookies = this.get('cookies');
      var cookieDrops = cookieDough.split('; ');
      var ingredients;
      for (var i = 0, len = cookieDrops.length; i < len; i++) {
        ingredients = cookieDrops[i].split('=');
        cookies.set(ingredients[0], ingredients[1]);
      }
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

  eat: function(key) {
    return this.get('cookies.' + key);
  },

  bake: function(key, value) {
    this.set('cookies.' + key, value);
  }
});
