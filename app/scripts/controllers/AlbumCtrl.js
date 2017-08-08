(function() {
	function AlbumCtrl(Fixtures) {
		this.albumData = Fixtures.getAlbum();

		this.filterTimeCode = function(timeInSeconds) {
    		var time = parseFloat(timeInSeconds);
    		var minutes = Math.floor(time / 60);
    		var seconds = Math.round(time - minutes * 60);

    		if (seconds < 10) {
        		return '0:0' + seconds;
    		} else {
        		return parseFloat(minutes) + ':' + parseFloat(seconds);
    		}
		};
	}

	angular
		.module('blocJams') 
		.controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();