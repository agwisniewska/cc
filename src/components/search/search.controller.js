export class SearchController {

    constructor(SearchService) {
        'ngInject';
        var vm = this;
        vm.searchService = SearchService;
        vm.userName = '';
        vm.details =  vm.getDetails();

        vm.displayUserDetails = () => this.searchService.getUserDetails(vm.userName).then((response, error) => {
            let data = response.data;
            let details = vm.getDetails("", [], data.login, data.name, data.bio, data.avatar_url);
            vm.searchService.getUserRepossitories(data.login).then(response => details.repos = response.data);
            vm.details = details;
        }).catch(error => {
           vm.details = vm.getDetails('Does not exist')
        })
    };

    getDetails(error = '', repos = [], login = '', name = '', bio = '', avatar_url = '') {
        return {repos: repos, login: login, name: name, bio: bio, avatar_url: avatar_url, error: error}
    };
}