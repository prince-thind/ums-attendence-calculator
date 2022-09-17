const fs = require('fs');

exports.readJSON = function (filePath) {
    try {
        const data = fs.readFileSync(filePath);
        const json = JSON.parse(data);
        return json;
    }
    catch (e) {
        console.error(e);
        return {}
    }
}