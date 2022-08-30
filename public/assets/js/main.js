"use strict";

(function() {
    // Short hand to get the value from the DOM.
    var D = document.getElementById.bind(document);

    // Validates the form.
    var hcaptchaResult = null;
    function validateForm() {
        D("formButton").disabled = D("formEmail").value.length == 0 || D("formName").value.length == 0 || D("formDescription").value.length == 0 || hcaptchaResult == null;
    }

    // Used to get/set the hCAPTCHA result.
    function hcaptchaResultSet(datakey) {
        hcaptchaResult = datakey;
        validateForm();
    }
    window.hcaptchaResultSet = hcaptchaResultSet;

    // Opens the result modal.
    function openResult(title, description) {
        D("contactForm").className = "modal";
        D("resultTitle").innerText = title;
        D("resultDescription").innerText = description;
        D("resultModal").className = "modal is-active";
    }

    // Closes all modals.
    function closeModals() {
        D("resultModal").className = "modal";
        D("contactForm").className = "modal";
    }

    // Handle the form being submitted.
    function formSubmit(e) {
        // Prevent the default action.
        e.preventDefault();

        // Figure out what to do with the information.
        if (hcaptchaResult == null) {
            // Tell the user to fill out the hCaptcha.
            openResult("hCaptcha Blank", "You did not fill out the hCaptcha.");
        } else {
            // Get the form button element.
            var formButton = D("formButton");

            // Mark the button as loading.
            formButton.className = "button is-success is-loading";

            // Create a HTTP request.
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 204) {
                        // Success!
                        openResult("Form Submission Successful", "I have successfully received your message!");
                    } else if (this.status == 400) {
                        // This was us.
                        openResult("Form Submission Error", xhttp.responseText);
                    } else {
                        // Cloudflare or the mailing service is having a bad day.
                        openResult("Form Submission Error", "There was an error submitting the form.");
                    }
                }

                // Remove loading from the form.
                formButton.className = "button is-success";
            };
            xhttp.open("POST", "/v1/submit", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify({"name": D("formName").value, "description": D("formDescription").value, "email": D("formEmail").value, "hcaptcha": hcaptchaResult}));

            // Reset hCaptcha.
            hcaptchaResult = null;
            hcaptcha.reset();
            validateForm();
        }

        // Prevent standard form behaviour.
        return false;
    }

    // Opens the contact form.
    function openForm() {
        D("contactForm").className = "modal is-active";
    }

    // Used to use a function from the blog JavaScript.
    function blogJavaScript(funcName, onerror) {
        return function () {
            if (window.blogFunctions) {
                // Just call the blog functions.
                window.blogFunctions[funcName].apply(this, arguments);
                return;
            }
            arguments[0].preventDefault();
            try {
                window.blogWaiters.push([funcName, arguments]);
            } catch (_) {
                window.blogWaiters = [[funcName, arguments]];
                var script = document.createElement("script");
                script.onerror = onerror.apply(this, arguments);
                script.src = "/assets/js/blog.js";
                script.async = true;
                script.defer = true;
                document.body.appendChild(script);
            }
            return false;
        };
    }

    // Executes when a page is loaded.
    window.pageLoad = function () {
        var events = {
            "validateForm": validateForm, "closeModals": closeModals, "formSubmit": formSubmit,
            "openForm": openForm, "blogLink": blogJavaScript("blogLink", function (e) { window.location = e.target.getAttribute("href"); }),
        };
        document.querySelectorAll("[data-action]").forEach(function(element) {
            // Get the event data.
            var action = element.getAttribute("data-action").split(":");
            var eventType = action[0];
            var eventName = action[1];
            
            // Make sure we are on a clean slate.
            var origin = element;
            element = element.cloneNode(true);
            origin.replaceWith(element);

            // Add the event.
            element.addEventListener(eventType, events[eventName]);
        });
    }
    window.pageLoad();
})();
