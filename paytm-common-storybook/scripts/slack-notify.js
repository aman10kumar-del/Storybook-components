const { IncomingWebhook } = require('@slack/webhook');
const md2json = require('md-2-json');
const fs = require('fs');
const packageJSON = require("../package.json")

const changeLogs = md2json.parse(fs.readFileSync("changelogs/changelog.md").toString())

const url = process.env.PODS_H5_SLACK_WEBHOOK_URL;
if (!url) {
  console.error("Failed to get webhook url. Aborting ")
  return;
}
const webhook = new IncomingWebhook(url);

(async () => {
  await webhook.send({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Hi :wave:',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `We have a new update in paytm_common_ui. \nNew version \`v${packageJSON.version}\` is released`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Changelogs*',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: ((changeLogs[packageJSON.version] || {}).raw || '## Please check git'),
        },
      },
    ],
  });
})();
