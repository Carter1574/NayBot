const Event = require("../../structures/Event");

module.exports = class GuildDeleteEvent extends Event {
    constructor (nay) {
        super(nay);
    }

    on (guild) {
        this.nay.log.guildLog("delete", guild);
        if (!this.nay.isDev) {
            this.nay.editChannel(this.config.servercountChannel, { name: `🚀❱ Servidores - ${this.nay.guilds.size}` });
            this.nay.editChannel(this.config.membercountChannel, { name: `👥❱ Usuários - ${this.nay.usersCount}` });
        }
        return guild;
    }
};