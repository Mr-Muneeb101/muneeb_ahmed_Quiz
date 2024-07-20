#! ?usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
const URL = "https://opentdb.com/api.php?amount=6&category=9&difficulty=easy&type=multiple";
let fetchdata = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res;
};
async function StartQuiz() {
    console.log(chalk.yellow.bold(`\n\n\t\t\t Welcome TO Muneeeb Ahmed Quiz Game\n\n`));
    let WrongQuestions = [];
    let data = await fetchdata(URL);
    let score = 0;
    let UserName = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: chalk.whiteBright("\t\tPlease Enter your Name"),
        }
    ]);
    for (let i = 0; i < 5; i++) {
        let correct_answer = data.results[i].correct_answer;
        let randomindexnumber = Math.floor(Math.random() * 4);
        let incorrect_answers = [...data.results[i].incorrect_answers];
        console.log(correct_answer);
        let answers = [...incorrect_answers];
        answers.splice(randomindexnumber, 0, correct_answer);
        let Question = data.results[i].question;
        console.log(chalk.blue.bold(`\n\n \t \t \tSelect the correct Option for Question from Below`));
        let Quiz = await inquirer.prompt([
            {
                name: "question",
                type: "list",
                message: chalk.red.bold(`\t\t\t${Question}`),
                choices: answers,
            }
        ]);
        if (Quiz.question === correct_answer) {
            score++;
        }
        else {
            WrongQuestions.push({ question: Question, inncorrect_ansewers: [...data.results[i].incorrect_answers], correct_answer, correct_answer: correct_answer });
        }
    }
    console.log(chalk.green.bold(`\n\t\t\t\t\tDear ${UserName.name} Your Score is :${score}`));
    console.log(chalk.green.bold(` \n\t\t Here are your wrong Question \n\n`));
    for (let obj of WrongQuestions) {
        console.log(obj.question);
        for (const ans of obj.inncorrect_ansewers) {
            console.log(`${chalk.red(ans)}`);
        }
        console.log(`${chalk.green.italic(obj.correct_answer)}\n\n\n`);
    }
}
StartQuiz();
