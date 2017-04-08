import angular from 'angular';
import uiRouter from 'angular-ui-router';
import './app.templates';
import {ComponentsModule} from './components/components.module';

const requires = [
    uiRouter,
    'templates',
    ComponentsModule

]

export const AppModule = angular
    .module('app', requires)
    .name;