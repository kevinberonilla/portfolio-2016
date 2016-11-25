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
	var contactLink = $('.contact-link'),
        contactClicked = false;
    
    mainView.scrollTop(0);
    
	contactLink.click(function() {
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
    
    function endAnimationSequence() {
        intro.addClass('loaded');
        mainContainer.addClass('loaded');
        footer.addClass('reveal');
    }
    
    function revealIntro() {
        introSlideIn.one('transitionend', endAnimationSequence)
            .addClass('reveal');
    };
    
    function revealHero() {
        heroRegion.addClass('reveal');
        intro.one('transitionend', revealIntro)
            .addClass('reveal');
    };
	
	if (window.matchMedia('(max-width: 740px)').matches) {
        mainContainer.addClass('loaded');
        footer.addClass('reveal');
    } else loading.addClass('active');
	
	windowObj.load(function() {
		loading.removeClass('active');
		
		setTimeout(function() {
			heroContainer.one('transitionend', revealHero)
                .removeClass('closed');
		}, 1000);
		
		portfolioImages.each(function() {
			var theImage = $(this);
			
			setTimeout(function() {
				var theProject = theImage.closest('li');
				
				theProject.addClass('loaded');
			}, randomInteger(250, 750));
		});
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
            speed: 200,
            theme: 'tooltipster-default',
            touchDevices: true,
            trigger: 'hover',
            debug: false
        });
    }
    
    function setCookie(name, value) {
        document.cookie = name + '=' + value + ';';
    }
    
    function getCookie(name) {
        var name = name + "=";
        var cookies = document.cookie.split(';');
        
        for (var i = 0; i < cookies.length; i++) {
            var thisCookie = cookies[i];
            
            while (thisCookie.charAt(0) === ' ') {
                thisCookie = thisCookie.substring(1);
            }
            
            if (thisCookie.indexOf(name) === 0) {
                return thisCookie.substring(name.length, thisCookie.length);
            }
        }
    }
    
    function closeHeader(closeButton, handleKeyup, loading, header, projectHero, projectContent) {
        var emptyContainer = function() {
            projectContainer.empty();
        };
        
        header.animate({
                scrollTop: 0,
                easing: 'ease',
            }, 250)
            .one('transitionend', emptyContainer);
        
        documentBody.removeClass('disable-scroll');
        header.removeClass('open');
        closeButton.unbind('click');
        documentObj.unbind('keyup', handleKeyup);
        loading.removeClass('active');	
        projectHero.removeClass('active');
        projectContent.removeClass('active');
    }
    
    function revealProject(loading, projectHero, projectContent) {
        loading.removeClass('active');
        
        setTimeout(function() {
            projectContent.addClass('active');
            
            if (getCookie('should-show-info') === 'true' || typeof(getCookie('should-show-info')) === 'undefined') {
                $('#info-btn').addClass('active');
                $('.project-content .notes').show();
            }
            
            setTimeout(function() {
                projectHero.addClass('active');
            }, 100);
        }, 100);
    }
    
    function initProject() {
        var sliderElement = $('.lSSlideOuter'),
            tooltip = $('.tooltip'),
            projectMedia = $('#project img, #project iframe'),
            projectHero = $('.project-hero'),
            projectContent = $('.project-content'),
            closeButton = $('#close-btn'),
            handleKeyup = function(e) {
                if (e.keyCode === 27 && projectHero.hasClass('active')) closeHeader(closeButton, handleKeyup, loading, header, projectHero, projectContent); // If Esc key is pressed on loaded project
            }
        
        $.when(initializePlugins(sliderElement, tooltip)).done(function() {
            var loadCount = 0,
                totalCount = projectMedia.length;
            
            if (totalCount === 0) {
                if (typeof(document.fonts) === 'undefined') revealProject(loading, projectHero, projectContent);
                else document.fonts.ready.then(revealProject(loading, projectHero, projectContent)); // Wait for web fonts to load
            }
            else {
                projectMedia.load(function() {	
                    loadCount++;
                    if (loadCount === totalCount) {
                        if (typeof(document.fonts) === 'undefined') revealProject(loading, projectHero, projectContent);
                        else document.fonts.ready.then(revealProject(loading, projectHero, projectContent)); // Wait for web fonts to load
                    }
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
	
	function getProject(entry) {
		var project = entry.replace(/[\/,#,!]/g, '');
		
		documentBody.addClass('disable-scroll');
		header.addClass('open');
        
        setTimeout(function() {
            loading.addClass('active');
            
            projectContainer.load('projects/' + project + '.php', function(response, status) {
                if (status === 'error') getProject('not-found');
            });
            
            documentObj.ajaxComplete(initProject);
        }, 250);
	}
	
	if (hashValue) windowObj.load(getProject(hashValue)); // If URL has anchor
	
	portfolioItem.click(function(e) {		
		var project = $(this).attr('href');
		
		e.preventDefault();
		getProject(project);
	});
    
    documentBody.on('click', '#info-btn', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.project-content .notes').stop()
            .slideToggle(150);
        
        if (getCookie('should-show-info') === 'true' || typeof(getCookie('should-show-info')) === 'undefined') {
            setCookie('should-show-info', 'false');
        } else {
            setCookie('should-show-info', 'true');
        }
    });
});

/* ----------------------------------------
Logo Functions
---------------------------------------- */
documentObj.ready(function() {
	var logo = $('.logo');
	
	logo.click(function() {
		mainView.animate({
			scrollTop: 0
		}, 500);
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