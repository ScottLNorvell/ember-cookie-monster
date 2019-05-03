import { on } from '@ember/object/evented';
import { computed } from '@ember/object';
import Service from '@ember/service';
import { isPresent } from '@ember/utils';
import EmberObject from '@ember/object';

export default Service.extend({
  _bakeCookies: on('init', function() {
    var cookieDough = this.get('_cookieDough');
    if (isPresent(cookieDough)) {
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
    return EmberObject.create();
  }),

  _cookieDough: computed(function() {
    // Figure out how to stub...
    return document.cookie;
  }),

  eat(key) {
    return this.get('cookies.' + key);
  },

  _gatherIngredients(key, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setDate(date.getDate() + days);
      expires = '; expires=' + date.toGMTString();
    }
    return [encodeURIComponent(key), '=', encodeURIComponent(value), expires, '; path=/'].join('');
  },

  _putInOven(cookie) {
    document.cookie = cookie;
  },

  bake(key, value, days) {
    this.set('cookies.' + key, value);
    var ingredients = this._gatherIngredients(key, value, days);
    this._putInOven(ingredients);
  },

  burn(key) {
    this.set('cookies.' + key, null);
    var ingredients = this._gatherIngredients(key, '', -1);
    this._putInOven(ingredients);
  }
});
