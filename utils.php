<?php
require __DIR__ . '/vendor/autoload.php';

// Echos out the template.
function echo_site_structure($title, $description, $body, $path) {
    $title = htmlspecialchars($title);
    $description = htmlspecialchars($description);
    $name = $GLOBALS["portfolio_yml"]["name"];
    $path_first_slash_trim = substr($path, 1);
    $actual_link = $GLOBALS['portfolio_yml']['url'];
    $actual_link = htmlspecialchars("$actual_link$path_first_slash_trim", ENT_QUOTES, "UTF-8");
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

// Handle parsing a markdown file.
function parse_markdown_file($fp) {
    // Get the file.
    $file = file_get_contents($fp);

    // Process the header containing the title, description, and date.
    $split = explode("---", $file, 2);
    $header = $split[0];
    $content = $split[1];

    // Parse the header.
    $header = yaml_parse($header);

    // Do our best to parse the date.
    $header["Date"] = strtotime($header["Date"]);

    // Return the results.
    return array(
        "title" => $header["Title"],
        "description" => $header["Description"],
        "date" => $header["Date"],
        "content" => Parsedown::instance()->text($content),
    );
}

// Get all the markdown files in the blog folder and return them in date order.
function get_blog_posts() {
    // Get all the files in the blog folder.
    $files = glob(__DIR__ . "/blog/*.md");

    // Parse the files.
    $parsed_files = array();
    foreach ($files as $file) {
        $slug = basename($file, ".md");
        $parsed_files[$slug] = parse_markdown_file($file);
    }

    // Sort the files by date.
    uasort($parsed_files, function($a, $b) {
        return $b["date"] - $a["date"];
    });

    // Return the files.
    return $parsed_files;
}
