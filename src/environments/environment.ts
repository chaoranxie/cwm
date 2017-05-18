// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCjpWgvS0AFvuvLxueg2QuDTruLhadHZxE',
    authDomain: 'climb-with-me.firebaseapp.com',
    databaseURL: 'https://climb-with-me.firebaseio.com',
    projectId: 'climb-with-me',
    storageBucket: 'climb-with-me.appspot.com',
    messagingSenderId: '484468721914'
  }
};
