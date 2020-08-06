// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  firebaseConfig: {
    apiKey: 'AIzaSyA2BxZ5Tkmk8FkIK5dcw_bA2sDvfqxE0vo',
    authDomain: 'elx-front-end.firebaseapp.com',
    databaseURL: 'https://elx-front-end.firebaseio.com',
    projectId: 'elx-front-end',
    storageBucket: 'elx-front-end.appspot.com',
    messagingSenderId: '711482551261',
    appId: '1:711482551261:web:9f350e736aba28511f2434'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
