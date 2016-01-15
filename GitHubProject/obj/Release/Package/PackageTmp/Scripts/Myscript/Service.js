/// <reference path="Module.js" />
app.service('StudentService', function ($http) {

    //Get All Students
    this.GetStudents = function () {
        return $http.get("/Students");
    }

    //Get Single Records
    this.get = function (StudentId) {
        return $http.get("/StudentById/" + StudentId);
    }
    
    //create New record
    this.post = function (student) {
        var request = $http({
            method: "post",
            url: "/CreateStudent",
            data: student
        });
        return request;
    };

    //Update the Record
    this.put = function (StId, Student) {
        var request = $http({
            method: "put",
            url: "/UpdateStudent/" + StId,
            data: Student
        });
        return request;
    }
    //Delete the Record
    this.delete = function (StId) {
        var request = $http({
            method: "delete",
            url: "/DeleteStudent/" + StId
        });
        return request;
    }

});