var gui = require('nw.gui');

var Window = gui.Window.get();

document.addEventListener('keydown', function (e) {
	switch (e.keyIdentifier) {
		// Development
		case 'F5':
			if (e.shiftKey)
				Window.reloadIgnoringCache();
			else
				Window.reload();
			break;
		// Development ?
		case 'F11':
			Window.toggleFullscreen();
			break;
		// Development
		case 'F12':
			Window.showDevTools();
			break;
	}
}, false);

delete window.require;