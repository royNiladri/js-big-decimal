require('./round');
angular.module('big-nubmer.round-off', [])
    .filter('round-off', function(){
        return roundOff(input, n);
    });