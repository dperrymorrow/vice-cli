
const inquirer = require("inquirer");
const data = require("./data");
const chalk = require("chalk");

async function addVice() {
  const answers = await inquirer.prompt([
    {type: "input", name: "viceName", message: "Your Vice Name"}
  ]);

  const vices = data.fetch();

  if (vices.find(vice => vice.label === answers.viceName)) {
    console.log(chalk.red("You already have that vice"));
  } else {
    vices.push({label: answers.viceName, last: new Date(), longest: null });
    data.save(vices);
  }
}

async function resetStreak() {

  const vices = data.fetch();
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "viceName",
      message: "Choose vice to reset",
      choices: vices.map(v => v.label)
    }
  ]);

  const vice = vices.find(v => v.label === answers.viceName);
  vice.longest = {start: vice.last, end: new Date() };
  vice.last = new Date();
  data.save(vices);
}

async function mainMenu() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Choose vice to reset",
      choices: [
        { name: "Add a Vice", value: addVice },
        { name: "Reset a Streak", value: resetStreak }
      ]
    }
  ]);

  answers.action();
}


module.exports = {
  addVice,
  mainMenu,
  // removeVice,
  resetStreak
};
