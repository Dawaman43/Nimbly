#!/usr/bin/env node

const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');

const program = new Command();

program
    .name('nimbly')
    .description('Nimbly Infrastructure CLI - Deploy without managing servers.')
    .version('1.0.0');

// Mock Data
const PROJECTS = ['my-app', 'backend-api', 'frontend-dashboard'];

program
    .command('login')
    .description('Authenticate with your Nimbly account')
    .action(async () => {
        console.log(chalk.bold.hex('#ea580c')('\n☁️  Nimbly CLI\n'));

        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'email',
                message: 'Enter your email:',
            },
            {
                type: 'password',
                name: 'password',
                message: 'Enter your password:',
                mask: '*',
            },
        ]);

        const spinner = ora('Authenticating...').start();

        setTimeout(() => {
            spinner.succeed(chalk.green(`Successfully logged in as ${answers.email}`));
            console.log(chalk.gray('Token saved to ~/.nimbly/credentials'));
        }, 1500);
    });

program
    .command('init [name]')
    .description('Initialize a new Nimbly project')
    .action(async (name) => {
        let projectName = name;

        if (!projectName) {
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is the name of your project?',
                    default: 'my-nimbly-app'
                }
            ]);
            projectName = answers.name;
        }

        const config = await inquirer.prompt([
            {
                type: 'list',
                name: 'framework',
                message: 'Select your framework:',
                choices: ['Next.js', 'React', 'Node.js', 'Python/Flask', 'Go']
            },
            {
                type: 'checkbox',
                name: 'features',
                message: 'Select features to enable:',
                choices: [
                    { name: 'Database (Postgres)', checked: true },
                    { name: 'Redis Cache' },
                    { name: 'Background Workers' }
                ]
            }
        ]);

        const spinner = ora(`Initializing project ${chalk.bold(projectName)}...`).start();

        setTimeout(() => {
            spinner.succeed('Project initialized!');
            console.log(chalk.blue(`\nCreated nimbly.config.json`));
            console.log(chalk.gray(`Run 'cd ${projectName}' and 'nimbly deploy' to go live.`));
        }, 2000);
    });

program
    .command('deploy')
    .description('Deploy the current project to the cloud')
    .option('-e, --env <env>', 'Environment to deploy to', 'development')
    .action(async (options) => {
        const spinner = ora(`Analyzing project structure...`).start();

        setTimeout(() => {
            spinner.text = 'Building application...';
        }, 1000);

        setTimeout(() => {
            spinner.text = 'Provisioning resources (AWS)...';
        }, 3000);

        setTimeout(() => {
            spinner.text = 'Uploading assets...';
        }, 5000);

        setTimeout(() => {
            spinner.succeed(chalk.green('Deployment successful!'));
            console.log('\n' + chalk.bold('Deployment Summary:'));
            console.log(`  Environment: ${chalk.cyan(options.env)}`);
            console.log(`  URL:         ${chalk.underline.blue(`https://${options.env === 'production' ? 'app' : 'dev'}.nimbly.app`)}`);
            console.log(`  Build Time:  ${chalk.yellow('5.2s')}`);
            console.log(`  Resources:   ${chalk.gray('1KB Lambda, 1 PG Database')}`);
        }, 7000);
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
