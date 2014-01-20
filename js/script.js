jQuery(function ($) {
	var $html = $('html');
	var $location = $('.navbar .location');
	
	/* Alert */
	var toggleSecondary = Function.prototype.call.bind($.fn.toggleClass, $html, 'secondary');
	
	var redAlertAudio = $('.Voyager_Red_alert')[0];
	
	var alertToggleTime = (typeof redAlertAudio.networkState === 'undefined' || redAlertAudio.networkState === redAlertAudio.NETWORK_NO_SOURCE)
		? 1000
		: redAlertAudio.duration * 500;
	
	var alertInterval;
	var alertTimeout;
	
	var silenceAlert = window.silenceAlert = function () {
		redAlertAudio.muted = true;
	};
	
	redAlertAudio.addEventListener('ended', function () {
		$html.toggleClass('secondary');
		alertTimeout = setTimeout(toggleSecondary, alertToggleTime);
		
		redAlertAudio.currentTime = 0;
		redAlertAudio.play();
	}, false);
	
	var setAlert = window.setAlert = function (level) {
		alertInterval && clearInterval(alertInterval);
		alertTimeout && clearTimeout(alertTimeout);
		
		redAlertAudio.pause();
		
		$html.removeClass('red-alert blue-alert yellow-alert secondary');
		
		switch (level) {
			case 'red':
			case 1:
				$html.addClass('red-alert');
				
				if (typeof redAlertAudio.networkState === 'undefined' || redAlertAudio.networkState === redAlertAudio.NETWORK_NO_SOURCE)
					alertInterval = setInterval(toggleSecondary, alertToggleTime);
				else {
					alertTimeout = setTimeout(toggleSecondary, alertToggleTime);
					
					redAlertAudio.muted = false;
					redAlertAudio.currentTime = 0;
					redAlertAudio.play();
				}
				break;
			case 'blue':
			case 2:
				$html.addClass('blue-alert');
				
				alertInterval = setInterval(toggleSecondary, alertToggleTime);
				break;
			case 'yellow':
			case 3:
				$html.addClass('yellow-alert');
				break;
		}
	};
	/* /Alert */
	
	/* Mode */
	var setMode = window.setMode = function (mode) {
		switch (mode) {
			case 'online':
				$html.removeClass('offline');
				break;
			case 'offline':
				setAlert(false);
				
				$html.addClass('offline');
				break;
		}
	};
	/* /Mode */
	
	/* Online/Offline */
	setMode((typeof navigator.onLine === 'undefined' || navigator.onLine) ? 'online' : 'offline');
	
	document.addEventListener('online', function onOnline() {
		setMode('online');
	}, false);
	
	document.addEventListener('offline', function onOffline() {
		setMode('offline');
	}, false);
	/* /Online/Offline */
	
	/* Clock */
	var $time = $('.navbar .time').tooltip({
		container: 'body',
		placement: 'auto bottom',
		title: function () {
			return moment().format('dddd, Do MMMM YYYY');
		}
	});
	
	var setTime = function () {
		$time.text(moment().format('h:mm A'));
	};
	
	setTime();
	setInterval(setTime, 500);
	/* /Clock */
	
	/* Tooltips */
	$('[title]').tooltip({
		container: 'body',
		placement: 'auto top'
	});
	/* /Tooltips */
});