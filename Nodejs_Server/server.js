// const http = require("http");
// const fs = require("fs");

// const _ = require('lodash')

// const server = http.createServer((req, res) => {
//   // console.log(req);
//   // console.log('request has been made from browser')
//   // console.log(req.url)
//   // console.log(req.method)
//   //lodash
//   const num = _.random(0,20)
//   console.log(num)
  
//   res.setHeader("Content-Type", "text/html");
//   let path = "./views";
//   switch (req.url) {
//     case "/":
//       path += "/index.html";
//       res.statusCode = 200;
//       break;
//     case '/about':
//       path += '/about.html'
//       res.statusCode = 200;
//       break;
//     case '/about-me':
//         res.statusCode = 200;
//         res.setHeader('Location', '/about')
//         res.end()
//     default:
//       path += "/404.html";
//       res.statusCode = 404;
//       break;
//   };

//   fs.readFile(path, (err, fileData) => {
//     if (err) {
//       console.log(err);
//       res.end();
//     } else {
//       // res.write()
//       res.end(fileData);
//     }
//   });

//   // res.write('hello world')
// });

// server.listen(3000, "localhost", () => {
//   console.log("listening for requests on port 3000");
// });
