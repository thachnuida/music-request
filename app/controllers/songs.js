/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Song = mongoose.model('Song'),
    _ = require('underscore');
    songLib = require('./lib/songlib.js');

/**
 * Find song by id
 */
exports.song = function(req, res, next, id) {
    Song.load(id, function(err, song) {
        if (err) return next(err);
        if (!song) return next(new Error('Failed to load song ' + id));
        req.song = song;
        next();
    });
};

/**
 * Create a song
 */
exports.create = function(req, res) {
    var song = new Song(req.body);
    song.user = req.user;

    songLib.getMp3Zing(song.url, function(err, songInfo){
        song.realLink = songInfo.realLink;
        
        if (!song.title) {
            song.title = songInfo.title;
        }

        song.save(function(err) {
            if (err) {
                return res.send('users/signup', {
                    errors: err.errors,
                    song: song
                });
            } else {
                res.jsonp(song);
            }
        });
    });
};

/**
 * Update a song
 */
exports.update = function(req, res) {
    if (req.user.type != 0) {
        res.send(400);
    }
    
    var song = req.song;

    song = _.extend(song, req.body);

    song.save(function(err) {
        res.jsonp(song);
    });
};

/**
 * Delete an song
 */
exports.destroy = function(req, res) {
    var song = req.song;

    song.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(song);
        }
    });
};

/**
 * Show an song
 */
exports.show = function(req, res) {
    res.jsonp(req.song);
};

/**
 * List of songs
 */
exports.all = function(req, res) {
    Song.find({isPlay: false}).sort('-created').populate('user', 'name username').exec(function(err, songs) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(songs);
        }
    });
};
