'use strict';

function Airport(weather) {
  this._weather = typeof weather !== 'undefined' ? weather : new Weather();
  this._hangar = [];
};

Airport.prototype.planes = function() {
  return this._hangar;
};

Airport.prototype.inHangar = function(plane) {
  var i;
  for (i = 0; i < this._hangar.length; i++) {
    if (this._hangar[i] === plane) {
      return true;
    }
  }
  return false;
};

Airport.prototype.clearForLanding = function(plane) {
  if(this._weather.isStormy()) {
    throw new Error('cannot land due to stormy weather');
  } else if (this.inHangar(plane)) {
    throw new Error('plane has already landed');
  }
  this._hangar.push(plane);
};

Airport.prototype.clearForTakeOff = function(plane) {
  if(this._weather.isStormy()) {
    throw new Error('cannot takeoff due to stormy weather');
  }
  this._hangar = [];
};
