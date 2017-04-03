import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {ComponentsModule} from './components/components.module';

export const AppModule = angular
    .module('app', [
        ComponentsModule,
        uiRouter
    ])
    .name;
