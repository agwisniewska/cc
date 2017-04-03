import angular from 'angular';
import {Content} from './content.component';
import {ContentController} from './content.controller';

export const ContentModule = angular.module('app.component.content', [])
    .component('content', Content)
    .controller('ContentController', ContentController)
    .name;