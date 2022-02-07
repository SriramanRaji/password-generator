#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const log = console.log;
const createPassword = require('./utils/createPassword');
const savePassword = require('./utils/savePassword');

program.version('1.0.0').description('A simple password generator');

program
  .option('-l, --length <numbers>', 'length of password', '8')
  .option('-s, --save', 'save password to password.txt in current directory')
  .option('-nn, --no-numbers', 'exclude numbers')
  .option('-ns, --no-symbols', 'exclude symbols and special characters')
  .parse();

const { length, save, numbers, symbols } = program.opts();

// Generate Password
const generatedPassword = createPassword(length, numbers, symbols);

// Save password to file
if (save) {
  savePassword(generatedPassword);
}

// Copy to Clipboard
clipboardy.writeSync(generatedPassword);

// Print Password
log(chalk.blue('Generated Password : ') + chalk.bold(generatedPassword));
log(chalk.yellow('Password copied to clipboard'));
