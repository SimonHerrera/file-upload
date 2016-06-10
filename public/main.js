angular.module('app', [])
  .config(() => (
      firebase.initializeApp({ //function with object literal
      apiKey: "AIzaSyCYP1-OzS44IV6_bdYaPZ02HQQqJ2KMapI",
      authDomain: "file-upload-ad263.firebaseapp.com",
      databaseURL: "https://file-upload-ad263.firebaseio.com",
      storageBucket: "file-upload-ad263.appspot.com",
  })))


  .controller('UploadCtrl', function ($timeout) {
    const up = this

    up.heading = 'Share your photos with the world!'
    up.photoURLs = []

    up.submit = function () {
      const input = document.querySelector('[type="file"]')
      const file = input.files[0]

    $timeout()
        .then(() => uploadFile(file, '123.jpg'))
        .then(res => up.photoURLs.push(res.downloadURL))
    }
  })

      // uploadFile(file, '123.jpg') //from promise
      // const uploadTask = firebase.storage().ref().child('123.jpg')
      //   .put(file)
      // console.dir("test", file)
      // console.dir("file", input.files)
      // console.dir("file 0", input.files[0])
      // firebase.storage().ref().child('123.jpg').put(file)

      //state change, error, want
  //     uploadTask.on('state_changed', null, null, () => {
  //       up.photoURLs.push(uploadTask.snapshot.downloadURL)
  //       $scope.$apply()
  //     })
  //   }
  // })


//promise with timeout
function uploadFile (file, path = file.name) {
  return new Promise ((resolve, reject) => {
    const uploadTask = firebase.storage().ref()
      .child(path).put(file)

    uploadTask.on('state_changed',
      null,
      reject,
      () => resolve(uploadTask.snapshot)
    )
  })
}




//In Firebase - change storage rules to public Storage
//links to your file, change last line to write;

//   service firebase.storage {
//   match /b/file-upload-ad263.appspot.com/o {
//     match /{allPaths=**} {
//       allow read, write;
//     }
//   }
// }