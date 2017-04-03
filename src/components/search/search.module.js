import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import {Search} from './search.component';
import {SearchService} from './search.service';
import {SearchController} from './search.controller';

export const SearchModule = angular.module('app.components.search', [uiRouter])
    .component('search', Search)
    .controller('SearchController', SearchController)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';
        $stateProvider
            .state('search', {
                url: '/search',
                component: 'search'
            });
        $urlRouterProvider.otherwise('/');
    })
    .service('SearchService', SearchService)
    .name;
