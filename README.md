# ember-cookie-monster

`ember-cookie-monster` is a simple cookie reader service with a playful api that lets you data bind to cookie values in your ember applications for sticky attributes for repeat visitors.

## Installation
```bash
npm install ember-cookie-monster --save-dev
```

## Usage
On `init`, `ember-cookie-monster` reads all of your cookies once and caches them into an object called `cookies`. This object acts like simple key/value store for all of your cookies. To access, simply inject the service into a controller or component.
```javascript
// app/componets/awesome-cookies.js

export default Ember.Component.extend({
  // Inject the service.
  cookieMonster: Ember.inject.service(),
  // If you think cookieMonster is too long a name,
  // you can use something like this:
  // cm: Ember.inject.service('cookieMonster')

  // bind an attribute to a cached cookie value
  isAwesome: Ember.computed.reads('cookieMonster.cookies.isAwesome'),
  // note, this binding is one way and will not update the cookie
  // if you change it programatically

  linkText: Ember.computed('cookieMonster.cookies.ab_link_text', function() {
    var abVariant = this.get('cookieMonster.cookies.ab_link_text');
    if (abVariant === 'version1') {
      return "You won't believe what happens when you click HERE!";
    } else {
      return "If you click here THIS will happen to you!";
    }
  }),

  allCookies: Ember.computed('cookieMonster.cookies', function() {
    return JSON.stringify(this.get('cookieMonster.cookies'));
  })
});
```
and then in your template:
```handlebars
{{!-- /templates/components/awesome-cookies.hbs --}}

{{#if isAwesome}}
  {{awesome-button}}
{{else}}
  {{banal-button}}
{{/if}}

{{link-to linkText 'awesome-article'}}

<h4>Here are all of your cookies if you were curious</h4>
{{allCookies}}
```
## Methods
`ember-cookie-monster` provides some helper functions for getting, setting, and erasing cookies:
### `#.eat(value)`
##### Read a cookie value:
_(NOTE: this is functionally identical to calling `this.get('cookieMonster.cookies.cookie-value')`)_
```javascript
var cookieValue = this.get('cookieMonster').eat('cookie-value');
// does not touch or parse `document.cookie`!
```
### `#.bake(key, value, days)`
##### Set a cookie value for an optional amount of days:
```javascript
  cookieMonster: Ember.inject.service(),
  actions: {
    rememberUserPreference: function(preference, value, days) {
      // remember user preference for 10 days
      // sets the cookie expiration date for 10 days in the future
      var days = 10;
      this.get('cookieMonster').bake(preference, value, days)
    }
  }
});
```
### `#.burn(key)`
##### Erase a cookie value:
```javascript
  cookieMonster: Ember.inject.service(),
  actions: {
    logout: function() {
      // expires the cookie and null out the value in `cookieMonster.cookies`
      this.get('cookieMonster').burn('user_login_credentials')
    }
  }
});
```

## Possible Usage

* A/B testing
* User login preferences
* Remembering preferences
* Any conditional logic that requires reading and parsing `document.cookie`.
