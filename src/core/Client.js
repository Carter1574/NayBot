const { Client } = require("eris");
const fs = require("fs");

module.exports = class Nay extends Client {
    constructor (token, ClientOptions) {
        super(token, ClientOptions);
        this.instance = ClientOptions.instance;
        this.emojis = require("../../config/emojis.json");
        this.commands = require("../../config/commands.json");
    }

    loadCore () {
        require(`${ctx.mainDir}/src/core/handlers/putCommands.js`)();
        require(`${ctx.mainDir}/src/core/handlers/loadEvents.js`)();

        // eslint-disable-next-line new-cap
        const db = new (require(`${ctx.mainDir}/src/modules/firebase.js`))(ctx.config.firebaseConfig);
        db.connect();
        global.db = db;
    }

    initiate () {
        return new Promise((res, rej) => {
            this.loadUtils();
            this.once("ready", () => res());
            try {
                this.connect();
            } catch (e) {
                rej(new Error("Error on iniciate Client"));
            }
        });
    }

    loadUtils () {
        const files = fs.readdirSync(`${ctx.mainDir}/src/utils/prototypes`);
        for (const file of files) require(`${ctx.mainDir}/src/utils/prototypes/${file}`);

        const files2 = fs.readdirSync(`${ctx.mainDir}/src/utils/functions`);
        for (const file of files2) require(`${ctx.mainDir}/src/utils/functions/${file}`);
    }
};