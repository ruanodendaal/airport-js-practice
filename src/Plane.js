'use strict';

function Plane() {}

Plane.prototype = {
  land: function(airport) {
    airport.clearForLanding(this);
    this._location = airport;
  },
  takeoff: function(airport) {
    this._location.clearForTakeOff(this);
  }

};
