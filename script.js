$(document).ready(function() {
	var operatArr = [];
	var needsClear = false;

	$('button').click(function() {	
		var clicked = $(this).text();
		var num = parseInt($(this).text());
		var screen = $('#calc-screen');

		if(clicked === 'AC' || clicked === 'CE') {
			if (clicked === 'AC') {
				operatArr = [];
				console.log('Clear all')
			}
			$('#calc-screen').val('');
		}
		else if(num || clicked === '0' || clicked === '.') {
			if(needsClear) {
				screen.val('');
				needsClear = false;
			}

			var screenTxt = screen.val() === '0' ? '' : screen.val();
			screen.val(screenTxt + $(this).text());
		}
		else {
			if(operatArr.length < 2) {
				operatArr[0] = parseFloat(screen.val());
				operatArr[1] = clicked;
				screen.val('');
			}
			else if (clicked === '=') {
				operatArr[0] = compute();
				operatArr[1] = '=';
				screen.val(operatArr[0]);
			}
			else {
				var result = compute();
				operatArr[0] = result;
				operatArr[1] = clicked;
				screen.val(result);
			}
			needsClear = true;
		}
	});

	function compute() {
		var result = 0;
		var screenNum = parseFloat($('#calc-screen').val());
		
		switch (operatArr[1]) {
			case '%': {
				result = parseFloat(operatArr[0]) % screenNum;
				break;
			}
			//Unicode for division sign
			case '\u00F7': {
				result = parseFloat(operatArr[0]) / screenNum;
				break;
			}
			case 'x': {
				result = parseFloat(operatArr[0]) * screenNum;
				break;
			}
			case '-': {
				result = parseFloat(operatArr[0]) - screenNum;
				break;
			}
			case '+': {
				result = parseFloat(operatArr[0]) + screenNum;
				break;
			}
			case '=': {
				result = screenNum;
				break;
			}
			default: {
				console.log('error');
				$('#calc-screen').text('Err');
				break;
			}
		}
		return Math.round(result * 10000) / 10000;
	}

});