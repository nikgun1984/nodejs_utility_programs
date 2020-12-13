const fs = require('fs');
const path = process.argv[2];
function cat(path) {
    fs.readFile(path,'utf8', function(err,data){
        if(err){
            //handle the error
            console.log(`Error reading ${path}:\n\t${err}`);
            //kill the process and tell process it errored
            process.exit();
        }
        //otherwise success
        console.log(data);
    })
}
cat(path);