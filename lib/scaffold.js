var path = require("path");
var fs = require("fs-extra");

fs.copy("node_modules/electrode-bolt/templates", path.join(process.cwd(), "."), function (err) {
  if (err) return console.error(err)
  console.log("success!")
})
