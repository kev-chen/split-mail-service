'use strict';

const Responses = require('../../../../common/Responses');
const sendGrid = require('@sendgrid/mail');

exports.handler = async (event) => {
  if (!event.body) return Responses._400({ message: 'Expected log in request body' });

  const eventBody = JSON.parse(event.body);

  sendGrid.setApiKey(process.env.SEND_GRID_API_KEY);

  const msg = {
    to: 'kevchen21@gmail.com',
    from: eventBody.email,
    subject: `Split Support Email - ${eventBody.name}`,
    text: eventBody.message,
  };

  try {
    let response = await sendGrid.send(msg);
    console.log(response[0].statusCode);
    if (response[0].statusCode === 202) {
      return Responses._200({ message: 'Successfully sent email' });
    }
  } catch (e) {
    console.log(e);
    return Responses._400({ message: 'Bad request' });
  }
};
