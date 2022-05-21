const controllers = require("../controllers/chatbot");
const { logChat } = require("../services/logChat")


module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello World! I am a chatbot!");
  });

  app.post("/api/v1/df_text_query", async (req, res) => {
    const response = await controllers.textQuery(req.body.text, req.body.parameters);
    const logResponse = await logChat(req.body.text, response);
    console.log(logResponse, "log response")
    res.send(response);
  });

  app.post("/api/v1/df_event_query", async (req, res) => {
    const response = await controllers.eventQuery(req.body.event, req.body.parameters);
    res.send(response);
  });

};
