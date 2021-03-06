'use strict';

describe('Feature Test:', function(){
var plane;
var secondPlane;
var airport;

  beforeEach(function(){
    plane = new Plane();
    secondPlane = new Plane();
    airport = new Airport();
  });

  describe('under normal conditions',function(){
    beforeEach(function(){
      spyOn(Math,'random').and.returnValue(0);
    });

    it('planes can be instructed to land at an airport', function(){
      plane.land(airport);
      expect(airport.planes()).toContain(plane);
    });

    it('can land more than one plane', function() {
      plane.land(airport);
      secondPlane.land(airport);
      expect(airport.planes()).toContain(plane, secondPlane);
    });

    it('planes can be instructed to take off', function(){
      plane.land(airport);
      plane.takeoff();
      expect(airport.planes()).not.toContain(plane);
    });
  });

  describe('under stormy conditions', function() {
    it('should prevent takeoff when weather is stormy', function() {
      spyOn(Math, 'random').and.returnValue(0);
      plane.land(airport);
      spyOn(airport._weather, 'isStormy').and.returnValue(true);
      expect(function() { plane.takeoff(); }).toThrowError('cannot takeoff due to stormy weather');
      expect(airport.planes()).toContain(plane);
    });

    it('should prevent landing when weather is stormy', function() {
      spyOn(Math, 'random').and.returnValue(1);
      expect(function() { plane.land(airport); }).toThrowError('cannot land due to stormy weather');
      expect(airport.planes()).not.toContain(plane);
    });
  });
});
