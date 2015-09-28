var fs = require("fs");
var path = require("path");
var _ = require("lodash");

var createComponent = function (args) {
  fs.readFile(path.join(__dirname, "../templates/src/components/boilerplate-component.jsx"), function (err, file) {
    var file = _.template(file.toString())(args);

    fs.writeFile(path.join(process.cwd(), "src/components", args.name + ".jsx"), file, function (err, file) {
      if (err) {
        throw err;
      }
      console.log("Generated", args.name + ".jsx", "in", "src/components");
    });
  });
};

var createTest = function (args) {
  fs.readFile(path.join(__dirname, "../templates/test/client/spec/components/boilerplate-component.spec.jsx"), function (err, file) {
    if (err) {
      throw err;
    }
    var file = _.template(file.toString())(args);

    fs.writeFile(path.join(process.cwd(), "test/client/spec/components", args.name + ".spec.jsx"), file, function (err, file) {
      if (err) {
        throw err;
      }
      console.log("Generated", args.name + ".spec.jsx", "in", "test/client/spec/components");
    });
  });
};

var addComponentToIndex = function (args) {
  fs.readFile(path.join(process.cwd(), "src/index.js"), function(err, file) {
    if (err) {
      throw err;
    }

    var re = /module\.exports \= \{([\s\S]*?)\s\}/;

    var file = re.exec(file.toString());

    var newFile = "module.exports = {" +
        (file[1] ? file[1] + "," : "") + "\n  " +
        _.capitalize(args.name) + ": require(\"./components/" + args.name + ".jsx\")"
        + "\n};\n";

    fs.writeFile(path.join(process.cwd(), "src/index.js"), newFile, function (err, file) {
      if (err) {
        throw err;
      }
      console.log("Added", args.name + ".jsx", "to src/index.js exports");
    })
  });
};

var fileExists = function (args) {
  return fs.existsSync(path.join(process.cwd(), "src/components", args.name + ".jsx"));
};

module.exports = function (args) {
  if (fileExists(args)) {
    return console.log("Component already exists in src/. Please give the component a different name.");
  }

  createComponent(args);
  createTest(args);
  addComponentToIndex(args);
};
