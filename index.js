(async () => {
    var color = require("./colors.js")
        , fs = require('fs');
    var clientid = "996069918984376450"
    const https = require('https');
    const Discord = require('discord-rpc')
    const rpc = new Discord.Client({ transport: 'ipc' });
    const path = './player.json'
    var rank,
        rr,
        rankpng,
        lastgame,
        user,
        tag

    rawdata = fs.readFileSync(path, 'utf-8');
    data = JSON.parse(rawdata);
    user = data.user
    tag = data.tag
    region = data.region

    if (user == "user") console.log(color.Cyan("\n\nOops, it seems like you forgot to put your user at player.json"));
    if (tag == "tag") console.log(color.Cyan("\n\nOops, it seems like you forgot to put your tag at player.json"));
    if (region == "region") console.log(color.Cyan("\n\nOops, it seems like you forgot to put your region at player.json"));

    if (tag == "user" || tag == "tag" || region == "region") process.exit();


    console.log(
        color.Cyan(
            " - MADE BY Archeonic#9832 " + "\n" +
            " - Github : https://github.com/Archxcx/"
        ) + "\n\n"
    )

    Discord.register(clientid);

    rpc.login({ clientId: clientid }).catch(err => console.log(
        color.Red("We have encountered an error. best you can do is" + "\n" +
            "- restart discord" + "\n" +
            "- check your internet connection")
    ))
    rpc.on('ready', async () => {
        console.log(
            color.Cyan(
                "Discord Client logged in as " + rpc.user.username + "#" + rpc.user.discriminator + "\n"
            )
        )
        setActivity();

        setInterval(() => {
            setActivity();
        }, 15000);
    })

    async function setActivity() {
        await getinfo()
        rpc.setActivity({
            details: `${rank}, ${rr}/100 RR`,
            state: `${lastgame}`,
            largeImageKey: `${rankpng}`,
            largeImageText: `Made by Archeonic#9832`,
            instance: false,
            buttons: [{
                label: `${user}#${tag}`,
                url: `https://www.google.com/search?q=how+to+get+good+at+valorant`
            }]
        })
    }

    async function getinfo() {
        rawdata = fs.readFileSync(path, 'utf-8');
        data = JSON.parse(rawdata);
        user = data.user
        tag = data.tag

        let first = new Promise((resolve, reject) => {
            https.get(`https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${user}/${tag}`, (res) => {
                res.setEncoding('utf8');
                res.on('data', function (info) {
                    var json = JSON.parse(info)
                    if (json.status !== 200) {
                        console.log(
                            color.Red(
                                `[ API REQUEST ] `
                            ) +
                            color.Red(
                                `Player ${user}#${tag} does not exist. Terminating app`
                            )
                        )
                        process.exit()
                    }
                    if (json.hasOwnProperty("message")) {
                        if (json.message == "Riot Origin Server down for maintenance")
                            returnvar = true;
                        return;
                    } else {
                        rank = json.data.currenttierpatched
                        rr = json.data.ranking_in_tier
                        if (rank == "radiant") rankpng = "https://images-ext-2.discordapp.net/external/LX8fGzOm8H0RCFi-_gwfIZS9k9yR5k9iuO5GKID5O2k/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Radiant_Rank.png";
                        else if (rank == "Iron 1") rankpng = "https://images-ext-2.discordapp.net/external/F8ye2G1iFUsuAG3if6U2l20Hric08vli9BYEFH5FFu8/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Iron_1_Rank.png";
                        else if (rank == "Iron 2") rankpng = "https://images-ext-2.discordapp.net/external/3DF4QU5SGdsgK-jXolZMCF0TfWjQFTVS1nYIaIC2psY/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Iron_2_Rank.png"
                        else if (rank == "Iron 3") rankpng = "https://images-ext-2.discordapp.net/external/8Zyn0nVngMO50wEIWT6qQBmCHOkTRiKtZjaqZSOY-Uc/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Iron_3_Rank.png"
                        else if (rank == "Bronze 1") rankpng = "https://images-ext-2.discordapp.net/external/mseSjysB0twuwrNx6EvbGbFrVm8KgS-fisK0Ko-VPhg/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Bronze_1_Rank.png";
                        else if (rank == "Bronze 2") rankpng = "https://images-ext-1.discordapp.net/external/YLDuurH8-m_vk3oRsD4EALLtSfOSMWqp_zDIzjYFg1w/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Bronze_2_Rank.png";
                        else if (rank == "Bronze 3") rankpng = "https://images-ext-1.discordapp.net/external/3p0ap7i9bVpVa0j_yxIXI2eoL86LBKyOmJPIy-6dl18/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Bronze_3_Rank.png";
                        else if (rank == "Silver 1") rankpng = "https://images-ext-1.discordapp.net/external/EGa69-bMPmJvctRcKUHay-7m8KWFasw75dhbF8WxTRw/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Silver_1_Rank.png";
                        else if (rank == "Silver 2") rankpng = "https://images-ext-2.discordapp.net/external/xQhjTMAXWlbVfMH7ITnhs-oyEwUQVYxNkWG4QyJAd9M/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Silver_2_Rank.png";
                        else if (rank == "Silver 3") rankpng = "https://images-ext-2.discordapp.net/external/d555tq1hv5joctiDt_vZBGesBGxhOKy8PI7FCQyxFg8/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Silver_3_Rank.png";
                        else if (rank == "Gold 1") rankpng = "https://images-ext-2.discordapp.net/external/EbY7c3MAeUab12y4lJBYgHldpfWfHt60YNZwzySMpoU/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Gold_1_Rank.png";
                        else if (rank == "Gold 2") rankpng = "https://images-ext-2.discordapp.net/external/5PW1qtV5gusrSgWKux_urRbyhRj0TzTs-Lc4C2NQpJ4/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Gold_2_Rank.png";
                        else if (rank == "Gold 3") rankpng = "https://images-ext-2.discordapp.net/external/V46Xab6h1Tci-AM7wAWDWcZJr7Kz4ZZe8wOp52SmA54/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Gold_3_Rank.png";
                        else if (rank == "Platinum 1") rankpng = "https://images-ext-1.discordapp.net/external/B1wJYyLn6u856FornOYR3fcqlMa6Ro_szpSKbjsXjoo/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Platinum_1_Rank.png";
                        else if (rank == "Platinum 2") rankpng = "https://images-ext-2.discordapp.net/external/olApSC-ZS_AInlN2kjXBlnDZSKSgfR7SxhQw5J8RuNY/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Platinum_2_Rank.png";
                        else if (rank == "Platinum 3") rankpng = "https://images-ext-1.discordapp.net/external/L9wf-YnpI2EYriSO2UiBOz_QhTYIqKTrtpNP-FlOC9s/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Platinum_3_Rank.png";
                        else if (rank == "Diamond 1") rankpng = "https://images-ext-2.discordapp.net/external/UAsw-vgxwKd3d8-PiTJs3hRc3M0Ho_lo5LPOVjaHJo4/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Diamond_1_Rank.png";
                        else if (rank == "Diamond 2") rankpng = "https://images-ext-1.discordapp.net/external/VvKUQDPmQWN4uw8byBiiEOhDLIeHSpp_guQHtFIRULY/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Diamond_2_Rank.png";
                        else if (rank == "Diamond 3") rankpng = "https://images-ext-2.discordapp.net/external/nvKFQDAxLpu5LdCZaofvu2Slu2gAmN4rpP8snY2ZLAk/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Diamond_3_Rank.png";
                        else if (rank == "Ascendant 1") rankpng = "https://images-ext-2.discordapp.net/external/6F0wMhX8HbkXkET3EN8J7NGSQonNhJLxU4rBRMETqG4/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Ascendant_1_Rank.png";
                        else if (rank == "Ascendant 2") rankpng = "https://images-ext-1.discordapp.net/external/Gr4umnAb9xBkXaSt8JpAmNnTH-s2UvyKeBJCAJ9ANjI/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Ascendant_2_Rank.png";
                        else if (rank == "Ascendant 3") rankpng = "https://images-ext-2.discordapp.net/external/Ixj6Ph2hYTv8qPQ1Wnsmju6HHtEyBgC_kbSPkY83pEU/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Ascendant_3_Rank.png";
                        else if (rank == "Immortal 1") rankpng = "https://images-ext-2.discordapp.net/external/SvHBhYfXuYuzMFKTpghCpHmub0mydDEBK2nezwwHO68/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Immortal_1_Rank.png";
                        else if (rank == "Immortal 2") rankpng = "https://images-ext-2.discordapp.net/external/jHx7iFM7l0Vqk_iuPHXDMvbygNATq4Bo0Q5ZnM36frk/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Immortal_2_Rank.png";
                        else if (rank == "Immortal 3") rankpng = "https://images-ext-2.discordapp.net/external/yZ5hFEa1YvW8wdKmhoNuz57RVPp4FCme8a7K46GLY8A/%3Fraw%3Dtrue/https/github.com/Archxcx/Valorant-Shenanigans/blob/main/Rank%2520Images/Immortal_3_Rank.png";
                    }
                });
            });
            resolve()
        })

        let second = new Promise((resolve, reject) => {
            https.get(`https://api.henrikdev.xyz/valorant/v3/matches/${region}/${user}/${tag}?`, function (res) {
                var collecteddata = '';
                res.on("data", function (data) {
                    collecteddata += data;
                });
                res.on("end", function () {
                    var json = JSON.parse(collecteddata);
                    if (json.status !== 200) {
                        console.log(
                            color.Red(
                                `[ API REQUEST ] `
                            ) +
                            color.Red(
                                `Player ${user}#${tag} does not exist. Terminating app`
                            )
                        )
                        process.exit()
                    }
                    if (json.hasOwnProperty("message")) {
                        if (json.message == "Riot Origin Server down for maintenance")
                            returnvar = true;
                        return;
                    } else {
                        var time = json.data[0].metadata.game_start_patched
                        var duration = json.data[0].metadata.game_length
                        time = new Date(time)
                        time = new Date() - time
                        time = Math.round((time / 1000) - (21600 + (duration / 1000)));
                        var seconds = Math.floor((time) % 60),
                            minutes = Math.floor((time / 60) % 60),
                            hours = Math.floor((time / (60 * 60)) % 24);
                        if (hours) lastgame = `last match was ${hours} hours and ${minutes} minutes ago`;
                        else if (minutes) lastgame = `last match was ${minutes} minutes ago`;
                        else lastgame = `last match was ${seconds} seconds ago`;
                        resolve()
                    }
                })

            });
        });
        console.log(
            color.Red(
                `[ API REQUEST ] `
            ) +
            color.Cyan(
                `Fetching player data of ${user}#${tag}`
            )
        )
        await Promise.all([first, second])
        console.log(
            color.Red(
                `[ API REQUEST ] `
            ) +
            color.Green(
                `Fetching player data of ${user}#${tag} Successful`
            )
        )
    }

})();