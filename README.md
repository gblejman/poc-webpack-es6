Simple POC to test es6 features in the browser using webpack as module bundler:

- webpack watches the source directory and generates build/bundle.js

- the server watches for changes on build/bundle.js

start both with
``
npm run start
``

The server is accessible at http://127.0.0.1:3000/

As you modify files in source, webpack will rebundle, refresh the browser to see the changes.
