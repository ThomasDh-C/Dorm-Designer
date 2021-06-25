var svgToMiniDataURI = require('mini-svg-data-uri')

var fs = require('fs');
const files = fs.readdirSync('./public/');
const filterSVG = (filename) => {
    return filename.split('.')[1] == 'svg';
};
const svgfiles = files.filter(filterSVG)




