const config = require("../config/keys");
const axios = require("axios");
const token = config.chatLogKey;
const url = config.strapiUrl;

module.exports = {
  logChat: (async = (req, res) => {
    const response = res[0].queryResult.fulfillmentMessages;
    
    let dataToSend = [];

    for (let message of response) {
      const { text } = message.text;
      for (let message of text) {
        const data = {
          textInput: req,
          textResponse: message,
        };
        dataToSend.push(data)
      }
    }

    return Promise.all(dataToSend.map(async (item) => { 
      const response = await axios.post(url, {
        data: { ...item }
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response;
    }))
  }),
};
