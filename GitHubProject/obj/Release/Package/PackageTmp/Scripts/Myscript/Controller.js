/// <reference path="Module.js" />

app.controller('MyController', function ($scope, StudentService) {

    $scope.IsNewRecord = 1; //The flag for the new record

    loadRecords();

    //Function to load all Student records
    function loadRecords() {
        var promiseGet = StudentService.GetStudents(); //The MEthod Call from service

        promiseGet.then(function (st) { $scope.Students = st.data },
              function (error) {
                  $log.error('failure loading', error);
              });
    }
    //Method to Get Single Student Details based on Id
    $scope.get = function (Stu) {
        var promiseGetSingle = StudentService.get(Stu.Id);

        promiseGetSingle.then(function (st) {
            var res = st.data;
            $scope.StudentId = res.Id;
            $scope.StudentName = res.Name;
            $scope.StudentRoll = res.Roll;
            $scope.StudentClass = res.Class;
            $scope.StudentAddress = res.Address;
            $scope.StudentMobile = res.MobileNo;
            $scope.IsNewRecord = 0;
        },
                  function (error) {
                      console.log('Failure loading Student', error);
                  });
    }

    //Create the Student information to the server
    $scope.save = function () {
        var Student = {
            Id: $scope.StudentId,
            Name: $scope.StudentName,
            Roll: $scope.StudentRoll,
            Class: $scope.StudentClass,
            Address:$scope.StudentAddress,
            MobileNo: $scope.StudentMobile
        };
        //If the flag is 1 the it si new record
        if ($scope.IsNewRecord === 1) {
            Student.Id = 0;
            var promisePost = StudentService.post(Student);
            promisePost.then(function (st) {               
                $scope.StudentId = st.data.Id;
                $scope.Message = "Create Successfuly";
                loadRecords();
                $scope.clear();
            }, function (err) {
                console.log("Err" + err);
            });
        } else { //Else Edit the record
            var promisePut = StudentService.put($scope.StudentId, Student);
            promisePut.then(function (St) {
                $scope.Message = "Updated Successfuly";
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        }
    };

    //Method to Delete
    $scope.delete = function () {
        var promiseDelete = StudentService.delete($scope.StudentId);
        promiseDelete.then(function (St) {
            $scope.StudentId = "";
            $scope.StudentName = "";
            $scope.StudentRoll = "";
            $scope.StudentClass = "";
            $scope.StudentAddress = "";
            $scope.StudentMobile = "";
            $scope.IsNewRecord = 0;
            $scope.Message = "Deleted Successfuly";
           
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    };
    //Clear fields
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.StudentId = "";
        $scope.StudentName = "";
        $scope.StudentRoll = "";
        $scope.StudentClass = "";
        $scope.StudentAddress = "";
        $scope.StudentMobile = "";       
    }

});