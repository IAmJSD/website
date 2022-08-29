"use strict";

(function() { 
    // Defines the functions.
    var functions = {};

    // Defines a function to handle blog link clicks.
    functions.blogLink = function(event) {
        var href = event.target.getAttribute("href");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            
        };
        xhr.open("GET", href, true);
        xhr.send();
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
