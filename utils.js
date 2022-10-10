const https = require("https");

async function sendMessageToAdminRoom(message) {
    const body = JSON.stringify({
        msgtype: "m.text",
        body: message
    });

    var post_options = {
        host: 'matrix.org',
        path: `/_matrix/client/r0/rooms/${process.env.MATRIX_ADMIN_ROOM}/send/m.room.message?access_token=${process.env.MATRIX_ACCESS_TOKEN}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length
        }
    }

    return new Promise((resolve, reject) => {
        const request = https.request(post_options, response => {
            const response_data = [];

            response.on('data', chunk => {
                response_data.push(chunk);
            });

            if (response.statusCode === 200) {
                response.on('end', () => resolve(JSON.parse(Buffer.concat(response_data).toString())));
            } else {
                response.on('end', () => {
                    let error = new Error(`Matrix returned status code: ${response.statusCode}`);
                    error.response = JSON.parse(Buffer.concat(response_data).toString());
                    reject(error);
                });
            }
        });

        request.on('error', reject);

        request.write(body);
        request.end();
    });
}

function validateString(text) {
    if (text.length <= 64) {
        return true;
    }
    return false;
}

module.exports = {
    sendMessageToAdminRoom,
    validateString
};
