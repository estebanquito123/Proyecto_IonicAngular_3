//environment.ts:
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig :{
    apiKey: "AIzaSyBe9nVhkniuwBNCuJLC6xU3ksgXGpwp5ro",
    authDomain: "juegos-usados.firebaseapp.com",
    projectId: "juegos-usados",
    storageBucket: "juegos-usados.firebasestorage.app",
    messagingSenderId: "22719249682",
    appId: "1:22719249682:web:7a3da8f73af00cb79c87cb"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
