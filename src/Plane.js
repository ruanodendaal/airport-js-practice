'use strict';

function Plane() {
  this._location;
};

Plane.prototype = {
  land: function(airport) {
    airport.clearForLanding(this);
    this._location = airport;
  },
  takeoff: function() {
    this._location.clearForTakeOff();
  }

};
