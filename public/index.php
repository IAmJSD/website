<?php
    // Grabs the YML file with all of the portfolio information.
    $GLOBALS["portfolio_yml"] = yaml_parse_file("portfolio.yml");
?>
<!DOCTYPE HTML>
<html lang="en">
    <head>
        <title><?php echo $GLOBALS["portfolio_yml"]['name'] ?></title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="Jake Gealer,Developer,HTML,Python,Javascript,TypeScript">
        <meta name="author" content="<?php echo $GLOBALS["portfolio_yml"]['name'] ?>">
        <meta name="description" content="<?php echo $GLOBALS["portfolio_yml"]['description'] ?>">
        <meta property="og:type" content="website">
        <meta property="og:title" content="<?php echo $GLOBALS["portfolio_yml"]['name'] ?>">
        <meta property="og:url" content="<?php echo $GLOBALS["portfolio_yml"]['url'] ?>">
        <meta property="og:description" content="<?php echo $GLOBALS["portfolio_yml"]['description'] ?>">
        <link rel="shortcut icon" type="image/png" href="favicon.png" />
        <link rel="stylesheet" href="/bulma.min.css">
        <script src="https://hcaptcha.com/1/api.js" async defer></script>
    </head>

    <body>
        <div id="resultModal" class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title" id="resultTitle"></p>
                    <button class="delete" aria-label="close" data-action="click:closeModals"></button>
                </header>
                <section class="modal-card-body">
                    <span id="resultDescription"></span>
                </section>
            </div>
        </div>

        <div id="contactForm" class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Contact Me</p>
                    <button class="delete" aria-label="close" data-action="click:closeModals"></button>
                </header>
                <form data-action="submit:formSubmit">
                    <section class="modal-card-body">
                        <p><?php echo $GLOBALS["portfolio_yml"]["contact_message"] ?></p>
                        <div class="field">
                            <label class="label">Name:</label>
                            <div class="control">
                                <div class="control">
                                    <input class="input" type="text" id="formName" data-action="input:validateForm" placeholder="Name">
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">E-mail Address:</label>
                            <div class="control">
                                <div class="control">
                                    <input class="input" type="text" id="formEmail" data-action="input:validateForm" placeholder="E-mail Address">
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Description:</label>
                            <div class="control">
                                <div class="control">
                                    <textarea class="textarea" id="formDescription" data-action="input:validateForm" placeholder="Description"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">CAPTCHA:</label>
                            <div class="control">
                                <div class="h-captcha" data-sitekey="<?php echo $GLOBALS["portfolio_yml"]["hcaptcha_site_key"] ?>" data-callback="hcaptchaResultSet"></div>
                            </div>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button type="submit" class="button is-success" id="formButton" disabled>Submit</button>
                    </footer>
                </form>
            </div>
        </div>

        <div class="container" style="padding: 2em">
            <div style="padding: 1em; text-align: center">
                <h1 class="title"><?php echo $GLOBALS["portfolio_yml"]['name'] ?></h1>
                <h2 class="subtitle"><?php echo $GLOBALS["portfolio_yml"]['description'] ?></h2>
                <?php
                    if (!$GLOBALS["cv"]) {
                        if ($GLOBALS["portfolio_yml"]['enable_contact']) {
                            echo '<a class="button is-link" data-action="click:openForm" style="margin-right: 5px">Contact</a>';
                        }
                        foreach ($GLOBALS["portfolio_yml"]['buttons'] as &$button) {
                            echo(sprintf('<a class="button is-link" href="%s" style="margin-right: 5px">%s</a>', $button['url'], $button['name']));
                        }
                    }
                ?>
            </div>
            <?php
            if (array_key_exists("work", $GLOBALS["portfolio_yml"])) {
                echo("<hr><h1 class=\"title\">Experience</h1><p>This is my experience when it comes to work.");
                if (!$GLOBALS["cv"]) {
                    echo(" If you have any questions, do not hesitate to contact me:");
                }
                echo("</p>");
                foreach ($GLOBALS["portfolio_yml"]["work"] as $job => $additional_info) {
                    $left = "present";
                    if ($additional_info["left"]) {
                        $left = $additional_info["left"];
                    }
                    echo("<hr>");
                    $btn = sprintf('<a class="button is-link" href="%s"> Learn more about %s</a>', $additional_info['url'], $job);
                    echo('<div class="columns"><div class="column">'. "<h2 class=\"subtitle\"><a href=\"". $additional_info["url"] . "\">" . $job . " (" .  $additional_info["started"] . "-" . $left . ")</a></h2>" . $additional_info['description']);
                    if (!$GLOBALS["cv"]) {
                        echo('<br><br>' . $btn);
                    }
                    echo('</div>');
                    echo('<div class="column is-one-fifth is-hidden-mobile" style="width: 10%"><br><img src="img/' . $additional_info['icon'] . '" alt="Logo" style="margin: 0"></div>' .'</div>');
                }
            }
            ?>
            <hr>
            
                <?php
                    if (!$GLOBALS["cv"]) {
                        echo('<div class="columns">');
                    }

                    function renderEducation() {
                        echo('<h1 class="title">Education</h1>
                        <p>These are the places where I have been educated and the qualifications I have got while I was there. ');
                        if (!$GLOBALS["cv"]) {
                            echo("If you have any questions, do not hesitate to contact me:");
                        }
                        echo("</p><hr>");
                        foreach ($GLOBALS["portfolio_yml"]['qualifications'] as $school => $additional_info) {
                            echo(sprintf('<h2 class="subtitle"><a href="%s">%s</a></h2>', $additional_info['url'], $school));
                            $p_part = "<p><b>I started at " . $school . " in " . $additional_info['started'];
                            if ($additional_info['graduated'] != null) {
                                $p_part .= " and graduated in " . $additional_info['graduated'] . ":</b></p>";
                            } else {
                                $p_part .= ":</b></p>";
                            }
                            echo $p_part . "<br>";
                            foreach ($additional_info['grades'] as $grade_name => $grade) {
                                if ($grade == null) {
                                    $grade = "Currently in progress";
                                }
                                echo "<p>" . $grade_name . ": " . $grade . "</p>";
                            }
                            echo '<hr>';
                        }
                    }

                    function renderProjects() {
                        echo('<h1 class="title">Projects</h1>
                        <p>These are some of the projects I have had a part in. ');
                        if (!$GLOBALS["cv"]) {
                            echo("If you have any questions, do not hesitate to contact me:");
                        }
                        echo("</p><hr>");
                        foreach ($GLOBALS["portfolio_yml"]['projects'] as $project => $additional_info) {
                            echo(sprintf('<h2 class="subtitle"><a href="%s">%s</a></h2>', $additional_info['url'], $project));
                            echo('<div class="columns"><div class="column is-four-fifths"><p>' . $additional_info['description'] . '</p>');
                            if (!$GLOBALS["cv"]) {
                                echo(sprintf('<br><a class="button is-link" href="%s"> Learn more about %s</a>', $additional_info['url'], $project));
                            }
                            echo('</div>');
                            echo('<div class="column is-hidden-mobile"><img src="img/' . $additional_info['icon'] . '" alt="Logo" style="margin: 0"></div>' .'</div><hr>');
                        }
                    }

                    if ($GLOBALS["cv"]) {
                        echo('<div style="page-break-before: always; padding-top: 3em">');
                        renderProjects();
                        echo('</div><div style="page-break-before: always; padding-top: 3em">');
                        renderEducation();
                        echo('</div>');
                    } else {
                        echo('<div class="column">');
                        renderEducation();
                        echo('</div>');
                        echo('<div class="column">');
                        renderProjects();
                        echo('</div></div>');
                    }
                ?>
            </div>
        </div>
        <?php
            if (!$GLOBALS["cv"]) {
                echo('<footer class="footer" style="padding: 20px">
                <div class="content has-text-centered">
                    <p>
                        The source code for this website is licensed under the <a href="https://opensource.org/licenses/MPL-2.0">MPL-2.0</a> license.
                        It can be found <a href="https://github.com/JakeMakesStuff/jakegealer.me">here</a>.
                    </p>
                </div>
            </footer>');
            }
        ?>

        <script src="/main.js" async defer></script>
        <script src="/preloader.js" async defer></script>
    </body>
</html>
