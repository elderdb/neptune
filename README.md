## About this project

The goal of the neptune project is be a professional portfolio,
provide information about my contacts, degree, certifications and tech knowledges.
This project has been made to show who I am and a little bit about my knowledges. Feel free to clone it and use it to learn some technologies like Angular, JS, CSS, Java 8, Spring, AWS as lambda, RDS connection, SES and etc.
You need to have a basic knowledge about AWS environment to deploy a WAR file in ElasticBeanstalk.

## Minimum requirements to build

> Node versão 10.12.27

> NPM versão 5.5.1

> PostgreSQL 9.6

## How to create a final package

./mvnw -Pprod,war clean verify

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

    npm install

We use npm scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    ./mvnw
    npm start

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.
