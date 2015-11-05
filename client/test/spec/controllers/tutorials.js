'use strict';

describe('Controller: TutorialsCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var TutorialsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TutorialsCtrl = $controller('TutorialsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TutorialsCtrl.awesomeThings.length).toBe(3);
  });
});
