module.exports = function (err, interaction) {
    const embed = {
        timestamp: new Date(),
        title: err.name || "Error",
        color: ctx.resolveColor("#FF0000"),
        description: (err.message || err).encode("js"),
        fields: [
            {
                name: "Local",
                value: `**Guild:**\n\`${interaction?.member?.guild.name || "Nenhum"} | ${interaction?.guildID || "Sem ID"}\``
            },
            {
                name: "Usuário",
                value: `\`${interaction?.member?.user.tag || "Nenhum"} | ${interaction?.member?.id || "Sem ID"}\``
            }
        ],
        footer: {
            text: `Error in: ${nay.user.tag}`,
            icon_url: nay.user.avatarURL
        }
    };

    ctx.hooks.errorLog({ embeds: [embed] });
};