import readlineSync from "readline-sync";
import { tools } from "./constants.js";
import { generateResponse } from "./services/gemini.js";

const messages = [];

let logFnEnabled = false;

while (true) {
    const query = readlineSync.question(">> ");

    if (query.trim() === "/exit") {
        console.log("Exiting the program. Goodbye!");
        break;
    }

    if (query.trim() === "/fn") {
        logFnEnabled = !logFnEnabled;
        console.log(
            `Logging of fn is now ${logFnEnabled ? "enabled" : "disabled"}.`
        );
        continue;
    }

    const userInput = { type: "user", user: query };

    messages.push({
        role: "user",
        parts: [{ text: JSON.stringify(userInput) }],
    });

    while (true) {
        try {
            const content = await generateResponse(messages);

            messages.push({ role: "model", parts: [{ text: content }] });

            const action = JSON.parse(content);

            if (action.type === "output") {
                console.log(action.output);
                break;
            } else if (action.type === "action") {
                const fn = tools[action.function];

                if (!fn) {
                    console.log("Invalid Tool Call");
                }

                if (logFnEnabled) {
                    console.log(fn);
                }

                const observation = await fn(action.input);

                const observationMessage = {
                    type: "observation",
                    observation: observation,
                };

                messages.push({
                    role: "user",
                    parts: [{ text: JSON.stringify(observationMessage) }],
                });
            }
        } catch (error) {
            console.log("Something went wrong:", error.message);
        }
    }
}
