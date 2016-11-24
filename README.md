## Usage

Import the script in your code and create a new `tags-input`:

```html
<head>
  <script src="tags-input.js"></script>
</head>

<body>
  <tags-input data-multiple></tags-input>
</body>
```

Woot, you have a tags-input! However, `tags-input` only provides the element. The rest is up to you. To properly handle the element, we need to listen for some events and react accordingly.

```javascript
// Test data
var data = ['Amy', 'Annalise', 'Casey', 'Erica', 'Fong', 'George', 'Jason', 'Jen', 'Jim', 'Josh', 'Kelly', 'Kevin', 'Maggie', 'Nathan', 'Ryland', 'SaVance', 'Trezy', 'Vannessa', 'YJ', 'Zach']

// Grad a reference to our tags-input
var tagsInput = document.querySelector('tags-input')

// Listen for the user to start typing
tagsInput.addEventListener('search', function (event) {
  // Clear the current options
  tagsInput.clearOptions()

  // The current value of the tags-input is going to be available in event.detail
  var query = event.detail

  // Create an array to proxy our test data matches
  var options = []

  // Create a regex based on our query
  var regex = new RegExp(query, 'i')

  // Loop through our test data
  data.forEach(function (datum) {
    // If the datum matches, add it to our options array
    if (regex.test(datum)) {
      options.push(datum)
    }
  })

  // Pass our options array to the tags-input so it can display them in the dropdown
  tagsInput.updateOptions(options)
})
```

You can also check out a live demo [here](https://rawgit.com/trezy/tags-input-component/master/examples/simple/index.html).

## API

### `tags-input` element

This is where it all begins. a `tags-input` element can be mostly configured via attributes.

| Attribute | Default | Required/Optional | Description |
|---|---|---|---|
| `data-debug` | false | optional | Turns on debugging for this `tags-input`. When an element is created with this attribute, it will log out all of its configuration oprions, as well as logging out on all events. |
| `data-duplicates` | false | optional | Allow values to be duplicated. |
| `data-multiple` | false | optional | Allow the user to add more than one tag. |
| `data-new` | false | optional | Allow the user to create tags that are not in the options list. |

Any of these attributes can be set as a boolean attribute, e.g. `<tags-input data-multiple>`, or an attribute with a boolean string, e.g. `<tags-input data-multiple="true" data-new="false">`.

### Events

The `tags-input` element works much like a regular `input` element. In addition to triggering the same events as a regular `input` element, it also triggers some unique events that make it easier to react to changes in the `tags-input`.

#### `add`

This event is triggered when a `tags-input`'s input is converted to a tag. The tag that was added can be accessed via `event.detail`.

```javascript
tagsInput.addEventListener('add', function (event) {
  console.log(event.detail)
})
```

#### `error`

This event is triggered when the user tries to add an invalid tag, or a duplicate tag if the `tags-input` doesn't have the `allow-new` property. The `event.detail` property will contain a string of either `invalid` or `duplicate` depending on what the error was.

```javascript
tagsInput.addEventListener('error', function (event) {
  console.log(event.detail)
})
```

#### `remove`

This event is triggered when a tag is removed from a `tags-input`. The tag that was removed can be accessed via `event.detail`.

```javascript
tagsInput.addEventListener('remove', function (event) {
  console.log(event.detail)
})
```

#### `search`

The `search` event is the main event used for managing a `tags-input`. This is fired every time the user changes the content of the input -- much like the `input` event. The main difference is that the `search` event includes the full content of the input, rather than just the key pressed. This can be accessed via `event.detail`.

```javascript
tagsInput.addEventListener('search', function (event) {
  console.log(event.detail)
})
```

### Methods

The `tags-input` element exposes methods to make it easier to interact with.

#### `clearInput()`

Empties the contents of the `tags-input`'s text box. *This does not remove tags.*

#### `clearOptions()`

Empties the contents of the dropdown list. This is useful when using `updateOptions` with `merge` set to `true`.

#### `updateOptions(options, merge)`

Pass an array of options to be displayed in the dropdown list. Options can be either strings or objects. Objects must have a `value` property which will be displayed, and may optionally have an `id` property.
