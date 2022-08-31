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

    // Does the page replacement.
    function pageReplace(uri, cb) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // Update the page data.
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(xhr.responseText, "text/html");
                    var newBody = doc.body;
                    var oldBody = document.body;
                    oldBody.parentNode.replaceChild(newBody, oldBody);
                    document.title = doc.title;

                    // Set the state of the pages history.
                    history.pushState({}, doc.title, uri);

                    // Update the JS state of items on the page and call the callback.
                    window.pageLoad();
                } else {
                    // Call the callback.
                    cb();
                }
            }
        };
        xhr.onerror = function() {
            // Call the callback.
            cb();
        };
        xhr.open("GET", uri, true);
        xhr.send();
    }

    // Defines a function to handle blog link clicks.
    function blogLink(event) {
        var href = event.target.getAttribute("href");
        if (!window.history) {
            // If the browser doesn't support history, return and let the browser handle it.
            return;
        }
        pageReplace(href, function () { window.location = href; });
        event.preventDefault();
        return false;
    };

    // Executes when a page is loaded.
    window.pageLoad = function () {
        var events = {
            "validateForm": validateForm, "closeModals": closeModals, "formSubmit": formSubmit,
            "openForm": openForm, "blogLink": blogLink,
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

    // Add a window listener for popstate.
    window.addEventListener("popstate", function () {
        pageReplace(document.location.pathname, function () { window.location.reload(); });
    });
})();
