/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var SongSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    url: {
        type: String,
        default: '',
        trim: true
    },
    realLink: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    isPlay: {
        type: Boolean,
        default: false
    },
    isPlaying: {
        type: Boolean,
        default: false
    }
});


/**
 * Statics
 */
SongSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Song', SongSchema);
