var Discord = require("discord.js");
var bot = new Discord.Client();
const ascii = require("ascii-art");
const moment = require("moment");
const fs = require("fs");
const ms = require("ms");
//const coins = require("./coins.json");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
//let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
//let userData = JSON.parse(fs.readFileSync('Storage/userData.json', `utf8`));
//let suggestChannel = JSON.parse(fs.readFileSync('Storage/suggestChannel.json', 'utf8'));

bot.on('ready', () => {
    console.log(`The bot has been turned on! His name is ${bot.user.tag}. Prefix: "bc!". I jest na ${bot.guilds.size} serwerach!`);
    bot.user.setStatus(`dnd`);
    bot.user.setActivity(`Commands will be available soon`, {type: "PLAYING"});
});

bot.on("message", async message => {

    if(message.author.bot) return;
  
    let prefixy = JSON.parse(fs.readFileSync("./prefixy.json", "utf8"));

    if(!prefixy[message.guild.id]){
        prefixy[message.guild.id] = {
            prefixy: konfiguracja.prefix
        };
    }

    let kanalyPropozycji = JSON.parse(fs.readFileSync("./suggestChannels.json", "utf8"));

    if(!kanalyPropozycji[message.guild.id]){
        kanalyPropozycji[message.guild.id] = {
            kanalyPropozycji: konfiguracja.defaultSuggestChannel
        };
    }

    let kanalPropozycji = kanalyPropozycji[message.guild.id].kanalyPropozycji;

    //let prefix = prefixy[message.guild.id].prefixy;
    let prefix = "sdlklwdls,dlwldlw";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let msg = message.content.startsWith;
    let args = messageArray.slice(1);

    if(cmd === `${prefix}statsrefresh`){
        message.channel.send(`Ilość użytkowników oraz botów została zaaktualizowana na kanałach <#479293103547613187> i <#479293028746395650>.`);
        bot.channels.get("479293028746395650").setName(`Użytkownicy: ${message.guild.memberCount}`);
        bot.channels.get("479293103547613187").setName(`Botów: ${message.guild.members.filter(m => m.user.bot).size}`);
    }

    if(cmd === `${prefix}say`){
        //message.delete();
        if (!message.member.roles.find(r => r.id === "457105125886918667")) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Dostęp zablokowany! Nie posiadasz wymaganych uprawnień, tylko członek administracji o stanowisku ` + "`🔑Młodszy Moderator` (lub wyższa) może użyć tej komendy.");
        //if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie posiadasz wymaganych uprawnień, musisz mieć rangę `JRMODERATOR`.");
        if (args[0].includes('@everyone')) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Przepraszam bardzo, w tym celu bota nie użyjesz!`);
        if (args[0].includes('@here')) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Przepraszam bardzo, w tym celu bota nie użyjesz!`);
        let sayMessage = args.join(" ");
        message.delete();
        message.channel.send(sayMessage);
    }

    if(cmd === `<@646073962941644832>`){
        message.channel.send("No i co go pingujesz? Bana chcesz =)?");
        //let cmdlogs = message.guild.channels.find(`id`, "471972734851612672");
        //cmdlogs.send(`${bot.emojis.find(`name`, 'alert')} The **${message.author.tag}**(**${message.author.id}**) user has mention the bot on the **${message.guild.name}**(**${message.guild.id}**) server.`);
    }

    if(cmd === `${prefix}profile` || cmd === `${prefix}userinfo`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let aUser = message.mentions.users.first() || message.author;
        const userinfo = new Discord.RichEmbed()
        .setColor("FFA07A")
        .setAuthor(`Profil ${aUser.username}`, `https://cdn.discordapp.com/emojis/472480341299298304.png?v=1`)
        .setThumbnail(aUser.displayAvatarURL)
        .addField("ID:", `${aUser.id}`)
        .addField("Pseudonim:", `${aUser.nickname ? aUser.nickname : "None"}`)
        .addField("Konto utworzone:", `${moment.utc(aUser.createdAt).format('dd, Do MM YYYY')}`)
        .addField("Dołączył(a) do serwera:", `${moment.utc(aUser.joinedAt).format('dd, Do MM YYYY')}`)
        .addField("Czy jest botem:", `${aUser.bot}`)
        .addField("Status:", `${aUser.presence.status.replace("dnd", "Niedostępny")}`)
        .addField("Aktualna gra:", `${aUser.presence.game ? aUser.presence.game.name : 'Brak'}`)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Użyto przez ${message.author.tag}.`)
        message.channel.send(userinfo);
    }

    if(cmd === `${prefix}server` || cmd === `${prefix}serverinfo`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);

        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setColor("FFA07A")
        .setAuthor(`${message.guild.name}`, `https://cdn.discordapp.com/emojis/473897310414176266.png?v=1`)
        .setThumbnail(sicon)
        //.addField("Name:", message.guild.name)
        .addField("Serwer utworzony:", `${moment.utc(message.guild.createdAt).format('dd, Do MM YYYY')}`)
        .addField("Dołączyłeś(aś):",`${moment.utc(message.author.joinedAt).format('dd, Do MM YYYY')}`)
        .addField("Liczba użytkoników:", message.guild.memberCount)
        .addField("Region:", `${message.guild.region.replace("eu-central", ":flag_eu: EU Central")}`)
        .addField("Kanały tekstowe:", message.guild.channels.findAll("type", "text").length)
        .addField("Kanały głosowe:", message.guild.channels.findAll("type", "voice").length)
        .addField("Liczba ról:", `${message.guild.roles.size}`)
        .addField("Emotki:", message.guild.emojis.size)
        .addField("Założyciel(ka):", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Użyto przez ${message.author.tag}.`);
    
        message.channel.send(serverembed);
    }

    if(cmd === `${prefix}eval`){
        //if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(message.author.id !== '396284197389729793') return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie masz uprawnień do tej komendy, wymagana ranga: `Założyciel(ka)`.")
        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'error')}` + " Proszę, abyś podał(a) kod, który chcesz evalować. Bez niego nie da rady ;(.")
        let result = eval(args.join(" ")).toString()
          let embed = new Discord.RichEmbed()
          //.setTitle("Eval")
          .addField(`:inbox_tray: INPUT`, "```"+args.join(" ")+"```")
          .addField(`:outbox_tray: OUTPUT`, "```"+result+"```")
          .setColor("RANDOM")
          .setFooter(`Użyto przez ${message.author.tag}`)
          message.channel.send(embed);
    }

    if(message.author.id === "396284197389729793"){
        if(cmd === `${prefix}botsetname`){
          let nowaNazwa = args.join(" ");
          bot.user.setUsername(nowaNazwa);
          console.log(`Nick został zmieniony.`);
          message.channel.send(`Nazwa bota została zmieniona na: **${nowaNazwa}**.`);
        }
        //let cmdlogs = message.guild.channels.find(`id`, "471972734851612672");
        //cmdlogs.send(`${bot.emojis.find(`name`, 'alert')} The **${message.author.tag}**(**${message.author.id}**) user has used the **botsetname** command on the **${message.guild.name}**(**${message.guild.id}**) server.`);
    }

    if(message.author.id === "396284197389729793"){
        if(cmd === `${prefix}botsetavatar`){
          let nowyAvatar = args.join(" ");
          bot.user.setAvatar(nowyAvatar);
          console.log(`Avatar został zmieniony.`);
          message.channel.send(`Avatar bota został zmieniony na: **${nowyAvatar}**.`);
        }
        //let cmdlogs = message.guild.channels.find(`id`, "471972734851612672");
        //cmdlogs.send(`${bot.emojis.find(`name`, 'alert')} The **${message.author.tag}**(**${message.author.id}**) user has used the **botsetavatar** command on the **${message.guild.name}**(**${message.guild.id}**) server.`);
    }

    if(cmd === `${prefix}help`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        const helpmsg = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('BLACKMC')
        .setDescription("Komendy naszego serwerowego bota:")
        .addField('Podstawowe (0):', '`Brak komend w tej kategorii.`')
        .addField('Zabawa (0):', '`Brak komend w tej kategorii.`')
        .addField('Administracyjne (0):', '`Brak komend w tej kategorii.`')
        .addField('Zdjęcia (0):', '`Brak komend w tej kategorii.`')
        .addField('Informacje (0):', '`Brak komend w tej kategorii.`')
        .addField('Inne (0):', '`Brak komend w tej kategorii.`')
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Użyto przez ${message.author.tag}.`)
        message.channel.send(helpmsg);
    }

    if(cmd === `${prefix}news`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let newsEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Najnowsze Info')
        .setDescription(`-`)
        .setFooter('-')
        message.channel.send(newsEmbed);
    }

    if(cmd === `${prefix}ban`){
        if (!message.member.roles.find(r => r.id === "456851627740102657")) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Dostęp zablokowany! Nie posiadasz wymaganych uprawnień, tylko członek administracji o stanowisku ` + "`🔓Moderator` (lub wyższa) może użyć tej komendy.");
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send(":x: Musisz oznaczyć poprawnego uzytkownika!");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie posiadasz wymaganych uprawnień, musisz mieć rangę `MODERATOR`.");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":lock: Ten użytkownik nie może zostać zbanowany!");
        if(!args[0]) return message.channel.send(`Nie podałeś powodu bana? Lub użytkownika? Więc bana nie ma :grinning:.`);
    
        const banEmbed = new Discord.RichEmbed()
        //.setDescription("WARN")
        //.setAuthor(`[BAN] ${bUser.tag}`, bUser.displayAvatarURL)
        .setColor("#9b0090")
        //.addField("Warned user:", `${wUser}`)
        .addField("Zbanowany(a):", bUser)
        .addField("Kanał:", message.channel)
        //.addField("O godzinie", moment(message.createdAt).format("YYYY.MM.DD, HH:mm:ss"))
        .addField("Moderator:", message.author.tag)
        .addField("Powód:", bReason)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Zbanowany(a) na ${message.guild.name}.`)
    
        let banChannel = message.guild.channels.find(`name`, "➕-bany");
        if(!banChannel) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} The '**modlogs**' channel does not exist, but the **${bUser}** user got the ban anyway!`);

        message.channel.send(`${bot.emojis.find(`name`, 'success')} Użytkownik ${bUser} został zbanowany za ${bReason}.`)
        message.guild.member(bUser).ban(bReason);
        banChannel.send(banEmbed);
    
        //let logiKomend = bot.channels.get("458569305341296641");
        //logiKomend.send(`Użytkownik: **${message.author.tag}** (**${message.author.id}**) \nUżył komendy **ban** na serwerze **${message.guild.name}**, zbanował **${bUser}** za **${bReason}**.`);
        return;
    }

    if(cmd === `${prefix}serverlist9929319238109310901931039010930190391903`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        const guildArray = bot.guilds.map((guild) => {
          return `${guild.name}`
        })
      
        let embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("A full list of servers on which the bot is:", guildArray.join(", "))
        .setFooter(`There are ${bot.guilds.size} servers in total.`, 'https://cdn.discordapp.com/emojis/472688143389425665.png?v=1')
        
        message.channel.send(embed);
      
    }

    //if(cmd === `${prefix}permissions`){
        //let myRole = message.guild.roles.find("name", "Moderators");
        //let wlascicielRole = message.guild.roles.find("name", "👑Właściciele");
        //let stAdminRole = message.guild.roles.find("name", "🔐St. Administrator");
        //let adminRole = message.guild.roles.find("name", "🔏Administrator");
        //let mlAdminRole = message.guild.roles.find("name", "🔒Młodszy Admin");
        //let modRole = message.guild.roles.find("name", "🔓Moderator");
        //let mlModRole = message.guild.roles.find("name", "🔑Młodszy Moderator");
        //let helperRole = message.guild.roles.find("name", "🔎Pomocnik(Helper)");
        //if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        //if(message.member.roles.has(wlascicielRole.id)) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Owww! Jesteś w administracji, twoja posada to: `Właściciel`.");
        //if(message.member.roles.has(stAdminRole.id)) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Owww! Jesteś w administracji, twoja posada to: `Starszy Administrator`.");
        //if(message.member.roles.has(adminRole.id)) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Owww! Jesteś w administracji, twoja posada to: `Administrator`.");
        //if(message.member.roles.has(mlAdminRole.id)) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Owww! Jesteś w administracji, twoja posada to: `Młodszy Administrator`.");
        //if(message.member.roles.has(modRole.id)) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Owww! Jesteś w administracji, twoja posada to: `Moderator`.");
        //if(message.member.roles.has(mlModRole.id)) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Owww! Jesteś w administracji, twoja posada to: `Młodszy Moderator`.");
        
        //message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Twój poziom uprawnień na serwerze to: `Ciastko - Cookie Community`.");
    ///}
    
    if(cmd === `${prefix}upr`){
        if (message.member.roles.find(r => r.id === "455426439433551883")) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Owww! Jesteś w administracji, twoja posada to: `Właściciel`.");
        if (message.member.roles.find(r => r.id === "455430899861815296")) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Owww! Jesteś w administracji, twoja posada to: `Starszy Administrator`.");
        if (message.member.roles.find(r => r.id === "456851721570746370")) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Owww! Jesteś w administracji, twoja posada to: `Administrator`.");
        if (message.member.roles.find(r => r.id === "456851799861624835")) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Owww! Jesteś w administracji, twoja posada to: `Młodszy Administrator`.");
        if (message.member.roles.find(r => r.id === "456851627740102657")) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Owww! Jesteś w administracji, twoja posada to: `Moderator`.");
        if (message.member.roles.find(r => r.id === "457105125886918667")) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Owww! Jesteś w administracji, twoja posada to: `Młodszy Moderator`.");
        
        if (message.member.roles.find(r => r.id === "456849366515187742")) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Twój poziom uprawnień na serwerze to: `Ciastko - Cookie Community`.");
        if (message.member.roles.find(r => r.id === "454946768723902476")) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Wygląda na to, że nie posiadasz żadnej roli. Zgłoś się jak najszybciej do administratora.`)
    }

    if(cmd === `${prefix}removerole`){
        if (!message.member.roles.find(r => r.id === "456851721570746370")) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Dostęp zablokowany! Nie posiadasz wymaganych uprawnień, tylko członek administracji o stanowisku ` + "`🔏Administrator` (lub wyższa) może użyć tej komendy.");
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        //if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " You do not have sufficient permissions. You must have `MANAGE_MEMBERS` permissions.");
        let rMember = message.guild.member(message.mentions.users.first()) ||  message.guild.members.get(args[0]);
        if(!rMember) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Podaj poprawnego użytkownika!`);
        let role = args.join(" ").slice(22);
        if(!role) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Musisz podać role, nie może to być oznaka roli.`);
        let gRole = message.guild.roles.find(`name`, role);
        if(!gRole) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Nie odnaleziono roli o tej nazwie, czy ona istnieje?`);

        if(!rMember.roles.has(gRole.id)) return message.reply('On nie ma tej roli.');
        await(rMember.removeRole(gRole.id));

        try{
            await rMember.send(`${bot.emojis.find(`name`, 'alert')} Straciłeś(aś) rolę **${gRole.name}** na serwerze **${message.guild.name}**!`)
            await message.channel.send(`${bot.emojis.find(`name`, 'success')} Ok, rola **${gRole.name}** została usunięta dla **<@${rMember.id}>**!`);
        }catch(error){
            console.log(error);
        }
    }

    if(cmd === `${prefix}addrole`){
        if (!message.member.roles.find(r => r.id === "456851721570746370")) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Dostęp zablokowany! Nie posiadasz wymaganych uprawnień, tylko członek administracji o stanowisku ` + "`🔏Administrator` (lub wyższa) może użyć tej komendy.");
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " You do not have sufficient permissions. You must have `MANAGE_MEMBERS` permissions.");
        let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!rMember) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Musisz podać poprawnego użytkownika!`);
        let role = args.join(" ").slice(22);
        //if(!args[1]) return message.channel.send(`${bot.emojis.find(`name`, 'error')} You must provide a role (give its name, it can not be a mention)`);
        let gRole = message.guild.roles.find(`name`, role);
        if(!gRole) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Rola, którą wybrałeś(aś) nie istnieje, pamiętaj o tym, że musisz ją podać bez oznaczenia.`);

        if(rMember.roles.has(gRole.id)) return;
        await(rMember.addRole(gRole.id));

        try{
            rMember.send(`${bot.emojis.find(`name`, 'alert')} Hej! Otrzymałeś(aś) rolę **${gRole.name}** na serwerze **${message.guild.name}**!`)
            message.channel.send(`${bot.emojis.find(`name`, 'success')} Rola o nazwie **${gRole.name}** została nadana dla użytkownika **<@${rMember.id}>**!`)
        }catch(error){
            console.log(error);
        }
    }


    if(cmd === `${prefix}info`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        const infoembed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('Bot username:', `${bot.user.tag}`)
        .addField('Creator:', 'xCookieTM#9613')
        .addField('Library:', 'discord.js')
    }

    if(cmd === `${prefix}avatar`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let aUser = message.mentions.users.first() || message.author || message.user.id;
        let avEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        //.setDescription(`Avatar ${aUser.username}:`)
        //.setThumbnail(aUser.displayAvatarURL)
        .setDescription(`${bot.emojis.find(`name`, 'user')} Avatar ${aUser.username}:`)
        .setImage(aUser.displayAvatarURL)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Użyto przez ${message.author.tag}.`);
        message.channel.send(avEmbed);
        return;
    }

    if(cmd === `${prefix}hug`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let aUser = message.mentions.users.first() || message.author || message.user.id;
        let huglinks = ["https://media.giphy.com/media/l0HlOvJ7yaacpuSas/giphy.gif", "https://media.giphy.com/media/xT39CXg70nNS0MFNLy/giphy.gif", "https://media.giphy.com/media/143v0Z4767T15e/giphy.gif", "https://media.giphy.com/media/BVRoqYseaRdn2/giphy.gif", "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif"];
        let math = Math.floor((Math.random() * huglinks.length));
        let hugEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${bot.emojis.find(`name`, 'like1')} Użytkownik ${message.author.tag} przytulił(a) ${aUser.tag}.`)
        .setImage(huglinks[math])

        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Kogo chcesz przytulić?`);
        message.channel.send(hugEmbed);
    }

    if(cmd === `${prefix}kiss`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let aUser = message.mentions.users.first() || message.author || message.user.id;
        let kisslinks = ["https://media.giphy.com/media/4dCj46k0Qtyxy/giphy.gif", "https://media.giphy.com/media/bCY7hoYdXmD4c/giphy.gif", "https://media.giphy.com/media/zkppEMFvRX5FC/giphy.gif", "https://media.giphy.com/media/5GdhgaBpA3oCA/giphy.gif", "https://media.giphy.com/media/hnNyVPIXgLdle/giphy.gif", "https://media.giphy.com/media/Ka2NAhphLdqXC/giphy.gif", "https://media.giphy.com/media/QGc8RgRvMonFm/giphy.gif"];
        let math = Math.floor((Math.random() * kisslinks.length));
        let kissEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${bot.emojis.find(`name`, 'like1')} Użytkownik ${message.author.tag} pocałował(a) ${aUser.tag}.`)
        .setImage(kisslinks[math])

        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Kogo chcesz pocałować?`);
        if(args[0] == `<@${message.author.id}>`) return message.channel.send('Samego siebie nie pocałujesz!')
        message.channel.send(kissEmbed);
    }

    if(cmd === `${prefix}pat`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let aUser = message.mentions.users.first() || message.author || message.user.id;
        let patlinks = ["https://media.giphy.com/media/ye7OTQgwmVuVy/giphy.gif", "https://media.giphy.com/media/L2z7dnOduqEow/giphy.gif", "https://media.giphy.com/media/109ltuoSQT212w/giphy.gif", "https://media.giphy.com/media/osYdfUptPqV0s/giphy.gif", "https://media.giphy.com/media/osYdfUptPqV0s/giphy.gif", "https://media.giphy.com/media/SvQ7tWn8zeY2k/giphy.gif"];
        let math = Math.floor((Math.random() * patlinks.length));
        let patEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${bot.emojis.find(`name`, 'like1')} Użytkownik ${message.author.tag} pogłaskał(a) ${aUser.tag}.`)
        .setImage(patlinks[math])
        
        let patEmbedd = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${bot.emojis.find(`name`, 'like1')} Użytkownik ${message.author.tag} pogłaskał(a) samego siebie!`)
        .setImage(patlinks[math])

        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Kogo chcesz pogłaskać?`);
        if(args[0] == `<@${message.author.id}>`) return message.channel.send(patEmbedd)
        message.channel.send(patEmbed);
    }

    if(cmd === `${prefix}survey` || cmd === `${prefix}vote`){
        if (!message.member.roles.find(r => r.id === "456851799861624835")) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Dostęp zablokowany! Nie posiadasz wymaganych uprawnień, tylko członek administracji o stanowisku ` + "`🔒Młodszy Admin` (lub wyższa) może użyć tej komendy.");
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":lock: You do not have sufficient permissions to create a survey.");
        const ankietaMessage = args.join(" ");
        //let ankieta = await message.channel.send(ankietaEmbed);
        let ankietaEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`NOWA ANKIETA`, `https://cdn.discordapp.com/emojis/472694503229358080.png?v=1`)
        .setDescription(ankietaMessage)
        .setFooter(`Ankieta stworzona przez ${message.author.tag}`);
    
        let ankieta = await message.channel.send(ankietaEmbed);
        ankieta.react(bot.emojis.find(`name`, 'success'));
        ankieta.react(bot.emojis.find(`name`, 'error'));
        message.delete();
        return;
    }

    if(cmd === `${prefix}reverse`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Musisz podać tekst!`);
        if (args[0].includes('enoyreve@')) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Nie użyjesz do tego bota, lol.`);
        if (args[0].includes('ereh@')) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Nie użyjesz do tego bota, lol.`);
    
        function reverseString(str) {
            return str.split("").reverse().join("");
        }
        let sreverse = reverseString(args.join(' '))
        //if(sreverse === '@here' || sreverse === '@everyone' || sreverse === `https://discord.gg/${invite.code}`) return message.channel.send("Nie możesz tego odwrócić!")
        if(args[0] === sreverse) {
        sreverse = `${args.join(' ')} [wyszło na to samo ;(]`
        }
        message.channel.send(`${bot.emojis.find(`name`, 'repeat')} Odwrócony tekst: **${sreverse}**`);
    }

    if(cmd === `${prefix}cat`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let catlinks = ["https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif", "https://media.giphy.com/media/l1J3pT7PfLgSRMnFC/giphy.gif", "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif", "https://media.giphy.com/media/6uMqzcbWRhoT6/giphy.gif", "https://media.giphy.com/media/nNxT5qXR02FOM/giphy.gif", "https://media.giphy.com/media/11s7Ke7jcNxCHS/giphy.gif", "https://media.giphy.com/media/Nm8ZPAGOwZUQM/giphy.gif", "https://media.giphy.com/media/Q56ZI04r6CakM/giphy.gif"];
        let math = Math.floor((Math.random() * catlinks.length));
        let catEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField(`${bot.emojis.find(`name`, 'cat')} Randomowy kot`, `Tutaj jest jeden z moich kotów:`)
        .setImage(catlinks[math])
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | ${message.author.tag}`);
    
        message.channel.send(catEmbed);
    }

    if(cmd === `${prefix}wheel`){
        let arrows = [":arrow_up:", ":arrow_down:", ":arrow_left:", ":arrow_down:"]
        let math = Math.floor((Math.random() * arrows.length));
        const embed = new Discord.RichEmbed()
        .setDescription(`:cookie:    :banana:     :peach:\n \n:ice_cream:    ${arrows[math]}   :tomato:\n \n:tangerine:     :cherries:     :grapes:`)
        message.channel.send(embed);
    }

    if(cmd === `${prefix}8ball`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        //if(!args[2]) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Please, give me the full question!`);
        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Ahh... You did not give a question, can I know why?`);
        let replies = ["Tak, oczywiście", "Przepraszam, nie", "Skąd mam to wiedzieć?", "Możesz zapytać później?", "Hmm... Nie."];
    
        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice(0).join(" ");
    
        let ballembed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
        .setColor("RANDOM")
        .setDescription(question)
        //.addField("Pytanie", question)
        .addField("Odpowiedź:", replies[result])
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | ${message.author.tag}`);
    
        message.channel.send(ballembed);
        return;
    }

    if(cmd === `${prefix}choose`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        var odp = Math.floor(Math.random() *2) + 1
        var a = args.join(" ").split(";")[0]
        var b = args.join(" ").split(";")[1]
        var odp2
        switch(odp) {
          case 1:
          odp2 = a;
          break;
      
          case 2:
          odp2 = b;
        }
        let messagechoose = await message.channel.send(`${bot.emojis.find(`name`, 'thinke')} Myślę...`)
        messagechoose.edit(`${bot.emojis.find(`name`, 'chat')} Wybieram: **${odp2}**`)
    }

    if(cmd === `${prefix}clear`){
        if (!message.member.roles.find(r => r.id === "456851627740102657")) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Dostęp zablokowany! Nie posiadasz wymaganych uprawnień, tylko członek administracji o stanowisku ` + "`🔓Moderator` (lub wyższa) może użyć tej komendy.");
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " You do not have sufficient permissions. You must have `MANAGE_MESSAGES` permissions, check them using `cb!permissions`.");
    
        let messagecount = parseInt(args.join(' '));
        message.channel.fetchMessages({
          limit: messagecount
        }).then(messages => message.channel.bulkDelete(messages));
        let purgeSuccessMessage = await message.channel.send(`${bot.emojis.find(`name`, 'success')} Okej! Wyczyściłem **${messagecount}** wiadomości na tym kanale!`);
        purgeSuccessMessage.delete(10000);
    }

    if(cmd === `${prefix}ping`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        const m = await message.channel.send("Ping :ping_pong: ");
        m.edit(`:ping_pong: Pong! ${m.createdTimestamp - message.createdTimestamp}ms. API is ${Math.round(bot.ping)}ms`);
    }

    if(cmd === `${prefix}setprefix`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " You do not have sufficient permissions. You must have `MANAGE_SERVER` permissions.");
        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'error')} An error occurred, apparently you did not enter a value. Use **${prefix}help setprefix** for help.`);

        let prefixy = JSON.parse(fs.readFileSync("./prefixy.json", "utf8"));

        prefixy[message.guild.id] = {
            prefixy: args[0]
        }

        fs.writeFile("./prefixy.json", JSON.stringify(prefixy), (err) => {
            if (err) console.error(err);
        });

        let sEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle('Zapisano!')
        .setDescription(`Prefix dla serwera został zmieniony na: ${args[0]}`)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Zmieniono przez ${message.author.tag}.`)

        message.channel.send(sEmbed);
    }

    if(cmd === `${prefix}setSuggestChannel`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " You do not have sufficient permissions. You must have `MANAGE_SERVER` permissions.");
        if(!args[0]) return message.channel.send(`Nie podałeś(aś) wartości do ustawienia?`);

        let sChannelName = message.guild.channels.find(`name`, args.join(" "));
        if(!sChannelName) return message.channel.send(`Podany kanał nie istnieje!`);

        let kanalyPropozycji = JSON.parse(fs.readFileSync("./suggestChannels.json", "utf8"));

        kanalyPropozycji[message.guild.id] = {
            kanalyPropozycji: args[0]
        }

        fs.writeFile("./suggestChannels.json", JSON.stringify(kanalyPropozycji), (err) => {
            if (err) console.error(err);
        });

        message.channel.send(`Kanal sugestii został ustawiony na: **${args[0]}**!`);
    }

    if(cmd === `${prefix}settings`){
        if(!args[0]) return message.channel.send("```List of settings for the server: \n[1] prefix \n[2] suggestChannel```" + `If you want to set, enter ` + "`" + `${prefix}settings <->` + "`.")
    }

    if(cmd === `${prefix}propozycja`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let suggestContent = args.join(" ");
        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Czy chcesz coś zaproponować? Jeśli tak to podaj treść propozycji!`)
        const suggestEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(suggestContent)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Suggestia napisana przez ${message.author.tag}.`);
        message.guild.channels.find(`name`, `${kanalPropozycji}`).send(suggestEmbed);
        message.channel.send(`Propozycja została wysłana poprawnie!`)
    }

    if(message.author.id === "396284197389729793"){
        if(cmd === `${prefix}rich`){
          //if(message.author.id !== "396284197389729as93") return message.channel.send("Nie tego!");
        let stream = args.slice(1).join(" ");
        let game = args.slice(1).join(" ");
        let listen = args.slice(1).join(" ");
        let watch = args.slice(1).join(" ");
        let reset = args.slice(1).join(" ");
          if(!args[0]) return message.channel.send(':x: You must provide a value! Correct use: `cb!rich <game/stream/watch/listen> <text>`');
          if(args[0] == 'game') return bot.user.setActivity(game),  message.channel.send(`${bot.emojis.find(`name`, 'alert')} Bot started playing in **${game}**.`);
            //message.channel.send(`:wink: Bot zaczął grać w **${game}**.`);
        //let stream = args.slice(1).join(" ");
          if(args[0] == 'stream') return bot.user.setGame(`${stream}`, 'https://twitch.tv/xcookietm'), message.channel.send(`${bot.emojis.find(`name`, 'alert')} Bot started broadcasting live **${stream}**.`);
            //message.channel.send(`:wink: Bot zaczął nadawać na żywo **${stream}**.`);
          if(args[0] == 'listen') return bot.user.setActivity(`${listen}`, {type: 'LISTENING'}), message.channel.send(`${bot.emojis.find(`name`, 'alert')} Bot started to listen **${listen}**.`);
          if(args[0] == 'watch') return bot.user.setActivity(`${watch}`, {type: 'WATCHING'}), message.channel.send(`${bot.emojis.find(`name`, 'alert')} Bot began to watch **${watch}**.`);
          if(args[0] == 'reset') return bot.user.setActivity(`${reset}`), message.channel.send(`${bot.emojis.find(`name`, 'alert')} The status of the bot has been reset.`);
          if(args[0] == 'servers') return bot.user.setActivity(`${bot.guilds.size} servers`), message.channel.send(`${bot.emojis.find(`name`, 'alert')} The status of the bot has been set to the number of servers.`);
        }
    }

    if(cmd === `${prefix}ticket`){
        let everyone = message.guild.roles.find(`name`, "@everyone");
        let ticketCreator = message.guild.members.find(`id`, `${message.author.id}`)
        let helpText = args.join(" ");
        let newTicketChannel = await message.guild.createChannel(`request-${message.author.id}`);
        let ticketEmbed = new Discord.RichEmbed()
        .addField('Request for help!', `**CREATED BY:** ${message.author.tag} \n**CONTENT:** ${helpText} \nAfter completing the help, the administration or the user waiting for help should react to the react below.`)
        let tChanelSend = await newTicketChannel.send(ticketEmbed);
        let reactChannel = await tChanelSend.react(bot.emojis.find(`name`, 'success')).then(em => { message.channel.send('lol') });
        newTicketChannel.overwritePermissions(everyone, { SEND_MESSAGES: false, READ_MESSAGES: false });
        newTicketChannel.overwritePermissions(ticketCreator, { SEND_MESSAGES: true, READ_MESSAGES: true })
        message.channel.send(`${bot.emojis.find(`name`, 'success')} Your request for help is ready, wait for a response from the administration on the **${newTicketChannel}** channel`);
        const filter = (reaction, user) => (reaction.emoji.name === '🇦') && user.id === message.author.id
        const collector = tChannelSend.createReactionCollector(filter);
        collector.on('collect', r => {
            if (r.emoji.name === "🇦") {
                message.channel.send('lOl');
            }
        });
    }

    if(cmd === `${prefix}warn`){
        if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " You do not have sufficient permissions. You must have `MANAGE_MEMBERS` permissions.");
        //if (args[0] == `${message.author.bot}`) return;
        if (args[0] == `${message.author}`) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Nie możesz sobie dać warna, no co ty.`)
        let wUser = message.mentions.users.first();
        if (!wUser) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Ten użytkownik istnieje? Wygląda na to, że nie.`);
        const reason = args.join(" ").slice(22);

        if (!warns[wUser.id]) {
            warns[wUser.id] = {
                warns: 0
            };
        }

        warns[wUser.id].warns++;

        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err);
        });

        const warnEmbed = new Discord.RichEmbed()
        //.setDescription("WARN")
        .setAuthor(`[OSTRZEZENIE] ${wUser.tag}`, wUser.displayAvatarURL)
        .setColor("#9b0090")
        //.addField("Warned user:", `${wUser}`)
        .addField("Kanał:", message.channel)
        //.addField("O godzinie", moment(message.createdAt).format("YYYY.MM.DD, HH:mm:ss"))
        .addField("Numer ostrzeżeń:", warns[wUser.id].warns)
        .addField("Moderator:", message.author.tag)
        .addField("Powód:", reason)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Ostrzeżony na ${message.guild.name}.`)

        const warnchannel = message.guild.channels.find("name", "➕-ostrzezenia");
        if (!warnchannel) return message.reply(`${bot.emojis.find(`name`, 'error')} The 'modlogs' channel does not exist! Create it, otherwise I will not give a warning!`);
        warnchannel.send(warnEmbed);

        if (warns[wUser.id].warns === 15) {
            message.guild.member(wUser).ban(reason);
            message.channel.send(`${bot.emojis.find(`name`, 'alert')} Użytkownik ${wUser.tag} został(a) zbanowany(a) za osiągnięcie maksymalnej ilości ostrzeżeń (15).`);
        }

        message.channel.send(`${bot.emojis.find(`name`, 'success')} Użytkownik **${wUser.tag}** został ostrzeżony za **${reason}**!`);

    };

    if(cmd === `${prefix}warns`){
        if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply(`${bot.emojis.find(`name`, 'lock')}` + " You do not have sufficient permissions. You must have `MANAGE_MEMBERS` permissions.");
        let wUser = message.mentions.users.first();
        if (!wUser) return message.reply(`${bot.emojis.find(`name`, 'error')} Is this user exists? Because I can not find him!`);
        const warns = warns[wUser.id].warns;
        let warnsEmbed = new Discord.RichEmbed()
        .addField(`User:`, wUser.tag)
        .addField(`Number of warnings:`, warns)
        message.channel.send(warnsEmbed);
    }
    
    
});

//let everyone = message.guild.roles.find(`name`, "@everyone");
//if(args[0] == 'lock') return message.channel.overwritePermissions(everyone, { SEND_MESSAGES: false, ADD_REACTIONS: false }), message.channel.send(`${bot.emojis.find(`name`, 'success')} Okay, according to your wishes, I blocked this channel! Others can not write here.`);

bot.login(process.env.TOKEN);
