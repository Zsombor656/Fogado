

const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('A backend fut!\n');
});

server.listen(PORT, () => {
  console.log(`A backend fut a http://localhost:${PORT} címen`);
});
