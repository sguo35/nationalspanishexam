const robot = require('robotjs');

const csv = require('csv');
const fs = require('fs');
let data = [];
csv.parse(fs.readFileSync('./data.csv'), function(err, dt) {
  data = dt;
  console.log("Got " + data.length + " entries");
});
// Main loop
var running = false;

function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

var loop = async () => {
  let num_on = 0;
  while (running) {
    // get to the next newest row
    for(let i=0;i<num_on*10*4 + 15;i++){
      robot.keyTap("tab");
      await sleep(100);
    }
    // type 10
    for(let i=0+num_on * 10;i<num_on * 10 + 10 && i<data.length;i++){
      console.log(data[i]);
      // type one row
      // first name last name
      for(let j=0;j<data[i].length-2;j++){
        robot.typeString(data[i][j]);
        robot.keyTap('tab');
        await sleep(100);
      }
      // grade 
      for(let j=0;j<data[i][2] - 5;j++){
        robot.keyTap('down');
        await sleep(25);
      }
      robot.keyTap('tab');
      await sleep(100);

      // exam level
      for(let j=0;j<data[i][3];j++){
        robot.keyTap('down');
        await sleep(25);
      }
      robot.keyTap('tab');
      await sleep(100);
    }
    console.log(num_on);
    await sleep(1000);
    // add more students
    robot.keyTap('enter');
    num_on++;
    if(num_on * 10 >= data.length){
      running = false;
    }
    await sleep(300);
  }
}

setTimeout(() => {
  console.log("Starting...");
  running = true;
  loop();
}, 5000);