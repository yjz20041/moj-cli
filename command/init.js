
const downloadGit = require('download-git-repo');
const path = require('path');
const inquirer = require('inquirer');
const fs = require('fs');
const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars')
const rm = require('rimraf').sync;


const transform = (src, dist, metadata = {}) => {
  return new Promise((resolve, reject) => {
    Metalsmith(process.cwd())
      .metadata(metadata)
      .source(src)
      .destination(dist)
      .clean(false)
      .use((files, metalsmith, done) => {
        const meta = metalsmith.metadata();
        Object.keys(files).forEach(fileName => {
          const t = files[fileName].contents.toString()
          files[fileName].contents = Buffer.from(Handlebars.compile(t)(meta))
        })
        done();
      }).build(err => {
        err ? reject(err) : resolve()
      })
  })
}

const generate = (type, projectName, metaData = {}) => {
  const distPath = path.join(process.cwd(), projectName);
  const tmpPath = `${distPath}_tmp`;
  return new Promise((resolve, reject) => {
    downloadGit(`https://github.com:yjz20041/moj-template-${type}`,
      tmpPath,
      {
        clone: false
      }, 
      (error) => {
        if (error) {
          reject(error);
        } else {
          transform(tmpPath, distPath, metaData)
            .then(resolve)
            .catch(reject)
            .finally(() => {
              // 移除临时目录
              rm(tmpPath);
            });
        }
      });
  })
  
}

const existDir = (name) => {
  const dir = path.join(process.cwd(), name);
  return new Promise((resolve, reject) => {
    fs.stat(dir, ((err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    }));
  });
}

const init = async (type) => {
  const answers = await inquirer.prompt([
    {
      name: 'projectName',
      message: '请输入项目名称'
    }
  ]);
  const {
    projectName
  } = answers;
  if (!projectName) return init(type);
  const metadata = {
    projectName
  };
  const exist = await existDir(projectName);
  if (exist) {
    const answers = await inquirer.prompt([
      {
        name: 'override',
        message: '项目名已存在, 是否覆盖？',
        type: 'confirm'
      }
    ]);
    if (!answers.override) {
      return;
    }
  }
  // 组件脚手架需要选择类型
  if (type === 'component') {
    const componentType = (await inquirer.prompt([
      {
        name: 'type',
        message: '组件类型',
        type: 'list',
        choices: ['react', 'regular', 'other']
      }
    ])).type;
    metadata.isReact = componentType === 'react';
    metadata.isRegular = componentType === 'regular';
  }

  // 是否接入云音乐编码规范
  metadata.elint = (await inquirer.prompt([
    {
      name: 'elint',
      message: '是否接入elint以及云音乐编码规范',
      type: 'confirm'
    }
  ])).elint;
  generate(type, projectName, metadata);
}

module.exports = init;