#!/usr/bin/env node
const program = require('commander');
const command_init = require('../command/init');

program.version(require('../package').version);

program.usage('<command> <type>')

program
  .command('init <type>')
  .description('初始化工程')
  .action(command_init);

program.parse(process.argv);