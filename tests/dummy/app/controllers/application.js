import Ember from 'ember';

export default Ember.Controller.extend({
  cookieMonster: Ember.inject.service(),
  cookieObject: Ember.computed(
    'cookieMonster.cookies.Scott', 
    'cookieMonster.cookies.Queens', 
    'cookieMonster.cookies.Brooklyn', function() {
    return JSON.stringify(this.get('cookieMonster.cookies'));
  }),
  actions: {
    bakeCookie(key, value) {
      this.get('cookieMonster').bake(key, value, 1);
    },

    burnCookie(key) {
      this.get('cookieMonster').burn(key);
    }
  }
});