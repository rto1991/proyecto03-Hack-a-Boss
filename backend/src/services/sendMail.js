'use strict';

const sgEmail = require('@sendgrid/mail');
require('dotenv').config();

sgEmail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (to, subject, body) => {
    try {
      const msg = {
        to,
        from: process.env.SENDGRID_FROM,
        subject,
        text: body,
        html: `
          <article>
              <h1>${subject}</h1>
              <p>${body}</p>
          </article>
          `,
      };
      await sgEmail.send(msg);
      // res.send(201).send({ sucess: true });
    } catch (error) {
      console.log('Error en envío de email',error);
    }
  };

  module.exports = { 
    sendMail,
  }