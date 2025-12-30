#!/usr/bin/env node

const { Command } = require("commander");
const inquirer = require("inquirer");
const chalk = require("chalk");
const ora = require("ora");

const program = new Command();

program
  .name("nimbly")
  .description("Nimbly Infrastructure CLI - Deploy without managing servers.")
  .version("1.0.0");

// Mock Data
const PROJECTS = ["my-app", "backend-api", "frontend-dashboard"];

program
  .command("login")
  .description("Authenticate with your Nimbly account")
  .action(async () => {
    console.log(chalk.bold.hex("#ea580c")("\n☁️  Nimbly CLI\n"));

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "email",
        message: "Enter your email:",
      },
      {
        type: "password",
        name: "password",
        message: "Enter your password:",
        mask: "*",
      },
    ]);

    const spinner = ora("Authenticating...").start();

    setTimeout(() => {
      spinner.succeed(
        chalk.green(`Successfully logged in as ${answers.email}`)
      );
      console.log(chalk.gray("Token saved to ~/.nimbly/credentials"));
    }, 1500);
  });

program
  .command("init [name]")
  .description("Initialize a new Nimbly project")
  .action(async (name) => {
    let projectName = name;

    if (!projectName) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of your project?",
          default: "my-nimbly-app",
        },
      ]);
      projectName = answers.name;
    }

    const config = await inquirer.prompt([
      {
        type: "list",
        name: "framework",
        message: "Select your framework:",
        choices: ["Next.js", "React", "Node.js", "Python/Flask", "Go"],
      },
      {
        type: "checkbox",
        name: "features",
        message: "Select features to enable:",
        choices: [
          { name: "Database (Postgres)", checked: true },
          { name: "Redis Cache" },
          { name: "Background Workers" },
        ],
      },
    ]);

    const spinner = ora(
      `Initializing project ${chalk.bold(projectName)}...`
    ).start();

    setTimeout(() => {
      spinner.succeed("Project initialized!");
      console.log(chalk.blue(`\nCreated nimbly.config.json`));
      console.log(
        chalk.gray(`Run 'cd ${projectName}' and 'nimbly deploy' to go live.`)
      );
    }, 2000);
  });

program
  .command("deploy")
  .description("Deploy the current project to the cloud")
  .option("-e, --env <env>", "Environment to deploy to", "development")
  .action(async (options) => {
    const spinner = ora(`Analyzing project structure...`).start();

    setTimeout(() => {
      spinner.text = "Building application...";
    }, 1000);

    setTimeout(() => {
      spinner.text = "Provisioning resources (AWS)...";
    }, 3000);

    setTimeout(() => {
      spinner.text = "Uploading assets...";
    }, 5000);

    setTimeout(() => {
      spinner.succeed(chalk.green("Deployment successful!"));
      console.log("\n" + chalk.bold("Deployment Summary:"));
      console.log(`  Environment: ${chalk.cyan(options.env)}`);
      console.log(
        `  URL:         ${chalk.underline.blue(`https://${options.env === "production" ? "app" : "dev"}.nimbly.app`)}`
      );
      console.log(`  Build Time:  ${chalk.yellow("5.2s")}`);
      console.log(`  Resources:   ${chalk.gray("1KB Lambda, 1 PG Database")}`);
    }, 7000);
  });

program
  .command("status")
  .description("Check the status of your deployed application")
  .option("-e, --env <env>", "Environment to check", "development")
  .action(async (options) => {
    const spinner = ora("Checking deployment status...").start();

    setTimeout(() => {
      spinner.succeed(chalk.green("Status retrieved"));
      console.log("\n" + chalk.bold("Deployment Status:"));
      console.log(`  Environment: ${chalk.cyan(options.env)}`);
      console.log(`  Status:      ${chalk.green("🟢 Running")}`);
      console.log(
        `  URL:         ${chalk.underline.blue(`https://${options.env === "production" ? "app" : "dev"}.nimbly.app`)}`
      );
      console.log(`  Uptime:      ${chalk.yellow("2h 34m")}`);
      console.log(`  Last Deploy: ${chalk.gray("5 minutes ago")}`);
    }, 1500);
  });

program
  .command("logs")
  .description("View application logs")
  .option("-e, --env <env>", "Environment logs to view", "development")
  .option("-f, --follow", "Follow log output")
  .option("-n, --lines <number>", "Number of lines to show", "50")
  .action(async (options) => {
    const spinner = ora("Fetching logs...").start();

    setTimeout(() => {
      spinner.succeed("Logs retrieved");
      console.log("\n" + chalk.bold("Application Logs:"));
      console.log(
        chalk.gray("[" + new Date().toISOString() + "]") +
          " Server started on port 3000"
      );
      console.log(
        chalk.gray("[" + new Date().toISOString() + "]") +
          " Database connected successfully"
      );
      console.log(
        chalk.gray("[" + new Date().toISOString() + "]") + " Application ready"
      );
      console.log(
        chalk.yellow("[" + new Date().toISOString() + "]") +
          " Warning: High memory usage detected"
      );

      if (options.follow) {
        console.log(chalk.blue("\nFollowing logs... (Ctrl+C to stop)"));
        // In a real implementation, this would stream logs
      }
    }, 1000);
  });

program
  .command("list")
  .description("List all your projects")
  .action(async () => {
    const spinner = ora("Fetching projects...").start();

    setTimeout(() => {
      spinner.succeed("Projects retrieved");
      console.log("\n" + chalk.bold("Your Projects:"));
      console.log("");
      console.log(
        chalk.cyan("my-app") +
          " ".repeat(15) +
          chalk.green("🟢 Running") +
          " ".repeat(8) +
          chalk.gray("https://dev.nimbly.app")
      );
      console.log(
        chalk.cyan("backend-api") +
          " ".repeat(11) +
          chalk.yellow("🟡 Building") +
          " ".repeat(7) +
          chalk.gray("https://dev.nimbly.app/api")
      );
      console.log(
        chalk.cyan("frontend-dashboard") +
          " ".repeat(2) +
          chalk.red("🔴 Stopped") +
          " ".repeat(9) +
          chalk.gray("https://dev.nimbly.app/dashboard")
      );
      console.log("");
      console.log(chalk.gray(`Total: 3 projects`));
    }, 1000);
  });

program
  .command("destroy")
  .description("Destroy a deployed environment")
  .option("-e, --env <env>", "Environment to destroy", "development")
  .option("--confirm", "Skip confirmation prompt")
  .action(async (options) => {
    if (!options.confirm) {
      const answers = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: `Are you sure you want to destroy the ${chalk.red(options.env)} environment? This action cannot be undone.`,
          default: false,
        },
      ]);

      if (!answers.confirm) {
        console.log(chalk.yellow("Operation cancelled."));
        return;
      }
    }

    const spinner = ora(`Destroying ${options.env} environment...`).start();

    setTimeout(() => {
      spinner.text = "Terminating instances...";
    }, 1000);

    setTimeout(() => {
      spinner.text = "Removing databases...";
    }, 3000);

    setTimeout(() => {
      spinner.succeed(
        chalk.green(`${options.env} environment destroyed successfully`)
      );
      console.log(chalk.yellow("⚠️  All data has been permanently deleted"));
    }, 5000);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
