import axios from 'axios';

exports.handler = async function (event, context) {
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