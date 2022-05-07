"use strict";
const dialogflow = require("dialogflow");
const config = require("../config/keys");
const { struct } = require('pb-util');

const projectID = config.googleProjectID;

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
}

const sessionClient = new dialogflow.SessionsClient({projectID, credentials});

const sessionPath = sessionClient.sessionPath(
  config.googleProjectID,
  config.dialogflowSessionID,
  config.dialogflowSessionLanguageCode
);

module.exports = {
  textQuery: async (text, params = {}) => {
    let self = module.exports;

    const request = {
      session: sessionPath,

      queryInput: {
        text: {
          text: text,
          languageCode: config.dialogflowSessionLanguageCode,
        },
      },

      queryParams: {
        payload: {
          data: params,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  eventQuery: async (event, params = {}) => {
    let self = module.exports;

    const request = {
      session: sessionPath,

      queryInput: {
        event: {
          name: event,
          parameters: struct.encode(params),
          languageCode: config.dialogflowSessionLanguageCode,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  handleAction: (response) => {
    return response;
  },
};
