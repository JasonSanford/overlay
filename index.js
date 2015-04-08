
/**
 * Module dependencies.
 */

var Emitter = require('component-emitter');
var inherits = require('inherits');
var o = window.$;

/**
 * Initialize a new `Overlay`.
 *
 * @param {Object} options
 * @api public
 */

function Overlay(options) {
  Emitter.call(this);
  options = options || {};
  this.closable = options.closable;
  this.el = o(require('./template'));
  this.el.appendTo('body');
  if (this.closable) this.el.click(this.hide.bind(this));
}

/**
 * Show the overlay.
 *
 * Emits "show" event.
 *
 * @return {Overlay} 
 * @api public
 */

Overlay.prototype.show = function(){
  this.emit('show');
  this.el.removeClass('hide');
  return this;
};

/**
 * Hide the overlay.
 *
 * Emits "hide" event.
 *
 * @return {Overlay}
 * @api public
 */

Overlay.prototype.hide = function(){
  this.emit('hide');
  return this.remove();
};

/**
 * Hide the overlay without emitting "hide".
 *
 * Emits "close" event.
 *
 * @return {Overlay}
 * @api public
 */

Overlay.prototype.remove = function(){
  var self = this;
  this.emit('close');
  this.el.addClass('hide');
  setTimeout(function(){
    self.el.remove();
  }, 2000);
  return this;
};

inherits(Overlay, Emitter);

module.exports = Overlay;
