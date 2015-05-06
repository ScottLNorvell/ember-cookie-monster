import {
  moduleFor,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:cookie-monster', {
  subject: function(attrs, klass) {
    klass.reopen({
      _cookieDough: Ember.computed(function() {
        return 'scott=awesome; fake_user_id=42';
      })
    });
    return klass.create(attrs);
  }
});

//                         _
//                       (`  ).                   _
//   SMOKE TEST!        (     ).              .:(`  )`.
//                     _(       '`.          :(   .    )
//                 .=(`(      .   )     .--  `.  (    ) )
//     .--.       ((    (..__.:'-'   .+(   )   ` _`  ) )
//   _(    `.     `(       ) )       (   .  )     (   )  ._
//  (        )      ` __.:'   )     (   (   ))     `-'.-(`  )
// ( `  .  )  )  ( )       --'       `- __.'         :(      ))
//  `--(___.-'  (_.'          .')                    `(    )  ))
//                           (_  )                     ` __.:'
test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

test('bakes cookies on init', function(assert) {
  var service = this.subject();
  assert.equal(service.get('cookies.scott'), 'awesome', 'scott is awesome!');
  assert.equal(service.get('cookies.fake_user_id'), '42', 'user is life the universe and everything');
});

test('cookies can be eaten', function(assert) {
  var service = this.subject();
  assert.ok(service.eat, 'eat exists!');
});

test('cookies can be baked', function(assert) {
  var service = this.subject();
  assert.ok(service.bake, 'bake exists!');
});

test('cookies can be burned', function(assert) {
  var service = this.subject();
  assert.ok(service.burn, 'burn exists!');
});
