'use strict';

describe('Airport', function() {
  var airport;
  var plane;
  var weather;

  beforeEach(function() {
    plane = jasmine.createSpy('plane');
    weather = jasmine.createSpyObj('weather', ['isStormy']);
    airport = new Airport(weather);
  });

  it('has no planes by default', function() {
    expect(airport.planes()).toEqual([]);
  });

  describe('under normal conditions',function(){
    beforeEach(function(){
      weather.isStormy.and.returnValue(false);
    });

    it('can clear planes for landing', function() {
      airport.clearForLanding(plane);
      expect(airport.planes()).toEqual([plane]);
    });

    it('can confirm if a specific plane is in the hangar', function() {
      airport.clearForLanding(plane);
      expect(airport.inHangar(plane)).toEqual(true);
    });

    it('can clear planes for takeoff', function() {
      airport.clearForLanding(plane);
      airport.clearForTakeOff(plane);
      expect(airport.planes()).toEqual([]);
      expect(airport.inHangar(plane)).toEqual(false);
    });

    it('should not land the same plane twice', function() {
      airport.clearForLanding(plane);
      expect(function() {airport.clearForLanding(plane); }).toThrowError('plane has already landed');
    });

    it('should cannot takeoff a plane that has not landed', function() {
      expect(function() {airport.clearForTakeOff(plane); }).toThrowError('plane not at airport');
    });
  });

  describe('under stormy conditions',function(){
    beforeEach(function(){
      weather.isStormy.and.returnValue(true);
    });

    it('does not clear planes for takeoff', function() {
      expect(function() { airport.clearForTakeOff(plane); }).toThrowError('cannot takeoff due to stormy weather');
    });

    it('does not clear planes for landing', function() {
      expect(function() { airport.clearForLanding(plane); }).toThrowError('cannot land due to stormy weather');
    });
  });
});
