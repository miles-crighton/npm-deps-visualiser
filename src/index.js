"use strict";

const fs = require("fs");

//Get dependency list from package.json
let rawPackageData = fs.readFileSync("package.json");
let packageData = JSON.parse(rawPackageData);
if (!("dependencies" in packageData)) {
    console.log("No dependencies found");
    process.exit(1);
}
let dependencies = packageData.dependencies;
let dependenciesKeys = Object.keys(dependencies);
console.log(`Found dependencies: ${dependenciesKeys}`);

//Go create the graph out of the package-lock.json
let rawPackageLockData = fs.readFileSync("package-lock.json");
let packageLockData = JSON.parse(rawPackageLockData);
if (!("dependencies" in packageLockData)) {
    console.log("No dependencies found");
    process.exit(1);
}
let lockDeps = packageLockData.dependencies;
let lockDepsKeys = Object.keys(lockDeps);
//console.log(packageLockData);

//*** Generate graph data ***/
let graphData = { nodes: [], links: [] };
let nodeMap = {};
let idIndex = 1;

//Generate nodes
lockDepsKeys.forEach((key) => {
    nodeMap[key] = idIndex;
    let node = {
        id: idIndex,
        name: key,
        version: lockDeps[key].version,
    };
    graphData.nodes.push(node);
    idIndex++;
});

//Generate links
lockDepsKeys.forEach((sourceKey) => {
    if ("requires" in lockDeps[sourceKey]) {
        let requires = lockDeps[sourceKey]["requires"];
        let requiresKeys = Object.keys(requires);

        requiresKeys.forEach((targetKey) => {
            let link = {
                source: nodeMap[sourceKey],
                target: nodeMap[targetKey],
                version: requires[targetKey],
            };
            graphData.links.push(link);
        });
    }
});

console.log(graphData);
