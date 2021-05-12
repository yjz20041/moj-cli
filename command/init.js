
const downloadGit = require('download-git-repo');
const path = require('path');
const inquirer = require('inquirer');
const fs = require('fs');
const Metalsmith = require('metalsmith');
const EJS = require('ejs');
const rm = require('rimraf').sync;
const ora = require('ora');
const chalk = require('chalk');
const shell = require('shelljs');


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
          if (/Podfile|(\.(jsx?|tsx?|package|json|md|java|xml|gradle|plist|xib|pbxproj|xcscheme|m))/.test(fileName) || /_BUCK/.test(fileName)) {
            const t = files[fileName].contents.toString()
            files[fileName].contents = Buffer.from(EJS.compile(t, {
              delimiter: '$'
            })(meta))
          }
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
    const url = `https://github.com:yjz20041/moj-template-${type}`;
    const spinner = ora(`正在下载项目模板，源地址：${url}`)
    spinner.start();
    downloadGit(url,
      tmpPath,
      {
        clone: false
      }, 
      (error) => {
        if (error) {
          spinner.fail();
          reject(error);
        } else {
          spinner.succeed();
          transform(tmpPath, distPath, metaData)
            .then(() => {
              if (type === 'rn') {
                [
                  'mojv_rn_ios',
                  'mojv_rn_ios-tvOS',
                  'mojv_rn_ios-tvOSTests',
                  'mojv_rn_ios.xcodeproj',
                  `${projectName}.xcodeproj/xcshareddata/xcschemes/mojv_rn_ios-tvOS.xcscheme`,
                  `${projectName}.xcodeproj/xcshareddata/xcschemes/mojv_rn_ios.xcscheme`,
                  'mojv_rn_iosTests',
                  `${projectName}Tests/mojv_rn_iosTests.m`
                ].forEach(item => {
                  const d = `${distPath}/ios/`;
                  const source = `${d + item}`;
                  const target = source.replace('mojv_rn_ios', projectName);
                  shell.exec(`mv ${source} ${target}`);
                });
    
                [
                  'mojv_rn_android'
                ].forEach(item => {
                  const d = `${distPath}/android/`;
                  const source = `${d}app/src/main/java/com/${item}`;
                  const target = source.replace('mojv_rn_android', projectName);
                  shell.exec(`mv ${source} ${target}`);
                })
                  
              }
              console.log(chalk.green(`项目创建成功，项目类型为：${type}，请执行cd ${projectName} nenpm install 进行安装`));
              resolve();
            })
            .catch((e) => {
              console.log(chalk.red('项目创建失败', e));
              reject();
            })
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

const init = async () => {
  const type = (await inquirer.prompt([
    {
      name: 'type',
      message: '请选择项目类型',
      type: 'list',
      choices: ['activity', 'component', 'h5', 'rn', 'rni18n', 'egg', 'admin', 'regularcms']
    }
  ])).type;
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
  if (!/^\w+$/.test(projectName)) {
    console.log('项目名只能包含下划线、字母和数字');
    return init(type);
  }
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

  metadata.elint = true;
  generate(type, projectName, metadata);
}

module.exports = init;