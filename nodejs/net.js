require('net').createServer(function(sock) {
  sock.on('data', function(data) {
    console.log(data)
    console.log('---------')
    sock.write('HTTP/1.1 200 OK\r\n');
    sock.write('Transfer-Encoding: chunked\r\n');
    sock.write('\r\n');

    sock.write('c\r\n');
    sock.write('01234567890d\r\n');

    sock.write('5\r\n');
    sock.write('12345\r\n');

    sock.write('0\r\n');
    sock.write('\r\n');
  });
}).listen(9090, '10.5.162.238');
