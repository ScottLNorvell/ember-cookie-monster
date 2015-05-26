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
      var ingredients, key, value;
      for (var i = 0, len = cookieDrops.length; i < len; i++) {
        ingredients = cookieDrops[i].split('=');
        key = decodeURIComponent(ingredients[0]);
        value = decodeURIComponent(ingredients[1]);
        cookies.set(key, value);
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

  eat(key) {
    return this.get('cookies.' + key);
  },

  _gatherIngredients(key, value, days, options = {}) {
    var ingredients = [`${encodeURIComponent(key)}=${encodeURIComponent(value)}`];

    if(!options['path']) {
      options['path'] = '/';
    }

    if(!options['expires']) {
      if(days) {
        var date = new Date();
        date.setDate(date.getDate() + days);
        options['expires'] = date.toGMTString();
      } else {
        options['expires'] = '';
      }
    }

    let optionalIngredients = Ember.keys(options).map(function(optionKey) {
      return `${optionKey}=${options[optionKey]}`;
    });

    return ingredients.concat(optionalIngredients).join('; ');
  },

  _putInOven(cookie) {
    document.cookie = cookie;
  },

  bake(key, value, days, options = {}) {
    this.set('cookies.' + key, value);
    var ingredients = this._gatherIngredients(key, value, days, options);
    this._putInOven(ingredients);
  },

  burn(key) {
    this.set('cookies.' + key, null);
    var ingredients = this._gatherIngredients(key, '', -1);
    this._putInOven(ingredients);
  }
});
