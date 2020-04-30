const fs = require('fs');
const path = require('path');
const shell = require('shelljs');


const appJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'app.json'), 'utf8'));
const name = appJson.name;
const argv = process.argv[2] || '';
const dev = argv.indexOf('test') > -1;
const os = argv.indexOf('ios') > -1 ? 'ios' : 'android';

const tpl = `
    set -e
    #!/bin/bash
    echo "---${name} releasing---"
    rm -rf dist/${os}
    mkdir -p ./dist/${os}

    react-native bundle --reset-cache --entry-file index.${os}.js --platform ${os} --bundle-output ./dist/${os}/${name}.bundle --dev ${dev} --verbose --assets-dest ./dist/${os}
    cd ./dist/${os}
    tar -cf ./${name}.tar *
    zip ${name}.zip ${name}.tar -v

    rm -f ./${name}.tar
`;

shell.exec(tpl, {
    cwd: process.cwd()
}, (code) => {
    if (code === 0) {
        console.log('构建完成');
    } else {
        console.log('构建失败');
    }
});
