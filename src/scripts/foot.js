

console.log("foot.js");



var scrollSlideIn = function() {
	function debounce(func, wait = 10, immediate = true) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	const sliderElements = document.querySelectorAll(".js-trigger-slide");

	function checkSlide(e) {
		// console.count(e);
		sliderElements.forEach(el => {
			const slideInAt = (window.scrollY + window.innerHeight) - el.clientHeight;

			const elBottom = el.offsetTop + el.clientHeight;
			const isShown = slideInAt > el.offsetTop;
			const isNotScrollPast = window.scrollY < elBottom;

			if ( isShown && isNotScrollPast ) {
				el.classList.add("on-screen");
			}
			else {
				// el.classList.remove("on-screen");
			}
		});
	}

	window.addEventListener("scroll", debounce(checkSlide));
}



var handleGallery = function() {
	var carousel = document.querySelector('.main-carousel');
	var flkty = new Flickity( carousel, {
		// options
		imagesLoaded: true,
		percentPosition: false,
		wrapAround: true,
		// freeScroll: true,
		pageDots: false,
		adaptiveHeight: true,
		arrowShape: 'M41.875,74.234c-0.696,0-1.393-0.265-1.926-0.794L18.245,51.901c-0.467-0.482-0.722-1.094-0.764-1.717 c-0.012-0.182-0.006-0.364,0.018-0.546c0.068-0.519,0.286-1.02,0.65-1.437c0.047-0.055,0.097-0.106,0.148-0.157L39.949,26.56 c0.533-0.529,1.229-0.794,1.926-0.794c0.703,0,1.406,0.27,1.94,0.809c1.063,1.072,1.058,2.803-0.015,3.866L26.846,47.266h52.945 c1.51,0,2.734,1.225,2.734,2.734s-1.225,2.734-2.734,2.734H26.846L43.801,69.56c1.072,1.063,1.078,2.794,0.015,3.866 C43.281,73.965,42.578,74.234,41.875,74.234z'
	});

	var galleryItems = carousel.querySelectorAll('.carousel-cell .js-gallery-item');
	// get transform property
	var docStyle = document.documentElement.style;
	var transformProp = typeof docStyle.transform == 'string' ?
	'transform' : 'WebkitTransform';

	flkty.on( 'scroll', function() {
		flkty.slides.forEach( function( slide, i ) {
			var img = galleryItems[i];
			var x = 0;

			if( 0 === i ) {
				x = Math.abs( flkty.x ) > flkty.slidesWidth ? ( flkty.slidesWidth + flkty.x + flkty.slides[flkty.slides.length - 1 ].outerWidth + slide.target ) : ( slide.target + flkty.x );
			} else if( i === flkty.slides.length - 1 ) {
				x = Math.abs( flkty.x ) + flkty.slides[i].outerWidth < flkty.slidesWidth ? ( slide.target - flkty.slidesWidth + flkty.x - flkty.slides[i].outerWidth ) : ( slide.target + flkty.x );
			} else {
				x = slide.target + flkty.x;
			}
			img.style[ transformProp ] = 'translateX(' + x * ( -1 / 3 ) + 'px)';
		});
	});
}










var heroScrollDownIndicator = function() {
	var scrollToLinks = [...document.querySelectorAll(".js-scroll-to")];
	if ( scrollToLinks.length > 0 ) {
		scrollToLinks.forEach(function(item){
			item.addEventListener("click", function(event){
				event.preventDefault();

				document.querySelector(".js-nav-toggle-hook").classList.remove("menu-open");

				// var target = this.dataset.scrollTo;
				var target = this.getAttribute("href");
				// console.log(target, document.querySelector(target));
				scrollIt(
					document.querySelector(target),
					888,
					'easeOutQuad',
					() => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
				);
			});
		});
	}
};







var inputs = [...document.querySelectorAll(".js-required")];

var formPosted = false;

var formData = {
	email: "",
	fullName: "",
	message: "",
	sex: ""
}

function validateEmail(email){
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}
var checkRequired = function(){
	inputs.forEach(function(i){
		if ( i.value !== "" && i.getAttribute("name") == "email" && validateEmail(i.value) === true){
			// console.log("email submit ok");
			formData[i.getAttribute("name")] = i.value;
		}
		else if ( i.value !== "" && i.getAttribute("name") !== "email" ) {
			i.classList.remove("error");
			formData[i.getAttribute("name")] = i.value;
		}
		else {
			i.classList.add("error");
		}
		i.addEventListener("blur", function(){
			if ( i.value !== "" && i.getAttribute("name") == "email" && validateEmail(i.value) === true ){
				// console.log("email blur ok");
				i.classList.remove("error");
				formData[i.getAttribute("name")] = i.value;
			}
			else if ( i.value !== "" && i.getAttribute("name") !== "email" ) {
				i.classList.remove("error");
				formData[i.getAttribute("name")] = i.value;
			}
			else {
				i.classList.add("error");
			}
		});
	});
}
var checkRadio = function(){
	var radios = [...document.querySelectorAll(".js-check-radio")];
	radios.forEach(function(i){
		if ( i.checked ) {
			formData.sex = i.value;
		}
	});
}
var checkForm = function() {
	var countErrors = inputs.length;
	inputs.forEach(function(i){
		if ( i.classList.contains("error") === false ){
			countErrors--;
			// console.log(countErrors);
			if ( countErrors === 0 ) {
				console.table(formData); // post
				formPosted = true;

				document.querySelector(".js-form-error").classList.remove("showing");
				document.querySelector(".js-form-success").classList.add("showing");
				setTimeout(function(){
					document.querySelector(".js-form-success").style.transform = "scaleY(0)";
				}, 2500);
				setTimeout(function(){
					document.querySelector(".js-form-success").classList.remove("showing");
				}, 3500);

				scrollIt(
					document.querySelector("#contact"),
					888,
					'easeOutQuad',
					() => {
						console.log("Success.");
					}
				);
			}
		}
		else {
			document.querySelector(".js-form-error").classList.add("showing");
			scrollIt(
				document.querySelector("#contact"),
				888,
				'easeOutQuad',
				() => {
					console.log("Error. Try again.");
				}
			);
		}
	})
}
var resetForm = function() {
	if ( formPosted ) {
		inputs.forEach(function(i){
			i.value = "";
		})
	}
	formPosted = false;
}








var handleSubmit = function() {
	var submitButton = document.querySelector(".js-submit-button");
	submitButton.addEventListener("click", function(e){
		e.preventDefault();
		checkRequired();
		checkRadio();
		checkForm();
		resetForm();
	});
}









var mobileNavigation = function() {
	document.querySelector(".js-nav-toggle").addEventListener("click", function(){
		document.querySelector(".js-nav-toggle-hook").classList.toggle("menu-open");
	});
}








window.addEventListener("DOMContentLoaded", function() {
	heroScrollDownIndicator();
	scrollSlideIn();
	handleGallery();
	handleSubmit();
	mobileNavigation();
});

