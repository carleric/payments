document.addEventListener("DOMContentLoaded", function(event) { 
	
	if (window.PaymentRequest) {
		console.log("PaymentRequest supported!");
		
		let methodData = [
		  {
		    supportedMethods: ["visa", "mastercard"]
		  }
		];
		let details = {
		  displayItems: [
		    {
		      label: "Original donation amount",
		      amount: { currency: "USD", value : "65.00" }, // US$65.00
		    },
		    {
		      label: "Friends and family discount",
		      amount: { currency: "USD", value : "-10.00" }, // -US$10.00
		      pending: true // The price is not determined yet
		    }
		  ],
		  total:  {
		    label: "Total",
		    amount: { currency: "USD", value : "55.00" }, // US$55.00
		  }
		};
		let options = {
		  requestShipping: true,
		  shippingType: "shipping" // "shipping"(default), "delivery" or "pickup"
		};

		let buyButton1 = document.getElementById('buyButton1');
		buyButton1.onclick = function(e) {
			let request = new PaymentRequest(
				methodData, // required payment method data
				details,    // required information about transaction
				options     // optional parameter for things like shipping, etc.
			);

			request.show().then(function(paymentResponse) {
			  // Process paymentResponse here
			  paymentResponse.complete("success");
			}).catch(function(err) {
			  console.error("Uh oh, something bad happened", err.message);
			});
		}

	  
	} else {
	  console.log("PaymentRequest not supported");
	}
});

