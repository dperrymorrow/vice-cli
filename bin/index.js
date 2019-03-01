#!/usr/bin/env node
"use strict";

const chalk = require("chalk");
const data = require("../lib/data");
const prompts = require("../lib/prompts");
const viceHelper = require("../lib/vice");
const vices = data.fetch();
const { table } = require("table");

if (vices.length) {
  const data = [[chalk.cyan.bold("Vice Name"), "Current Streak", "Longest Streak"]];

  vices.forEach(vice => {
    const row = [vice.label];
    const helper = viceHelper(vice);
    const streak = helper.streakInWords();

    helper.isBestEver() ? row.push(chalk.green.bold(streak)) : row.push(streak);
    row.push(helper.longestInWords());
    data.push(row);
  });

  console.log(table(data));
  prompts.mainMenu();
} else {
  prompts.addVice();
}
