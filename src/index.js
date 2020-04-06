"use strict";

const fs = require("fs");

function getDependencies(path) {
    let rawPackageData = fs.readFileSync(path || "package.json");
    let packageData = JSON.parse(rawPackageData);
    if (!("dependencies" in packageData)) {
        console.log("No dependencies found");
        process.exit(1);
    }
    return packageData.dependencies;
}

let dependencies = getDependencies();
let dependenciesKeys = Object.keys(dependencies);
console.log(`Found dependencies: ${dependenciesKeys}`);

function getPackageData(path) {
    //Go create the graph out of the package-lock.json
    let rawPackageData = fs.readFileSync(path || "package-lock.json");
    let packageData = JSON.parse(rawPackageData);
    if (!("dependencies" in packageData)) {
        console.log("No dependencies found");
        process.exit(1);
    }
    return packageData.dependencies;
}

let packages = getPackageData();
let packageKeys = Object.keys(packages);
console.log(`Found packages: ${packageKeys}`);

function generateGraph(deps, packages) {
    let packageKeys = Object.keys(packages);
    let graphData = { nodes: [], links: [] };
    let nodeMap = {};
    let idIndex = 1;

    //Generate nodes
    //@todo: use deps rather than packages as root nodes
    packageKeys.forEach((key) => {
        nodeMap[key] = idIndex;
        let node = {
            id: idIndex,
            name: key,
            version: packages[key].version,
        };
        graphData.nodes.push(node);
        idIndex++;
    });

    //Generate links
    packageKeys.forEach((sourceKey) => {
        if ("requires" in packages[sourceKey]) {
            let requires = packages[sourceKey]["requires"];
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

    return graphData;
}

let graphData = generateGraph("", packages);
console.log(graphData);

fs.writeFileSync("graph.json", JSON.stringify(graphData));
