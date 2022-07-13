import {config} from 'dotenv';
import {writeFileSync} from 'node:fs';
import axios from 'axios';
config();

console.log('Generating standard markdown files...');

// A Token of the Bot to get messages
const token = process.env.token;

const standardIDs = [
    '996466194699788439'
];

// Channel ID for Standards Proposals.
const channelId = '996454673324200016';
const url = `https://discord.com/api/v10/channels/${channelId}/messages/`;
const headers = {
    Authorization: `Bot ${token}`,
    'Content-Type': 'application/json'
};

standardIDs.forEach(async (id, i) => {
    const content = (await axios.get(`${url}/${id}`, {
        headers,
    })).data.content;

    writeFileSync(`./standards/${i+1}.md`, 'This file is auto generated!\n' + content);
    console.log(`${i+1}: Done`);
});
