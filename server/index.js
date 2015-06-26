import path from 'path';
import http from 'http';
import fs from 'fs';

let home = {
  content:
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Hello</title>
      </head>
      <body>
        <div id="content"></div>
        <script src="/bundle.js"></script>
      </body>
    </html>`
};

let bundle = {
  path: path.resolve(__dirname, '../build/bundle.js'),
  content: ''
};

fs.watchFile(bundle.path, (curr, prev) => {

  if (curr.mtime.getTime() - prev.mtime.getTime()) {

    console.log(`modified: ${bundle.path}`);
    bundle.content = fs.readFileSync(bundle.path);
  }
});


let app = function () {

  let handlers = {
    '/': function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(home.content);
        res.end();
    },
    '/bundle.js': function (req, res) {
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.write(bundle.content);
        res.end();
    }
  };

  let defaultHandler = function (req, res) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('NOT FOUND');
    res.end();
  };

  return function (req, res) {
    (handlers[req.url] || defaultHandler)(req, res);
  };
};

http.createServer(app()).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');
