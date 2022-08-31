<?php
    // Grabs the YML file with all of the portfolio information.
    $GLOBALS["portfolio_yml"] = yaml_parse_file("../portfolio.yml");

    // Require the utils file.
    require_once("../../utils.php");

    // Get all of the blog posts.
    $posts = get_blog_posts();

    // If this is running in the CLI, this should auto-generate all of the blog posts too.
    if (php_sapi_name() == "cli") {
        foreach ($posts as $slug => $post) {
            $GLOBALS["slug"] = $slug;
            $GLOBALS["post"] = $post;
            ob_start();
            require("./view.php");
            $content = ob_get_clean();
            file_put_contents("./" . $slug . ".html", $content);
        }
    }

    // Start capturing the PHP.
    ob_start();
?>

<div class="container" style="padding: 2em">
<?php
    // Go through each post rendering a preview.
    foreach ($posts as $slug => $post) {
        // Get the preview path.
        $preview_path = "/blog/" . $slug . ".html";
        if (php_sapi_name() != "cli") {
            $preview_path = "/blog/view.php?post=" . $slug;
        }

        // Get the title and description as special chars.
        $title = htmlspecialchars($post["title"]);
        $description = htmlspecialchars($post["description"]);

        // Render the preview.
        echo <<<EOT
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4"><a data-action="click:blogLink" href="$preview_path">$title</a></p>
                        <p class="subtitle is-6">$description</p>
                    </div>
                </div>
            </div>
        </div>
        EOT;
    }
?>
</div>

<?php
    // Stop capturing the output.
    $content = ob_get_clean();

    // Call the template function.
    echo_site_structure($GLOBALS["portfolio_yml"]["name"] . " | Blog", "All of the posts on my blog.", $content, "/blog");
?>
