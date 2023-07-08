const handler = async function (event, context) {
    // your server-side functionality
    const { SECRET_API_KEY } = process.env
    return {
        statusCode: 200,
        body: JSON.stringify({ message: SECRET_API_KEY }),
    };
};


export { handler };