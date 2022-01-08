const Scratch = require("scratch3-api");

var clicks = 0;

function checkVar(value, cloud) {
    data = value.split("99");
    if(data[0] === "01") {
        console.log("Request type PING");
        cloud.set("☁ netOLS_DATA", `4199${data[1]}`);
        console.log(`SET >> 4199${data[1]}`)
    } else if (data[0] === "02") {
        console.log("Request type is DATAREQ");
        cloud.set("☁ netOLS_DATA", `4299${data[1]}99${clicks}`);
        console.log(`SET >> 4299${data[1]}99${clicks}`);
    } else if (data[0] === "03") {
        console.log("Request type is DATASET");
        clicks = data[2];
        cloud.set("☁ netOLS_DATA", `4399${data[1]}`);
        console.log(`SET >> 4399${data[1]}`);
    }
}


async function main() {
  let session = await Scratch.UserSession.create("USER", "PASS");
  let cloud = await session.cloudSession("624440366");
  cloud.on("set", function (name, value) {
    checkVar(value, cloud);
  });
}

main();