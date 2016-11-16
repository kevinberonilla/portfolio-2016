<?php $resourceVersion = '1.35'; ?>
<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#1e1e1e">
    <meta name="description" content="The web portfolio of Kevin Beronilla, a visual artist from the Chicagoland area.">
    <meta name="keywords" content="portfolio, graphic design, web, photography, video, chicago, visual art">
    <title>Kevin Beronilla</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,700,900,300italic,700italic,900italic">
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/lightSlider.min.css">
    <link rel="stylesheet" type="text/css" href="css/tooltipster.min.css">
    <link rel="stylesheet" type="text/css" href="css/main.min.css?v=<?= $resourceVersion ?>">
    <!--[if lt IE 9]>
<link rel="stylesheet" type="text/css" href="css/ie.min.css">
<script src="js/html5shiv.min.js"></script>
<![endif]-->
</head>

<body>
    <header>
        <div class="container clearfix">
            <h1><img src="images/logo.svg" alt="Kevin Beronilla" class="logo"><img src="images/logo-fallback.png" class="logo fallback"></h1>
            <nav>
                <ul>
                    <li><a href="downloads/kevin-beronilla-resume.pdf" target="_blank">Resume</a></li>
                    <li><a href="https://github.com/kevinberonilla" target="_blank">GitHub</a></li>
                    <li><a href="mailto:kevin.beronilla@gmail.com" class="contact-link">Contact</a></li>
                </ul>
            </nav>
            <div class="mobile-menu"></div>
        </div>
        <div id="project" class="container"> </div>
    </header>
    <div id="loading">
        <div class="bounce-1"></div>
        <div class="bounce-2"></div>
        <div class="bounce-3"></div>
    </div>
    <div id="hero">
        <div class="container closed">
            <div class="intro">
                <div class="slide-in">My name is <strong>Kevin <br class="reponsive-break">
                    Beronilla</strong> and I am a <span class="drop-down"><span id="selected">visual artist</span>
                    <ul class="options">
                        <li class="all">visual artist</li>
                        <li class="gd">graphic designer</li>
                        <li class="web">web developer</li>
                        <li class="photo">photographer</li>
                        <li class="video">video editor</li>
                    </ul>
                    </span>
                    <br class="reponsive-break"> from the Chicagoland area.
                </div>
            </div>
            <img src="images/hero-photo.png" id="hero-photo">
        </div>
    </div>
    <main>
        <ul id="portfolio">
            <li class="project gd">
                <a href="#!/seiden-sans-typeface"><img src="images/seiden-sans-typeface/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Seiden Sans Typeface (2016)</span></a>
            </li>
            <li class="project web">
                <a href="#!/100-years-of-pier-website"><img src="images/100-years-of-pier-website/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">100 Years of Pier Website (2016)</span></a>
            </li>
            <li class="project web">
                <a href="#!/appiphony-lightning-js-library"><img src="images/appiphony-lightning-js-library/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Appiphony Lightning JS Library (2015)</span></a>
            </li>
            <li class="project gd web">
                <a href="#!/appiphony-website"><img src="images/appiphony-website/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Appiphony Website (2015)</span></a>
            </li>
            <li class="project web">
                <a href="#!/webegin-visualforce-framework"><img src="images/webegin-visualforce-framework/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Webegin for Visualforce Framework (2015)</span></a>
            </li>
            <li class="project web">
                <a href="#!/navy-pier-website"><img src="images/navy-pier-website/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Navy Pier Website (2015)</span></a>
            </li>
            <li class="project gd">
                <a href="#!/tenant-first-logo"><img src="images/tenant-first-logo/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Tenant First Logo (2014)</span></a>
            </li>
            <li class="project video">
                <a href="#!/front-center-video"><img src="images/front-center-video/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Front+Center Video (2014)</span></a>
            </li>
            <li class="project gd web">
                <a href="#!/acxiom-it-website"><img src="images/acxiom-it-website/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Acxiom IT Website (2014)</span></a>
            </li>
            <li class="project gd">
                <a href="#!/debrock-wedding-website"><img src="images/debrock-wedding-website/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">DeBrock Wedding Website (2014)</span></a>
            </li>
            <?php /*
            <li class="project gd web">
                <a href="#!/modern-way-cleaners-website"><img src="images/modern-way-cleaners-website/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Modern Way Cleaners Website (2014)</span></a>
            </li>
            */ ?>
            <li class="project gd">
                <a href="#!/central-park-lisle-logo"><img src="images/central-park-lisle-logo/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Central Park of Lisle Logo (2014)</span></a>
            </li>
            <li class="project gd">
                <a href="#!/ascp-marketing-collateral"><img src="images/ascp-marketing-collateral/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">ASCP Marketing Collateral (2010–2013)</span></a>
            </li>
            <li class="project gd">
                <a href="#!/ascp-tradeshow-booth"><img src="images/ascp-tradeshow-booth/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">ASCP Tradeshow Booth (2013)</span></a>
            </li>
            <li class="project gd">
                <a href="#!/ascp-annual-meeting-website"><img src="images/ascp-annual-meeting-website/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">ASCP Annual Meeting Website (2013)</span></a>
            </li>
            <li class="project gd">
                <a href="#!/lab-culture-logo"><img src="images/lab-culture-logo/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Lab Culture Logo (2013)</span></a>
            </li>
            <li class="project gd">
                <a href="#!/science-sustainability-poster"><img src="images/science-sustainability-poster/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Science for Sustainability Poster (2012)</span></a>
            </li>
            <li class="project gd">
                <a href="#!/adasp-logo"><img src="images/adasp-logo/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">ADASP Logo (2012)</span></a>
            </li>
            <li class="project gd">
                <a href="#!/lab-medicine-magazine"><img src="images/lab-medicine-magazine/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Lab Medicine Magazine (2012)</span></a>
            </li>
            <li class="project gd">
                <a href="#!/70-rocks-logo"><img src="images/70-rocks-logo/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">70 Rocks Logo (2011)</span></a>
            </li>
            <li class="project photo">
                <a href="#!/savic-wedding-photography"><img src="images/savic-wedding-photography/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Savic Wedding Photography (2010)</span></a>
            </li>
            <li class="project photo">
                <a href="#!/automotive-feature-photography"><img src="images/automotive-feature-photography/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Automotive Feature Photography (2009–2010)</span></a>
            </li>
            <li class="project gd">
                <a href="#!/uic-bfa-show-poster"><img src="images/uic-bfa-show-poster/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">UIC BFA Show Poster (2010)</span></a>
            </li>
            <li class="project photo">
                <a href="#!/arandjelovic-wedding-photography"><img src="images/arandjelovic-wedding-photography/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Arandjelovic Wedding Photography (2010)</span></a>
            </li>
            <li class="project gd">
                <a href="#!/laser-type"><img src="images/laser-type/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Laser Type (2009)</span></a>
            </li>
            <li class="project video">
                <a href="#!/drewsky"><img src="images/drewsky/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Drewsky (2009)</span></a>
            </li>
            <li class="project gd">
                <a href="#!/ravinia-festival-poster"><img src="images/ravinia-festival-poster/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Ravinia Festival Poster (2009)</span></a>
            </li>
            <li class="project video">
                <a href="#!/fight-club-opening-credits"><img src="images/fight-club-opening-credits/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">Fight Club Opening Credits (2008)</span></a>
            </li>
            <li class="project gd">
                <a href="#!/20twelve-logo"><img src="images/20twelve-logo/thumb.jpg" width="600" height="400" class="background-cover"><span class="title">20twelve Logo (2007)</span></a>
            </li>
        </ul>
    </main>
    <footer>
        <div class="container">&copy;
            <?php echo date('Y'); ?> Kevin Beronilla. All works featured, unless noted as academic or independent, are copyrighted by the respective companies and organizations of which they are a representation of.</div>
    </footer>
    <script src="js/jquery.min.js"></script>
    <script src="js/isotope.pkgd.min.js"></script>
    <script src="js/jquery.lightSlider.min.js"></script>
    <script src="js/jquery.backgroundcover.min.js"></script>
    <script src="js/jquery.tooltipster.min.js"></script>
    <script src="js/matchMedia.min.js"></script>
    <script src="js/main.min.js?v=<?= $resourceVersion ?>"></script>
    <?php include_once("analyticstracking.php") ?>
</body>

</html>