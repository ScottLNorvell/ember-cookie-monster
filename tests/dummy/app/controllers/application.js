import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  cookieMonster: inject.service(),
  cookieObject: computed(
    'cookieMonster.cookies.{Scott,Queens,Javascript}', function() {
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
