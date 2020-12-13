//import necessary libs
const fs = require('fs');
const axios = require('axios');

const path = process.argv[2];
function cat(path) {
    /* will read the file from command line 
        node step1.js <name of the file>
    */
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

function webCat(url) {
    axios.get(url)
    .then(result => {console.log(result.data)})
    .catch(err => {console.log(err)});
}

if(path.includes('.txt')){
    cat(path);
} else {
    webCat(path);
}