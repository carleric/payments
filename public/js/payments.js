//hash of product ids to product objects, with quantity property added to each product
var cart = {};

//running total of prices in cart
var total = 0.0;

function addToCart(product) {
	if(cart[product.id]) {
		cart[product.id].quantity += 1;
	} else {
		product.quantity = 1;
		cart[product.id] = product;
	}
	total += product.price;
}

function getDisplayItems() {
	var items = [];
	Object.keys(cart).forEach(function(key){
		var product = cart[key];
		items.push({
			label:  product.title + " quantity: " + product.quantity,
			amount: {currency: "USD", value: product.price * product.quantity}
		});
	})
	return items;
}

function checkOut() {
	if (window.PaymentRequest) {
  		console.log("PaymentRequest supported!");

		let methodData = [
			  {
			    supportedMethods: ["visa", "mastercard"]
			  }
			];

		let details = {
		  displayItems: getDisplayItems(),
		  total:  {
		    label: "Total",
		    amount: { currency: "USD", value : total }, 
		  },
		  shippingOptions: [
		  {
		  	id: 'standard',
		  	label: 'Standard shipping',
		  	amount: {currency: 'USD', value: 0},
		  	selected: true
		  },
		  {
		  	id: 'express',
		  	label: 'Express shipping',
		  	amount: {currency: 'USD', value: 12.00}
		  }
		  ]
		};

		let options = {
		  requestShipping: true,
		  shippingType: "shipping" // "shipping"(default), "delivery" or "pickup"
		};

		let request = new PaymentRequest(
			methodData, // required payment method data
			details,    // required information about transaction
			options     // optional parameter for things like shipping, etc.
		);

		request.addEventListener('shippingoptionchange', e => {
			e.updateWith(((details, shippingOption) => {
				var selectedShippingOption;
				var otherShippingOption;
				if (shippingOption === 'standard') {
				  selectedShippingOption = details.shippingOptions[0];
				  otherShippingOption = details.shippingOptions[1];
				} else {
				  selectedShippingOption = details.shippingOptions[1];
				  otherShippingOption = details.shippingOptions[0];
				}
				details.total.amount.value = total + selectedShippingOption.amount.value;
				details.displayItems.push(selectedShippingOption);
				
				selectedShippingOption.selected = true;
				otherShippingOption.selected = false;
				return Promise.resolve(details);
			})(details, request.shippingOption));
		});

		request.show().then(function(paymentResponse) {
		  // Process paymentResponse here
		  paymentResponse.complete("success");
		}).catch(function(err) {
		  console.error("Uh oh, something bad happened", err.message);
		});
	} else {
	  console.log("PaymentRequest not supported");
	}	
}

