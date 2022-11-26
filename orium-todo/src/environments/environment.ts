// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_api: 'http://localhost:3001/api',
  security: {
    key_token: 'todoorium:token',
    key_user: 'todoorium:user', 
    encrypt_secretKey: 'S2V5LVNlY3JldC1TeXN0ZW1ARW5jcnlwdDogITVoMHAwbmhAbmQ='
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
