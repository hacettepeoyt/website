const https = require('https');

async function sendMessageToAdminRoom(message) {
    const body = JSON.stringify({
        msgtype: 'm.text',
        body: message
    });

    const post_options = {
        host: 'matrix.org',
        path: `/_matrix/client/r0/rooms/${process.env.MATRIX_ADMIN_ROOM}/send/m.room.message?access_token=${process.env.MATRIX_ACCESS_TOKEN}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

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
    return text.length <= 64;
}

function generateCsv(members) {
    const rows = members.map((member) => {
        return [
            member.firstName,
            member.lastName,
            member.studentID,
            member.degree,
            member.email,
            member.department,
            member.mobileNumber,
            member.groupChat,
        ];
    });

    const header = [
        'First Name',
        'Last Name',
        'Student ID',
        'Degree',
        'Email',
        'Department',
        'Mobile Number',
        'Group Chat',
    ];

    const csvRows = [header, ...rows];
    return csvRows.map((row) => row.join(',')).join('\n');
}

module.exports = {
    sendMessageToAdminRoom,
    validateString,
    generateCsv
};
