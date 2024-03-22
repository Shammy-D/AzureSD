const fetch = require('node-fetch');

module.exports = async function (context, req) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Hard-coded API endpoint
    const model = "gpt-3.5-turbo"; // Hard-coded model parameter
    console.log('Model Parameter:', model);

    try {
        const response = await fetch(apiUrl, {
            method: req.method,
            headers: {
                ...req.headers,
                Authorization: `Bearer ${process.env.OPENAPI_API_KEY}` // Use environment variable for API key
            },
            body: req.body // Pass request body as it is
        });

        // Ensure the response includes CORS headers
        const headers = {
            'Access-Control-Allow-Origin': 'https://test.shamya.net',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        };

        context.res = {
            status: response.status,
            body: await response.text(),
            headers: headers
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }
};