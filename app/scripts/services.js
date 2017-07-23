'use strict';
angular.module('confusionApp')
    .constant("baseURL", "http://localhost:3000/")
    .service('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getDishes = function () {
            return $resource(baseURL + "dishes/:id", null, { 'update': { method: 'PUT' } });
        };
        this.getPromotions = function () {
            console.log('promotion');
            return $resource(baseURL + "promotions/:id", null, { 'update': { method: 'PUT' } });
        };        
    }])

    .factory('corporateFactory',  ['$resource', 'baseURL', function ($resource, baseURL)  {

        var corpfac = {};    
        corpfac.getleaders = function () {
            console.log('getleaders');
            return $resource(baseURL + "leadership/:id", null, { 'update': { method: 'PUT' } });
        }; 
        return corpfac;
    }])
    .factory('FeedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "feedbacks/:id",{id:"@id"});
    }])
    ;
