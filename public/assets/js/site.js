(function($){

	// Global variables
	var page = $('html, body'),
		body = $('body'),
		project = $('.project');

	// Projects on index fade in randomly. 
	function projectsFade(){
		if (!$(body).hasClass('already-here')){
			var v = $(".project").css('visibility', 'hidden'), cur = 0;
			for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
			function fadeInNext() {
				v.eq(cur++).css('visibility','visible').hide().velocity("fadeIn", { duration: 800 });
					if(cur != v.length) setTimeout(fadeInNext, 150);
			}
			fadeInNext();
		} else{
			$('.project').css('visibility', 'visible').show();
		}
	}
	projectsFade();

	// Custom cursor
	function customCursor() {
		$(document).on('mousemove', function(e) { 
			$('.cursor').css({
				'transform' :  'translate(' + e.clientX + 'px ,' + e.clientY + 'px)'  
			});
			if ($('.entry-img:hover').length != 0) {
				$('.cursor').fadeIn(500);
			} else{
				$('.cursor').fadeOut(500);
			}
		})
	}
	customCursor();

	// Sorting of archive table
	function sorting(){
		// Sorting functionality
		var $grid = $('.archived-projects-wrap').isotope({
			 getSortData: {
				title: '.archived-project-title',
				client: '.archived-project-client',
				typology: '.archived-project-typology',
				year: '.archived-project-year'
			},
			itemSelector: '.archived-project',
			layoutMode: 'vertical'
		});
		function sortingBtns(){
			// bind sort button click
			$('.archive-sort-btn').on( 'click', function() {
				var sortValue = $(this).attr('data-sort-value'),
					sortClass = $(this).hasClass('sort-asc');
				if(sortClass){
					$(this).removeClass('sort-asc');
				} else {
					$(this).addClass('sort-asc');
				}
				$grid.isotope({ 
					sortBy: sortValue,
					sortAscending: !sortClass
				});
			});
		}
		sortingBtns();
	}
	sorting();

	// Current scroll position
	function scrollCurrentPos(){
		scrollPos = 0;
		$(window).scroll(function(){
    		scrollPos = $(document).scrollTop();
		});
	}
	scrollCurrentPos();

	// Entry images click scrollto navigation
	function entryImgNav(){
		entryImg = $('.entry-img');
		$(entryImg).click(function(){
			stopScroll();
			entryNumber = $(this).attr('data-asset-number'),
			entryNextNumber = ++entryNumber,
			entryNext = $('#entry-img-' +  entryNextNumber),
			entryFirst = $('#entry-img-1');
			if (scrollPos > 0){
				$(page).velocity("scroll", {
					offset: entryNext.offset().top - 36,
					duration: 500
				});
			} else {
				$(page).velocity("scroll", {
					offset: entryFirst.offset().top - 36,
					duration: 500
				});
			}
		});
	}
	entryImgNav();

	// Project thumbs loaded, fade in
	function projectThumbsLoaded(){
		$('#projects-container').imagesLoaded()
			.always( function( instance ) {})
			.done( function( instance ) {})
			.fail( function() {})
			.progress( function( instance, image ) {
				$(image.img).css('visibility','visible').hide().velocity("fadeIn", { duration: 800 });
			});
	}
	projectThumbsLoaded();

	// Hover function set class (general, now used for archived projects)
	function hover(hover){
		$(hover).hover(function(){
			$(hover).not(this).addClass('hover-out');
		}, function(){
			$(hover).removeClass('hover-out');
		});
	}
	hover('.archived-project');

	// Stop scroll animation if user scrolls
	function stopScroll(){
		page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
			page.velocity("stop");
		});
	}

	// Anchor smooth scroll
	function smoothScroll() {
		$('a[href*="#"]:not([href="#"])').on('click', function() {
			stopScroll();
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$(page).animate({
						scrollTop: target.offset().top
					}, 1400, '', function(){});
					$(page).velocity("scroll", {
						offset: target.offset().top,
						duration: 1400
					});
					return false;
				}
			}
		});
	}

	// Top scroll
	function topScroll(){
		$('.scroll-top').on('click', function(e){
			e.preventDefault();
			stopScroll();
			$(page).stop().velocity("scroll",
			{
				duration: 1500,
				offset: 0,
				mobileHA: false
			});
		});
	}
	topScroll();

	// Entry text scroll
	function entryTextScroll(){
		var scrollPreamble = 0;

		$('.entry-read-more').on('click', function(e){
			windowSize();
			docHeight = $(document).outerHeight();
			entryPreambleHeight = $('.entry-preamble').outerHeight() + $('.footer-main').outerHeight + 40;

			if (entryPreambleHeight > windowHeight){
				scrollToPreamble = docHeight - entryPreambleHeight
			} else{
				scrollToPreamble = docHeight - windowHeight
			}
			e.preventDefault();
			stopScroll();
			$(page).stop().velocity("scroll",
			{
				duration: 1500,
				offset: scrollToPreamble,
				mobileHA: false
			});
		});
	}
	entryTextScroll();

	// Find window size, define variables
	function windowSize() {
		windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
		windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
	}
	windowSize();

	// Project img mousemove
	function projectImgMouseMoveInit(){
		function projectImgMouseMove(){
			var projectImg = $('.project-img');
			projectImg.addClass('moveable');
			$(document).on('mousemove', function(e){
				$('.moveable').css({
					'transform' : 'translate(' + e.clientX + 'px ,' + e.clientY + 'px)'
				});
			});
		}
		if (windowWidth >= 960) {
			projectImgMouseMove();
		}

		$(window).resize(function() {
			windowSize();

			var projectImg = $('.project-img');
			if (windowWidth >= 960) {
				projectImgMouseMove();
			} else{
				$(projectImg).css({
					'transform' : 'translate(0, 0)'
				})
				$(projectImg).removeClass('moveable');
			}
		});
	}
	projectImgMouseMoveInit();

	// Responsive videos (YouTube and Vimeo embeds)
	function responsiveVideos(){
		var iframes = document.getElementsByTagName( 'iframe' );
			for ( var i = 0; i < iframes.length; i++ ) {
			var iframe = iframes[i],
			players = /www.youtube.com|player.vimeo.com/;
			if ( iframe.src.search( players ) > 0 ) {
				var videoRatio = ( iframe.height / iframe.width ) * 100;
				iframe.style.position = 'absolute';
				iframe.style.top = '0';
				iframe.style.left = '0';
				iframe.width = '100%';
				iframe.height = '100%';
				var wrap = document.createElement( 'div' );
				wrap.className = 'fluid-vids';
				wrap.style.width = '100%';
				wrap.style.position = 'relative';
				wrap.style.paddingTop = videoRatio + '%';
				var iframeParent = iframe.parentNode;
				iframeParent.insertBefore( wrap, iframe );
				wrap.appendChild( iframe );
			}
		}
	}
	responsiveVideos();

	// Set class on body if nav back to home
	function relHome(){
		var relHome = $('a[rel="home');
		$(relHome).on('click', function(){
			$(body).addClass('already-here');
		});
	}
	relHome();


	// SmoothState
	// Remember to initialize all relevant functions onAfter
	$( function() {
		var $body = $('body');
		var settings = { 
			anchors: 'a',
			cacheLength: 4,
			loadingClass: 'is-loading',
			onStart: {
				duration: 500,
				render: function ( $container ) {
					$container.addClass('pfft');
				}
			},
			onAfter: function( $container, $newContent ) {
				entryImgNav(),
				hover('.archived-project'),
				projectImgMouseMoveInit(),
				projectThumbsLoaded(),
				projectsFade(),
				relHome(),
				responsiveVideos(),
				scrollCurrentPos(),
				sorting(),
				smoothScroll(),
				topScroll(),
				windowSize(),
				$container.removeClass('pfft');
			},
			prefetch: true
		};

		$('#container').smoothState( settings );
	});

	// Draw
	var canvas = $('#c'),
		viewportW = $(window).width(),
		viewportH = $(window).height();
		docH = $(document).height();
		// console.log('Total document height: ' + docH + ' px');
	$(canvas).attr('width', viewportW);
	$(canvas).attr('height', docH);
	$(canvas).addClass('active');

	// Get a regular interval for drawing to the screen
	window.requestAnimFrame = (function (callback) {
		return window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimaitonFrame ||
			function (callback) {
			 	window.setTimeout(callback, 1000/60);
			};
	})();

	var initX;
	var initY;

	$(document).mousemove(function(event){
		initX = event.pageX;
		initY = event.pageY;
		return initX;
		return initY;
	});

	// Set up the canvas
	var canvas = document.getElementById("c");

	if( $('#canvas').length > 0 ){
		var body = document.body;
		var ctx = canvas.getContext("2d");
		ctx.strokeStyle = "#000";
		ctx.font = "bold 16px Arial";
		ctx.lineWidth = 0.25;
		ctx.translate(0.5, 0.5);
		ctx.lineJoin = ctx.lineCap = 'round';


		// Set up mouse events for drawing
		var drawing = true;
		var mousePos = { x:initX, y:initY };
		var lastPos = mousePos;

		body.addEventListener("mousedown", function (e) {
			drawing = true;
			lastPos = getMousePos(canvas, e);
		}, false);
		body.addEventListener("mouseup", function (e) {
			drawing = true;
		}, false);
		body.addEventListener("mousemove", function (e) {
			mousePos = getMousePos(canvas, e);
		}, false);

		// Set up touch events for mobile, etc
		canvas.addEventListener("touchstart", function (e) {
			mousePos = getTouchPos(canvas, e);
			var touch = e.touches[0];
			var mouseEvent = new MouseEvent("mousedown", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			canvas.dispatchEvent(mouseEvent);
		}, false);
		canvas.addEventListener("touchend", function (e) {
			var mouseEvent = new MouseEvent("mouseup", {});
			canvas.dispatchEvent(mouseEvent);
		}, false);
		canvas.addEventListener("touchmove", function (e) {
			var touch = e.touches[0];
			var mouseEvent = new MouseEvent("mousemove", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			canvas.dispatchEvent(mouseEvent);
		}, false);

		// Prevent scrolling when touching the canvas
		document.body.addEventListener("touchstart", function (e) {
			if (e.target == canvas) {
				e.preventDefault();
			}
		}, false);
		document.body.addEventListener("touchend", function (e) {
			if (e.target == canvas) {
				e.preventDefault();
			}
		}, false);
		document.body.addEventListener("touchmove", function (e) {
			if (e.target == canvas) {
				e.preventDefault();
			}
		}, false);

		// Get the position of the mouse relative to the canvas
		function getMousePos(canvasDom, mouseEvent) {
			var rect = canvasDom.getBoundingClientRect();
			return {
				x: mouseEvent.clientX - rect.left,
				y: mouseEvent.clientY - rect.top
			};
		}

		// Get the position of a touch relative to the canvas
		function getTouchPos(canvasDom, touchEvent) {
			var rect = canvasDom.getBoundingClientRect();
			return {
				x: touchEvent.touches[0].clientX - rect.left,
				y: touchEvent.touches[0].clientY - rect.top
			};
		}

		// Draw to the canvas
		function renderCanvas() {
			if (drawing) {
				ctx.moveTo(lastPos.x, lastPos.y);
				ctx.lineTo(mousePos.x, mousePos.y);
				ctx.stroke();
				lastPos = mousePos;
			}
		}

		function clearCanvas() {
			canvas.width = canvas.width;
			ctx.lineWidth = 0.01;
		}

		// Allow for animation
		(function drawLoop () {
			requestAnimFrame(drawLoop);
			renderCanvas();
		})();

		$(window).on('beforeunload', function(){
			var dataURL = canvas.toDataURL();
			console.log(dataURL);
		    $.ajax({
				type: "POST",
				url: "upload.php",
				data: { 
				 imgBase64: dataURL
				}
			}).done(function(o) {
				console.log('Saved'); 
			});
		});
	} // if canvas exists end

})(jQuery);