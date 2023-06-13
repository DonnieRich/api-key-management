# API key management for JAMstack websites

This is a tutorial aimed to help junior devs to correctly manage their API keys (or other secrets) when publishing a website on the Netlify platform.

## Pre-requisites

- Basic knowledge of HTML, CSS, JavaScript
- Basic knowledge of Vite and VueJS
- Basic knowledge of VisualStudio Code
- Just a bit of experience with the CLI
- A GitHub repository
- How to deploy a website on Netlify
- A website/project/webapp already deployed on Netlify

## What you will learn

- How to install and use the Netlify CLI
- How to write and use environmental variables (.env file)
- How to update your .env file with your environmental variables on Netlify
- How to setup environmental variables using the Netlify UI
- How to write serverless functions
- How to read environmental variables from serverless functions
- How to use serverless functions to communicate with the APIs

## Tutorial step-by-step

### How to install and use the Netlify CLI

This is one of the easiest step of the entire tutorial.
From the Netlify documentation about the CLI (you can find it [here](https://docs.netlify.com/cli/get-started/)) this is all you need to install the Netlify CLI. Yay! :)

```shell
npm install netlify-cli -g
```

Now you can use the ```netlify``` command to manage your local website. You can also use the alias ```ntl``` to save some time :)

#### Login to Netlify

Now you need to authorize Netlify CLI by obtaining an access token. Just type the following command and authorize the application:
```shell
ntl login
```

#### Link your local environment to Netlify

If you have already deployed your website on Netlify, now you just have to _link_ both environment together.
You can do this using this command:
```shell
ntl link
```

#### Run your build

With the following command you can run your local build using the Netlify CLI to simulate the behavior of running the build on Netlify:

```shell
ntl build
```

### How to write and use environmental variables (.env file)

