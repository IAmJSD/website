<?php
    // Grabs the YML file with all of the portfolio information.
    $GLOBALS["portfolio_yml"] = yaml_parse_file("../portfolio.yml");

    // Require the utils file.
    require_once("../../utils.php");

    // Try and find the blog post.
    if (isset($GLOBALS["slug"])) {
        // This is set from a thing importing this.
        $slug = $GLOBALS["slug"];
        $post = $GLOBALS["post"];
    } else {
        // Load the slug from the post query param.
        if (!isset($_GET["post"])) {
            // If the post isn't set, die with a 404.
            http_response_code(404);
            die();
        }

        // Make sure the slug is valid.
        $slug = $_GET["post"];
        if (!preg_match("/^[a-zA-Z0-9_-]+$/", $slug)) {
            // If the slug isn't valid, die with a 404.
            http_response_code(404);
            die();
        }

        // Get the file path and check it exists.
        $file_path = realpath("../../blog/" . $slug . ".md");
        if (!file_exists($file_path)) {
            // If the file doesn't exist, die with a 404.
            http_response_code(404);
            die();
        }

        // Parse the post.
        $post = parse_markdown_file($file_path);
    }

    // Start capturing the PHP.
    ob_start();
?>

<?php echo $post["content"]; ?>

<?php
    // Stop capturing the output.
    $content = ob_get_clean();

    // Call the template function.
    echo_site_structure($post["title"], $post["description"], $content, "/blog");
?>
