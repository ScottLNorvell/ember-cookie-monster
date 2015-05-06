import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:cookie-monster', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
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
