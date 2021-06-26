var svgToMiniDataURI = require('mini-svg-data-uri')
const fetch = require('node-fetch');

var fs = require('fs');
const files = fs.readdirSync('./public/');
const filterSVG = (filename) => {
    return filename.split('.')[1] == 'svg';
};
const svgfiles = files.filter(filterSVG);

var dict = {}
svgfiles.map((val)=>{
  fs.readFile('./public/'+val, 'utf8', (err, svgtext) => {
    if (err) {
      console.error(err.message);
      console.log(help);
      process.exit(1);
    }
    const minimised = svgToMiniDataURI(svgtext);
    const header = val.slice(0,-4);
    console.log(header);
    if(header!=='vercel.svg'){
      dict[header] = minimised;
    }
    let data = JSON.stringify(dict);
    fs.writeFileSync('./components/svgdata.json', data);
})
})


