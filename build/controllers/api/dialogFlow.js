"use strict";
/**
 * TODO(developer): UPDATE these variables before running the sample.
 */
// projectId: ID of the GCP project where Dialogflow agent is deployed
// const projectId = 'PROJECT_ID';
// sessionId: String representing a random number or hashed user identifier
// const sessionId = '123456';
// queries: A set of sequential queries to be send to Dialogflow agent for Intent Detection
// const queries = [
//   'Reserve a meeting room in Toronto office, there will be 5 of us',
//   'Next monday at 3pm for 1 hour, please', // Tell the bot when the meeting is taking place
//   'B'  // Rooms are defined on the Dialogflow agent, default options are A, B, or C
// ]
// languageCode: Indicates the language Dialogflow agent should use to detect intents
// const languageCode = 'en';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');
// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient();
class Connection {
    detectIntent(projectId, sessionId, query, languageCode) {
        return __awaiter(this, void 0, void 0, function* () {
            // The path to identify the agent that owns the created intent.
            let sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
            // The text query request.
            let request = {
                session: sessionPath,
                queryInput: {
                    text: {
                        text: query,
                        languageCode: languageCode,
                    },
                },
            };
            let responses = yield sessionClient.detectIntent(request);
            return responses[0];
        });
    }
}
exports.connection = new Connection();
