(function($) {

	"use strict";


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

  var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:true,
	    dots: true,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-ios-arrow-back'></span>","<span class='ion-ios-arrow-forward'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});

		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();



})(jQuery);

document.getElementById('chat-form').addEventListener('submit', async (e) => {
	e.preventDefault();
	const userInput = document.getElementById('user-input').value;
	displayMessage(userInput, 'user');
	document.getElementById('user-input').value = '';
  
	const response = await fetchGeminiResponse(userInput);
	displayMessage(response, 'bot');
  });
  
  function displayMessage(message, sender) {
	const chatBox = document.getElementById('chat-box');
	const messageElement = document.createElement('div');
	messageElement.className = sender;
	messageElement.innerText = message;
	chatBox.appendChild(messageElement);
	chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  async function fetchGeminiResponse(userInput) {
	const apiKey = 'AIzaSyB_O4QBz7_Nbr5ZIxQn09RNfnG0Dxd4wrU';
	const response = await fetch('https://api.gemini.com/v1/chat', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${apiKey}`
	  },
	  body: JSON.stringify({ message: userInput })
	});
	const data = await response.json();
	return data.reply;
  }


  const chatbotToggler = document.getElementById("chatbot-toggler");
const chatbotPopup = document.querySelector(".chatbot-popup");
const closeChatbot = document.getElementById("close-chatbot");
const sendMessage = document.getElementById("send-message");
const messageInput = document.querySelector(".message-input");
const chatBody = document.querySelector(".chat-body");

const API_KEY = "AIzaSyB_O4QBz7_Nbr5ZIxQn09RNfnG0Dxd4wrU"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

chatbotToggler.addEventListener("click", () => {
    chatbotPopup.style.display = "block";
});

closeChatbot.addEventListener("click", () => {
    chatbotPopup.style.display = "none";
});

sendMessage.addEventListener("click", async (e) => {
    e.preventDefault();
    const userMessage = messageInput.value.trim();
    if (userMessage) {
        appendMessage("You: " + userMessage);
        messageInput.value = "";
        const botResponse = await getBotResponse(userMessage);
        appendMessage("Bot: " + botResponse);
    }
});

function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom
}

async function getBotResponse(message) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: message }] }]
        })
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}
  
