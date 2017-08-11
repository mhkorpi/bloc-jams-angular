(function() {
	function SongPlayer(){
		var songPlayer = {};

		var currentSong = null;

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
				currentSong.playing = null;
				currentSong.paused = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentSong = song;
		}

		/**
		* @function playSong
		* @desc Plays audio from currentBuzzObject and updates playing/paused properties
		* @param {Object} song
		*/
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
			song.paused = false;
		}

		SongPlayer.play = function(song) {
			if (currentSong !== song) {
				setSong(song);
				playSong(song);

			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		};

		SongPlayer.pause = function(song) {
			currentBuzzObject.pause();
			song.playing = false;
			song.paused = true;
		}

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();