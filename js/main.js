/* ----------------------------------------
Global Variables
---------------------------------------- */
var documentBody = $(document.body),
    windowObj = $(window),
    isMobile = false,
    mobileUserAgentString = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i,
    loading;

if (mobileUserAgentString.test(navigator.userAgent)) {
    isMobile = true;
}

/* ----------------------------------------
Page Refresh Functions
---------------------------------------- */
$(document).ready(function() {
	var contactButton = $('#contact'),
        contactClicked = false;
    
	contactButton.click(function() {
		contactClicked = true;
	});
	
	windowObj.on('beforeunload', function() {
		if (!contactClicked) { // Ignore onbeforeload event if contact button is clicked
			$(this).scrollTop();
			documentBody.hide();
		} else {
			contactClicked = false; // Reset
		}
	});
});

/* ----------------------------------------
Page Load Functions
---------------------------------------- */
$(document).ready(function() {
	var portfolioImages = $('#portfolio li a img'),
        mainContainer = $('main'),
        heroRegion = $('#hero'),
        heroContainer = $('#hero .container'),
        intro = $('.intro'),
        introSlideIn = $('.slide-in');
	
	loading = $('#loading');
	
	var randomInteger = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	
	if (window.matchMedia('(min-width: 741px)').matches) loading.addClass('active'); 
	else mainContainer.addClass('loaded');
	
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
					}, 500);
				}, 250);
			}, 500);
		}, 1000);
	});
});

/* ----------------------------------------
Filter Functions
---------------------------------------- */
$(document).ready(function() {
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
	
	var filterPortfolio = function(className) {
		if (className == 'all') portfolio.isotope({ filter: '*' });
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
$(document).ready(function() {
	var header = $('header'),
        portfolioItem = $('#portfolio li a'),
        projectContainer = $('#project'),
        hashValue = window.location.hash;
			
	var initializeSlider = function() { // LightSlider initialize
		$('#project .project-content .images ul').lightSlider({
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
	
	var openProject = function(entry) {
		var project = entry.replace(/#/, '').replace('!', '');
		
		header.addClass('open');
		documentBody.addClass('disable-scroll');
		
		setTimeout(function() {
			loading.addClass('active');
			
			projectContainer.load('projects/' + project + '.php', function(response, status) {
				if (status == 'error') {
				  header.removeClass('open');
				  documentBody.removeClass('disable-scroll');
				  
				  alert('The requested project could not be found. If you feel you have received this message in error, please contact me at kevin.beronilla@gmail.com and I will look into the issue.');
				}
			});
		}, 250);		
		
		$(document).ajaxComplete(function() {
            var sliderElements = $('.lSSlideOuter'),
                tooltips = $('.tooltip'),
                projectMedia = $('#project img'),
                projectHero = $('.project-hero'),
                projectContent = $('.project-content'),
                closeButton = $('#close-btn');
            
			function initializePlugins() {
				if (!sliderElements.length) initializeSlider();
                
				tooltips.tooltipster({ // Tootipster initialize
					animation: 'grow',
					position: 'bottom',
					delay: 0,
					speed: 250,
					theme: 'tooltipster-default',
					touchDevices: true,
					trigger: 'hover'
				});
			}
            
			$.when(initializePlugins()).done(function() {
				var loadCount = 0,
                    totalCount = projectMedia.length;
				
				projectMedia.load(function() {	
					loadCount++;
					
					if (loadCount == totalCount) {
						loading.removeClass('active');	
                        
						function revealHero() {
							setTimeout(function() {
								projectHero.addClass('active');
							}, 350);
						}
                        
						$.when(revealHero()).done(function() {
							setTimeout(function() {
								projectContent.addClass('active');
							}, 250);
						});
					}
				});
			});
            
			var closeHeader = function() {
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
			
			closeButton.click(function(e) {
				e.preventDefault();
				closeHeader();
			});
			
			header.click(function(e) {
				if (e.target == this && projectHero.hasClass('active')) closeHeader(); // If clicked outside of loaded project
			});
			
			$(document).keyup(function(e) {
				if (e.keyCode == 27 && projectHero.hasClass('active')) closeHeader(); // If Esc key is pressed on loaded project
			});
		});
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
});

/* ----------------------------------------
Mobile Scroll Functions
---------------------------------------- */
if (isMobile) {
    var portfolioItem = $('#portfolio li a');
    
    function handleScroll() {
        var windowTopPos = windowObj.scrollTop(),
            windowBottomPos = windowTopPos + windowObj.height(),
            posPadding = 30,
            headerHeight = $('header').height();
        
        portfolioItem.each(function() {
            var self = $(this),
                itemTopPos = self.offset().top,
                itemBottomPos = itemTopPos + self.height();
            
            if (itemTopPos >= (windowTopPos + headerHeight + posPadding) && itemBottomPos <= (windowBottomPos - posPadding)) {
                self.addClass('hover');
            } else {
                self.removeClass('hover');
            }
        });
    }
    
    windowObj.scroll(function() {
        window.requestAnimationFrame(handleScroll);
    });
}

/* ----------------------------------------
Logo Functions
---------------------------------------- */
$(document).ready(function() {
	var logo = $('.logo'),
        mainView = $('html, body');
	
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
$(document).ready(function() {
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
$(document).ready(function() {
	$('.background-cover').backgroundCover();
});