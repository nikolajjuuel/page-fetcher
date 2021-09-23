const arr = process.argv.slice(2);
console.log(arr);

const webpage = arr[0];
const fileLocation = arr[1];

const net = require('net');
const fs = require('fs')


const conn = net.createConnection({ 
  host: webpage,
  port: 80
  
});

conn.setEncoding('UTF8');

conn.on('connect', () => {
   console.log(`Connected to server!`);
 
   conn.write(`GET / HTTP/1.1\r\n`);
   conn.write(`Host: ${webpage}\r\n`);
   conn.write(`\r\n`);
 });
 
 conn.on('data', (data) => {
   const content = data;
   fs.writeFile(`${fileLocation}`, content, err => {
    var stats = fs.statSync("write.txt")

    if (err) {
      console.error(err)
      return
    }
    
    //file written successfully
    console.log(`downloaded and saved ${stats.size} bytes to ${fileLocation}`);
    console.log()
  })


  conn.end();
 });



