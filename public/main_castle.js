angular.module('app',[])


 .config(() => (
    firebase.initializeApp({
      apiKey: "AIzaSyCYP1-OzS44IV6_bdYaPZ02HQQqJ2KMapI",
      authDomain: "file-upload-ad263.firebaseapp.com",
      databaseURL: "https://file-upload-ad263.firebaseio.com",
      storageBucket: "file-upload-ad263.appspot.com",
  })))


    .controller('UploadCtrl', function ($scope) {
    const pic = this

    pic.heading = 'Share your photos with the world!'
    pic.imgURL = []

    pic.submit = function() {
      const input = document.querySelector('[type="file"]')
      const file = input.files[0]
      const uploadTask = firebase.storage().ref().child('123.jpg').put(file)

      uploadTask.on('state_changed', null, console.error, function() {
        pic.imgURL.push(uploadTask.snapshot.downloadURL)
        $scope.$apply() //if not using angular must use $scope.apply or timeout to return data
      })
    }
  })