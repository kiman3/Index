(function($){

	// Smooth scroll
	var page = $('html, body');

	// Anchor smooth scroll
	function smoothScroll() {
		$('a[href*="#"]:not([href="#"])').on('click', function() {
			page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
				page.velocity("stop");
			});
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
	smoothScroll();

	// Top scroll btn visiblity
	var scrollTopBtn = $('.scroll-top');
	$(scrollTopBtn).hide();
	function scrollBtn(){
		var isOnTop = true;
		$(window).scroll(function(){
			var isCurrentOnTop = $(window).scrollTop()===0;
			if(isOnTop == isCurrentOnTop) //scroll has changed but we only care when has changed from or to 0
				return;
			isOnTop = isCurrentOnTop;
			var effect = isOnTop? "fadeOut": "fadeIn";
			$('.scroll-top').velocity("finish").velocity(effect, { delay: 500, duration: 1500 });
		});
	}
	scrollBtn();

	// Top scroll
	function topScroll(){
		$('.scroll-top').on('click', function(){
			page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
				page.velocity("stop");
			});
			$(page).stop().velocity("scroll",
			{
				duration: 1500,
				offset: 0,
				mobileHA: false
			});
			return false;
		});
	}
	topScroll();

	$(document).on('mousemove', function(e){
		$('.project-img').css({
			'transform' : 'translate(' + e.clientX + 'px ,' + e.clientY + 'px)'
		});
	});

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


	// Configure and initialize smoothstate
	// Remember to initialize all relevant functions onAfter
	$( function() {
		var $body = $('body');
		var settings = { 
			anchors: 'a',
			cacheLength: 4,
			loadingClass: 'is-loading',
			onStart: {
				duration: 0,
				render: function ( $container ) {
					$container.addClass('glitch');
				}
			},
			onAfter: function( $container, $newContent ) {
				responsiveVideos(),
				scrollBtn(),
				smoothScroll(),
				topScroll(),
				$container.removeClass('glitch');
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

})(jQuery);