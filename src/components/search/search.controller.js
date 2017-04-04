export class SearchController {

    constructor(SearchService) {
        'ngInject';
        var vm = this;
        vm.searchService = SearchService;
        vm.userName = '';
        vm.details = {
            repos: [],
            login: "",
            name: "",
            bio: "",
            avatar_url: "",
            error: ""

        };
        vm.displayUserDetails = () => this.searchService.getUserDetails(vm.userName).then((response) => {
            vm.details.login = response.data.login;
            vm.details.name = response.data.name;
            vm.details.bio = response.data.bio;
            vm.details.avatar_url = response.data.avatar_url;
            vm.searchService.getUserRepossitories(response.data.login).then(response => {
                vm.details.repos = response.data
            });
            vm.details.error = "";
            // return vm.details;
        }).catch(error => {
            vm.details = {
                repos: [],
                login: "",
                name: "",
                bio: "",
                avatar_url: "",
                error: "Does not exist"
            };
        })
    };
}