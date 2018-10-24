!function(a){
// Projects on index fade in randomly. 
function o(){function t(){e.eq(n++).css("visibility","visible").hide().velocity("fadeIn",{duration:650}),n!=e.length&&setTimeout(t,100)}if(a(E).hasClass("already-here"))a(".project").css("visibility","visible").show();else{for(var e=a(".project").css("visibility","hidden"),n=0,o,i,r=e.length;r;o=parseInt(Math.random()*r),i=e[--r],e[r]=e[o],e[o]=i);t()}}
// Current scroll position
function i(){scrollPos=0,a(window).scroll(function(){scrollPos=a(document).scrollTop()})}
// Entry images click scrollto navigation
function r(){entryImg=a(".entry-img"),a(entryImg).click(function(){e(),entryNumber=a(this).attr("data-asset-number"),entryNextNumber=++entryNumber,entryNext=a("#entry-img-"+entryNextNumber),entryFirst=a("#entry-img-1"),a(this).hasClass("last-asset")?a("#entry-preamble").velocity("scroll",{duration:500}):0<scrollPos?a(C).velocity("scroll",{offset:entryNext.offset().top-22,duration:500}):a(C).velocity("scroll",{offset:entryFirst.offset().top-22,duration:500})})}
// Custom cursor move, fade in, fade out
function s(){a(document).on("mousemove",function(t){a(".cursor").css({transform:"translate("+t.clientX+"px ,"+t.clientY+"px)"}),0!=a(".entry-article-row:hover").length?a(".cursor").fadeIn(500):a(".cursor").fadeOut(500)})}
// Custom cursor fig update
function c(){var t=a(".entry-img"),e=a(".cursor"),n=a(".last-asset").attr("data-asset-number");a(t).on("mouseover",function(){var t=a(this).attr("data-asset-number");a(e).text("(Fig "+t+"/"+n+")")})}
// Sorting of archive table
function l(){function t(){
// bind sort button click
a(".archive-sort-btn").on("click",function(){var t=a(this).attr("data-sort-value"),e=a(this).hasClass("sort-asc");e?a(this).removeClass("sort-asc"):a(this).addClass("sort-asc"),n.isotope({sortBy:t,sortAscending:!e})})}
// Sorting functionality
var n=a(".archived-projects-wrap").isotope({getSortData:{title:".archived-project-title",client:".archived-project-client",typology:".archived-project-typology",year:".archived-project-year"},itemSelector:".archived-project",layoutMode:"vertical"});t()}
// Project thumbs loaded, fade in
function d(){a("#projects-container").imagesLoaded().always(function(t){}).done(function(t){}).fail(function(){}).progress(function(t,e){a(e.img).css("visibility","visible").hide().velocity("fadeIn",{duration:800})})}
// Hover function set class (general, now used for archived projects)
function u(t){a(t).hover(function(){a(t).not(this).addClass("hover-out")},function(){a(t).removeClass("hover-out")})}
// Stop scroll animation if user scrolls
function e(){C.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove",function(){C.velocity("stop")})}
// Anchor smooth scroll
function h(){a('a[href*="#"]:not([href="#"])').on("click",function(){if(e(),location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=a(this.hash);if((t=t.length?t:a("[name="+this.hash.slice(1)+"]")).length)return a(C).animate({scrollTop:t.offset().top},1400,"",function(){}),a(C).velocity("scroll",{offset:t.offset().top,duration:1400}),!1}})}
// Top scroll
function f(){a(".scroll-top").on("click",function(t){t.preventDefault(),e(),a(C).stop().velocity("scroll",{duration:1500,offset:0,mobileHA:!1})})}
// Entry text scroll
function t(){var t=0;a(".entry-read-more").on("click",function(t){m(),docHeight=a(document).outerHeight(),entryPreambleHeight=a(".entry-preamble").outerHeight()+a(".footer-main").outerHeight+40,entryPreambleHeight>windowHeight?scrollToPreamble=docHeight-entryPreambleHeight:scrollToPreamble=docHeight-windowHeight,t.preventDefault(),e(),a(C).stop().velocity("scroll",{duration:1500,offset:scrollToPreamble,mobileHA:!1})})}
// Find window size, define variables
function m(){windowHeight=window.innerHeight?window.innerHeight:a(window).height(),windowWidth=window.innerWidth?window.innerWidth:a(window).width()}
// Project img mousemove
function v(){function e(){var t;a(".project-img").addClass("moveable"),a(document).on("mousemove",function(t){a(".moveable").css({transform:"translate("+t.clientX+"px ,"+t.clientY+"px)"})})}960<=windowWidth&&e(),a(window).resize(function(){m();var t=a(".project-img");960<=windowWidth?e():(a(t).css({transform:"translate(0, 0)"}),a(t).removeClass("moveable"))})}
// Responsive videos (YouTube and Vimeo embeds)
function p(){for(var t=document.getElementsByTagName("iframe"),e=0;e<t.length;e++){var n=t[e],o=/www.youtube.com|player.vimeo.com/;if(0<n.src.search(o)){var i=n.height/n.width*100;n.style.position="absolute",n.style.top="0",n.style.left="0",n.width="100%",n.height="100%";var r=document.createElement("div"),a;r.className="fluid-vids",r.style.width="100%",r.style.position="relative",r.style.paddingTop=i+"%",n.parentNode.insertBefore(r,n),r.appendChild(n)}}}
// Set class on body if nav back to home
function w(){var t=a('a[rel="home');a(t).on("click",function(){a(E).addClass("already-here")})}
// Get the position of the mouse relative to the canvas
function n(t,e){var n=t.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}}
// Get the position of a touch relative to the canvas
function y(t,e){var n=t.getBoundingClientRect();return{x:e.touches[0].clientX-n.left,y:e.touches[0].clientY-n.top}}
// Draw to the canvas
function g(){F&&(k.moveTo(S.x,S.y),k.lineTo(P.x,P.y),k.stroke(),S=P)}function b(){j.width=j.width,k.lineWidth=.01}
// Allow for animation
// Global variables
var C=a("html, body"),E=a("body"),x=a(".project");o(),i(),r(),s(),c(),l(),d(),u(".archived-project"),f(),t(),m(),v(),p(),w(),
// SmoothState
// Remember to initialize all relevant functions onAfter
a(function(){var n=a("body"),t={anchors:"a",cacheLength:4,loadingClass:"is-loading",onStart:{duration:100,render:function(t){t.addClass("pfft"),n.addClass("transitioning")}},onAfter:function(t,e){s(),r(),c(),u(".archived-project"),lazySizes.init(),v(),d(),o(),w(),p(),i(),l(),h(),f(),m(),t.removeClass("pfft"),n.removeClass("transitioning")},prefetch:!0};a("#container").smoothState(t)});
// Canvas Drawing Demands
// a Lot of Code 
var j=a("#c"),H=a(window).width(),A=a(window).height(),L,T,N;a(j).attr("width",2*H),a(j).attr("height",2*A),a(j).addClass("active"),
// Get a regular interval for drawing to the screen
window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimaitonFrame||function(t){window.setTimeout(t,1e3/60)},a(document).mousemove(function(t){return T=t.pageX,N=t.pageY,T;return N});
// Set up the canvas
var j=document.getElementById("c");if(0<a("#c").length){var E=document.body,k=j.getContext("2d");k.scale(2,2),k.strokeStyle="rgba(255, 255, 255, 0.1)",k.font="bold 16px Arial",k.lineWidth=1,
// ctx.shadowColor = "#fff";
// ctx.shadowBlur = 10;
// ctx.shadowBlur = 10;
k.translate(.5,.5),k.lineJoin=k.lineCap="round";
// Set up mouse events for drawing
var F=!0,P={x:T,y:N},S=P;E.addEventListener("mousedown",function(t){F=!0,S=n(j,t)},!1),E.addEventListener("mouseup",function(t){F=!0},!1),E.addEventListener("mousemove",function(t){P=n(j,t)},!1),
// Set up touch events for mobile, etc
j.addEventListener("touchstart",function(t){P=y(j,t);var e=t.touches[0],n=new MouseEvent("mousedown",{clientX:e.clientX,clientY:e.clientY});j.dispatchEvent(n)},!1),j.addEventListener("touchend",function(t){var e=new MouseEvent("mouseup",{});j.dispatchEvent(e)},!1),j.addEventListener("touchmove",function(t){var e=t.touches[0],n=new MouseEvent("mousemove",{clientX:e.clientX,clientY:e.clientY});j.dispatchEvent(n)},!1),
// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart",function(t){t.target==j&&t.preventDefault()},!1),document.body.addEventListener("touchend",function(t){t.target==j&&t.preventDefault()},!1),document.body.addEventListener("touchmove",function(t){t.target==j&&t.preventDefault()},!1),
// Allow for animation
function t(){requestAnimFrame(t),g()}(),a(window).on("beforeunload",function(){var t=j.toDataURL();console.log(t),a.ajax({type:"POST",url:"upload.php",data:{imgBase64:t}}).done(function(t){console.log("Saved")})})}// if canvas exists end
}(jQuery);