/* ----------------------------------------
Global Variables
---------------------------------------- */
var windowObj = $(window),
    documentObj = $(document),
    documentBody = $(document.body),
    mainView = $('html, body'),
    isMobile = false,
    mobileUserAgentString = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i,
    loading;

if (mobileUserAgentString.test(navigator.userAgent)) {
    isMobile = true;
    
    documentBody.addClass('mobile');
}

/* ----------------------------------------
Page Refresh Functions
---------------------------------------- */
documentObj.ready(function() {
	var contactButton = $('#contact'),
        contactClicked = false;
    
    mainView.scrollTop(0);
    
	contactButton.click(function() {
		contactClicked = true;
	});
	
	windowObj.on('beforeunload unload pagehide', function() {
		if (!contactClicked) { // Ignore event if contact button is clicked
            mainView.scrollTop(0);
            documentBody.hide();
        } else contactClicked = false; // Reset
	});
});

/* ----------------------------------------
Page Load Functions
---------------------------------------- */
documentObj.ready(function() {
	var portfolioImages = $('#portfolio li a img'),
        mainContainer = $('main'),
        heroRegion = $('#hero'),
        heroContainer = $('#hero .container'),
        intro = $('.intro'),
        introSlideIn = $('.slide-in'),
        footer = $('footer');
	
	loading = $('#loading');
	
	function randomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	
	if (window.matchMedia('(max-width: 740px)').matches) {
        loading.removeClass('active');
        mainContainer.addClass('loaded');
        footer.addClass('reveal');
    }
	
	windowObj.load(function() {
		loading.removeClass('active');
		
		portfolioImages.each(function() {
			var theImage = $(this);
			
			setTimeout(function() {
				var theProject = theImage.closest('li');
				
				theProject.addClass('loaded');
			}, randomInteger(250, 750));
		});
		
		setTimeout(function() {
			heroContainer.removeClass('closed');
			
			setTimeout(function() {
				heroRegion.addClass('reveal');
				intro.addClass('reveal');
				
				setTimeout(function() {
					introSlideIn.addClass('reveal');
					
					setTimeout(function() {
						intro.addClass('loaded');
						mainContainer.addClass('loaded');
                        footer.addClass('reveal');
					}, 500);
				}, 250);
			}, 500);
		}, 1000);
	});
});

/* ----------------------------------------
Filter Functions
---------------------------------------- */
documentObj.ready(function() {
	var portfolio = $('#portfolio'),
        dropDown = $('.drop-down'),
        dropDownOptions = $('.options'),
        dropDownOptionsItem = $('.options li'),
        dropDownSelected = $('#selected'),
        markup = $('html');
	
	portfolio.isotope({ // Isotope initialize
		itemSelector: '.project',
		layoutMode: 'fitRows',
		transitionDuration: '0.25s'
	});
	
	function filterPortfolio(className) {
		if (className === 'all') portfolio.isotope({ filter: '*' });
		else portfolio.isotope({ filter: '.' + className });
	}
	
	dropDown.click(function(e) {
		e.stopPropagation();
		dropDownOptions.toggleClass('open');
	});
	
	dropDownOptionsItem.click(function() {
		var theOption = $(this).attr('class'),
            theContent = $(this).html();
        
		dropDownSelected.html(theContent);
		filterPortfolio(theOption)
	});
	
	markup.click(function() {
		if (dropDownOptions.hasClass('open')) dropDownOptions.removeClass('open');
	});
});

/* ----------------------------------------
Portfolio Functions
---------------------------------------- */
documentObj.ready(function() {
	var header = $('header'),
        portfolioItem = $('#portfolio li a'),
        projectContainer = $('#project'),
        hashValue = window.location.hash;
        
    function initializePlugins(sliderElement, tooltip) {
        if (!sliderElement.length) {
            $('#project .project-content .images ul').lightSlider({ // LightSlider initialize
                adaptiveHeight: true,
                speed: 250,
                item: 1,
                slideMargin: 15,
                loop: false,
                pager: true,
                galleryMargin: 30,
                keyPress: true
            });
        }
        
        tooltip.tooltipster({ // Tootipster initialize
            animation: 'grow',
            position: 'top',
            delay: 0,
            speed: 250,
            theme: 'tooltipster-default',
            touchDevices: true,
            trigger: 'hover',
            debug: false
        });
    }

    function closeHeader(closeButton, handleKeyup, loading, header, projectHero, projectContent) {
        closeButton.unbind('click');
        documentObj.unbind('keyup', handleKeyup);
        loading.removeClass('active');	
        header.removeClass('open');
        documentBody.removeClass('disable-scroll');
        projectHero.removeClass('active');
        projectContent.removeClass('active');

        header.animate({
            scrollTop: 0,
            easing: 'ease',
        }, 250);

        setTimeout(function() {
            projectContainer.empty();
        }, 250);
    }	

    function revealHero(projectHero) {
        setTimeout(function() {
            projectHero.addClass('active');
        }, 350);
    }

    function revealProject(loading, projectHero, projectContent) {
        loading.removeClass('active');

        $.when(revealHero(projectHero)).done(function() {
            setTimeout(function() {
                projectContent.addClass('active');
            }, 250);
        });
    }
    
    function initProject() {
        var sliderElement = $('.lSSlideOuter'),
            tooltip = $('.tooltip'),
            projectMedia = $('#project img, #project iframe'),
            projectHero = $('.project-hero'),
            projectContent = $('.project-content'),
            closeButton = $('#close-btn');
        
        var handleKeyup = function(e) {
            if (e.keyCode === 27 && projectHero.hasClass('active')) closeHeader(closeButton, handleKeyup, loading, header, projectHero, projectContent); // If Esc key is pressed on loaded project
        }
        
        $.when(initializePlugins(sliderElement, tooltip)).done(function() {
            var loadCount = 0,
                totalCount = projectMedia.length;
            
            if (totalCount === 0) revealProject(loading, projectHero, projectContent);
            else {
                projectMedia.load(function() {	
                    loadCount++;
                    if (loadCount === totalCount) revealProject(loading, projectHero, projectContent);
                });
            }
        });
        
        closeButton.click(function(e) {
            e.preventDefault();
            closeHeader(closeButton, handleKeyup, loading, header, projectHero, projectContent);
        });
        
        header.click(function(e) {
            if (e.target === this && projectHero.hasClass('active')) closeHeader(closeButton, handleKeyup, loading, header, projectHero, projectContent); // If clicked outside of loaded project
        });
        
        documentObj.keyup(handleKeyup);
    }
	
	function openProject(entry) {
		var project = entry.replace(/#/, '').replace('!', '');
		
		header.addClass('open');
		documentBody.addClass('disable-scroll');
		
		setTimeout(function() {
			loading.addClass('active');
			
			projectContainer.load('projects/' + project + '.php', function(response, status) {
				if (status === 'error') {
                    openProject('not-found');
				}
			});
		}, 250);
		
		documentObj.ajaxComplete(initProject);
	}
	
	if (hashValue) { // If URL has anchor
		windowObj.load(function() {
			openProject(hashValue);
		});
	}
	
	portfolioItem.click(function(e) {		
		var project = $(this).attr('href');
		
		e.preventDefault();
		openProject(project);
	});
    
    documentBody.on('click', '#info-btn', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.project-content .notes').stop()
            .slideToggle(250);
    });
});

/* ----------------------------------------
Logo Functions
---------------------------------------- */
documentObj.ready(function() {
	var logo = $('.logo');
	
	logo.click(function() {
		mainView.animate({
			scrollTop: 0,
			easing: 'ease',
		}, 100);
	});
});

/* ----------------------------------------
Mobile Menu Functions
---------------------------------------- */
documentObj.ready(function() {
	var mobileMenu = $('.mobile-menu'),
        switchingContent = $('header h1, header nav');
	
	mobileMenu.click(function() {
		mobileMenu.toggleClass('active');
		switchingContent.toggleClass('switch');
	});
});

/* ----------------------------------------
Background Cover Initialize
---------------------------------------- */
documentObj.ready(function() {
	$('.background-cover').backgroundCover();
});