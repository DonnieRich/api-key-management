# API key management on Netlify
This is a tutorial aimed to help junior devs correctly manage their API keys (or other secrets) when publishing a website on the Netlify platform.

## Pre-requisites

- Basic knowledge of HTML, CSS, JavaScript
- Basic knowledge of Vite, VueJS, and Axios
- Basic knowledge of VisualStudio Code
- Just a bit of experience with the CLI
- A GitHub repository
- How to deploy a website on Netlify
- A website/project/web app already deployed on Netlify

## What you will learn (table of contents)

- [How to install and use the Netlify CLI](#how-to-install-and-use-the-netlify-cli)
- [How to set and use environment variables](#how-to-set-and-use-environment-variables)
- [How to write serverless functions](#how-to-write-serverless-functions)
- [How to use serverless functions to communicate with the APIs](#how-to-use-serverless-functions-to-communicate-with-the-apis)
- [Conclusion](#conclusion)
- [Resources](#resources)

## How to install and use the Netlify CLI

This is one of the easiest steps of the entire tutorial.
From the Netlify documentation about the CLI (you can find it [here](https://docs.netlify.com/cli/get-started/)) this is all you need to install the Netlify CLI. Yay! :)

```shell
npm install netlify-cli -g
```

Now you can use the `netlify` command to manage your local website. You can also use the alias `ntl` to save some time :)

### Login to Netlify

Now you need to authorize Netlify CLI by obtaining an access token. Just type the following command and authorize the application:
```shell
ntl login
```

### Link your local environment to Netlify

If you have already deployed your website on Netlify, now you just have to _link_ both environments together.
You can do this using this command:
```shell
ntl link
```

### Run your build

With the following command, you can run your local build using the Netlify CLI to simulate the behavior of running the build on Netlify:

```shell
ntl dev
```

## How to set and use environment variables

If you are not familiar with the concept of .env file and environment variables you can refer to this over-simplified definition just to understand the basics:

>An .env file is just a plain text file containing key/value pairs of variables.
>
>_env_ is short for _environment_, because the values defined here are the variables available for all our environment.

### Set environment variables

You can set these variables by just writing them down inside your .env file:
```text
MY_KEY=value
```

>**NOTE**: always remember to add your .env file to .gitignore or all the variables will be visible inside your repository!

Netlify UI makes the process to write and manage environment variables really easy. Just go to your site _Control Panel_ > _Site settings_ > _Environment variables_.
Write the key and the value, leaving the variable available for all the scopes (in this tutorial I will not cover the variable scopes).


>**NOTE**: make sure to have the _Sensitive variable policy_ set up on _Require approval_ for untrusted deploys!
>More on that [here](https://docs.netlify.com/environment-variables/get-started/#sensitive-variable-policy).

If you linked your local development environment to your Netlify site, you already have the environment variables available without the need to write the .env file!

You can verify this by executing the following command:
```shell
ntl env:list
```

### Use environment variables

To use the environment variables this is all you need:
```js
const { SECRET_API_KEY } = process.env
```

`process.env` gets all the environment variables and with a simple _destructuring_ you can get the keys you want.

That's all for the environment variables!
Don't worry! In the next steps, I'll show you where to place this line of code :)


## How to write serverless functions

A serverless function on Netlify is just a JS function that returns a promise. As per the Netlify documentation:
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

Because the endpoint name is _case-sensitive_ if you name your function `myFunction`, your endpoint will look like this: `netlify/functions/myFunction.js`.
For the same reason if you name your function `my-function`, your endpoint will be: `netlify/functions/my-function.js`.


### What to write inside the function

The easiest thing to do is to just make the function return a "Hello World!"
Using the basic example from the [Netlify documentation](https://docs.netlify.com/functions/create/?fn-language=js#synchronous-function-format-2) the `hello.js` function will look like this:

```javascript
const handler = async function (event, context) {
    // your server-side functionality
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello World" }),
    };
};

export { handler };
```

This will return an object with a `statusCode` and a `body` properties. The `statusCode` with value `200` means the request was successful.
The `body` will contain a `JSON` formatted string representing the object we want to get from the function. In this example is just an object with a `message` property.

Let's proceed to the next step!


## How to use serverless functions to communicate with the APIs

Time to use your function!
After a successful test call, you will add the code needed to call the API endpoint you want.


### Call the function

The following code examples are taken from a VueJS project, using `axios` to call both the serverless functions and the APIs.

To call `hello.js` from `App.vue` the code is as simple as this:
```javascript
axios.get('/.netlify/functions/hello')
	.then((response) => {
		// handle success
		console.log(response);
		this.helloResult = response.data.message;
	})
	.catch((error) => {
		// handle error
		console.log(error);
	});
```

If you are a bit familiar with VueJS you'll know this code can be placed inside a function defined in the `methods` property or inside the `mounted` method.
`helloResult` is just a property of `data` and is used to memorize the value returned from the `hello.js` function.

>**NOTE**
>To get the "Hello World!" text you need to access the `message` property inside `response.data`.
>The `message` property is the same property you defined in the [previous step](#what-to-write-inside-the-function)

Make sure to test your code in the browser (remember to run `ntl dev` or `netlify dev` in the terminal to get both the Netlify local environment and your project up and running as you did in the [Run your build](#run-your-build) step)

If everything works on your local machine, is time to push to your repository and test again everything on your live website!


### Read environment variables from the serverless function

You just tested the simplest function you could write and everything went smoothly! To make a secure call to the API you want you'll first need to *read* the *API key* from your *environment variables*.

Do you remember [this step](#use-environment-variables)? This is where you find out where to place that line of code!

Go to the [Set environment variables](#set-environment-variables) step and create a new variable called `SECRET_API_KEY` (spoiler: it will not be secret!) with the value you want.

On your local machine run the command to get the list of all environment variables:
```shell
ntl env:list
```

If you can see the `SECRET_API_KEY` entry, you did everything right!

>**NOTE**
>You can also check the variables values by typing `y` when the terminal ask you: **Show values?(y/N)**

Now is the time to create a new function called `almost-secret.js` that'll give you the value of the `SECRET_API_KEY` env variable.

`almost-secret.js` code:
```javascript
const handler = async function (event, context) {
    // your server-side functionality
    const { SECRET_API_KEY } = process.env
    return {
        statusCode: 200,
        body: JSON.stringify({ message: SECRET_API_KEY }),
    };
};

export { handler };
```

Calling this function will give you the value of your `SECRET_API_KEY` variable... but, wait... why should you bring on your front-end such information?

You shouldn't! This is just an example to show how to read and use your env variables from a serverless function.
In the next example, you will see how to properly use a serverless function to call an API without exposing your API key.

Before that, let's push everything on the repository and check it on the live site.


### Call QuizAPI passing the API key securely

In this last example, you will learn how to put it all together and make secure calls to every API you need.
The API used is from [QuizAPI](https://quizapi.io/docs/1.0/overview). In their documentation, they suggest attaching the API key to a request as an `HTTP header`:
```
X-Api-Key: YOUR_API_KEY
```

Register to [QuizAPI](https://quizapi.io/register) and get your API key, then add that key to a new env variable on Netlify (es. `QUIZ_API_TOKEN`).
The last thing to do is to create a new function called `quizapi.js`. This function will call the `questions` endpoint (more on that [here](https://quizapi.io/docs/1.0/endpoints#%D0%B5ndpoints)).

To make an HTTP call from a serverless function you need to import `axios` (you already installed the dependency in the previous steps).

>**NOTE**
>I will not cover how to use `axios` and how to add headers to a request since it's a pre-requisite for following this tutorial

Let's take a look at the `quizapi.js` function:
```javascript
import axios from 'axios';

const handler = async function (event, context) {
    try {

        // your server-side functionality
        const { QUIZ_API_TOKEN } = process.env;

        const config = {
            params: {
                limit: 1
            },
            headers: {
                "X-Api-Key": QUIZ_API_TOKEN
            }
        };

        const response = await axios.get('https://quizapi.io/api/v1/questions', config)

        if (response.errors !== undefined && response.errors.length) {
            throw new Error(response.errors);
        }

        // handle success
        return {
            statusCode: 200,
            body: JSON.stringify({ response: response.data }),
        };

    } catch (error) {
        return {
            statusCode: 500,
            // Could be a custom message or object i.e. JSON.stringify(err)
            body: JSON.stringify({ response: error.message }),
        }
    }
};

export { handler };
```

It's a little more complex than the other two, is it?
Don't worry, I will explain this function almost line by line.

The first line just imports `axios` inside the function:
```javascript
import axios from 'axios';
```

After the common code for all the Netlify serverless functions, you can spot the line taking care of retrieving the `QUIZ_API_TOKEN` env variable value:
```javascript
const { QUIZ_API_TOKEN } = process.env;
```

After that, there is the code used to add parameters and header to the `axios` request:
```javascript
const config = {
	params: {
		limit: 1
	},
	headers: {
		"X-Api-Key": QUIZ_API_TOKEN
	}
};
```
The `limit` property is a parameter taken from the [QuizAPI documentation](https://quizapi.io/docs/1.0/limit)
The `X-Api-Key` property is where to place the value of `QUIZ_API_TOKEN` as explained by the [QuizAPI documentation](https://quizapi.io/docs/1.0/authentication)

The function will now make the call to the API, passing along parameters and headers:
```javascript
const response = await axios.get('https://quizapi.io/api/v1/questions', config)
```

If the API responds with an error, the function will throw an exception (this is why everything is wrapped inside a `try/catch` block):
```javascript
if (response.errors !== undefined && response.errors.length) {
	throw new Error(response.errors);
}
```

If there are no errors, the function will return an object already familiar to you:
```javascript
return {
	statusCode: 200,
	body: JSON.stringify({ response: response.data }),
};
```
In the response property, we add the value of `response.data` since the endpoint returns an array of strings that `axios` put right inside the `data` property (if you are familiar with `axios` you already know how to check this).

In case of errors the function will go to the `catch` block and return an object with a `statusCode` of 500 (generic server error) and the error message:
```javascript
catch (error) {
	return {
		statusCode: 500,
		// Could be a custom message or object i.e. JSON.stringify(err)
		body: JSON.stringify({ response: error.message }),
	}
}
```

To call this function from `App.vue` (or any other component) the code is almost the same as the one used before:
```javascript
axios.get('/.netlify/functions/quizapi')
	.then((response) => {
		// handle success
		console.log(response);
		this.quizApiQuestion = response.data.response[0].question;
	})
	.catch((error) => {
		// handle error
		console.log(error);
	});
```


### Test the call on your local machine

If you didn't stop the local environment, go to your browser and check if you can get a question from the QuizAPI endpoint!
After that go further and push everything on your repo to also test the call from the live site.


### Test the call on the live site

If you can get a question from QuizAPI from your live website, great!

If not, maybe you are facing this kind of error: `'Error: Cannot find module '/var/task/node_modules/axios/dist/node/axios.cjs'`.

To solve this error create a file called `netlify.toml` and add this code inside it:
```toml
[functions]
  node_bundler = "esbuild"
```

Commit, push, and test again!


## Conclusion

When calling external API services from your front-end project always remember to keep hidden and secured your API keys (or other sensitive pieces of information).
One way to do this is to leverage the power of Netlify serverless functions that can act as API endpoints, read environment variables, and make calls to other APIs.

If this article was helpful or want to start a conversation, feel free to reach out in the comments or on [LinkedIn](https://www.linkedin.com/in/donato-riccio-wda/)
I'll be happy to receive any feedback or ideas for future articles and tutorials.

## Resources
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/get-started/)
- [Netlify Serverless Functions](https://docs.netlify.com/functions/create/?fn-language=js)
- [Up and running with serverless functions - YouTube Playlist](https://youtu.be/PCDhpRms4Ek)
- [QuizAPI](https://quizapi.io/docs/1.0/overview)
- [Cannot find module error - Netlify Answers](https://answers.netlify.com/t/error-with-scheduled-functions-and-axios-error-cannot-find-module-var-task-node-modules-axios-dist-node-axios-cjs/94186)
- [GitHub Example Repo](https://github.com/DonnieRich/api-key-management)