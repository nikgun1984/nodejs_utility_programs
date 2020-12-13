// import necessary libs
const fs = require('fs');
const axios = require('axios');

/* will read the file from command line 
   node step1.js <name of the file>
*/
function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) { // handle the error
            console.log(`Error reading ${path}:\n\t${err}`);
            // kill the process and tell process it errored
            process.exit(1);
        }
        // otherwise success
        console.log(data);
    })
}

/* will append or overwrite the contents of one file to another file */
function catWrite(path, fileName) {
    const content = fs.readFileSync(fileName, 'utf8') + '\n';
    flag ? writeFileToFile(fs.writeFile, path, fileName, content) : writeFileToFile(fs.appendFile, path, fileName, content);
}

/* will return html document of the url */
function webCat(url) {
    axios.get(url).then(result => {
        console.log(result.data)
    }).catch(err => {
        `Error reading link "${path}":\n\t${err}`
    });
}

/* will write all html to the file with link provided */
async function webCatWrite(path, fileName) {
    try {
        const content = await axios.get(fileName);
        fs.writeFile(path, content.data, "utf8", function (err) {
            if (err) {
                console.log(`Couldn't write ${path}\n\t${err}`);
                process.exit(1);
            }
            console.log(`# no output, but ${path} contains contents of ${fileName}`);
        })
    } catch (err) {
        console.log(`Error reading link "${path}":\n\t${err}`)
    }

}

/* copy contents of file to another file */
function writeFileToFile(func, path, fileName, content) {
    func(path, content, 'utf8', function (err) {
        if (err) {
            console.log(`Couldn't write ${path}\n\t${err}`);
            process.exit(1);
        }
        console.log(`# no output, but ${path} contains contents of ${fileName}`)
    })
}

/* initialize out program */
let path;
let flag = false;

if (process.argv.includes('--out')) {
    path = process.argv[3];
    for (let i = 4; i < process.argv.length; i++) {
        const filename = process.argv[i];
        if (filename.includes('.txt')) {
            catWrite(path, filename)
        } else {
            webCatWrite(path, filename)
        }
    }
    flag = true;

} else {
    for (let i = 2; i < process.argv; i++) {
        path = process.argv[i];
        if (path.includes('.txt')) {
            cat(path);
        } else {
            webCat(path);
        }
    }
}
