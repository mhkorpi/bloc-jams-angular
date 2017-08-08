(function() {
	function AlbumCtrl(Fixtures) {
		this.albumData = Fixtures.getAlbum();
		this.songs = [];
		// create array of song objects for simpler access in HTML
		for (var i = 0; i < this.albumData.songs.length; i++) {
			this.songs.push(this.albumData.songs[i]);
		}
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