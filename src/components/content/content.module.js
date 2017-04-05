import angular from 'angular';
import {Content} from './content.component';

export const ContentModule = angular.module('app.component.content', [])
    .component('content', Content)
    .name;