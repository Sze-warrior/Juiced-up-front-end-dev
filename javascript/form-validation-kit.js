//---- This is to check whether to throw out an error if there ----//
//---- is nothing entered into the form. ----//
function addFormValidation(formElement) {

	if (formElement === null || formElement.tagName.toUpperCase() !== 'FORM') {
		throw new Error("first parameter must be a FORM, but got " + formElement.tagName);
	}

	formElement.addEventListener("submit", function (evt) {
		console.log("working");
		if (!validateForm(evt.target)) {
			evt.preventDefault();
		}
	});

	for (var i = 0; i < formElement.length; i += 1) {
		var field = formElement[i];
		field.addEventListener('blur', function (evt) {
			validateField(evt.target);
		});
	}
}
//---- This is to check whether to throw out an error if there ----//
//---- is nothing entered into the form. ----//


//---- This is to check whether to throw out an error if there ----//
//---- is an error in the form. ----//
function validateForm(formElement) {
	var error = false;

	for (var i = 0; i < formElement.length; i += 1) {
	 	var isValid = validateField(formElement[i]);
	 	if ( ! isValid) { 
	 		error = true;
	 	}
	}

	return !error;
}
//---- This is to check whether to throw out an error if there ----//
//---- is an error in the form. ----//



//---- This is to allow the button to work in the form----//
function validateField(el) {
	var error = "";

	if (el.type === "submit" || 
		el.type === "reset" || 
		el.type === "button" || 
		el.tagName.toUpperCase() === "BUTTON") {
		return true; // buttons are automatically valid.
	}

	var errorDiv = document.querySelector("#" + el.id + "-error");
	if (errorDiv === null) {
		console.error(el);
		throw new Error("could not find error element to match #" + el.id);
	}
//---- This is to allow the button to work in the form----//



//---- This is to allow the email validation in the form to work----//
//---- This section will throw out an error if there is no valid email address added----//
	errorDiv.innerHTML = "";

	if (el.classList) {
	  el.classList.remove('invalid');
	} else {
	  el.className = el.className.replace(/(^|\b)invalid(\b|$)/gi, ' ');
	}

	if (el.type === "email" && !isEmail(el.value)) {
		error = "please provide a valid email address.";
	}

	// This is the if statement for the name sections

	if (el.className.indexOf("fv-minlength-") > -1) {
		var pos = el.className.indexOf("fv-minlength-");
		var minLength = parseInt( el.className.substr(pos+13), 10);
		if (el.value.length < minLength) {
			error = "must be " + minLength + " or more characters long.";
		}
	}

		if (el.type === "email" && !isEmail(el.value)) {
		error = "please provide a valid email address.";
	}
//---- This is to allow the email validation in the form to work----//
//---- This section will throw out an error if there is no valid email address added----//


//---- This is the section that will print out an error for the forms----//
	if (el.required) { 
		if (el.type === "checkbox" && !el.checked) {
			error = "this must be checked.";
		} else if (el.value.trim() === "") {
			error = "This field must not be blank. Please submit the required details";
		}
	}
	if (error !== "") {
		errorDiv.innerHTML = error;
		if (el.classList) {
		  el.classList.add('invalid');
		} else {
		  el.className += ' invalid';
		}
		return false; // it's invalid
	}

	return true;
}
//---- This is the section that will print out an error for the forms----//


//---- This will allow the email input to have the different characters to the input----//
function isEmail(input) {
	return input.match(/^([a-z0-9_.\-+]+)@([\da-z.\-]+)\.([a-z\.]{2,})$/);
}
//---- This will allow the email input to have the different characters to the input----//

	