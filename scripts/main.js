$(document).ready(function(){

	var height = $( window ).height();

	$.fn.ScrollView = function() {
		return this.each(function() {
			$("html, body").animate({
				scrollTop: $( this ).offset().top - 140
			}, 1000);
		});
	}

	$(window).scroll(function() {
		if ($(window).scrollTop() > 400) {
			$( "#scrollupbutton" ).slideDown('slow');
		}
		else if($(window).scrollTop() < 100) {
			$( "scrollupbutton" ).hide();
		}
		else {
			$( "#scrollupbutton" ).hide();
		}
	});

	//Auto Scroll Buttons

	$( ".aboutbutton" ).click(function() {
		$( "#about" ).ScrollView();
	});

	$( ".eventsbutton" ).click(function() {
		$( "#upcoming" ).ScrollView();
	});

	$( ".sponsorsbutton" ).click(function() {
		$( "#sponsors" ).ScrollView();
	});

	$( ".pressbutton" ).click(function() {
		$( "#press" ).ScrollView();
	});

	$( ".contactbutton" ).click(function() {
		$( "#contact" ).ScrollView();
	});

	//Scroll up Button

	$( "#scrollupbutton" ).click(function() {
		$( "#header" ).ScrollView();
	});


});
