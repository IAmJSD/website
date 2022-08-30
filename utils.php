<?php
// Echos out the template.
function echo_site_structure($title, $description, $body) {
    $title = htmlspecialchars($title);
    $description = htmlspecialchars($description);
    $name = $GLOBALS["portfolio_yml"]["name"];
    $actual_link = htmlspecialchars("https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]", ENT_QUOTES, "UTF-8");
    $footer = "";
    if (!$GLOBALS["cv"]) {
        $footer = '<footer class="footer" style="padding: 20px">
        <div class="content has-text-centered">
            <p>
                The source code for this website is licensed under the <a href="https://opensource.org/licenses/MPL-2.0">MPL-2.0</a> license.
                It can be found <a href="https://github.com/JakeMakesStuff/jakegealer.me">here</a>.
            </p>
        </div>
    </footer>';
    }
    echo <<<END
<!DOCTYPE HTML>
<html lang="en">
    <head>
        <title>$title</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="Jake Gealer,Developer,HTML,Python,Javascript,TypeScript">
        <meta name="author" content="$name">
        <meta name="description" content="$description">
        <meta property="og:type" content="website">
        <meta property="og:title" content="$title">
        <meta property="og:url" content="$actual_link">
        <meta property="og:description" content="$description">
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="/bulma.min.css">
        <script src="https://hcaptcha.com/1/api.js" async defer></script>
    </head>

    <body>
        $body
        $footer
        <script src="/assets/js/main.js" async defer></script>
        <script src="/assets/js/preloader.js" async defer></script>
    </body>
</html>
END;
}
