(function() {
	function SongPlayer($rootScope, Fixtures){
		var songPlayer = {};

		var currentAlbum = Fixtures.getAlbum();

		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;

		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
				SongPlayer.currentSong.paused = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentBuzzObject.bind('timeupdate', function() {
				$rootScope.$apply(function() {
					SongPlayer.currentTime = currentBuzzObject.getTime();

					if (SongPlayer.currentTime === parseFloat(SongPlayer.currentSong.duration)) {
						SongPlayer.next(song)
					}

				});
			});

			SongPlayer.currentSong = song;
		};

		/**
		* @function playSong
		* @desc Plays audio from currentBuzzObject and updates playing/paused properties
		* @param {Object} song
		*/
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
			song.paused = false;
		};

		/**
		* @function stopSong
		* @desc Stops play of current song and sets playing property to null
		* @param {Object} song
		*/
		var stopSong = function(song) {
			currentBuzzObject.stop();
			song.playing = null;
			song.paused = null;
		};

		/** 
		* @function getSongIndex
		* @desc gets index of current song from song list array
		* @param {Object} song
		* @return index of song
		*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};

		/**
		* @desc Active song object from list of songs
		* @type {Object}
		*/
		SongPlayer.currentSong = null;

		/**
		* @desc Current playback time (in seconds) of currently playing song
		* @type {Number}
		*/
		SongPlayer.currentTime = null;

		/**
		* @desc Current volume of currently playing song
		* @type {Number}
		*/
		SongPlayer.volume = 80;

		/**
		* @function setVolume
		* @desc Sets volume attribute
		* @param {Number} volume
		*/
		SongPlayer.setVolume = function(volume) {
			if (currentBuzzObject) {
				currentBuzzObject.setVolume(volume);
			}

			SongPlayer.volume = volume;
		};

		/**
		* @function play
		* @desc Play current or new song
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);

			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		};

		/**
		* @function pause
		* @desc Pause current song
		* @param {Object} song
		*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
			song.paused = true;
		};

		/**
		* @function previous
		* @desc Stop play of current song and start play of previous song
		*/
		SongPlayer.previous  = function(song) {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;

			if (currentSongIndex < 0) {
				stopSong(SongPlayer.currentSong);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/**
		* @function next
		* @desc Stop play of current song and start play of next song
		*/
		SongPlayer.next = function(song) {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;

			if (currentSongIndex > currentAlbum.songs.length - 1) {
				stopSong(SongPlayer.currentSong);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		SongPlayer.autoNext = function(song) {
			if (SongPlayer.currentTime === currentBuzzObject.duration) {
				SongPlayer.next(song);
			}
		};

		/**
		* @function setCurrentTime
		* @desc Set curren time (in seconds) of currently playing song
		* @param {Number} time
		*/
		SongPlayer.setCurrentTime = function(time) {
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();