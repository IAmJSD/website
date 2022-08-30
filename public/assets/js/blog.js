"use strict";

(function() { 
    // Defines the functions.
    var functions = {};

    // Defines a function to add a event listener once whilst supporting IE.
    // credit: https://stackoverflow.com/a/34325394
    function addEventListenerOnce(target, type, listener, addOptions, removeOptions) {
        target.addEventListener(type, function fn(event) {
            target.removeEventListener(type, fn, removeOptions);
            listener.apply(this, arguments);
        }, addOptions);
    }

    // Does the page replacement.
    var pageReplace = function(uri, cb) {
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
                    addEventListenerOnce(window, "popstate", function () {
                        // Call ourselves with the document location.
                        pageReplace(document.location, function () { window.location.reload(); });
                    });

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
    functions.blogLink = function(event) {
        var href = event.target.getAttribute("href");
        if (!window.history) {
            // If the browser doesn't support history, set the location.
            window.location = href;
            return;
        }
        pageReplace(href, function () { window.location = href; });
    };

    // Set everything and call the functions.
    window.blogFunctions = functions;
    var blogWaiters = window.blogWaiters;
    delete window.blogWaiters;
    if (blogWaiters) {
        blogWaiters.forEach(function (waiter) {
            functions[waiter[0]].apply(this, waiter[1]);
        }.bind(this));
    }
})();
