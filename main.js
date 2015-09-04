var HANG = HANG || {};

HANG.hangman = function(word){

	HANG.guesses = word.length + 5;
	$('#js-guesses').text('You have ' + HANG.guesses + ' guesses. GO!');
	console.log(HANG.guesses);

	var alpha = 'abcdefghijklmnopqrstuvwxyz';
	var alpha = alpha.split('');
	console.log(alpha);

	// for loop to iterate over each item of array
	for(var i = 0; i < alpha.length; i++){
		// console.log(alpha[i]);
		$('#js-letter-picker').append('<span data-letter="' + alpha[i] + '">' + alpha[i] + '</span>');
	}

	console.log(word);
	var word = word.split('');
	// for loop to iterate over each item of our word
	for(var i = 0; i < word.length; i++){
		$('#js-word').append('<span data-letter="' + word[i] + '"></span>');
	}

	// add Click event to #js-letter-picker span
	$('#js-letter-picker span').on('click', function(){
		var selectedLetter = $(this).data('letter');
		console.log(selectedLetter);

		$('#js-word span[data-letter="' + selectedLetter + '"]').text(selectedLetter);

		var count = $('#js-word span[data-letter="' + selectedLetter + '"]').length;
		console.log(count);

		if(count >= 1){
			$(this).addClass('has-letter');
		} else {
			$(this).addClass('has-not-letter');
			HANG.guesses = HANG.guesses -1;
			console.log(HANG.guesses);
			$('#js-guesses').text('You have ' + HANG.guesses + ' guesses left.');

			if(HANG.guesses === 0){
				alert("you've been HANGED x_____x");
				HANG.reset();
				return false;
			}
		}

		// check for winner
		var winner = $('#js-word span:empty').length;
		if(winner === 0){
			alert('you won!');
			HANG.reset();
		}

	});

};


HANG.guesses = 0;


HANG.reset = function(){
	HANG.guesses = 0;
	$('#js-word, #js-letter-picker').empty();
	$('#js-guesses').text('');
	$('#js-hangman-word').fadeIn();
	$('#js-instruction').fadeIn();
	// HANG.hangman('nycda');
};


$(document).on('ready', function(){
	// HANG.hangman('nycda');
	$('#js-hangman-word').on('submit', function(){
		var word = $('#js-hangman-word input').val();
		if(word === ''){
			alert('please choose a word');
		} else {
			HANG.hangman(word);
			$('#js-hangman-word input').val('');
			$('#js-instruction').hide();
			$(this).hide();
		}

		return false;
	});

});     // closes doc.ready


