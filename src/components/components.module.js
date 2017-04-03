import angular from 'angular';
import {SearchModule} from './search/search.module';
import {ContentModule} from './content/content.module';

export const ComponentsModule = angular
    .module('app.components', [
        SearchModule,
        ContentModule
    ])
    .name;
