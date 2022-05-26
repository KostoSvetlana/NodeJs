import http from 'http';
import path from 'path';
import fs from 'fs';



const HTML_TEMPLATE = './index_template.html';
const HTML_TO_DISPLAY = path.join(path.resolve(), 'index.html');

const isDir = (dirPath) => fs.lstatSync(dirPath).isDirectory();

http.createServer((req, res) => {
    const fullPath = path.join(path.resolve(), req.url);

    if (isDir(fullPath)) {
        const contentDir = fs.readdirSync(fullPath);

        makeHTMLResult(displayDirContent(req.url,contentDir));
    } else {
        makeHTMLResult(fs.readFileSync(fullPath, 'utf-8'));
    }

    const readStream = fs.createReadStream(HTML_TO_DISPLAY);
    res.writeHead(200, { 'Content-Type': 'text/html'});
    readStream.pipe(res);
}).listen(3993, 'localhost');

const displayDirContent = (currentPath, list) => {
    let htmlList = '';
    htmlList += '<ul>';
    htmlList += list.reduce((list, item) => list+=`<li><a href="${currentPath == '/' ? currentPath + item : currentPath + '/' + item}">${item}</a></li>`, '');
    htmlList += '</ul>';
    return htmlList;
};


const makeHTMLResult = (toPresent) => {
    let template = fs.readFileSync(HTML_TEMPLATE, 'utf-8');
    template = template.replace('{{data}}', toPresent);
    fs.writeFileSync('./index.html', template);
};