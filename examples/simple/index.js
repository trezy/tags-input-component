// Test data
var data = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

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
