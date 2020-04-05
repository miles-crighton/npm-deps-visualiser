"use strict";

const fs = require("fs");

let rawPackagedata = fs.readFileSync("package.json");
let packageData = JSON.parse(rawPackagedata);
if (!("dependencies" in packageData)) {
    console.log("No dependencies found");
    process.exit(1);
}
let dependencies = packageData.dependencies;
console.log(dependencies);
