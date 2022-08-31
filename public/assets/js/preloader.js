"use strict";

// The whole point of this is to basically try and pre-cache as much of the blog in the browser
// as possible.

(function () {
    function crawlLink(a) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", a, true);
        xhr.send();
    }
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(this.responseText, "text/html");
                doc.querySelectorAll("a").forEach(function (a) {
                    var href = a.getAttribute("href");
                    if (href[0] == "/") {
                        crawlLink(href);
                    }
                });
            }
        }
    };
    xhr.open("GET", "/blog", true);
    xhr.send();
})();
