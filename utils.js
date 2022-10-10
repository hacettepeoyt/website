const https = require("https");

// TODO: Make this an async function.
function sendMessageToAdminRoom(message) {
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

    // TODO: Error handling.
    const matrix_req = https.request(post_options);
    matrix_req.write(body);
    matrix_req.end();
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
