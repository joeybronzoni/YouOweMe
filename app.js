// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide results: *even though they are already by default this will keep them hidden when user clicks calculate again
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  console.log('Calculating...');
  // UI Vars: *note- some people use $ in front of vars that have to do with the DOM but Brad uses UI so other people know that it has to do with the UI *also, some people use EL
  const UIamount = document.getElementById('amount');
  const UIinterest = document.getElementById('interest');
  const UIyears = document.getElementById('years');
  const UImonthlyPayment = document.getElementById('monthly-payment');
  const UItotalPayment = document.getElementById('total-payment');
  const UItotalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x - 1);

  // isFinite() is a built in JS function
  if (isFinite(monthly)) {
	UImonthlyPayment.value = monthly.toFixed(2);
	UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
	UItotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

	// Show results
	document.getElementById('results').style.display = 'block';

	// Hide loader
	document.getElementById('loading').style.display = 'none';
  } else {
	showError('Please Check You Numbers');
  }


}

// Show Error
function showError(error) {
  	// Hide results
	document.getElementById('results').style.display = 'none';

	// Hide loader
	document.getElementById('loading').style.display = 'none';
  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert Error above heading: *insertBefore() comes with JS
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector('.alert').remove();
}
