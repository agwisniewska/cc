export default routesConfig

function routesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('Search', {
            url: '/search',
            component: 'Search'
        });

    $urlRouterProvider.otherwise('/');
}