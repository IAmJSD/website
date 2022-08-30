<?php
    // Grabs the YML file with all of the portfolio information.
    $GLOBALS["portfolio_yml"] = yaml_parse_file("../portfolio.yml");
?>
<!DOCTYPE HTML>
<html lang="en">
    <head>
        <title><?php echo $GLOBALS["portfolio_yml"]['name'] ?> | Blog</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="Jake Gealer,Developer,HTML,Python,Javascript,TypeScript">
        <meta name="author" content="<?php echo $GLOBALS["portfolio_yml"]['name'] ?>">
        <meta name="description" content="<?php echo $GLOBALS["portfolio_yml"]['description'] ?>">
        <meta property="og:type" content="website">
        <meta property="og:title" content="<?php echo $GLOBALS["portfolio_yml"]['name'] ?>">
        <meta property="og:url" content="<?php echo $GLOBALS["portfolio_yml"]['url'] ?>">
        <meta property="og:description" content="<?php echo $GLOBALS["portfolio_yml"]['description'] ?>">
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="/bulma.min.css">
        <script src="https://hcaptcha.com/1/api.js" async defer></script>
    </head>

    <body>
        

        <script src="/assets/js/main.js" async defer></script>
        <script src="/assets/js/preloader.js" async defer></script>
    </body>
</html>
