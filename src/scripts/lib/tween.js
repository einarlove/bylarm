var eases = require('eases')
var EventEmitter = require('eventemitter3').EventEmitter;
var inherits = require('util').inherits;
var lodash = require('lodash');
var requestAnimationFrame = require('raf');

var Tween = function(options) {
  this.settings = lodash.extend({
    loop: false,
    duration: 500,
    easing: 'cubicInOut'
  }, options);

  this.started = false;
  this.stopped = false;
  this.done = false;
  this.time = +new Date();
  this.position = 0;

  return this;
};

inherits(Tween, EventEmitter);

Tween.prototype.update = function() {
  this.done = this.position === 1;

  if(this.stopped) {
    this.emit('stop');
    return this.cancelAnimationFrame();
  }

  if(this.done) {
    if(this.settings.loop) {
      this.emit('loop');
      this.position = 0;
      this.time = +new Date();
    } else {
      this.emit('done');
      this.emit('stop');
      return this.cancelAnimationFrame();
    }
  }

  if(!this.started) {
    this.started = true;
    this.emit('start');
  }

  var deltaTime = new Date() - this.time;

  this.time += deltaTime;
  this.position = Math.min(this.position + (deltaTime / this.settings.duration), 1);

  this.emit('update', eases[this.settings.easing](this.position), deltaTime, this.time);
  this.animationRequest = requestAnimationFrame(lodash.bind(this.update, this));

  return this;
};

Tween.prototype.start = function() {
  this.stopped = false;
  return this.update();
};

Tween.prototype.stop = function() {
  this.stopped = true;
  return this;
};

Tween.prototype.cancelAnimationFrame = function() {
  requestAnimationFrame.cancel(this.animationRequest);
};

module.exports = Tween;
