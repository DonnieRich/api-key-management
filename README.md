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
- How to set and use environment variables
- How to write serverless functions
- How to use serverless functions to communicate with the APIs

## How to install and use the Netlify CLI

This is one of the easiest step of the entire tutorial.
From the Netlify documentation about the CLI (you can find it [here](https://docs.netlify.com/cli/get-started/)) this is all you need to install the Netlify CLI. Yay! :)

```shell
npm install netlify-cli -g
```

Now you can use the ```netlify``` command to manage your local website. You can also use the alias ```ntl``` to save some time :)

### Login to Netlify

Now you need to authorize Netlify CLI by obtaining an access token. Just type the following command and authorize the application:
```shell
ntl login
```

### Link your local environment to Netlify

If you have already deployed your website on Netlify, now you just have to _link_ both environment together.
You can do this using this command:
```shell
ntl link
```

### Run your build

With the following command you can run your local build using the Netlify CLI to simulate the behavior of running the build on Netlify:

```shell
ntl dev
```

## How to set and use environment variables

If your are not familiar with the concept on .env file and environment variables you can refer to this over-simplified definition just to understand the basics:

>An .env file is just a plain text file containing key/value pairs of variables.
>
>_env_ is short for _environment_, because the values defined here are the variables available for all our environment.

### Set environment variables

You can set these variables by just writing them down inside you .env file:
```text
MY_KEY=value
```

>**NOTE**: always remember to add your .env file to .gitignore or all the variables will be visible inside your repository!

Netlify UI makes the process to write and manage environment variables really easy. Just go to your site _Control Panel_ > _Site settings_ > _Environment variables_.
Write the key and the value, leaving the variable available for all the scopes (in this tutorial I will not cover the variable scopes).


>**NOTE**: make sure to have the _Sensitive variable policy_ set up on _Require approval_ for untrusted deploys!
> More on that [here](https://docs.netlify.com/environment-variables/get-started/#sensitive-variable-policy).

If you linked your local development environment to your Netlify site, you already have the environment variables available without the need to write the .env file!

You can verify this by executing the following command:
```shell
ntl env:list
```

### Use environment variables

To use the environment variables this is all you need:
```js
const { SECRET_API_KEY, WORKS } = process.env
```

`process.env` gets all the environment variables and with a simple _destructuring_ you can get the keys you want.

That's all for the environment variables!

## How to write serverless functions

A serverless function on Netlify is just a JS function that return a promise. As per the Netlify documentation:
_To create a synchronous function, use the following general syntax in your JavaScript function file to export a handler method_
```js
exports.handler = async function (event, context) {
  // your server-side functionality
};
```

You can also use the ES Module syntax:
```js
const handler = async function (event, context) {
  // your server-side functionality
};

export { handler };
```

>**NOTE**
>Netlify provides the event and context parameters when the function is invoked.
>More on that [here](https://docs.netlify.com/functions/create/?fn-language=js#synchronous-function-format-2)


### Where to place serverless functions

The default path used by Netlify for serverless functions is `YOUR_BASE_DIRECTORY/netlify/functions`.

>**NOTE**
>The function’s endpoint name is _case-sensitive_ and determined by its filename or the name of its dedicated parent directory.
>
>I.E. If you want an endpoint with the name `hello` you should save your function in one of the following ways:
>- `netlify/functions/hello.js`
>- `netlify/functions/hello/hello.js`
>- `netlify/functions/hello/index.js`

Because the endpoint name is _case-sensitive_ if you name your function `myFunction`, your endpoint will look like this: `netlify/functions/hello.js`