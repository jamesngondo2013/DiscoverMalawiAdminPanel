myApp.controller('CitiesController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  var myCities = new Firebase('https://discovermalawi.firebaseio.com/cities');
    $scope.cities = $firebaseArray(myCities);
    
    //wired to the plus button
    $scope.showForm = function(){
       
        $scope.addFormShow = true;   //turn on the addForm visibility
        
        $scope.editFormShow = false;  //turn off the editForm visibility
        clearForm();
    }
    
     //wired to the minus button - to turn off the visibility of the addParks form
    $scope.hideForm = function(){
        $scope.addFormShow = false; 
       
    }
    
    //clearing up the scope of the variables
    function clearForm(){
        $scope.bio ='';
        $scope.name='';
        $scope.reknown='';
        $scope.image='';
    }
    
    $scope.addFormSubmit = function(isValid){
        
    if(isValid){
        $scope.cities.$add({
            
            bio:$scope.bio,
            name:$scope.name,
            reknown:$scope.reknown,
            image:$scope.image
        });
        clearForm();
    }
        
    }//$scope
    
    //function to handle the edit button by pulling data based on id
    $scope.showCity = function(item){
        
        $scope.addFormShow = false;   //turn on the addForm visibility
        $scope.editFormShow = true;  //turn off the editForm visibility
        
        $scope.bio = item.bio;
        $scope.name = item.name;
        $scope.reknown = item.reknown;
        $scope.image = item.image;
        $scope.id = item.$id;
    }
    
    //function to handle actual update to the firebase db after edit
    $scope.editFormSubmit = function(){
        
        var id = $scope.id; //to keep a reference of the product being edited
        
        var record = $scope.cities.$getRecord(id); //to store the whole park we're editing
        record.bio = $scope.bio;
        record.name = $scope.name;
        record.reknown = $scope.reknown;
        record.image =$scope.image;
        
        $scope.cities.$save(record); //commit changes to firebase
        clearForm();
       
    }
   
    //function to delete city
    $scope.deleteCity = function(item){
        $scope.cities.$remove(item);
        
    }
    
}]);