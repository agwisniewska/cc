export class SearchService {
    constructor($http) {
        'ngInject';
        this.$http = $http;
        let githubApiUrl = 'https://api.github.com/users/';
        this.getUserDetails = userInput => this.$http.get(githubApiUrl + userInput);
        this.getUserRepossitories = login => this.$http.get(githubApiUrl + login + "/repos")
    }
}
