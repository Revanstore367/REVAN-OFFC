module.exports = async (Ibzz, m, store) => {
  try {
    const body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype === "interactiveResponseMessage"
        ? JSON.parse(
            m.message.interactiveResponseMessage.nativeFlowResponseMessage
              .paramsJson
          ).id
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : "";

    //========== DATABASE ===========//
    const antilink = JSON.parse(
      fs.readFileSync("./all/database/antilink.json")
    );
    const antilink2 = JSON.parse(
      fs.readFileSync("./all/database/antilink2.json")
    );
    const antiuncheck = JSON.parse(
      fs.readFileSync("./all/database/antiuncheck.json")
    );
    const antibokep = JSON.parse(
      fs.readFileSync("./all/database/antibokep.json")
    );
    const contacts = JSON.parse(
      fs.readFileSync("./all/database/contacts.json")
    );
    const premium = JSON.parse(fs.readFileSync("./all/database/premium.json"));
    const owner2 = JSON.parse(fs.readFileSync("./all/database/owner.json"));
    const teksjpm = fs.readFileSync("./list/teksjpm.js").toString();
    const isPremium = premium.includes(m.sender);
    const { jadibot, stopjadibot, listjadibot } = require("./clonebot/jadibot");
    const pler = JSON.parse(
      fs.readFileSync("./all/database/idgrup.json").toString()
    );
    const jangan = m.isGroup ? pler.includes(m.chat) : false;
    const ytdl = require("node-yt-dl");
    //========= CONFIGURASI ==========//
    const budy = typeof m.text == "string" ? m.text : "";
    const isOwner = owner2.includes(m.sender)
      ? true
      : m.sender == owner + "@s.whatsapp.net"
      ? true
      : m.fromMe
      ? true
      : false;
    const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body)
      ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi)
      : isOwner && !m.isBaileys
      ? ""
      : ".";
    const isCmd = body.startsWith(prefix);
    const command = isCmd
      ? body.slice(prefix.length).trim().split(" ").shift().toLowerCase()
      : "";
    const cmd = prefix + command;
    const args = body.trim().split(/ +/).slice(1);
    var crypto = require("crypto");
    let { randomBytes } = require("crypto");
    const makeid = randomBytes(3).toString("hex");
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    const from = m.key.remoteJid;
    const qmsg = quoted.msg || quoted;
    const text = (q = args.join(" "));
    const botNumber = await Ibzz.decodeJid(Ibzz.user.id);
    const isGroup = m.chat.endsWith("@g.us");
    const senderNumber = m.sender.split("@")[0];
    const pushname = m.pushName || `${senderNumber}`;
    const isBot = botNumber.includes(senderNumber);
    const groupMetadata = m.isGroup
      ? await Ibzz.groupMetadata(m.chat).catch((e) => {})
      : {};
    let participant_bot = m.isGroup
      ? groupMetadata?.participants.find((v) => v.id == botNumber)
      : {};
    let participant_sender = m.isGroup
      ? groupMetadata?.participants.find((v) => v.id == m.sender)
      : {};
    const isBotAdmin = participant_bot?.admin !== null ? true : false;
    const isAdmin = participant_sender?.admin !== null ? true : false;
    const {
      runtime,
      getRandom,
      getTime,
      tanggal,
      toRupiah,
      telegraPh,
      pinterest,
      ucapan,
      generateProfilePicture,
      getBuffer,
      fetchJson,
      resize,
    } = require("./all/function.js");
    const { toAudio, toPTT, toVideo, ffmpeg } = require("./all/converter.js");

    //=========== MESSAGE ===========//
    if (isCmd) {
      console.log(
        chalk.yellow.bgCyan.bold(namabot),
        color(`[ PESAN ]`, `blue`),
        color(`FROM`, `blue`),
        color(`${senderNumber}`, `blue`),
        color(`Text :`, `blue`),
        color(`${cmd}`, `white`)
      );
    }

    //========= FAKE QUOTED =========//
    const qbug = {
      key: {
        remoteJid: "status@broadcast",
        fromMe: false,
        participant: "0@s.whatsapp.net",
      },
      message: { listResponseMessage: { title: `Hello My Friends` } },
    };

    const qtext = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: "0@s.whatsapp.net" } : {}),
      },
      message: {
        extendedTextMessage: { text: "Thank you for using my services" },
      },
    };

    const qdoc = {
      key: {
        participant: "0@s.whatsapp.net",
        ...(m.chat ? { remoteJid: `status@broadcast` } : {}),
      },
      message: {
        documentMessage: {
          title: `Powered By ${namaowner}`,
          jpegThumbnail: "",
        },
      },
    };

    const qloc = {
      key: {
        participant: "0@s.whatsapp.net",
        ...(m.chat ? { remoteJid: `status@broadcast` } : {}),
      },
      message: {
        locationMessage: {
          name: `WhatsApp Bot JPM By Revan Offc⚡`,
          jpegThumbnail: "",
        },
      },
    };

    const qcall = {
      key: {
        participant: "0@s.whatsapp.net",
        ...(m.chat
          ? {
              remoteJid: `status@broadcast`,
            }
          : {}),
      },
      message: {
        eventMessage: {
          isCanceled: false,
          name: `${namabot} Project`,
          description: "Pe",
          location: {
            degreesLatitude: 0,
            degreesLongitude: 0,
            name: "Apakajajanabs",
          },
          joinLink: "https://call.whatsapp.com/video/hMwVijMQtUb0qBJL3lf0rv",
          startTime: "1713724680",
        },
      },
    };

    const qloc2 = {
      key: {
        participant: "0@s.whatsapp.net",
        ...(m.chat ? { remoteJid: `status@broadcast` } : {}),
      },
      message: {
        locationMessage: {
          name: `WhatsApp Bot Pushkontak By Revan Offc⚡`,
          jpegThumbnail: "",
        },
      },
    };

    const qkontak = {
      key: {
        participant: `0@s.whatsapp.net`,
        ...(botNumber
          ? {
              remoteJid: `status@broadcast`,
            }
          : {}),
      },
      message: {
        contactMessage: {
          displayName: `${namaowner}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=6281389850142:+62 813-8985-0142\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          sendEphemeral: true,
        },
      },
    };

    const qpayment = {
      key: {
        remoteJid: "0@s.whatsapp.net",
        fromMe: false,
        id: `ownername`,
        participant: "0@s.whatsapp.net",
      },
      message: {
        requestPaymentMessage: {
          currencyCodeIso4217: "USD",
          amount1000: 999999999,
          requestFrom: "0@s.whatsapp.net",
          noteMessage: {
            extendedTextMessage: {
              text: namabot,
            },
          },
          expiryTimestamp: 999999999,
          amount: {
            value: 91929291929,
            offset: 1000,
            currencyCode: "INR",
          },
        },
      },
    };

    const qchanel = {
      key: {
        remoteJid: "status@broadcast",
        fromMe: false,
        participant: "0@s.whatsapp.net",
      },
      message: {
        newsletterAdminInviteMessage: {
          newsletterJid: `120363313588001786@newsletter`,
          newsletterName: `Hore`,
          jpegThumbnail: "",
          caption: `Powered By ${namaowner2}`,
          inviteExpiration: Date.now() + 1814400000,
        },
      },
    };
    async function reply(teks) {
      const po = {
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            title: `REVAN OFFC 🦅`,
            body: "",
            thumbnailUrl: "https://telegra.ph/file/4d8d81e1a109f7768c067.jpg",
            sourceUrl: "",
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
        text: teks,
      };
      return Ibzz.sendMessage(m.chat, po, { quoted: qkontak });
    }
    const qtoko = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat
          ? {
              remoteJid: "status@broadcast",
            }
          : {}),
      },
      message: {
        productMessage: {
          product: {
            productImage: {
              mimetype: "image/jpeg",
              jpegThumbnail: "",
            },
            title: `${namaowner2} - Marketplace`,
            description: null,
            currencyCode: "IDR",
            priceAmount1000: "999999999999999",
            retailerId: `POWERED BY REVAN OFFC 🦅`,
            productImageCount: 1,
          },
          businessOwnerJid: `0@s.whatsapp.net`,
        },
      },
    };

    //========== FUNCTION ===========//
    let ppuser;
    try {
      ppuser = await Ibzz.profilePictureUrl(m.sender, "image");
    } catch (err) {
      ppuser = "https://telegra.ph/file/4d8d81e1a109f7768c067.jpg";
    }

    async function SendSlide(jid, img, txt = []) {
      let anu = new Array();
      let imgsc = await prepareWAMessageMedia(
        { image: img },
        { upload: Ibzz.waUploadToServer }
      );
      for (let ii of txt) {
        await anu.push({
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: `${ii}`,
          }),
          header: proto.Message.InteractiveMessage.Header.fromObject({
            hasMediaAttachment: true,
            ...imgsc,
          }),
          nativeFlowMessage:
            proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
              buttons: [
                {
                  name: "cta_url",
                  buttonParamsJson: `{\"display_text\":\"Beli Produk\",\"url\":\"https://wa.me/${global.owner}\",\"merchant_url\":\"https://www.google.com\"}`,
                },
                {
                  name: "cta_url",
                  buttonParamsJson: `{\"display_text\":\"Testimoni\",\"url\":\"${global.linksaluran}\",\"merchant_url\":\"https://www.google.com\"}`,
                },
                {
                  name: "cta_url",
                  buttonParamsJson: `{\"display_text\":\"Join Grup\",\"url\":\"${global.linkgc}\",\"merchant_url\":\"https://www.google.com\"}`,
                },
              ],
            }),
        });
      }
      const msgii = await generateWAMessageFromContent(
        m.chat,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
              },
              interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                  text: "*𝗔𝗹𝗹 𝗧𝗿𝗮𝗻𝘀𝗮𝗸𝘀𝗶 𝗢𝗽𝗲𝗻 ✅*\n\n*𝗥𝗘𝗩𝗔𝗡 𝗢𝗙𝗙𝗖* Menyediakan Produk & Jasa Dibawah Ini ⬇️",
                }),
                carouselMessage:
                  proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                    cards: anu,
                  }),
              }),
            },
          },
        },
        { userJid: m.sender, quoted: qtoko }
      );
      await Ibzz.relayMessage(jid, msgii.message, {
        messageId: msgii.key.id,
      });
    }

    let example = (teks) => {
      return `\n*Contoh Penggunaan :*\nketik *${cmd}* ${teks}\n`;
    };

    function capital(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const createSerial = (size) => {
      return crypto.randomBytes(size).toString("hex").slice(0, size);
    };

    //========= SETTING EVENT ========//
    if (global.owneroff && !isCmd) {
      if (!isGroup && !isOwner) {
        let teks = `*Hai Kak* @${m.sender.split("@")[0]}

Maaf *Ownerku Sedang Offline*, Silahkan Tunggu Owner Kembali Online & Jangan Spam Chat`;
        return Ibzz.sendMessage(
          m.chat,
          {
            text: `${teks}`,
            contextInfo: {
              mentionedJid: [m.sender],
              externalAdReply: {
                showAdAttribution: true,
                thumbnail: fs.readFileSync("./media/ownermode.jpg"),
                renderLargerThumbnail: false,
                title: "｢ OWNER OFFLINE MODE ｣",
                mediaUrl: linkgc,
                sourceUrl: linkyt,
                previewType: "PHOTO",
              },
            },
          },
          { quoted: null }
        );
      }
    }

    /*if (global.antibug) {
if (!isGroup && m.isBaileys && !m.fromMe) {
await Ibzz.sendMessage(m.chat, {
delete: {
remoteJid: m.chat, fromMe: true, id: m.key.id
}})
await Ibzz.sendMessage(`${global.owner}@s.whatsapp.net`, {text: `*Terdeteksi Pesan Bug*
*Nomor :* ${m.sender.split("@")[0]}`}, {quoted: null})
}}*/

    if (antilink.includes(m.chat)) {
      if (!isBotAdmin) return;
      if (!isAdmin && !isOwner && !m.fromMe) {
        var link =
          /chat.whatsapp.com|buka tautaniniuntukbergabungkegrupwhatsapp/gi;
        if (link.test(m.text)) {
          var gclink =
            `https://chat.whatsapp.com/` + (await Ibzz.groupInviteCode(m.chat));
          var isLinkThisGc = new RegExp(gclink, "i");
          var isgclink = isLinkThisGc.test(m.text);
          if (isgclink) return;
          let delet = m.key.participant;
          let bang = m.key.id;
          await Ibzz.sendMessage(
            m.chat,
            {
              text: `@${
                m.sender.split("@")[0]
              } UDAH DIBILANG JAN SERLINK PANTEK, DADAH LU GW _*KICK_* DARI GC INI`,
              contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                  thumbnail: fs.readFileSync("./media/warning.jpg"),
                  title: "｢ LINK GRUP DETECTED ｣",
                  previewType: "PHOTO",
                },
              },
            },
            { quoted: m }
          );
          await Ibzz.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              fromMe: false,
              id: bang,
              participant: delet,
            },
          });
          await Ibzz.groupParticipantsUpdate(m.chat, [m.sender], "remove");
        }
      }
    }

    if (antilink2.includes(m.chat)) {
      if (!isBotAdmin) return;
      if (!isAdmin && !isOwner && !m.fromMe) {
        var link =
          /chat.whatsapp.com|buka tautaniniuntukbergabungkegrupwhatsapp/gi;
        if (link.test(m.text)) {
          var gclink =
            `https://chat.whatsapp.com/` + (await Ibzz.groupInviteCode(m.chat));
          var isLinkThisGc = new RegExp(gclink, "i");
          var isgclink = isLinkThisGc.test(m.text);
          if (isgclink) return;
          let delet = m.key.participant;
          let bang = m.key.id;
          await Ibzz.sendMessage(
            m.chat,
            {
              text: `@${
                m.sender.split("@")[0]
              } 𝙃𝘼𝙔 𝘽𝙐𝙉𝙂, 𝘼𝙇𝘼𝙉𝙂𝙆𝘼𝙃 𝘽𝘼𝙄𝙆𝙉𝙔𝘼 𝙅𝙄𝙆𝘼 𝙆𝘼𝙈𝙐 𝙏𝙄𝘿𝘼𝙆 𝙈𝙀𝙉𝙂𝙄𝙍𝙄𝙈 𝙇𝙄𝙉𝙆 𝙆𝙀 𝙂𝙍𝙐𝘽 𝙄𝙉𝙄, 𝘼𝙏𝘼𝙐 𝙆𝘼𝙈𝙐 𝘼𝙆𝘼𝙉 𝙆𝙐 𝙀𝙉𝙏𝙊𝘿`,
              contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                  thumbnail: fs.readFileSync("./media/warning.jpg"),
                  title: "｢ 𝙂𝙍𝙐𝘽 𝙏𝙀𝙍𝘿𝙀𝙏𝙀𝙆𝙎𝙄 ｣",
                  previewType: "PHOTO",
                },
              },
            },
            { quoted: m }
          );
          await Ibzz.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              fromMe: false,
              id: bang,
              participant: delet,
            },
          });
        }
      }
    }

    if (antiuncheck)
      if (budy.includes("Uncheck")) {
        if (!isBotAdmins) return;
        bvl = `\`\`\`NO UNCHECK ANJING`;
        if (isAdmins) return reply(bvl);
        if (m.key.fromMe) return reply(bvl);
        if (isFernazerOwner) return reply(bvl);
        await Ibzz.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant,
          },
        });

        Ibzz.sendMessage(
          from,
          {
            text: `\`\`\`「 Uncheck Detected 」\`\`\`\n\n@${
              m.sender.split("@")[0]
            }  because of sending unchek in this group`,
            contextInfo: { mentionedJid: [m.sender] },
          },
          { quoted: fcall }
        );
      } else {
      }

    if (antibokep)
      if (budy.includes("Bokep")) {
        if (!isBotAdmins) return;
        bvl = `\`\`\`NO BOKEP`;
        if (isAdmins) return reply(bvl);
        if (m.key.fromMe) return reply(bvl);
        if (isFernazerOwner) return reply(bvl);
        await Ibzz.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant,
          },
        });

        Ibzz.sendMessage(
          from,
          {
            text: `\`\`\`「 BOKEP Link Detected 」\`\`\`\n\n@${
              m.sender.split("@")[0]
            }  because of sending Bokep video link in this group`,
            contextInfo: { mentionedJid: [m.sender] },
          },
          { quoted: fcall }
        );
      } else {
      }

    switch (command) {
      case "menu":
      case "p":
      case "assalamualaikum":
      case "bajisan":
        {
          let teksnya = `*Haii* @${m.sender.split("@")[0]}!

ʜᴀʟᴏ sᴇɴᴀɴɢ ʙᴇʀᴛᴇᴍᴜ ᴅᴇɴɢᴀɴᴍᴜ, ᴀᴋᴜ ᴀᴅᴀʟᴀʜ REVAN OFFC ᴡʜᴀᴛssᴀᴘ 🪽.
ᴅɪʀᴀɴᴄᴀɴɢ ᴏʟᴇʜ REVAN OFFC 🦅, ʏᴀɴɢ sɪᴀᴘ ᴍᴇᴍʙᴀɴᴛᴜᴍᴜ ᴍᴇɴᴊᴀʟᴀɴɪ ᴋᴇsᴜʟɪᴛᴀɴ ᴅᴀʟᴀᴍ ᴍᴇɴᴊᴀʟᴀɴɪ ᴋᴇsᴇʜᴀʀɪᴀɴᴍᴜ. 

𝙼𝚈 𝙾𝚆𝙽𝙴𝚁 𝚆𝙷𝙰𝚃𝚂𝚂𝙰𝙿: wa.me/62815536717930

ＢＯＴ ＩＮＦＯＲＭＡＴＩＯＮ 💿
◍ 𝙽𝙰𝙼𝙰 𝙱𝙾𝚃: *${namabot2}*
◍ 𝚂𝚃𝙰𝚃𝚄𝚂 : *${Ibzz.public ? "Public Mode" : "Self Mode"}*
◍ 𝚁𝚄𝙽 : *${runtime(process.uptime())}*
◍ 𝙻𝙸𝙱𝚁𝙰𝚁𝚈 : *Baileys 𝚅𝟼.𝟽.𝟻*
◍ 𝚅𝙴𝚁𝚂𝙸 : *${global.version}*
◍ 𝙰𝙻𝙻 𝙾𝙵 𝙼𝚈 𝙺𝙸𝙽𝙶 : *${
            premium.length < 1 ? "Tidak Ada" : premium.length + " User"
          }*`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teksnya,
                    }),
                    header: proto.Message.InteractiveMessage.Header.fromObject({
                      hasMediaAttachment: true,
                      documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/30129597_829817659174206_6300413901737393729_n.enc?ccb=11-4&oh=01_Q5AaIA5MAdyMQOjp8l42SnRy_8qjz9O8JH8vgPee1nIdko51&oe=66595EB9&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/pdf",
                        fileSha256:
                          "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
                        jpegThumbnail: await resize(
                          fs.readFileSync("./media/menu.jpg"),
                          400,
                          400
                        ),
                        fileLength: 120000,
                        mediaKey:
                          "SkHeALp42Ch7DGb6nuV6p7hxL+V9yjh9s9t3Ox8a72o=",
                        fileName: `© REVAN OFFC 🦅`,
                        directPath:
                          "/v/t62.7119-24/30129597_829817659174206_6300413901737393729_n.enc?ccb=11-4&oh=01_Q5AaIA5MAdyMQOjp8l42SnRy_8qjz9O8JH8vgPee1nIdko51&oe=66595EB9&_nc_sid=5e03e0",
                        contactVcard: true,
                        mediaKeyTimestamp: "1658703206",
                      },
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "single_select",
                              buttonParamsJson: `{ "title": "List Menu", "sections": [{ "title": "# Pilih List Menu Di Bawah Ini", "rows": [{ "header": "All Command", "title": "List All Command Bot", "description": "© ${namabot2}", "id": ".revanoffc" }, 
{ "header": "Main Menu", "title": "List Main Menu Command", "description": "© ${namabot2}", "id": ".mainmenu" }, 
{ "header": "Downloader", "title": "List Downloader Command", "description": "© ${namabot2}", "id": ".downloadmenu" }, 
{ "header": "Converter", "title": "List Converter Command", "description": "© ${namabot2}", "id": ".convertmenu" }, 
{ "header": "Pterodactyl Panel", "title": "List Pterodactyl Panel Command", "description": "© ${namabot2}", "id": ".panelmenu" }, 
{ "header": "Domain Menu", "title": "List Domain Menu Command", "description": "© ${namabot2}", "id": ".domainmenu" }, 
{ "header": "Store Menu", "title": "List Store Menu Command", "description": "© ${namabot2}", "id": ".storemenu" }, 
{ "header": "Group Menu", "title": "List Group Menu Command", "description": "© ${namabot2}", "id": ".grupmenu" }, 
{ "header": "Owner Menu", "title": "List Ownerbot Menu Command", "description": "© ${namabot2}", "id": ".ownermenu" }]}, { "title": "# Produk Owner Bot", "rows": [{ "header": "Panel Pterodactyl", "title": "List Harga Pterodactyl Panel", "description": "© ${namabot2}", "id": ".list_panel" }, 
{  "header": "Nokos WhatsApp", "title": "List Harga Nokos Whatsapp", "description": "© ${namabot2}", "id": ".list_nokos" }, 
{ "header": "VPS (Virtual Private Server)", "title": "List Harga VPS", "description": "© ${namabot2}", "id": ".list_vps" }, 
{ "header": "Domain Server", "title": "List Harga Domain", "description": "© ${namabot2}", "id": ".list_domain" }, 
{  "header": "Script REVAN OFFC 🦅", "title": "List Harga REVAN OFFC 🦅", "description": "© ${namabot2}", "id": ".list_scbot" }]}, { "title": "# Tools Owner Bot", "rows": [{ "header": "Auto Read", "title": "Pilih Opsi ON/OFF", "description": "© ${namabot2}", "id": ".autoread" }, 
{ "header": "Auto Read Story", "title": "Pilih Opsi ON/OFF", "description": "© ${namabot2}", "id": ".autoreadsw" }, 
{ "header": "Main Menu", "title": "List Main Menu Command", "description": "© ${namabot2}", "id": ".mainmenu" }, 
{ "header": "THIS IS REVAN OFFC", "title": "THIS IS REVAN OFFC", "description": "© ${namabot2}", "id": ".play metamorphosis" }, 
{ "header": "Anti Call", "title": "Pilih Opsi ON/OFF", "description": "© ${namabot2}", "id": ".anticall" }]}]}`,
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Script Bot\",\"url\":\"${global.linkyt}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                    contextInfo: {
                      isForwarded: true,
                      mentionedJid: [m.sender, owner + "@s.whatsapp.net"],
                      forwardedNewsletterMessageInfo: {
                        newsletterName: `Powered By ${namaowner2}`,
                        newsletterJid: global.idsaluran,
                      },
                      externalAdReply: {
                        title: `Status : ${
                          isOwner
                            ? "Ownerbot"
                            : isPremium
                            ? "Premium"
                            : "Gratisan"
                        }`,
                        thumbnailUrl: ppuser,
                        body: `${ucapan()} ${m.pushName}`,
                        sourceUrl: linkyt,
                        previewType: "PHOTO",
                      },
                    },
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: null }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "revanoffc":
        {
          let teksmenu = ` *Haii* @${m.sender.split("@")[0]}!
 *Selamat ${ucapan()}*
 
┏❐   🪽 *MAIN MENU* 🪽
┃
┃⭔ PLAY
┃⭔ YTS
┃⭔ TOURL
┃⭔ TOHD
┃⭔ CHAT GPT
┃⭔ AI
┃⭔ REMINI
┃⭔ STICKER
┃⭔ LISTPREMIUM
┃⭔ PINTEREST
┃⭔ QC
┃⭔ MENFESS
┃
┗❐ 
  
┏❐ 🪽 *DOWNLOADER* 🪽
┃⭔ tiktok
┃⭔ tiktokmp3
┃⭔ tiktokaudio
┃⭔ tiktokslide
┃⭔ instagram
┃⭔ facebook
┃⭔ ytmp3
┃⭔ mediafire
┃
┗❐ 
  
┏❐ 🪽 *CONVERTER* 🪽
┃
┃⭔ TOAUDIO
┃⭔ TOMP3
┃⭔ TOVN
┃⭔ TOPTV
┃⭔ TTS
┃⭔ TOIMAGE 
┃
┗❐
  
┏❐ 🪽 *PANEL MENU* 🪽
┃
┃⭔ ADDADMIN
┃⭔ ADDADMIN2
┃⭔ CPANEL
┃⭔ CPANEL2
┃⭔ CPANEL3
┃⭔ LISTPANEL
┃⭔ LISTADMIN
┃⭔ DELADMIN
┃⭔ DELPANEL
┃
┗❐
  

┏❐ 🪽 *DOMAIN MENU* 🪽
┃
┃⭔ LISTDOMAIN
┃⭔ LISTSUBDOMAIN
┃⭔ DELSUBDOMAIN
┃
┗❐

┏❐ 🪽 *STORE MENU* 🪽
┃
┃⭔ PUSHKONTAK
┃⭔ PUSHKONTAK1
┃⭔ PUSHKONTAK2
┃⭔ SAVEKONTAK
┃⭔ SAVEKONTAK2
┃⭔ IDGC
┃⭔ JPM
┃⭔ JPM2 (PAKAI FOTO)
┃⭔ JPMHIDETAG
┃⭔ JPMHIDETAG2
┃⭔ STARTJPM
┃⭔ STARTJPMSLIDE
┃⭔ SETTEKSJPM
┃⭔ TEKSJPM
┃
┗❐

┏❐   🪽 *GROUP MENU* 🪽
┃
┃⭔ ADDMEMBER
┃⭔ ANTILINK
┃⭔ ANTILINKV2
┃⭔ ANTI UNCHECK
┃⭔ HIDETAG
┃⭔ TAGALL
┃⭔ DELETE
┃⭔ OPEN/CLOSE
┃⭔ SETNAMAGC
┃⭔ SETDEKSGC
┃⭔ SETPPGC
┃⭔ KICK
┃⭔ PROMOTE
┃⭔ LEAVEGC
┃⭔ LEAVEGC2
┃⭔ DEMOTE
┃
┗❐
  
┏❐   🪽 *OWNER MENU* 🪽
┃
┃⭔ ADDOWNER
┃⭔ ADDPREMIUM
┃⭔ DELPREMIUM
┃⭔ DELOWNER
┃⭔ LISTOWNER
┃⭔ CLEARSESSION
┃⭔ MODEOFF
┃⭔ MODEON
┃⭔ DONE
┃⭔ ANTICALL
┃⭔ AUTOREAD
┃⭔ AUTOREADSW
┃⭔ WELCOME
┃⭔ GETCASE
┃⭔ SETPPBOTPANJANG
┃⭔ SETPPBOT
┃⭔ SETNAMABOT
┃⭔ SETBIOBOT
┃⭔ JADIBOT
┃⭔ LISTJADIBOT
┃⭔STOPJADIBOT
┃
┗❐ © *_REVAN OFFC 🦅_*`;
          Ibzz.sendOrder(
            m.chat,
            teksmenu,
            await fs.readFileSync("./media/menu.jpg"),
            "99999999",
            10000000,
            null
          );
        }
        break;
      case "mainmenu":
        {
          let teksmenu = `*👑 M A I N M E N U*
* play
* tourl
* yts
* tohd
* chatgpt
* ai
* remini
* listpremium
* sticker
* pinterest
* qc
* menfess`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teksmenu,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Join Grup\",\"url\":\"${global.linkgc}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                    contextInfo: {
                      isForwarded: true,
                      mentionedJid: [m.sender],
                      forwardedNewsletterMessageInfo: {
                        newsletterName: `Powered By ${namaowner2}`,
                        newsletterJid: global.idsaluran,
                      },
                    },
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: null }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "downloadmenu":
        {
          let teksmenu = `*🪽 D O W N L O A D E R*
* tiktok
* tiktokmp3
* tiktokaudio
* tiktokslide
* instagram
* facebook
* ytmp3
* mediafire`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teksmenu,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Join Grup\",\"url\":\"${global.linkgc}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                    contextInfo: {
                      isForwarded: true,
                      mentionedJid: [m.sender],
                      businessMessageForwardInfo: {
                        businessOwnerJid: global.owner,
                      },
                      forwardedNewsletterMessageInfo: {
                        newsletterName: `Powered By ${namaowner2}`,
                        newsletterJid: global.idsaluran,
                      },
                    },
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: null }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "produkmenu":
      case "prd":
        {
          let teksmenu = `*Haii Kak* @${m.sender.split("@")[0]}!

Silahkan Pilih Salah Satu List Produk Di Bawah Ini Dengan Cara Klik Tombol *Pilih Produk*`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teksmenu,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "single_select",
                              buttonParamsJson: `{ "title": "Pilih Produk", "sections": [{ "title": "# Silahkan Pilih Salah Satu Di Bawah Ini", "highlight_label": \"Powered By ${namaowner}\", "rows": [{ "header": "Panel Run Bot", "title": "List Harga Panel", "id": ".list_panel" }, 
{ "header": "VPS", "title": "List Harga Vps", "id": ".list_vps" }, 
{ "header": "Domain", "title": "List Harga Domain", "id": ".list_domain" }, 
{ "header": "Script Bot", "title": "List Harga Script Bot", "id": ".list_scbot" }]}]}`,
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Testimoni\",\"url\":\"${global.linksaluran}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Join Grup\",\"url\":\"${global.linkgc}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                    contextInfo: {
                      isForwarded: true,
                      mentionedJid: [m.sender],
                      businessMessageForwardInfo: {
                        businessOwnerJid: global.owner,
                      },
                      forwardedNewsletterMessageInfo: {
                        newsletterName: `Powered By ${namaowner2}`,
                        newsletterJid: global.idsaluran,
                      },
                    },
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: null }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "storemenu":
        {
          let teksmenu = `*🪽 S T O R E M E N U*
* pushkontak
* pushkontak1
* pushkontak2
* savekontak
* savekontak2
* listgc
* idgc
* jpm
* jpm2
* jpmhidetag
* jpmhidetag2
* startjpm
* startjpmslide
* setteksjpm
* teksjpm`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teksmenu,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "quick_reply",
                              buttonParamsJson:
                                '{"display_text":"Start Jpm All Grup","title":"Start Jpm","id":".startjpm"}',
                            },
                            {
                              name: "quick_reply",
                              buttonParamsJson:
                                '{"display_text":"Start Jpm Slide All Grup","title":"Start Jpm Slide","id":".startjpmslide"}',
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Join Grup\",\"url\":\"${global.linkgc}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                    contextInfo: {
                      isForwarded: true,
                      mentionedJid: [m.sender],
                      businessMessageForwardInfo: {
                        businessOwnerJid: global.owner,
                      },
                      forwardedNewsletterMessageInfo: {
                        newsletterName: `Powered By ${namaowner2}`,
                        newsletterJid: global.idsaluran,
                      },
                    },
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: null }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "convertmenu":
        {
          let teksmenu = `*🪽 C O N V E R T E R*
* toaudio
* tomp3
* tovn
* toptv
* tts
* toimage`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teksmenu,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Join Grup\",\"url\":\"${global.linkgc}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                    contextInfo: {
                      isForwarded: true,
                      mentionedJid: [m.sender],
                      businessMessageForwardInfo: {
                        businessOwnerJid: global.owner,
                      },
                      forwardedNewsletterMessageInfo: {
                        newsletterName: `Powered By ${namaowner2}`,
                        newsletterJid: global.idsaluran,
                      },
                    },
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: null }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "panelmenu":
        {
          let teksmenu = `*🪽 P A N E L M E N U*
* addadmin
* addadmin2
* cpanel
* cpanel2
* listpanel
* listadmin
* deladmin
* delpanel`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teksmenu,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "quick_reply",
                              buttonParamsJson:
                                '{"display_text":"List Server Panel","title":"List Panel","id":".listpanel"}',
                            },
                            {
                              name: "quick_reply",
                              buttonParamsJson:
                                '{"display_text":"Buat Server Panel","title":"Buat Panel","id":".cpanel"}',
                            },
                            {
                              name: "quick_reply",
                              buttonParamsJson:
                                '{"display_text":"Hapus Server Panel","title":"Hapus Panel","id":".delpanel"}',
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Join Grup\",\"url\":\"${global.linkgc}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                    contextInfo: {
                      isForwarded: true,
                      mentionedJid: [m.sender],
                      businessMessageForwardInfo: {
                        businessOwnerJid: global.owner,
                      },
                      forwardedNewsletterMessageInfo: {
                        newsletterName: `Powered By ${namaowner2}`,
                        newsletterJid: global.idsaluran,
                      },
                    },
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: null }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "domainmenu":
        {
          let teksmenu = `*🪽 D O M A I N M E N U*
* listdomain
* listsubdomain
* delsubdomain`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teksmenu,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Join Grup\",\"url\":\"${global.linkgc}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                    contextInfo: {
                      isForwarded: true,
                      mentionedJid: [m.sender],
                      businessMessageForwardInfo: {
                        businessOwnerJid: global.owner,
                      },
                      forwardedNewsletterMessageInfo: {
                        newsletterName: `Powered By ${namaowner2}`,
                        newsletterJid: global.idsaluran,
                      },
                    },
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: null }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "grupmenu":
        {
          let teksmenu = `*🪽 G R O U P M E N U*
* addmember
* antilink
* antilinkV2
* hidetag
* tagall
* delete
* open/close
* setnamagc
* setdeskgc
* setppgc
* kick
* promote
* leavegc
* leavegc2
* demote`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teksmenu,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "quick_reply",
                              buttonParamsJson:
                                '{"display_text":"Tutup Grup","title":"Close Grup","id":".close"}',
                            },
                            {
                              name: "quick_reply",
                              buttonParamsJson:
                                '{"display_text":"Buka Grup","title":"Open Grup","id":".open"}',
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Join Grup\",\"url\":\"${global.linkgc}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                    contextInfo: {
                      isForwarded: true,
                      mentionedJid: [m.sender],
                      businessMessageForwardInfo: {
                        businessOwnerJid: global.owner,
                      },
                      forwardedNewsletterMessageInfo: {
                        newsletterName: `Powered By ${namaowner2}`,
                        newsletterJid: global.idsaluran,
                      },
                    },
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: null }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "ownermenu":
        {
          let teksmenu = ` *Haii* @${m.sender.split("@")[0]}!
 *Selamat ${ucapan()}*

*👑 O W N E R M E N U*
* addowner
* addpremium
* delpremium
* delowner
* listowner
* clearsession
* modeoff
* modeon
* done
* anticall
* autoread
* autoreadsw
* welcome
* getcase
* setppbotpanjang
* setppbot
* setnamabot
* setbiobot`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teksmenu,
                    }),
                    header: proto.Message.InteractiveMessage.Header.fromObject({
                      hasMediaAttachment: true,
                      documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/30129597_829817659174206_6300413901737393729_n.enc?ccb=11-4&oh=01_Q5AaIA5MAdyMQOjp8l42SnRy_8qjz9O8JH8vgPee1nIdko51&oe=66595EB9&_nc_sid=5e03e0&mms3=true",
                        mimetype: "image/png",
                        fileSha256:
                          "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
                        jpegThumbnail: await resize(
                          fs.readFileSync("./media/menu.jpg"),
                          400,
                          400
                        ),
                        fileLength: 9999999999,
                        mediaKey:
                          "SkHeALp42Ch7DGb6nuV6p7hxL+V9yjh9s9t3Ox8a72o=",
                        fileName: `© ${namabot} ${global.version}`,
                        directPath:
                          "/v/t62.7119-24/30129597_829817659174206_6300413901737393729_n.enc?ccb=11-4&oh=01_Q5AaIA5MAdyMQOjp8l42SnRy_8qjz9O8JH8vgPee1nIdko51&oe=66595EB9&_nc_sid=5e03e0",
                        contactVcard: true,
                        mediaKeyTimestamp: "1658703206",
                      },
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "quick_reply",
                              buttonParamsJson:
                                '{"display_text":"Backup Script Bot","title":"Backup Script","id":".sc"}',
                            },
                            {
                              name: "quick_reply",
                              buttonParamsJson:
                                '{"display_text":"Restarting Bot","title":"Restart Bot","id":".rst"}',
                            },
                          ],
                        }
                      ),
                    contextInfo: {
                      isForwarded: true,
                      mentionedJid: [m.sender],
                      businessMessageForwardInfo: {
                        businessOwnerJid: global.owner,
                      },
                      forwardedNewsletterMessageInfo: {
                        newsletterName: `Powered By ${namaowner2}`,
                        newsletterJid: global.idsaluran,
                      },
                    },
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: null }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "trxoff":
      case "modeoff":
        {
          if (!isOwner) return reply(msg.owner);
          global.owneroff = true;
          reply(
            "*Berhasil Mengganti Mode ✅*\nMode Bot Beralih Ke *Owner Offline*"
          );
        }
        break;
      case "trxon":
      case "modeon":
        {
          if (!isOwner) return reply(msg.owner);
          global.owneroff = false;
          reply(
            "*Berhasil Mengganti Mode ✅*\nMode Bot Beralih Ke *Owner Online*"
          );
        }
        break;
      case "addowner":
      case "addown":
        {
          if (!isOwner) return reply(msg.owner);
          if (m.quoted || text) {
            let orang = m.mentionedJid[0]
              ? m.mentionedJid[0]
              : text
              ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
              : m.quoted
              ? m.quoted.sender
              : "";
            if (owner2.includes(orang) || orang == global.owner)
              return reply(
                `Nomor ${orang.split("@")[0]} Sudah Ada Di Database Owner`
              );
            if (orang == botNumber)
              return reply(
                "Tidak Bisa Menambahkan Nomor Bot Kedalam Database Owner Tambahan!"
              );
            let check = await Ibzz.onWhatsApp(`${orang.split("@")[0]}`);
            if (check.length < 1)
              return reply(
                `Nomor ${orang.split("@")[0]} Tidak Terdaftar Di WhatsApp`
              );
            await owner2.push(orang);
            await fs.writeFileSync(
              "./all/database/owner.json",
              JSON.stringify(owner2, null, 2)
            );
            reply(`*Berhasil Menambah Owner ✅*
Nomor ${orang.split("@")[0]} Berhasil Ditambahkan Kedalam Database Owner`);
          } else {
            reply(example("@tag/6283XXX"));
          }
        }
        break;
      case "delowner":
      case "delown":
        {
          if (!isOwner) return reply(msg.owner);
          if (m.quoted || text) {
            if (text == "all") {
              await fs.writeFileSync("./all/database/owner.json", "[]");
              return reply(`*Berhasil Menghapus Semua Owner Tambahan ✅*`);
            }
            let orang = m.mentionedJid[0]
              ? m.mentionedJid[0]
              : text
              ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
              : m.quoted
              ? m.quoted.sender
              : "";
            if (!owner2.includes(orang) || orang == global.owner)
              return reply(
                `Nomor ${orang.split("@")[0]} Tidak Ada Di Database Owner`
              );
            if (orang == botNumber)
              return reply("Tidak Bisa Menghapus Nomor Bot!");
            let pos = owner2.indexOf(orang);
            await owner2.splice(pos, 1);
            await fs.writeFileSync(
              "./all/database/owner.json",
              JSON.stringify(owner2, null, 2)
            );
            reply(`*Berhasil Menghapus Owner ✅*
Nomor ${orang.split("@")[0]} Berhasil Dihapus Dari Database Owner`);
          } else {
            reply(example("@tag/6283XXX"));
          }
        }
        break;
      case "addprem":
      case "addpremium":
        {
          if (!isOwner) return reply(msg.owner);
          if (m.quoted || text) {
            let orang = m.mentionedJid[0]
              ? m.mentionedJid[0]
              : text
              ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
              : m.quoted
              ? m.quoted.sender
              : "";
            if (premium.includes(orang))
              return reply(
                `*Gagal Menambah User Premium!*\n${
                  orang.split("@")[0]
                } Sudah Terdaftar Di Database *User Premium*`
              );
            await premium.push(orang);
            await fs.writeFileSync(
              "./all/database/premium.json",
              JSON.stringify(premium)
            );
            reply(
              `*Berhasil Menambah Premium ✅*\n${
                orang.split("@")[0]
              } Sekarang Terdaftar Di Database *User Premium*`
            );
          } else {
            return reply(example("@tag/62838XXX"));
          }
        }
        break;
      case "delprem":
      case "delpremium":
        {
          if (!isOwner) return reply(msg.owner);
          if (m.quoted || text) {
            let orang = m.mentionedJid[0]
              ? m.mentionedJid[0]
              : text
              ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
              : m.quoted
              ? m.quoted.sender
              : "";
            if (!premium.includes(orang))
              return reply(
                `*Gagal Menghapus User Premium!*\n${
                  orang.split("@")[0]
                } Tidak Terdaftar Di Database *User Premium*`
              );
            let indx = premium.indexOf(orang);
            await premium.splice(indx, 1);
            await fs.writeFileSync(
              "./all/database/premium.json",
              JSON.stringify(premium)
            );
            reply(
              `*Berhasil Menghapus Premium ✅*\n${
                orang.split("@")[0]
              } Sekarang Terhapus Dari Database *User Premium*`
            );
          } else {
            return reply(example("@tag/62838XXX"));
          }
        }
        break;
      case "listown":
      case "listowner":
        {
          if (owner2.length < 1) return reply("Tidak Ada Owner Tambahan");
          let teksnya = `*LIST OWNER BOT⚡*\n\n`;
          owner2.forEach(
            (e) =>
              (teksnya += `*Tag :* @${e.split("@")[0]}
*WhatsApp :* ${e.split("@")[0]}\n\n`)
          );
          Ibzz.sendMessage(
            m.chat,
            { text: teksnya, mentions: [...owner2] },
            { quoted: qtoko }
          );
        }
        break;
      case "listprem":
      case "listpremium":
        {
          if (premium.length < 1) return reply("Tidak Ada User Premium");
          let teksnya = `*LIST USER PREMIUM⚡*\n\n`;
          premium.forEach(
            (e) =>
              (teksnya += `*Tag :* @${e.split("@")[0]}
*WhatsApp :* ${e.split("@")[0]}\n\n`)
          );
          Ibzz.sendMessage(
            m.chat,
            { text: teksnya, mentions: [...premium] },
            { quoted: qtoko }
          );
        }
        break;
      case "yts":
        {
          if (!text)
            return reply(`*Masukan Teksnya!*
Contoh : *${cmd}* Story Anime`);
          await reply(msg.wait);
          await yts(text)
            .then(async (data) => {
              if (data.all.length == 0) return reply(mess.error);
              let datanew = new Array();
              let txt = [];
              global.tempYts = [];
              let result = data.all.slice(0, 10);
              for (let i of result) {
                let tempid = await createSerial(5);
                global.tempYts.push({
                  id: `${tempid}`,
                  judul: `${i?.title || "unknown"}`,
                  durasi: `${i?.timestamp || "unknown"}`,
                  author: `${i.author?.name || "unknown"}`,
                  link: i.url,
                  image: i.thumbnail,
                });
                txt.push(`* *ID Music :* #${tempid}
* *Judul :* ${i.title}
* *Channel :* ${i.author?.name || "unknown"}
* *Durasi :* ${i?.timestamp || "unknown"}
* *Link Url :* ${i.url}\n\n`);
              }
              for (let ii = 0; ii < result.length; ii++) {
                datanew.push({
                  body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: "\n" + txt[ii],
                  }),
                  footer: proto.Message.InteractiveMessage.Footer.create({
                    text: `© Powered By ${namabot2}`,
                  }),
                  header: proto.Message.InteractiveMessage.Header.fromObject({
                    hasMediaAttachment: true,
                    ...(await prepareWAMessageMedia(
                      { image: await fetch(result[ii].thumbnail) },
                      { upload: Ibzz.waUploadToServer }
                    )),
                  }),
                  nativeFlowMessage:
                    proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                      {
                        buttons: [
                          {
                            name: "quick_reply",
                            buttonParamsJson: `{\"display_text\":\"Play Music ID #${global.tempYts[ii].id}\",\"title\":\"Play Music\",\"id\":\".ytsplay ${global.tempYts[ii].id}\"}`,
                          },
                        ],
                      }
                    ),
                });
              }
              const msgii = await generateWAMessageFromContent(
                m.chat,
                {
                  viewOnceMessage: {
                    message: {
                      messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2,
                      },
                      interactiveMessage:
                        proto.Message.InteractiveMessage.fromObject({
                          body: proto.Message.InteractiveMessage.Body.fromObject(
                            {
                              text: "Berikut Adalah Hasil Pencarian Dari *Youtube 🔎*",
                            }
                          ),
                          carouselMessage:
                            proto.Message.InteractiveMessage.CarouselMessage.fromObject(
                              {
                                cards: datanew,
                              }
                            ),
                        }),
                    },
                  },
                },
                { userJid: m.sender, quoted: m }
              );
              return Ibzz.relayMessage(m.chat, msgii.message, {
                messageId: msgii.key.id,
              });
            })
            .catch((err) => reply(err.toString()));
        }
        break;
      case "ytsplay":
        {
          if (!text) return;
          let cekdulu = await global.tempYts.find((e) => e.id == text);
          if (!cekdulu) return reply("ID Music Tidak Ditemukan");
          let Obj = cekdulu;
          if (Obj.link == null) return reply("Maaf Audio Sudah Tidak Tersedia");
          await reply(
            `Memproses Pengiriman Audio Dari *Youtube Search ID #${Obj.id}*`
          );
          var judul = `./all/tmp/${getRandom(".mp3")}`;
          const videoURL = Obj.link;
          const options = {
            quality: "highestaudio",
            filter: "audioonly",
          };
          ytdl(videoURL, options)
            .pipe(fs.createWriteStream(judul))
            .on("finish", async function () {
              try {
                await Ibzz.sendMessage(
                  m.chat,
                  {
                    audio: fs.readFileSync(judul),
                    mimetype: "audio/mpeg",
                    contextInfo: {
                      mentionedJid: [m.sender],
                      externalAdReply: {
                        thumbnailUrl: Obj.thumbnail,
                        title: Obj.judul,
                        body: `Duration : ${Obj.durasi} | Author : ${Obj.author}`,
                        sourceUrl: Obj.link,
                        renderLargerThumbnail: true,
                        mediaType: 1,
                      },
                    },
                  },
                  { quoted: m }
                );
                await fs.unlinkSync(judul);
              } catch (e) {
                await Ibzz.sendMessage(
                  m.chat,
                  { audio: fs.readFileSync(judul), mimetype: "audio/mpeg" },
                  { quoted: m }
                );
                await fs.unlinkSync(judul);
              }
              let position = global.tempYts.indexOf(Obj);
              global.tempYts[position].link = null;
            })
            .on("error", (err) => {
              return reply(err.toString());
            });
        }
        break;
      case "setppbot":
      case "setpp":
        {
          if (!isOwner) return reply(msg.owner);
          if (/image/g.test(mime)) {
            let media = await Ibzz.downloadAndSaveMediaMessage(qmsg);
            await Ibzz.updateProfilePicture(botNumber, { url: media });
            await fs.unlinkSync(media);
            reply("*Berhasil Mengganti Profil ✅*");
          } else return reply(example("dengan mengirim foto"));
        }
        break;
      case "setppbotpanjang":
      case "setpppanjang":
        {
          if (!isOwner) return reply(msg.owner);
          if (/image/g.test(mime)) {
            var medis = await Ibzz.downloadAndSaveMediaMessage(
              qmsg,
              "ppbot.jpeg",
              false
            );
            var { img } = await generateProfilePicture(medis);
            await Ibzz.query({
              tag: "iq",
              attrs: {
                to: botNumber,
                type: "set",
                xmlns: "w:profile:picture",
              },
              content: [
                {
                  tag: "picture",
                  attrs: { type: "image" },
                  content: img,
                },
              ],
            });
            await fs.unlinkSync(medis);
            reply("*Berhasil Mengganti Profil ✅*");
          } else return reply(example("dengan mengirim foto"));
        }
        break;
      case "setnamabot":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text) return reply(example("teksnya"));
          Ibzz.updateProfileName(text);
          reply("*Berhasil Mengganti Nama Bot ✅*");
        }
        break;
      case "setbio":
      case "setbiobot":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text) return reply(example("teksnya"));
          Ibzz.updateProfileStatus(text);
          reply("*Berhasil Mengganti Bio Bot ✅*");
        }
        break;
      case "listdomain":
        {
          var teks = `*List Domain Yang Tersedia :*

.domain1 ${global.tld1}
.domain2 ${global.tld2}
.domain3 ${global.tld3}

*Contoh Cara Membuat Subdomain :*
ketik *.domain1* hostname|ipvps

*Contoh Cara Melihat Subdomain :*
ketik *.listsubdomain domain1*
`;
          reply(teks);
        }
        break;
      case "listsubdomain":
      case "listsubdo":
        {
          if (!isOwner) return reply(msg.owner);
          if (!args[0])
            return reply(
              example(
                "domain1\n\nketik *.listdomain*\nUntuk melihat list domainnya"
              )
            );
          let zonenya;
          let apinya;
          let dom = args[0].toLowerCase();
          if (/domain1/.test(dom)) {
            zonenya = global.zone1;
            apinya = global.apitoken1;
          } else if (/domain2/.test(dom)) {
            zonenya = global.zone2;
            apinya = global.apitoken2;
          } else if (/domain3/.test(dom)) {
            zonenya = global.zone3;
            apinya = global.apitoken3;
          }
          axios
            .get(
              `https://api.cloudflare.com/client/v4/zones/${zonenya}/dns_records`,
              {
                headers: {
                  Authorization: "Bearer " + `${apinya}`,
                  "Content-Type": "application/json",
                },
              }
            )
            .then(async (res) => {
              if (res.data.result.length < 1)
                return reply("Tidak Ada Subdomain");
              var teks = `*🌐 LIST SUBDOMAIN ${dom.toUpperCase()}*\n\n*Total Subdomain :* ${
                res.data.result.length
              }\n\n`;
              await res.data.result.forEach(
                (e) => (teks += `*Domain :* ${e.name}\n*IP :* ${e.content}\n\n`)
              );
              return reply(teks);
            });
        }
        break;
      case "domain1":
      case "domain2":
      case "domain3":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text) return reply(example("host|ip"));
          if (!text.split("|")) return reply(example("host|ip"));
          let zonenya;
          let apinya;
          let tldnya;
          let dom = args[0].toLowerCase();
          if (/domain1/.test(command)) {
            zonenya = global.zone1;
            apinya = global.apitoken1;
            tldnya = global.tld1;
          } else if (/domain2/.test(command)) {
            zonenya = global.zone2;
            apinya = global.apitoken2;
            tldnya = global.tld2;
          } else if (/domain3/.test(command)) {
            zonenya = global.zone3;
            apinya = global.apitoken3;
            tldnya = global.tld3;
          }
          async function subDomain1(host, ip) {
            return new Promise((resolve) => {
              axios
                .post(
                  `https://api.cloudflare.com/client/v4/zones/${zonenya}/dns_records`,
                  {
                    type: "A",
                    name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tldnya,
                    content: ip.replace(/[^0-9.]/gi, ""),
                    ttl: 3600,
                    priority: 10,
                    proxied: false,
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + apinya,
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((e) => {
                  let res = e.data;
                  if (res.success)
                    resolve({
                      success: true,
                      zone: res.result?.zone_name,
                      name: res.result?.name,
                      ip: res.result?.content,
                    });
                })
                .catch((e) => {
                  let err1 =
                    e.response?.data?.errors?.[0]?.message ||
                    e.response?.data?.errors ||
                    e.response?.data ||
                    e.response ||
                    e;
                  let err1Str = String(err1);
                  resolve({ success: false, error: err1Str });
                });
            });
          }

          let raw1 = text;
          if (!raw1) return reply(example("host|ip"));
          let host1 = raw1
            .split("|")[0]
            .trim()
            .replace(/[^a-z0-9.-]/gi, "");
          if (!host1)
            return reply(
              "Hostname Tidak Valid!, Hostname Hanya Mendukung Tanda Strip(-) Atau Titik(.)"
            );
          let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
          if (!ip1 || ip1.split(".").length < 4)
            return reply(ip1 ? "IP Tidak Valid!" : "Isi IP Servernya!");
          await subDomain1(host1.toLowerCase(), ip1).then((e) => {
            if (e["success"])
              reply(
                `*Subdomain Berhasil Dibuat ✅*\n\n*Domain Induk 🌐*\n${tldnya}\n*IP 📡*\n${e["ip"]}\n*Subdomain 🌐*\n${e["name"]}`
              );
            else reply(`${e["error"]}`);
          });
        }
        break;
      case "delsubdo":
      case "delsubdomain":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text)
            return reply(
              example(
                "domain1|subdo\n\nUntuk melihat listdomain ketik *.listdomain*"
              )
            );
          if (!text.split("|"))
            return reply(
              example(
                "domain1|subdo\n\nUntuk melihat listdomain ketik *.listdomain*"
              )
            );
          var [pusat, sub] = text.split("|");
          if (!pusat)
            return reply(
              example(
                "domain1|subdo\n\nUntuk melihat listdomain ketik *.listdomain*"
              )
            );
          if (!sub)
            return reply(
              example(
                "domain1|subdo\n\nUntuk melihat listdomain ketik *.listdomain*"
              )
            );
          var zonenya;
          var apinya;
          var tldnya;
          if (/domain1/.test(pusat)) {
            zonenya = global.zone1;
            apinya = global.apitoken1;
            tldnya = global.tld1;
          } else if (/domain2/.test(pusat)) {
            zonenya = global.zone2;
            apinya = global.apitoken2;
            tldnya = global.tld2;
          } else if (/domain3/.test(pusat)) {
            zonenya = global.zone3;
            apinya = global.apitoken3;
            tldnya = global.tld3;
          } else return reply("Domain Tidak Ditemukan");
          if (!sub.includes(".")) return reply("Format Subdomain Tidak Valid!");
          var host = sub.toLowerCase();
          var dom = null;
          var id = null;
          await axios
            .get(
              `https://api.cloudflare.com/client/v4/zones/${zonenya}/dns_records`,
              {
                headers: {
                  Authorization: "Bearer " + apinya,
                  "Content-Type": "application/json",
                },
              }
            )
            .then(async (res) => {
              await res.data.result.forEach((e) => {
                if (e.name == host) {
                  dom = e.name;
                  id = e.id;
                }
              });
            });
          if (dom == null && id == null)
            return reply("Subdomain Tidak Ditemukan");
          await fetch(
            `https://api.cloudflare.com/client/v4/zones/${zonenya}/dns_records/${id}`,
            {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + apinya,
                "Content-Type": "application/json",
              },
            }
          );
          reply(`*Berhasil Menghapus Subdomain ✅*
*Subdomain :* ${dom}
*Domain Induk :* ${tldnya}`);
        }
        break;
      case "tts":
        {
          if (!text) return reply(example("Hallo saya manusia"));
          if (text.length >= 300)
            return reply("Jumlah huruf harus di bawah 300!");
          reply(msg.wait);
          let id = "id_001";
          try {
            const { data } = await axios.post(
              "https://tiktok-tts.weilnet.workers.dev/api/generation",
              {
                text: text,
                voice: id,
              }
            );
            Ibzz.sendMessage(
              m.chat,
              {
                audio: Buffer.from(data.data, "base64"),
                mimetype: "audio/mp4",
              },
              { quoted: m }
            );
          } catch (e) {
            return reply(e.toString());
          }
        }
        break;
      case "ytplay":
      case "play":
        {
          if (!text)
            throw `*• Contoh :* ${usedPrefix + command} *[judul lagu]*`;
          m.reply("Sedang mencari...");
          let search = await ytdl.search(text);
          let result = search.data[0];
          Ibzz.sendMessage(
            m.chat,
            {
              audio: {
                url: await (await ytdl.mp3(result.url)).media,
              },
              mimetype: "audio/mp4",
              contextInfo: {
                externalAdReply: {
                  title: result.title,
                  body: result.author.name,
                  mediaType: 1,
                  thumbnailUrl: result.img,
                  renderLangerThumbnail: true,
                },
              },
            },
            {
              quoted: m,
            }
          );
        }
        break;
      case "qc":
        {
          if (!text) return reply(example("teksnya"));
          let warna = ["#000000", "#ff2414", "#22b4f2", "#eb13f2"];
          let reswarna = await warna[Math.floor(Math.random() * warna.length)];
          reply(msg.wait);
          const json = {
            type: "quote",
            format: "png",
            backgroundColor: reswarna,
            width: 512,
            height: 768,
            scale: 2,
            messages: [
              {
                entities: [],
                avatar: true,
                from: {
                  id: 1,
                  name: m.pushName,
                  photo: {
                    url: ppuser,
                  },
                },
                text: text,
                replyMessage: {},
              },
            ],
          };
          const response = axios
            .post("https://bot.lyo.su/quote/generate", json, {
              headers: { "Content-Type": "application/json" },
            })
            .then(async (res) => {
              const buffer = Buffer.from(res.data.result.image, "base64");
              let tempnya = "./all/tmp/" + makeid + ".png";
              await fs.writeFile(tempnya, buffer, async (err) => {
                if (err) return reply("Error");
                await Ibzz.sendStimg(m.chat, tempnya, m, { packname: namabot });
                await fs.unlinkSync(`${tempnya}`);
              });
            });
        }
        break;
      case "list_vps":
        {
          let teks = `
Belum Tersedia`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teks,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Beli Produk\",\"url\":\"https://wa.me/${global.owner}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qtoko }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "list_domain":
        {
          let teks = `
Belum Tersedia`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teks,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Beli Produk\",\"url\":\"https://wa.me/${global.owner}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qtoko }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "list_nokos":
        {
          let teks = `
Belum Tersedia`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teks,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Beli Produk\",\"url\":\"https://wa.me/${global.owner}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qtoko }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
        break;
      case "list_panel":
        {
          const teks = `*List Harga Panel Run Bot⚡*

*📦 Ram 1GB Cpu 40%*
_Harga : Rp2000_

*📦 Ram 2GB Cpu 50%*
_Harga Rp3000_

*📦 Ram 3GB Cpu 60%*
_Harga : Rp4000_

*📦 Ram 4GB Cpu 80%*
_Harga : Rp5000_

*📦 Ram 5GB Cpu 110*
_Harga Rp6000_

*📦 Ram 6GB Cpu 120%* 
_Harha Rp7000_

*📦 Ram 7GB Cpu 130%* 
_Harga Rp8000_

*📦 Ram 8GB Cpu 150%* 
_Harga Rp9000_

*📦 Ram & Cpu Unlimited* 
_Harga Rp10.000_

*Keuntungan Panel :*
* Server *(High Quality)*
* Bot Auto Fast Respon
* Garansi Aktif 10 Hari
* Claim Garansi Wajib Bawa Bukti Transaksi!
`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teks,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Beli Produk\",\"url\":\"https://wa.me/${global.owner}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qtoko }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "list_scbot":
        {
          let teks = `
Script *Ibzzbotz V4* Di Jual Dengan Harga *Rp40.000*, Jika Berminat Silahkan Klik Tombol Di Bawah Ini`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teks,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Beli Script Bot\",\"url\":\"https://wa.me/${global.owner}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qtoko }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "remini":
      case "tohd":
      case "hd":
        {
          if (/image/g.test(mime)) {
            reply(msg.wait);
            let tingkat;
            if (/remini/gi.test(command)) tingkat = 4;
            if (/tohd|hd/gi.test(command)) tingkat = 2;
            await Ibzz.downloadAndSaveMediaMessage(qmsg)
              .then(async (res) => {
                let urlnya = await telegraPh(res);
                let image = await fetchJson(
                  `https://aemt.me/remini?url=${urlnya}&resolusi=${tingkat}`
                );
                if (!image.status) return reply("Error!");
                await Ibzz.sendMessage(
                  m.chat,
                  { image: { url: image.url }, caption: "Berhasil ✅" },
                  { quoted: m }
                );
                await fs.unlinkSync(res);
              })
              .catch((err) => reply(err.toString()));
          } else return reply(example("dengan mengirim foto"));
        }
        break;
      case "menfess":
        {
          this.menfes = this.menfes ? this.menfes : {};
          roof = Object.values(this.menfes).find((menpes) =>
            [menpes.a, menpes.b].includes(m.sender)
          );
          if (roof) return warning("Kamu masih berada dalam sesi menfess");
          if (m.isGroup) return warning("Fitur Khusus Di private chat!");
          if (!text)
            return warning(
              `Kirim Perintah ${
                prefix + command
              } nama|nomor|pesan\n\nContoh :\n${
                prefix + command
              } ${pushname}|628xxx|Menfes nih\n`
            );
          if (!text.includes("|"))
            return warning(
              `Kirim Perintah ${
                prefix + command
              } nama|nomor|pesan\n\nContoh :\n${
                prefix + command
              } ${pushname}|6292818802718|Menfes nih\n`
            );
          let [namaNya, nomorNya, pesanNya] = text.split`|`;
          if (nomorNya.startsWith("0"))
            return warning(
              `Awali dengan 62\n\nContoh :\n${
                prefix + command
              } ${pushname}|628xxx|Menfes nih\n`
            );
          if (isNaN(nomorNya))
            return warning(
              `Nomor Salah, Perhatikan Pemakaian\n\nContoh :\n${
                prefix + command
              } ${pushname}|628xxx|Menfes nih\n`
            );
          var yoi = `\n\nDari : ${namaNya}\nPesan : ${pesanNya}\n\nSilahkan klik *balasmenfess* -- Untuk menerima menfess/confess\nSilahkan klik *tolakmenfess* -- Untuk menolak menfess/confess\n\n_Pesan ini di tulis oleh seseorang pengguna bot, bot hanya menyampaikan saja_`;
          let id = m.sender;
          this.menfes[id] = {
            id,
            a: m.sender,
            b: nomorNya + "@s.whatsapp.net",
            state: "WAITING",
          };
          let button = [
            {
              name: "quick_reply",
              buttonParamsJson: `{\"display_text\":\"Tolak Menfess\",\"id\":\".tolakmenfess\"}`,
            },
            {
              name: "quick_reply",
              buttonParamsJson: `{\"display_text\":\"Balas Menfess\",\"id\":\".balasmenfes\"}`,
            },
          ];
          Ibzz.sendButtonBiasa(
            nomorNya + "@s.whatsapp.net",
            `*Hi ada menfess nih buat kamu*`,
            yoi,
            button,
            fhalo
          );
          m.reply(
            "Pesan berhasil dikirim ke nomor tujuan. Moga aja dibales coy"
          );
        }
        db.data.users[m.sender].exp += await randomNomor(20);
        break;
      case "chatgpt":
      case "gpt":
        {
          if (!text) return reply(example("apa itu nodejs"));
          reply(msg.wait);
          await fetchJson(`https://aemt.me/gpt4?text=${text}`).then((e) => {
            if (!e.status) return reply(JSON.stringify(e, null, 2));
            var teks = `*© GPT - Chat Version 0.4*\n\n${e.result}`;
            reply(teks);
          });
        }
        break;
      case "ai":
      case "openai":
        {
          if (!text) return reply(example("kamu siapa"));
          reply(msg.wait);
          await fetchJson(`https://aemt.me/openai?text=${text}`).then((e) => {
            if (!e.status) return reply(JSON.stringify(e, null, 2));
            var teks = `*© AI - Asistent v4.0.0*\n\n${e.result}`;
            reply(teks);
          });
        }
        break;
      case "toptv":
        {
          if (/video/.test(qmsg.mimetype)) {
            if (qmsg.seconds > 30)
              return reply("Durasi vidio maksimal 30 detik!");
            let ptv = await generateWAMessageFromContent(
              m.chat,
              proto.Message.fromObject({ ptvMessage: qmsg }),
              { userJid: m.chat, quoted: m }
            );
            Ibzz.relayMessage(m.chat, ptv.message, { messageId: ptv.key.id });
          } else {
            return reply(example("dengan mengirim/balas vidio"));
          }
        }
        break;
      case "toimage":
        {
          if (!/webp/.test(mime) && !/audio/.test(mime))
            return reply(example("dengan reply sticker"));
          reply(msg.wait);
          let media = await Ibzz.downloadAndSaveMediaMessage(qmsg);
          let ran = `${makeid}.png`;
          exec(`ffmpeg -i ${media} ${ran}`, (err) => {
            fs.unlinkSync(media);
            if (err) return err;
            let buffer = fs.readFileSync(ran);
            Ibzz.sendMessage(
              m.chat,
              { image: buffer },
              {
                quoted: m,
              }
            );
            fs.unlinkSync(ran);
          });
        }
        break;
      case "tovn":
      case "toptt":
        {
          if (!/video|audio/.test(mime) && !/audio/.test(mime))
            return reply(example("dengan mengirim audio/vidio"));
          reply(msg.wait);
          await Ibzz.downloadMediaMessage(qmsg).then(async (res) => {
            let anu = await toPTT(res, "mp4");
            Ibzz.sendMessage(
              m.chat,
              { audio: anu, mimetype: "audio/mpeg", ptt: true },
              { quoted: m }
            );
          });
        }
        break;
      case "toaudio":
      case "tomp3":
        {
          if (!/video/.test(mime) && !/audio/.test(mime))
            return reply(example("dengan mengirim vidio"));
          if (qmsg.seconds > 30) return reply("Durasi vidio maksimal 30 detik");
          reply(msg.wait);
          await Ibzz.downloadMediaMessage(qmsg).then(async (res) => {
            let anu = await toAudio(res, "mp4");
            Ibzz.sendMessage(
              m.chat,
              { audio: anu, mimetype: "audio/mpeg" },
              { quoted: m }
            );
          });
        }
        break;
      case "sticker":
      case "stiker":
      case "sgif":
      case "s":
        {
          if (!/image|video/.test(mime))
            return reply(example("dengan mengirim foto/vidio"));
          if (/video/.test(mime)) {
            if (qmsg.seconds > 15)
              return reply("Durasi vidio maksimal 15 detik!");
          }
          reply(msg.wait);
          var media = await Ibzz.downloadAndSaveMediaMessage(qmsg);
          await Ibzz.sendStimg(m.chat, media, m, { packname: global.packname });
          await fs.unlinkSync(media);
        }
        break;
      case "tourl":
        {
          if (!/image/.test(mime))
            return reply(example("dengan mengirim foto"));
          await reply(msg.wait);
          var fotonya = await Ibzz.downloadAndSaveMediaMessage(qmsg);
          var urlimage = await telegraPh(fotonya);
          await reply(`Link Tautan :\n${urlimage}`);
          await fs.unlinkSync(fotonya);
        }
        break;
      case "public":
        {
          if (!isOwner) return reply(msg.owner);
          Ibzz.public = true;
          reply("*Berhasil Mengganti Mode ✅*\nMode Bot Beralih Ke *Public*");
        }
        break;
      case "self":
        {
          if (!isOwner) return reply(msg.owner);
          Ibzz.public = false;
          reply("*Berhasil Mengganti Mode ✅*\nMode Bot Beralih Ke *Self*");
        }
        break;
      case "get":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text) return reply("linknya");
          try {
            var check = await fetchJson(text);
            reply(JSON.stringify(check, null, 2));
          } catch (e) {
            return reply(e.toString());
          }
        }
        break;
      case "setteksjpm":
        {
          if (!isOwner) return reply(msg.owner);
          if (text || m.quoted) {
            const newteks = m.quoted ? m.quoted.text : text;
            await fs.writeFileSync("./list/teksjpm.js", newteks.toString());
            reply("*Teks JPM Berhasil Diganti ✅*");
          } else {
            return reply(
              example(
                "dengan reply/kirim teks\n\nUntuk melihat teks jpm saat ini ketik *.teksjpm*"
              )
            );
          }
        }
        break;
      case "teksjpm":
        {
          if (!isOwner) return reply(msg.owner);
          reply(fs.readFileSync("./list/teksjpm.js").toString());
        }
        break;
      case "instagram":
      case "igdl":
      case "ig":
        {
          if (!text) return reply(example("linknya"));
          if (!text.includes("instagram.com"))
            return reply("Link tautan tidak valid!");
          reply(msg.wait);
          await api
            .igdl(`${text}`)
            .then((res) => {
              for (let a of res.result) {
                Ibzz.sendMedia(m.chat, a.url, m, {
                  caption: "*Instagram Downloader ✅*",
                });
              }
            })
            .catch((e) => reply(e.toString()));
        }
        break;
      case "tiktokaudio":
      case "tiktokmp3":
      case "ttaudio":
      case "ttmp3":
        {
          if (!text) return reply(example("linknya"));
          if (!text.includes("tiktok.com"))
            return reply("Link tautan tidak valid!");
          reply(msg.wait);
          await fetchJson(`https://aemt.me/download/tiktokdl?url=${text}`)
            .then((res) => {
              Ibzz.sendMessage(
                m.chat,
                { audio: { url: res.result.music }, mimetype: "audio/mpeg" },
                { quoted: m }
              );
            })
            .catch((e) => reply(e.toString()));
        }
        break;
      case "tiktokslide":
      case "ttslide":
        {
          if (!text) return reply(example("linknya"));
          if (!text.includes("tiktok.com"))
            return reply("Link tautan tidak valid!");
          reply(msg.wait);
          await fetchJson(`https://aemt.me/download/tiktokslide?url=${text}`)
            .then(async (data) => {
              if (!data.status) return reply(JSON.stringify(data, null, 2));
              if (data.result.totalSlide == 0)
                return reply("Link Tiktok Bukan Slide!");
              var cap = `*Tiktok Downloader ✅*`;
              for (let i of data.result.images) {
                Ibzz.sendMessage(
                  m.chat,
                  { image: { url: `${i}` }, caption: cap },
                  { quoted: m }
                );
              }
            })
            .catch((e) => reply(e.toString()));
        }
        break;
      case "mediafire":
        {
          if (!text) return reply(example("linknya"));
          if (!text.includes("mediafire.com"))
            return reply("Link Tautan Tidak Valid!");
          reply(msg.wait);
          await api
            .mediafireDl(text)
            .then((res) => {
              if (res.filesize.includes("GB"))
                return reply("Gagal mendownload, ukuran file terlalu besar");
              if (res.filesize.split("MB")[0] >= 100)
                return reply("Gagal mendownload, ukuran file terlalu besar");
              if (res.url == "") return reply(msg.error);
              Ibzz.sendMessage(
                m.chat,
                {
                  document: { url: res.url },
                  fileName: res.filename,
                  mimetype: "application/" + res.ext.toLowerCase(),
                  caption: "*Mediafire Downloader ✅*",
                },
                { quoted: m }
              );
            })
            .catch((e) => reply(e.toString()));
        }
        break;
      case "pinterest":
      case "pin":
        {
          if (!text) return reply(example("tobrut"));
          reply(global.msg.wait);
          let res = await pinterest(text);
          if (res.length == 0) return reply("Error, Foto Tidak Ditemukan");
          if (res.length < 5) {
            anuan = res;
          } else {
            anuan = res.slice(0, 5);
          }
          let anu = new Array();
          for (let ii of anuan) {
            let imgsc = await prepareWAMessageMedia(
              { image: await fetch(`${ii}`) },
              { upload: Ibzz.waUploadToServer }
            );
            anu.push({
              header: proto.Message.InteractiveMessage.Header.fromObject({
                hasMediaAttachment: true,
                ...imgsc,
              }),
              nativeFlowMessage:
                proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: `{\"display_text\":\"Link Tautan Foto\",\"url\":\"${ii}\",\"merchant_url\":\"https://www.google.com\"}`,
                    },
                  ],
                }),
            });
          }

          const msgii = await generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage:
                    proto.Message.InteractiveMessage.fromObject({
                      body: proto.Message.InteractiveMessage.Body.fromObject({
                        text: "🔎 Berikut Adalah Hasil Pencarian Foto Dari *Pinterest*",
                      }),
                      carouselMessage:
                        proto.Message.InteractiveMessage.CarouselMessage.fromObject(
                          {
                            cards: anu,
                          }
                        ),
                    }),
                },
              },
            },
            { userJid: m.sender, quoted: m }
          );

          await Ibzz.relayMessage(m.chat, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "getcase":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text) return reply(example("menu"));
          const getcase = (cases) => {
            return (
              "case " +
              `\"${cases}\"` +
              fs
                .readFileSync("./Ibzzo.js")
                .toString()
                .split('case "' + cases + '"')[1]
                .split("break")[0] +
              "break"
            );
          };
          try {
            reply(`${getcase(q)}`);
          } catch (e) {
            return reply(`Case *${text}* Tidak Ditemukan`);
          }
        }
        break;
      case "tiktok":
      case "tt":
        {
          if (!text) return reply(example("linknya"));
          if (!/tiktok.com/.test(text))
            return reply("Link Tautan Tidak Valid!");
          reply(msg.wait);
          let anuan = text;
          await api
            .tiktok(anuan)
            .then(async (res) => {
              var cap = `*Tiktok Downloader ✅*`;
              if (res.result.duration == 0) {
                for (let a of res.result.images) {
                  Ibzz.sendMessage(
                    m.chat,
                    { image: { url: `${a}` }, caption: cap },
                    { quoted: m }
                  );
                }
              } else {
                await Ibzz.sendMessage(
                  m.chat,
                  {
                    video: { url: res.result.play },
                    mimetype: "video/mp4",
                    caption: cap,
                  },
                  { quoted: m }
                );
              }
            })
            .catch((e) => reply(`${e}`));
        }
        break;
      case "facebook":
      case "fb":
      case "fbdl":
        {
          if (!text) return reply(example("linkvidionya"));
          if (!/facebook.com/.test(text))
            return reply("Link Tautan Tidak Valid!");
          reply(msg.wait);
          await fetchJson(`https://aemt.me/download/fbdown?url=${text}`)
            .then((res) => {
              if (!res.status) return reply(JSON.stringify(res, null, 2));
              Ibzz.sendMessage(
                m.chat,
                {
                  video: {
                    url: `${
                      res.result.url.isHdAvailable == true
                        ? res.result.url.urls[0].hd
                        : res.result.url.urls[0].sd
                    }`,
                  },
                  mimetype: "video/mp4",
                  caption: `*Facebook Downloader ✅*`,
                },
                { quoted: m }
              );
            })
            .catch((e) => reply(e.toString()));
        }
        break;
      case "owner":
        {
          Ibzz.sendContact(m.chat, [owner], "Telfon/VC = Blokir", null, {
            contextInfo: {
              mentionedJid: [m.sender],
              externalAdReply: {
                showAdAttribution: true,
                thumbnail: await fs.readFileSync("./media/Ibzz.jpg"),
                title: `© Copyright ${global.namabot}`,
                renderLargerThumbnail: true,
                sourceUrl: global.linkyt,
                mediaType: 1,
              },
            },
          });
        }
        break;
      case "antilink":
        {
          if (!isGroup) return reply(msg.group);
          if (!isOwner && !isAdmin) return reply(msg.admin);
          if (!args[0])
            return reply(
              example(
                "on/off\nKetik *.statusgc* Untuk Melihat Status Setting Grup Ini"
              )
            );
          if (/on/.test(args[0].toLowerCase())) {
            if (antilink.includes(m.chat))
              return reply("*Antilink Grup* Di Grup Ini Sudah Aktif!");
            if (antilink2.includes(m.chat)) {
              let posi = antilink2.indexOf(m.chat);
              antilink2.splice(posi, 1);
              await fs.writeFileSync(
                "./all/database/antilink2.json",
                JSON.stringify(antilink2)
              );
            }
            antilink.push(m.chat);
            await fs.writeFileSync(
              "./all/database/antilink.json",
              JSON.stringify(antilink)
            );
            reply(
              "*Berhasil Menyalakan Antilink Grup ✅*\nKetik *.statusgc* Untuk Melihat Status Setting Grup Ini"
            );
          } else if (/off/.test(args[0].toLowerCase())) {
            if (!antilink.includes(m.chat))
              return reply("*Antilink Grup* Di Grup Ini Belum Aktif!");
            let posi = antilink.indexOf(m.chat);
            antilink.splice(posi, 1);
            await fs.writeFileSync(
              "./all/database/antilink.json",
              JSON.stringify(antilink)
            );
            reply(
              "*Berhasil Mematikan Antilink Grup ✅*\nKetik *.statusgc* Untuk Melihat Status Setting Grup Ini"
            );
          } else {
            return reply(example("on/off"));
          }
        }
        break;
      case "antilinkV2":
      case "antilinkv2":
        {
          if (!isGroup) return reply(msg.group);
          if (!isOwner && !isAdmin) return reply(msg.owner);
          if (!args[0])
            return reply(
              example(
                "on/off\nKetik *.statusgc* Untuk Melihat Status Setting Grup Ini"
              )
            );
          if (/on/.test(args[0].toLowerCase())) {
            if (antilink2.includes(m.chat))
              return reply("*Antilink Grup V2* Di Grup Ini Sudah Aktif!");
            if (antilink.includes(m.chat)) {
              let posi = antilink.indexOf(m.chat);
              antilink.splice(posi, 1);
              await fs.writeFileSync(
                "./all/database/antilink.json",
                JSON.stringify(antilink)
              );
            }
            antilink2.push(m.chat);
            await fs.writeFileSync(
              "./all/database/antilink2.json",
              JSON.stringify(antilink2)
            );
            reply(
              "*Berhasil Menyalakan Antilink Grup V2 ✅*\nKetik *.statusgc* Untuk Melihat Status Setting Grup Ini"
            );
          } else if (/off/.test(args[0].toLowerCase())) {
            if (!antilink2.includes(m.chat))
              return reply("*Antilink Grup V2* Di Grup Ini Belum Aktif!");
            let posi = antilink2.indexOf(m.chat);
            antilink2.splice(posi, 1);
            await fs.writeFileSync(
              "./all/database/antilink2.json",
              JSON.stringify(antilink2)
            );
            reply(
              "*Berhasil Mematikan Antilink Grup V2 ✅*\nKetik *.statusgc* Untuk Melihat Status Setting Grup Ini"
            );
          } else {
            return reply(example("on/off"));
          }
        }
        break;
      case "antiuncheck":
      case "antiuncek":
        {
          if (!isGroup) return reply(msg.group);
          if (!isOwner && !isAdmin) return reply(msg.owner);
          if (!args[0])
            return reply(
              example(
                "on/off\nKetik *.statusgc* Untuk Melihat Status Setting Grup Ini"
              )
            );
          if (/on/.test(args[0].toLowerCase())) {
            if (antilink2.includes(m.chat))
              return reply("*Antiunchecm Grup * Di Grup Ini Sudah Aktif!");
            if (antiuncheck.includes(m.chat)) {
              let posi = antiuncheck.indexOf(m.chat);
              antiuncheck.splice(posi, 1);
              await fs.writeFileSync(
                "./all/database/antiuncheck.json",
                JSON.stringify(antiuncheck)
              );
            }
            antiuncheck.push(m.chat);
            await fs.writeFileSync(
              "./all/database/antiuncheck.json",
              JSON.stringify(antiuncheck)
            );
            reply(
              "*Berhasil Menyalakan Antiuncheck Grup V2 ✅*\nKetik *.statusgc* Untuk Melihat Status Setting Grup Ini"
            );
          } else if (/off/.test(args[0].toLowerCase())) {
            if (!antilink2.includes(m.chat))
              return reply("*Antilink Grup V2* Di Grup Ini Belum Aktif!");
            let posi = antilink2.indexOf(m.chat);
            antilink2.splice(posi, 1);
            await fs.writeFileSync(
              "./all/database/antiuncheck.json",
              JSON.stringify(antiuncheck)
            );
            reply(
              "*Berhasil Mematikan Antiunchecm Grup V2 ✅*\nKetik *.statusgc* Untuk Melihat Status Setting Grup Ini"
            );
          } else {
            return reply(example("on/off"));
          }
        }
        break;
      case "welcome":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text)
            return reply(
              example(
                "on/off\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
              )
            );
          if (text.toLowerCase() == "on") {
            if (welcome)
              return reply(
                "*Welcome* Sudah Aktif!\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
              );
            welcome = true;
            reply(
              "*Berhasil Menyalakan Welcome ✅*\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
            );
          } else if (text.toLowerCase() == "off") {
            if (!welcome)
              return reply(
                "*Welcome* Sudah Tidak Aktif!\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
              );
            welcome = false;
            reply(
              "*Berhasil Mematikan Welcome ✅*\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
            );
          } else {
            return reply(
              example(
                "on/off\n\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
              )
            );
          }
        }
        break;
      case "autoread":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text)
            return reply(
              example(
                "on/off\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
              )
            );
          if (text.toLowerCase() == "on") {
            if (autoread)
              return reply(
                "*Autoread* Sudah Aktif!\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
              );
            autoread = true;
            reply(
              "*Berhasil Menyalakan Autoread ✅*\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
            );
          } else if (text.toLowerCase() == "off") {
            if (!autoread)
              return reply(
                "*Autoread* Sudah Tidak Aktif!\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
              );
            autoread = false;
            reply(
              "*Berhasil Mematikan Autoread ✅*\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
            );
          } else {
            return reply(
              example(
                "on/off\n\nKetik *.statusbot* Untuk Melihat Status Settingan Bot"
              )
            );
          }
        }
        break;
      case "autoreadsw":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text)
            return reply(
              example(
                "on/off\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
              )
            );
          if (text.toLowerCase() == "on") {
            if (autoreadsw)
              return reply(
                "*Autoreadsw* Sudah Aktif!\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
              );
            autoreadsw = true;
            reply(
              "*Berhasil Menyalakan Autoreadsw ✅*\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
            );
          } else if (text.toLowerCase() == "off") {
            if (!autoreadsw)
              return reply(
                "*Autoread* Sudah Tidak Aktif!\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
              );
            autoreadsw = false;
            reply(
              "*Berhasil Mematikan Autoreadsw ✅*\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
            );
          } else {
            return reply(
              example(
                "on/off\n\nKetik *.statusbot* Untuk Melihat Status Settingan Bot"
              )
            );
          }
        }
        break;
      case "anticall":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text)
            return reply(
              example(
                "on/off\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
              )
            );
          if (text.toLowerCase() == "on") {
            if (anticall)
              return reply(
                "*Anticall* Sudah Aktif!\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
              );
            anticall = true;
            reply(
              "*Berhasil Menyalakan Anticall ✅*\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
            );
          } else if (text.toLowerCase() == "off") {
            if (!anticall)
              return reply(
                "*Anticall* Sudah Tidak Aktif!\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
              );
            anticall = false;
            reply(
              "*Berhasil Mematikan Anticall ✅*\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
            );
          } else {
            return reply(
              example(
                "on/off\nKetik *.statusbot* Untuk Melihat Status Setting Bot"
              )
            );
          }
        }
        break;
      case "setting":
      case "settingbot":
      case "option":
      case "statusbot":
        {
          if (!isOwner) return reply(msg.owner);
          var teks = `
*List Status Setting Bot :*

* Autoread : ${global.autoread ? "*Aktif*" : "*Tidak Aktif*"}
* Autoreadsw : ${global.autoreadsw ? "*Aktif*" : "*Tidak Aktif*"}
* Anticall : ${global.anticall ? "*Aktif*" : "*Tidak Aktif*"}
* Welcome : ${global.welcome ? "*Aktif*" : "*Tidak Aktif*"}

*Contoh Penggunaan :*
Ketik *.autoread* on/off`;
          reply(teks);
        }
        break;
      case "statusgc":
        {
          if (!isGroup) return reply(msg.group);
          if (!isOwner && !isAdmin) return reply(msg.admin);
          var anti1 = "*Aktif*";
          var anti2 = "*Aktif*";
          if (!antilink2.includes(m.chat)) anti2 = "*Tidak Aktif*";
          if (!antilink.includes(m.chat)) anti1 = "*Tidak Aktif*";
          var teks = `
*List Status Grup Settings :*

* Antilink : ${anti1}
* AntilinkV2 : ${anti2}

*Contoh Penggunaan :*
Ketik *.antilink* on/off
`;
          Ibzz.sendText(m.chat, teks, qchanel);
        }
        break;
      case "setppgc":
        {
          if (!isGroup) return reply(msg.group);
          if (!isBotAdmin) return reply(msg.adminbot);
          if (!isAdmin && !isOwner) return reply(msg.admin);
          if (/image/g.test(mime)) {
            let media = await Ibzz.downloadAndSaveMediaMessage(qmsg);
            await Ibzz.updateProfilePicture(m.chat, { url: media });
            await fs.unlinkSync(media);
            reply("*Berhasil Mengganti Foto Grup ✅*");
          } else return reply(example("dengan mengirim foto"));
        }
        break;
      case "setnamegc":
      case "setnamagc":
        {
          if (!isGroup) return reply(msg.group);
          if (!isBotAdmin) return reply(msg.adminbot);
          if (!isAdmin && !isOwner) return reply(msg.admin);
          if (!text) return reply(example("teksnya"));
          const gcname = metadata.subject;
          await Ibzz.groupUpdateSubject(m.chat, text);
          reply(
            `*Berhasil Mengganti Nama Grup ✅*\n*${gcname}* Menjadi *${text}*`
          );
        }
        break;
      case "setdesc":
      case "setdesk":
        {
          if (!isGroup) return reply(msg.group);
          if (!isBotAdmin) return reply(msg.adminbot);
          if (!isAdmin && !isOwner) return reply(msg.admin);
          if (!text) return reply(example("teksnya"));
          await Ibzz.groupUpdateDescription(m.chat, text);
          reply(`*Berhasil Mengganti Deskripsi Grup ✅*`);
        }
        break;
      case "open":
        {
          if (!isGroup) return reply(msg.group);
          if (!isBotAdmin) return reply(msg.adminbot);
          if (!isAdmin && !isOwner) return reply(msg.admin);
          await Ibzz.groupSettingUpdate(m.chat, "not_announcement");
          reply(
            "*Berhasil Mengganti Setelan Grup ✅*\nMenjadi Anggota Dapat Mengirim Pesan"
          );
        }
        break;
      case "close":
        {
          if (!isGroup) return reply(msg.group);
          if (!isBotAdmin) return reply(msg.adminbot);
          if (!isAdmin && !isOwner) return reply(msg.admin);
          await Ibzz.groupSettingUpdate(m.chat, "announcement");
          reply(
            "*Berhasil Mengganti Setelan Grup ✅*\nMenjadi Hanya Admin Yang Dapat Mengirim Pesan"
          );
        }
        break;
      case "del":
      case "delete":
        {
          if (isGroup) {
            if (!isOwner && !isAdmin) return reply(msg.admin);
            if (!m.quoted) return reply("Reply Pesan Yang Ingin Di Hapus");
            if (m.quoted.sender == botNumber) {
              Ibzz.sendMessage(m.chat, {
                delete: {
                  remoteJid: m.chat,
                  fromMe: true,
                  id: m.quoted.id,
                  participant: m.quoted.sender,
                },
              });
            } else {
              if (!isBotAdmin) return reply(msg.adminbot);
              Ibzz.sendMessage(m.chat, {
                delete: {
                  remoteJid: m.chat,
                  fromMe: false,
                  id: m.quoted.id,
                  participant: m.quoted.sender,
                },
              });
            }
          } else {
            if (!isOwner) return reply(msg.owner);
            if (!m.quoted) return reply("Reply Pesan Yang Ingin Di Hapus");
            Ibzz.sendMessage(m.chat, {
              delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.quoted.id,
                participant: m.quoted.sender,
              },
            });
          }
        }
        break;
      case "demote":
      case "demote":
        {
          if (!isGroup) return reply(msg.group);
          if (!isAdmin && !isOwner) return reply(msg.admin);
          if (!isBotAdmin) return reply(msg.adminbot);
          if (m.quoted || text) {
            let target = m.mentionedJid[0]
              ? m.mentionedJid[0]
              : m.quoted
              ? m.quoted.sender
              : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            await Ibzz.groupParticipantsUpdate(m.chat, [target], "demote")
              .then((res) =>
                reply(
                  `Berhasil Memberhentikan ${
                    target.split("@")[0]
                  } Sebagai Admin Grup Ini`
                )
              )
              .catch((err) => reply(err.toString()));
          } else return reply(example("62838XXX"));
        }
        break;
      case "promote":
      case "promot":
        {
          if (!isGroup) return reply(msg.group);
          if (!isAdmin && !isOwner) return reply(msg.admin);
          if (!isBotAdmin) return reply(msg.adminbot);
          if (m.quoted || text) {
            let target = m.mentionedJid[0]
              ? m.mentionedJid[0]
              : m.quoted
              ? m.quoted.sender
              : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            await Ibzz.groupParticipantsUpdate(m.chat, [target], "promote")
              .then((res) =>
                reply(
                  `Berhasil Menjadikan ${
                    target.split("@")[0]
                  } Sebagai Admin Grup Ini`
                )
              )
              .catch((err) => reply(err.toString()));
          } else return reply(example("6283XXX/@tag"));
        }
        break;
      case "add":
      case "addmember":
        {
          if (!isGroup) return reply(msg.group);
          if (!args[0]) return reply(example("62838XXX"));
          var teks = text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          var cek = await Ibzz.onWhatsApp(`${teks.split("@")[0]}`);
          if (cek.length < 1)
            return reply("Nomor Tersebut Tidak Terdaftar Di WhatsApp");
          if (!isBotAdmin || !groupMetadata.memberAddMode)
            return reply(
              "Gagal Menambahkan Member, Karna Admin Tidak Mengizinkam Peserta Dapat Add Member"
            );
          var a = await Ibzz.groupParticipantsUpdate(m.chat, [teks], "add");
          if (a[0].status == 200)
            return reply(
              `Berhasil Menambahkan ${teks.split("@")[0]} Kedalam Grup Ini`
            );
          if (a[0].status == 408)
            return reply(
              `Gagal Menambahkan ${
                teks.split("@")[0]
              } Ke Dalam Grup Ini, Karna Target Tidak Mengizinkan Orang Lain Dapat Menambahkan Dirinya Ke Dalam Grup`
            );
          if (a[0].status == 409)
            return reply(`Dia Sudah Ada Di Dalam Grup Ini!`);
          if (a[0].status == 403)
            return reply(
              `Gagal Menambahkan ${
                teks.split("@")[0]
              } Ke Dalam Grup Ini, Karna Target Tidak Mengizinkan Orang Lain Dapat Menambahkan Dirinya Ke Dalam Grup`
            );
        }
        break;
      case "kik":
      case "kick":
        {
          if (!isGroup) return reply(msg.group);
          if (!isBotAdmin) return reply(msg.adminbot);
          if (!isAdmin && !isOwner) return reply(msg.admin);
          if (text || m.quoted) {
            let users = m.mentionedJid[0]
              ? m.mentionedJid[0]
              : m.quoted
              ? m.quoted.sender
              : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            await Ibzz.groupParticipantsUpdate(m.chat, [users], "remove")
              .then((res) =>
                Ibzz.sendMessage(
                  m.chat,
                  {
                    text: `Berhasil Mengeluarkan @${
                      users.split("@")[0]
                    } Dari Grup Ini`,
                    mentions: [`${users}`],
                  },
                  { quoted: m }
                )
              )
              .catch((err) => reply(err.toString()));
          } else return reply(example("nomornya/@tag"));
        }
        break;
      case "hidetag":
      case "z":
      case "h":
        {
          if (!isGroup) return reply(msg.group);
          if (!isAdmin && !isOwner) return reply(msg.admin);
          if (!m.quoted && !text) return reply(example("teksnya/replyteks"));
          var teks = m.quoted ? m.quoted.text : text;
          var member = await groupMetadata.participants.map((e) => e.id);
          Ibzz.sendMessage(m.chat, { text: teks, mentions: [...member] });
        }
        break;
      case "tagall":
      case "tag":
        {
          if (!isGroup) return reply(msg.group);
          if (!isAdmin && !isOwner) return reply(msg.admin);
          if (!text) return reply(example("Pesannya"));
          var member = await groupMetadata.participants.map((e) => e.id);
          var teks = ` ${text}\n\n`;
          member.forEach((e) =>
            e !== m.sender ? (teks += `@${e.split("@")[0]}\n`) : ""
          );
          Ibzz.sendMessage(m.chat, { text: teks, mentions: [...member] });
        }
        break;
      case "savekontak":
        {
          if (!isOwner) return reply(msg.owner);
          if (!isGroup) return reply(msg.group);
          const halls = await groupMetadata.participants
            .filter((v) => v.id.endsWith(".net"))
            .map((v) => v.id);
          for (let mem of halls) {
            if (mem !== m.sender) {
              contacts.push(mem);
              fs.writeFileSync(
                "./all/database/contacts.json",
                JSON.stringify(contacts)
              );
            }
          }
          try {
            const uniqueContacts = [...new Set(contacts)];
            const vcardContent = uniqueContacts
              .map((contact, index) => {
                const vcard = [
                  "BEGIN:VCARD",
                  "VERSION:3.0",
                  `FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
                  `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${
                    contact.split("@")[0]
                  }`,
                  "END:VCARD",
                  "",
                ].join("\n");
                return vcard;
              })
              .join("");
            fs.writeFileSync(
              "./all/database/contacts.vcf",
              vcardContent,
              "utf8"
            );
          } catch (err) {
            reply(err.toString());
          } finally {
            if (m.chat !== m.sender)
              await reply(
                `File Kontak Berhasil Dikirim ke Private Chat\n*Total ${halls.length} Kontak*`
              );
            await Ibzz.sendMessage(
              m.sender,
              {
                document: fs.readFileSync("./all/database/contacts.vcf"),
                fileName: "contacts.vcf",
                caption: `File Contact Berhasil Di Buat ✅\n*
*Total ${halls.length} Kontak*`,
                mimetype: "text/vcard",
              },
              { quoted: m }
            );
            contacts.splice(0, contacts.length);
            await fs.writeFileSync(
              "./all/database/contacts.json",
              JSON.stringify(contacts)
            );
            await fs.writeFileSync("./all/database/contacts.vcf", "");
          }
        }
        break;
      case "savekontak2":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text)
            return reply(
              example(
                "idgrupnya\n\nketik *.listgc* untuk melihat semua list id grup"
              )
            );
          var idnya = text;
          var groupMetadataa;
          try {
            groupMetadataa = await Ibzz.groupMetadata(`${idnya}`);
          } catch (e) {
            return reply("*ID Grup* tidak valid!");
          }
          const participants = await groupMetadataa.participants;
          const halls = await participants
            .filter((v) => v.id.endsWith(".net"))
            .map((v) => v.id);
          for (let mem of halls) {
            if (mem !== m.sender) {
              contacts.push(mem);
              fs.writeFileSync(
                "./all/database/contacts.json",
                JSON.stringify(contacts)
              );
            }
          }
          try {
            const uniqueContacts = [...new Set(contacts)];
            const vcardContent = uniqueContacts
              .map((contact, index) => {
                const vcard = [
                  "BEGIN:VCARD",
                  "VERSION:3.0",
                  `FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
                  `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${
                    contact.split("@")[0]
                  }`,
                  "END:VCARD",
                  "",
                ].join("\n");
                return vcard;
              })
              .join("");
            fs.writeFileSync(
              "./all/database/contacts.vcf",
              vcardContent,
              "utf8"
            );
          } catch (err) {
            reply(err.toString());
          } finally {
            if (m.chat !== m.sender)
              await reply(
                `File Kontak Berhasil Dikirim ke Private Chat\n*Total ${halls.length} Kontak*`
              );
            await Ibzz.sendMessage(
              m.sender,
              {
                document: fs.readFileSync("./all/database/contacts.vcf"),
                fileName: "contacts.vcf",
                caption: `File Kontak Berhasil Di Buat ✅\nTotal ${halls.length} Kontak`,
                mimetype: "text/vcard",
              },
              { quoted: m }
            );
            contacts.splice(0, contacts.length);
            await fs.writeFileSync(
              "./all/database/contacts.json",
              JSON.stringify(contacts)
            );
            await fs.writeFileSync("./all/database/contacts.vcf", "");
          }
        }
        break;
      case "pushkontak":
        {
          if (!isOwner) return reply(msg.owner);
          if (!isGroup) return reply(msg.group);
          if (!text) return reply(example("pesannya"));
          var teks = text;
          const halls = await groupMetadata.participants
            .filter((v) => v.id.endsWith(".net"))
            .map((v) => v.id);
          let time = ms(delaypushkontak * Number(halls.length));
          await reply(`Memproses Mengirim Pesan Ke *${halls.length} Member Grup*

*Waktu Selsai :*
${time.minutes} menit, ${time.seconds} detik`);
          for (let mem of halls) {
            if (mem !== m.sender) {
              contacts.push(mem);
              await fs.writeFileSync(
                "./all/database/contacts.json",
                JSON.stringify(contacts)
              );
              await Ibzz.sendMessage(mem, { text: teks }, { quoted: qchanel });
              await sleep(global.delaypushkontak);
            }
          }
          try {
            const uniqueContacts = [...new Set(contacts)];
            const vcardContent = uniqueContacts
              .map((contact, index) => {
                const vcard = [
                  "BEGIN:VCARD",
                  "VERSION:3.0",
                  `FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
                  `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${
                    contact.split("@")[0]
                  }`,
                  "END:VCARD",
                  "",
                ].join("\n");
                return vcard;
              })
              .join("");
            fs.writeFileSync(
              "./all/database/contacts.vcf",
              vcardContent,
              "utf8"
            );
          } catch (err) {
            reply(err.toString());
          } finally {
            if (m.chat !== m.sender)
              await reply(
                `File Kontak Berhasil Dikirim ke Private Chat\n*Total ${halls.length} Kontak*`
              );
            await Ibzz.sendMessage(
              m.sender,
              {
                document: fs.readFileSync("./all/database/contacts.vcf"),
                fileName: "contacts.vcf",
                caption: `File Kontak Berhasil Di Buat ✅\nTotal ${halls.length} Kontak`,
                mimetype: "text/vcard",
              },
              { quoted: m }
            );
            contacts.splice(0, contacts.length);
            await fs.writeFileSync(
              "./all/database/contacts.json",
              JSON.stringify(contacts)
            );
            await fs.writeFileSync("./all/database/contacts.vcf", "");
          }
        }
        break;
      case "pushkontak1":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text)
            return reply(
              example(
                "idgrup|pesannya\n\nketik *.listgc* untuk melihat semua list id grup"
              )
            );
          if (!text.split("|"))
            return reply(
              example(
                "idgrup|pesannya\n\nketik *.listgc* untuk melihat semua list id grup"
              )
            );
          var [idnya, teks] = text.split("|");
          var groupMetadataa;
          try {
            groupMetadataa = await Ibzz.groupMetadata(`${idnya}`);
          } catch (e) {
            return reply("*ID Grup* tidak valid!");
          }
          const participants = await groupMetadataa.participants;
          const halls = await participants
            .filter((v) => v.id.endsWith(".net"))
            .map((v) => v.id);
          let time = ms(delaypushkontak * Number(halls.length));
          await reply(`Memproses Mengirim Pesan Ke *${halls.length} Member Grup*

*Waktu Selsai :*
${time.minutes} menit, ${time.seconds} detik`);
          for (let mem of halls) {
            if (mem !== m.sender) {
              contacts.push(mem);
              await fs.writeFileSync(
                "./all/database/contacts.json",
                JSON.stringify(contacts)
              );
              await Ibzz.sendMessage(mem, { text: teks }, { quoted: qchanel });
              await sleep(global.delaypushkontak);
            }
          }
          try {
            const uniqueContacts = [...new Set(contacts)];
            const vcardContent = uniqueContacts
              .map((contact, index) => {
                const vcard = [
                  "BEGIN:VCARD",
                  "VERSION:3.0",
                  `FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
                  `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${
                    contact.split("@")[0]
                  }`,
                  "END:VCARD",
                  "",
                ].join("\n");
                return vcard;
              })
              .join("");
            fs.writeFileSync(
              "./all/database/contacts.vcf",
              vcardContent,
              "utf8"
            );
          } catch (err) {
            reply(err.toString());
          } finally {
            if (m.chat !== m.sender)
              await reply(
                `File Kontak Berhasil Dikirim ke Private Chat\n*Total ${halls.length} Kontak*`
              );
            await Ibzz.sendMessage(
              m.sender,
              {
                document: fs.readFileSync("./all/database/contacts.vcf"),
                fileName: "contacts.vcf",
                caption: `File Kontak Berhasil Di Buat ✅\nTotal ${halls.length} Kontak`,
                mimetype: "text/vcard",
              },
              { quoted: m }
            );
            contacts.splice(0, contacts.length);
            await fs.writeFileSync(
              "./all/database/contacts.json",
              JSON.stringify(contacts)
            );
            await fs.writeFileSync("./all/database/contacts.vcf", "");
          }
        }
        break;
      case "pushkontak2":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text)
            return reply(
              "*Contoh Command :*\n.pushkontak2 idgc|jeda|pesan\n\n*Note :* Jeda 1 detik = 1000\nketik *.listgc* untuk melihat semua list id grup"
            );
          if (!text.split("|"))
            return reply(
              "*Contoh Command :*\n.pushkontak2 idgc|jeda|pesan\n\n*Note :* Jeda 1 detik = 1000\nketik *.listgc* untuk melihat semua list id grup"
            );
          var idnya = text.split("|")[0];
          var delay = Number(text.split("|")[1]);
          var teks = text.split("|")[2];
          if (!idnya.endsWith("@g.us"))
            return reply("Format ID Grup Tidak Valid");
          if (isNaN(delay)) return reply("Format Delay Tidak Valid");
          if (!teks)
            return reply(
              "*Contoh Command :*\n.pushkontak2 idgc|jeda|pesan\n\n*Note :* Jeda 1 detik = 1000\nketik *.listgc* untuk melihat semua list id grup"
            );
          var groupMetadataa;
          try {
            groupMetadataa = await Ibzz.groupMetadata(`${idnya}`);
          } catch (e) {
            return reply("*ID Grup* tidak valid!");
          }
          const participants = await groupMetadataa.participants;
          const halls = await participants
            .filter((v) => v.id.endsWith(".net"))
            .map((v) => v.id);
          let time = ms(delay * Number(halls.length));
          await reply(`Memproses Mengirim Pesan Ke *${halls.length} Member Grup*

*Waktu Selsai :*
${time.minutes} menit, ${time.seconds} detik`);
          for (let mem of halls) {
            if (mem !== m.sender) {
              contacts.push(mem);
              await fs.writeFileSync(
                "./all/database/contacts.json",
                JSON.stringify(contacts)
              );
              await Ibzz.sendMessage(mem, { text: teks }, { quoted: qchanel });
              await sleep(Number(delay));
            }
          }
          try {
            const uniqueContacts = [...new Set(contacts)];
            const vcardContent = uniqueContacts
              .map((contact, index) => {
                const vcard = [
                  "BEGIN:VCARD",
                  "VERSION:3.0",
                  `FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
                  `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${
                    contact.split("@")[0]
                  }`,
                  "END:VCARD",
                  "",
                ].join("\n");
                return vcard;
              })
              .join("");
            fs.writeFileSync(
              "./all/database/contacts.vcf",
              vcardContent,
              "utf8"
            );
          } catch (err) {
            reply(err.toString());
          } finally {
            if (m.chat !== m.sender)
              await reply(
                `File Kontak Berhasil Dikirim ke Private Chat\n*Total ${halls.length} Kontak*`
              );
            await Ibzz.sendMessage(
              m.sender,
              {
                document: fs.readFileSync("./all/database/contacts.vcf"),
                fileName: "contacts.vcf",
                caption: `File Kontak Berhasil Di Buat ✅\nTotal ${halls.length} Kontak`,
                mimetype: "text/vcard",
              },
              { quoted: m }
            );
            contacts.splice(0, contacts.length);
            await fs.writeFileSync(
              "./all/database/contacts.json",
              JSON.stringify(contacts)
            );
            await fs.writeFileSync("./all/database/contacts.vcf", "");
          }
        }
        break;
      case "idgc":
        {
          if (!isOwner) return reply(msg.owner);
          if (!isGroup) return reply(msg.group);
          reply(`${m.chat}`);
        }
        break;
      case "listgc":
      case "cekidgc":
      case "listgrup":
        {
          let gcall = Object.values(
            await Ibzz.groupFetchAllParticipating().catch((_) => null)
          );
          let listgc = "\n";
          await gcall.forEach((u, i) => {
            listgc += `*${i + 1}.* ${u.subject}\n* *ID :* ${
              u.id
            }\n* *Total Member :* ${
              u.participants.length
            } Member\n* *Status Grup :* ${
              u.announce == true ? "Tertutup" : "Terbuka"
            }\n* *Pembuat :* ${
              u.owner ? u.owner.split("@")[0] : "Sudah keluar"
            }\n\n`;
          });
          Ibzz.sendMessage(
            m.chat,
            {
              text: `${listgc}`,
              contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                  thumbnail: await getBuffer(ppuser),
                  title: `[ ${gcall.length} Group Chat ] `,
                  body: `Runtime : ${runtime(process.uptime())}`,
                  sourceUrl: global.linkyt,
                  previewType: "PHOTO",
                },
              },
            },
            { quoted: qchanel }
          );
        }
        break;
      case "joingc":
      case "join":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text && !m.quoted) return reply(example("linknya"));
          let teks = m.quoted ? m.quoted.text : text;
          if (!teks.includes("whatsapp.com"))
            return reply("Link Tautan Tidak Valid!");
          let result = teks.split("https://chat.whatsapp.com/")[1];
          await Ibzz.groupAcceptInvite(result)
            .then((respon) => reply("Berhasil Bergabung Ke Dalam Grup ✅"))
            .catch((error) => reply(error.toString()));
        }
        break;
      case "leave":
      case "leavegc":
        {
          if (!isOwner) return reply(msg.owner);
          if (!isGroup) return reply(msg.group);
          await reply("Otw Bosss");
          await sleep(3000);
          await Ibzz.groupLeave(m.chat);
        }
        break;
      case "leavegc2":
      case "leave2":
        {
          if (!isOwner) return reply(msg.owner);
          let gcall = await Object.values(
            await Ibzz.groupFetchAllParticipating().catch((_) => null)
          );
          let num = [];
          let listgc = `*Contoh Cara Penggunaan :*\nKetik *${cmd}* Nomor Grup\n\n`;
          await gcall.forEach((u, i) => {
            num.push(i);
            listgc += `*${i + 1}.* ${u.subject}\n* *ID :* ${
              u.id
            }\n* *Total Member :* ${
              u.participants.length
            } Member\n* *Status Grup :* ${
              u.announce == true ? "Tertutup" : "Terbuka"
            }\n* *Pembuat :* ${
              u.owner ? u.owner.split("@")[0] : "Sudah keluar"
            }\n\n`;
          });
          if (!args[0]) {
            Ibzz.sendMessage(
              m.chat,
              {
                text: `${listgc}`,
                contextInfo: {
                  mentionedJid: [m.sender],
                  externalAdReply: {
                    thumbnail: await getBuffer(ppuser),
                    title: `[ ${gcall.length} Group Chat ] `,
                    body: `Runtime : ${runtime(process.uptime())}`,
                    sourceUrl: global.linkyt,
                    previewType: "PHOTO",
                  },
                },
              },
              { quoted: qchanel }
            );
          } else if (args[0]) {
            if (!num.includes(Number(args[0]) - 1))
              return reply("Grup tidak ditemukan");
            let leav = Number(args[0]) - 1;
            await reply(
              `Berhasil Keluar Dari Grup :\n*${gcall[leav].subject}*`
            );
            await Ibzz.groupLeave(`${gcall[leav].id}`);
          }
        }
        break;
      case "rst":
      case "restartbot":
        {
          if (!isOwner) return reply(msg.owner);
          await reply("Memproses Restart Bot . . .");
          execSync("npm restart");
        }
        break;
      case "scbot":
      case "sc":
      case "scriptbot":
        {
          if (isOwner) {
            reply("Memproses Pengambilan Scriptbot");
            let a = getTime().split("T")[1].split("+")[0];
            var name = `V4Private⚡`;
            const ls = (await execSync("ls"))
              .toString()
              .split("\n")
              .filter(
                (pe) =>
                  pe != "node_modules" &&
                  pe != "session" &&
                  pe != "package-lock.json" &&
                  pe != "yarn.lock" &&
                  pe != ""
              );
            const anu = await execSync(`zip -r ${name}.zip ${ls.join(" ")}`);
            await Ibzz.sendMessage(
              m.sender,
              {
                document: await fs.readFileSync(`./${name}.zip`),
                fileName: `${name}.zip`,
                mimetype: "application/zip",
              },
              { quoted: m }
            );
            await execSync(`rm -rf ${name}.zip`);
            if (m.chat !== m.sender)
              return reply("Scriptbot Berhasil Dikirim Ke Chat Pribadi");
          } else {
            let teks = `*# Script ${namabot}*

Script Bot Ini Tidak Di Bagikan Secara *Gratis!!*

Jika Anda Berminat Ingin Membeli Script Ini, Silahkan Chat *Ownerbot* Dengan Cara Ketik *.owner*

*➡️ Youtube :*
${global.linkyt}

*➡️ Grup Jualan :*
${global.linkgc}

*➡️ Testimoni :*
${global.linksaluran}`;
            Ibzz.relayMessage(
              m.chat,
              {
                requestPaymentMessage: {
                  currencyCodeIso4217: "IDR",
                  amount1000: 1000000,
                  requestFrom: m.sender,
                  noteMessage: {
                    extendedTextMessage: {
                      text: teks,
                      contextInfo: {
                        externalAdReply: { showAdAttribution: true },
                      },
                    },
                  },
                },
              },
              {}
            );
          }
        }
        break;
      case "done":
        {
          if (isGroup) return reply(msg.private);
          if (!isOwner) return reply(msg.owner);
          if (!text) return reply(example("Panel Unlimited"));
          let caption = `\n📦 ${text}\n⏰ ${tanggal(Date.now())}`;
          const referenceId = `${crypto
            .randomBytes(11)
            .toString("hex")
            .toUpperCase()
            .slice(0, 11)}`;
          let ngentod = await generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({}),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                      text: "© Powered By " + namabot2,
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                      hasMediaAttachment: true,
                      ...(await prepareWAMessageMedia(
                        {
                          image: await fs.readFileSync("./media/menu.jpg"),
                        },
                        { upload: Ibzz.waUploadToServer }
                      )),
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "review_and_pay",
                              buttonParamsJson: `{
"currency": "IDR",
"payment_configuration": "",
"payment_type": "",
"total_amount": {
"value": 99999999,
"offset": 100
},
"reference_id": "${referenceId}",
"type": "physical-goods",
"order": {
"status": "payment_requested",
"description": "Terimakasih",
"subtotal": {
"value": 99999999,
"offset": 100
},
"tax": {
"value": 0,
"offset": 100
}, 
"discount": {
"value": 0,
"offset": 100
},
"order_type": "ORDER",
"items": [{
"retailer_id": "7537631592926009",
"product_id": "7538731592926009",
"name": "TRANSAKSI DONE ✅",
"amount": {
"value": 99999999,
"offset": 1000
},
"quantity": "100"
}]}, 
"additional_note": "${caption}",
"native_payment_methods": []}`,
                            },
                          ],
                        }
                      ),
                    contextInfo: {
                      stanzaId: m.key.id,
                      remoteJid: isGroup ? m.sender : m.key.remoteJid,
                      participant: m.key.participant || m.sender,
                      fromMe: m.key.fromMe,
                    },
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: m }
          );

          await Ibzz.relayMessage(ngentod.key.remoteJid, ngentod.message, {
            messageId: ngentod.key.id,
          });
        }
        break;
      case "startjpm":
        {
          if (!isOwner) return reply(msg.owner);
          var teksnya = await fs.readFileSync("./list/teksjpm.js").toString();
          if (teksnya.length < 1)
            return reply(
              "Teks Jpm Tidak Ditemukan, Silahkan Isi/Edit Teks Jpm Didalam Folder all/database"
            );
          var teks = `${teksnya}`;
          let total = 0;
          let getGroups = await Ibzz.groupFetchAllParticipating();
          let usergc = await Object.keys(getGroups);
          let time = ms(delayjpm * Number(usergc.length));
          await reply(`Memproses Mengirim Pesan Ke Teks *${usergc.length} Grup*

*Waktu Selsai :*
${time.minutes} menit, ${time.seconds} detik`);
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                      mentionedJid: [m.sender],
                      externalAdReply: {
                        showAdAttribution: false,
                      },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teksnya,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Chat Owner\",\"url\":\"https://wa.me/${owner}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Testimoni\",\"url\":\"${global.linksaluran}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Marketplace\",\"url\":\"${global.linkgc}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qtoko }
          );
          for (let jid of usergc) {
            try {
              await Ibzz.relayMessage(jid, msgii.message, {
                messageId: msgii.key.id,
              });
              total += 1;
            } catch {}
            await sleep(4000);
          }
          reply(`Berhasil Mengirim Pesan Teks Ke *${total} Grup*`);
        }
        break;
      case "jpmhidetag":
      case "jpmht":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text && !m.quoted)
            return reply(example("teksnya atau replyteks"));
          var teks = m.quoted ? m.quoted.text : text;
          let total = 0;
          let getGroups = await Ibzz.groupFetchAllParticipating();
          let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
          let usergc = groups.map((v) => v.id);
          let time = ms(delayjpm * Number(usergc.length));
          await reply(`Memproses Mengirim Pesan Hidetag Teks Ke *${usergc.length} Grup*

*Waktu Selsai :*
${time.minutes} menit, ${time.seconds} detik`);
          var ments = [];
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                      mentionedJid: ments,
                      externalAdReply: {
                        showAdAttribution: false,
                      },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teks,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Beli Produk\",\"url\":\"https://wa.me/${owner}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Testimoni\",\"url\":\"${global.linksaluran}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Join Grup\",\"url\":\"${global.linkgc}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qtoko }
          );
          for (let jid of usergc) {
            try {
              ments = getGroups[jid].participants.map((e) => e.id);
              await Ibzz.relayMessage(jid, msgii.message, {
                messageId: msgii.key.id,
              });
              total += 1;
            } catch (e) {
              console.log(e);
            }
            await sleep(global.delayjpm);
          }
          reply(`Berhasil Mengirim Pesan Hidetag Teks Ke *${total} Grup*`);
        }
        break;
      case "jpmhidetag2":
      case "jpmht2":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text) return reply(example("teksnya dengan balas/kirim foto"));
          if (!/image/.test(mime))
            return reply(example("teksnya dengan balas/kirim foto"));
          let image = await Ibzz.downloadAndSaveMediaMessage(qmsg);
          var teks = text;
          let total = 0;
          let getGroups = await Ibzz.groupFetchAllParticipating();
          let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
          let usergc = groups.map((v) => v.id);
          let time = ms(delayjpm * Number(usergc.length));
          await reply(`Memproses Mengirim Pesan Hidetag Teks & Foto Ke *${usergc.length} Grup*

*Waktu Selsai :*
${time.minutes} menit, ${time.seconds} detik`);
          var ments = [];
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                      mentionedJid: ments,
                      externalAdReply: {
                        showAdAttribution: false,
                      },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teks,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Beli Produk\",\"url\":\"https://wa.me/${owner}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Testimoni\",\"url\":\"${global.linksaluran}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Join Grup\",\"url\":\"${global.linkgc}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qtoko }
          );
          for (let jid of usergc) {
            try {
              ments = getGroups[jid].participants.map((e) => e.id);
              await Ibzz.relayMessage(jid, msgii.message, {
                messageId: msgii.key.id,
              });
              total += 1;
            } catch (e) {
              console.log(e);
            }
            await sleep(global.delayjpm);
          }
          reply(
            `Berhasil Mengirim Pesan Hidetag Teks & Foto Ke *${total} Grup*`
          );
        }
        break;
      case "jpm":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text && !m.quoted)
            return reply(example("teksnya atau replyteks"));
          var teks = m.quoted ? m.quoted.text : text;
          let total = 0;
          let getGroups = await Ibzz.groupFetchAllParticipating();
          let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
          let usergc = groups.map((v) => v.id);
          let time = ms(delayjpm * Number(usergc.length));
          await reply(`Memproses Mengirim Pesan Teks Ke *${usergc.length} Grup*

*Waktu Selsai :*
${time.minutes} menit, ${time.seconds} detik`);
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                      mentionedJid: [m.sender],
                      externalAdReply: {
                        showAdAttribution: false,
                      },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teks,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Beli Produk\",\"url\":\"https://wa.me/${owner}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Testimoni\",\"url\":\"${global.linksaluran}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Join Grup\",\"url\":\"${global.linkgc}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qtoko }
          );
          for (let jid of usergc) {
            try {
              await Ibzz.relayMessage(jid, msgii.message, {
                messageId: msgii.key.id,
              });
              total += 1;
            } catch {}
            await sleep(global.delayjpm);
          }
          reply(`Berhasil Mengirim Pesan Teks Ke *${total} Grup*`);
        }
        break;
      case "jpm2":
        {
          if (!isOwner) return reply(msg.owner);
          if (!text) return reply(example("teksnya dengan balas/kirim foto"));
          if (!/image/.test(mime))
            return reply(example("teksnya dengan balas/kirim foto"));
          let image = await Ibzz.downloadAndSaveMediaMessage(qmsg);
          if (global.idsaluran == "-")
            return reply("Isi Dulu ID Saluran Lu Di File Settings.js!");
          let total = 0;
          let getGroups = await Ibzz.groupFetchAllParticipating();
          let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
          let usergc = groups.map((v) => v.id);
          let time = ms(delayjpm * Number(usergc.length));
          await reply(`Memproses Mengirim Pesan Teks & Foto Ke *${usergc.length} Grup*

*Waktu Selsai :*
${time.minutes} menit, ${time.seconds} detik`);
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                      mentionedJid: [m.sender],
                      externalAdReply: {
                        showAdAttribution: false,
                      },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: text,
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                      hasMediaAttachment: true,
                      ...(await prepareWAMessageMedia(
                        { image: await fs.readFileSync(image) },
                        { upload: Ibzz.waUploadToServer }
                      )),
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Beli Produk\",\"url\":\"https://wa.me/${owner}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Testimoni\",\"url\":\"${global.linksaluran}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Join Grup\",\"url\":\"${global.linkgc}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qtoko }
          );
          for (let jid of usergc) {
            try {
              await Ibzz.relayMessage(jid, msgii.message, {
                messageId: msgii.key.id,
              });
              total += 1;
            } catch {}
            await sleep(global.delayjpm);
          }
          await fs.unlinkSync(image);
          reply(`Berhasil Mengirim Pesan Teks & Foto Ke *${total} Grup*`);
        }
        break;
      case "jpmslide":
      case "startjpmslide":
        {
          if (!isOwner) return reply(msg.owner);
          let total = 0;
          let getGroups = await Ibzz.groupFetchAllParticipating();
          let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
          let usergc = groups.map((v) => v.id);
          let time = ms(delayjpm * Number(usergc.length));
          const Obj = [
            `\n*𝙂𝙍𝙐𝙋 𝘿𝙄𝙂𝙄𝙏𝘼𝙇 𝙈𝘼𝙍𝙆𝙀𝗧 𝙍𝙀𝙑𝘼𝙉 𝙊𝙁𝙁𝘾😎👇
https://chat.whatsapp.com/CUiWRG0YnY8GLZlxS9KGqE

𝘼𝙇𝙇 𝙏𝙀𝙎𝙏𝙄 𝙍𝙀𝙑𝘼𝙉 𝙊𝙁𝙁𝘾😎👇
https://whatsapp.com/channel/0029VayX79V2Jl86yH3Z3530`,
            `\n*_REVAN OFFC MENYEDIAKAN_*

> _Panel Pterodactyl 1-10GB_
> _Panel Pterodactyl Unli_
> _Jasa pembuatan logo hosting 3D (contoh? Chat owner)_
> _Domain my.id/biz.id/web.id ( full akses cf )_
> _Jasa edit SC_
> _Vps Digital Ocean_
> _Owner Panel_
> _Patner Panel_
> _Admin Panel_
> _Murid PP grup_
> _Reseller Panel Telgram Ram Nya Sampai 25GB_
* 𝙟𝙞𝙠𝙖 𝙖𝙙 𝙮𝙜 𝙞𝙣𝙜𝙞𝙣 𝙙𝙞 𝙩𝙖𝙣𝙮𝙖𝙠𝙖𝙣 𝙨𝙞𝙡𝙖𝙝𝙠𝙖𝙣 𝙝𝙪𝙗𝙪𝙣𝙜𝙞 https://Wa.me/62815536717930/𝙥𝙚𝙣𝙘𝙚𝙩 𝙗𝙚𝙡𝙞 𝙥𝙧𝙤𝙙𝙪𝙠
* 𝚋𝚎𝚛𝚖𝚒𝚗𝚊𝚝? 𝚜𝚒𝚕𝚊𝚑𝚔𝚊𝚗 𝚙𝚎𝚗𝚌𝚎𝚝 𝚋𝚎𝚕𝚒 𝚙𝚛𝚘𝚍𝚞𝚔🪽

*Untuk itu semua silahkan pm admin bajisan saja*`,
            `\n*_LIST PANEL BOT WHATSAPP BY REVAN OFFC 🦅_*

- _1 GB | CPU 40% : 1K/BULAN⚡_
- _2 GB | CPU 60% : 2K/BULAN⚡_
- _3 GB | CPU 80% : 3K/BULAN⚡_
- _4 GB | CPU 100% : 4K/BULAN⚡_
- _5 GB | CPU 120% : 5K/BULAN⚡_
- _6 GB | CPU 140% : 6K/BULAN⚡_
- _7 GB | CPU 160% : 7K/BULAN⚡_
- _8 GB | CPU 180% : 8K/BULAN⚡_
- _9 GB | CPU 200% : 9K/BULAN⚡_
- _10GB | CPU 220% : 10K/BULAN⚡_
- _UNLI | CPU UNLI : 15K/BULAN⚡🥶_
_*NOTE: BERGARANSI 1 BULAN FULL*_
* 𝙟𝙞𝙠𝙖 𝙖𝙙 𝙮𝙜 𝙞𝙣𝙜𝙞𝙣 𝙙𝙞 𝙩𝙖𝙣𝙮𝙖𝙠𝙖𝙣 𝙥𝙚𝙣𝙘𝙚𝙩 𝙗𝙚𝙡𝙞 𝙥𝙧𝙤𝙙𝙪𝙠/𝙘𝙝𝙖𝙩 𝙖𝙙𝙢𝙞𝙣:https://Wa.me/62815536717930🪽
* DLL Tanyakan Saja!`,
            `\n*READY VPS DIGITAL OCEAN 🦅*

- 𝗥𝗔𝗠 𝟭𝗚𝗕 𝗖𝗢𝗥𝗘 𝟭 : 𝟭𝟱𝗞
- 𝗥𝗔𝗠 𝟮𝗚𝗕 𝗖𝗢𝗥𝗘 𝟭 : 𝟮𝟬𝗞
- 𝗥𝗔𝗠 𝟮𝗚𝗕 𝗖𝗢𝗥𝗘 𝟮 : 𝟮𝟱𝗞
- 𝗥𝗔𝗠 𝟰𝗚𝗕 𝗖𝗢𝗥𝗘 𝟮 : 𝟯𝟱𝗞
- 𝗥𝗔𝗠 𝟴𝗚𝗕 𝗖𝗢𝗥𝗘 𝟰 : 𝟰𝟱𝗞
- 𝗥𝗔𝗠 𝟭𝟲𝗚𝗕 𝗖𝗢𝗥𝗘 𝟰 : 𝟳𝟬𝗞


𝙨𝙚𝙠𝙞𝙖𝙣 𝙟𝙖𝙨𝙖/𝙥𝙧𝙤𝙙𝙪𝙠 𝙗𝙖𝙟𝙞𝙨𝙖𝙣 𝙟𝙞𝙠𝙖 𝙢𝙞𝙣𝙖𝙩 𝙥𝙚𝙣𝙘𝙚𝙩 𝙗𝙚𝙡𝙞 𝙥𝙧𝙤𝙙𝙪𝙠/𝙘𝙝𝙖𝙩 𝙧𝙚𝙫𝙖𝙣 𝙤𝙛𝙛𝙘 https://Wa.me/62815536717930🪽`,
          ];
          await reply(`Memproses Mengirim Pesan Slide Teks & Foto Ke *${usergc.length} Grup*

*Waktu Selsai :*
${time.minutes} menit, ${time.seconds} detik`);
          for (let jid of usergc) {
            try {
              await SendSlide(jid, fs.readFileSync("./media/Ibzz.jpg"), Obj);
              total += 1;
            } catch {}
            await sleep(global.delayjpm);
          }
          await reply(
            `Berhasil Mengirim Pesan Slide Teks & Foto Ke *${total} Grup*`
          );
        }
        break;
      case "addadmin":
        {
          if (!text) return reply(example("username"));
          if (!isOwner) return reply(msg.owner);
          let username = text.toLowerCase();
          let email = username + "@gmail.com";
          let name = capital(args[0]);
          let password = username + crypto.randomBytes(2).toString("hex");
          let f = await fetch(domain + "/api/application/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
            body: JSON.stringify({
              email: email,
              username: username.toLowerCase(),
              first_name: name,
              last_name: "Admin",
              root_admin: true,
              language: "en",
              password: password.toString(),
            }),
          });
          let data = await f.json();
          if (data.errors)
            return reply(JSON.stringify(data.errors[0], null, 2));
          let user = data.attributes;
          var orang;
          if (isGroup) {
            orang = m.sender;
            await reply(
              "*Berhasil Membuat Akun Admin Panel ✅*\nData Akun Sudah Dikirim Ke Private Chat"
            );
          } else {
            orang = m.chat;
          }
          var teks = `
*Berhasil Membuat Admin Panel Dari REVAN OFFC 🦅 ✅*

* *ID :* ${user.id}
* *Nama :* ${user.first_name}
* *Created :* ${user.created_at.split("T")[0]}
`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                      mentionedJid: [m.sender],
                      externalAdReply: {
                        showAdAttribution: true,
                      },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teks,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Login Server Panel\",\"url\":\"${global.domain}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_copy",
                              buttonParamsJson: `{\"display_text\":\"Copy Username\",\"id\":\"123456789\",\"copy_code\":\"${user.username}\"}`,
                            },
                            {
                              name: "cta_copy",
                              buttonParamsJson: `{\"display_text\":\"Copy Password\",\"id\":\"123456789\",\"copy_code\":\"${password.toString()}\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qchanel }
          );
          await Ibzz.relayMessage(orang, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "addadmin2":
        {
          if (!text) return reply(example("nama,6283XXX"));
          if (!isOwner) return reply(msg.owner);
          if (!args[0]) return reply(example("nama,6283XXX"));
          if (!text.split(",")) return reply(example("nama,6283XXX"));
          var buyyer = text.split(",")[0].toLowerCase();
          if (!buyyer) return reply(example("nama,6283XXX"));
          var ceknya = text.split(",")[1];
          if (!ceknya) return reply(example("nama,6283XXX"));
          var client =
            text.split(",")[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          var check = await Ibzz.onWhatsApp(ceknya);
          if (!check[0].exists) return reply("Nomor Buyyer Tidak Valid!");
          let username = buyyer.toLowerCase();
          let email = username + "@gmail.com";
          let name = capital(username);
          let password = username + crypto.randomBytes(2).toString("hex");
          let f = await fetch(domain + "/api/application/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
            body: JSON.stringify({
              email: email,
              username: username.toLowerCase(),
              first_name: name,
              last_name: "Admin",
              root_admin: true,
              language: "en",
              password: password.toString(),
            }),
          });
          let data = await f.json();
          if (data.errors)
            return reply(JSON.stringify(data.errors[0], null, 2));
          let user = data.attributes;
          await reply(
            `*Berhasil Membuat Akun Admin Panel ✅*\nData Akun Sudah Dikirim Ke Nomor ${ceknya}`
          );
          var teks = `
*Berhasil Membuat Admin Panel ✅*

* *ID :* ${user.id}
* *Nama :* ${user.first_name}
* *Created :* ${user.created_at.split("T")[0]}
`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                      mentionedJid: [m.sender],
                      externalAdReply: {
                        showAdAttribution: true,
                      },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teks,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Login Server Panel\",\"url\":\"${global.domain}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_copy",
                              buttonParamsJson: `{\"display_text\":\"Copy Username\",\"id\":\"123456789\",\"copy_code\":\"${user.username}\"}`,
                            },
                            {
                              name: "cta_copy",
                              buttonParamsJson: `{\"display_text\":\"Copy Password\",\"id\":\"123456789\",\"copy_code\":\"${password.toString()}\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qchanel }
          );
          await Ibzz.relayMessage(client, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "deladmin":
        {
          if (!isOwner) return reply(msg.owner);
          if (!args[0])
            return reply(
              example("id\n\nuntuk melihat id admin ketik *.listadmin*")
            );
          let cek = await fetch(domain + "/api/application/users?page=1", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
          });
          let res2 = await cek.json();
          let users = res2.data;
          let getid = null;
          let idadmin = null;
          await users.forEach(async (e) => {
            if (e.attributes.id == args[0] && e.attributes.root_admin == true) {
              getid = e.attributes.username;
              idadmin = e.attributes.id;
              let delusr = await fetch(
                domain + `/api/application/users/${idadmin}`,
                {
                  method: "DELETE",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + apikey,
                  },
                }
              );
              let res = delusr.ok
                ? {
                    errors: null,
                  }
                : await delusr.json();
            }
          });
          if (idadmin == null) return reply("ID Admin Tidak Ditemukan!");
          reply(`Berhasil Menghapus Admin Panel *${capital(getid)}*`);
        }
        break;
      case "listadmin":
        {
          let cek = await fetch(domain + "/api/application/users?page=1", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
          });
          let res2 = await cek.json();
          let users = res2.data;
          let totaladmin = 0;
          if (users.length < 1) return reply("Tidak Ada Admin Panel");
          var teks = " *LIST ADMIN PANEL BOT⚡*\n\n";
          await users.forEach((i) => {
            if (i.attributes.root_admin !== true) return;
            totaladmin += 1;
            teks += `\`📡ID User ${i.attributes.id}\`
* Nama : *${i.attributes.first_name}*
* Created : ${i.attributes.created_at.split("T")[0]}\n\n`;
          });
          teks += ` Total Admin : *${totaladmin} Admin*`;
          Ibzz.sendText(m.chat, teks, qtoko);
        }
        break;
      case "cpanel":
      case "addpanel":
      case "buatpanel":
        {
          if (!isOwner && !isPremium) return reply(msg.owner);
          if (global.apikey.length < 1) return reply("Apikey Tidak Ditemukan!");
          if (!args[0]) return reply(example("nama"));
          global.panel = [text.toLowerCase()];
          let imgnya = await prepareWAMessageMedia(
            { image: await fs.readFileSync("./media/pterodactyl.jpg") },
            { upload: Ibzz.waUploadToServer }
          );
          global.panel = [text.toLowerCase()];
          const msgii = await generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage:
                    proto.Message.InteractiveMessage.fromObject({
                      body: proto.Message.InteractiveMessage.Body.fromObject({
                        text: "Silahkan Pilih Ram Server Panel Yang Tersedia Di Bawah Ini",
                      }),
                      carouselMessage:
                        proto.Message.InteractiveMessage.CarouselMessage.fromObject(
                          {
                            cards: [
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *1GB*
* CPU Server *40%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 1GB","title":"Create","id":".cp1gbv4"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *2GB*
* CPU Server *60%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 2GB","title":"Create","id":".cp2gbv4"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *3GB*
* CPU Server *80%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 3GB","title":"Create","id":".cp3gbv4"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *4GB*
* CPU Server *100%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 4GB","title":"Create","id":".cp4gbv4"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *5GB*
* CPU Server *120%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 5GB","title":"Create","id":".cp5gbv4"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *6GB*
* CPU Server *140%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 6GB","title":"Create","id":".cp6gbv4"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *7GB*
* CPU Server *160%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 7GB","title":"Create","id":".cp7gbv4"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *8GB*
* CPU Server *180%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 8GB","title":"Create","id":".cp8gbv4"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *9GB*
* CPU Server *220%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 9GB","title":"Create","id":".cp9gbv4"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *10GB*
* CPU Server *220%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 10GB","title":"Create","id":".cp10gbv4"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *Unlimited*
* CPU Server *Unlimited*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram Unlimited","title":"Create","id":".cpunliv4"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                            ],
                          }
                        ),
                    }),
                },
              },
            },
            { userJid: m.sender, quoted: qpayment }
          );

          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "cpanel2":
      case "addpanel2":
      case "buatpanel2":
        {
          if (!isOwner && !isPremium) return reply(msg.owner);
          if (global.apikey.length < 1) return reply("Apikey Tidak Ditemukan!");
          if (!args[0]) return reply(example("nama,6283XXX"));
          if (!text.split(",")) return reply(example("nama,6283XXX"));
          var buyyer = text.split(",")[0].toLowerCase();
          if (!buyyer) return reply(example("nama,6283XXX"));
          var ceknya = text.split(",")[1];
          if (!ceknya) return reply(example("nama,6283XXX"));
          var client =
            text.split(",")[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          var check = await Ibzz.onWhatsApp(ceknya);
          if (check.length < 1) return reply("Nomor Buyyer Tidak Valid!");
          global.panel2 = [buyyer, client];
          let imgnya = await prepareWAMessageMedia(
            { image: await fs.readFileSync("./media/pterodactyl.jpg") },
            { upload: Ibzz.waUploadToServer }
          );
          global.panel = [text.toLowerCase()];
          const msgii = await generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage:
                    proto.Message.InteractiveMessage.fromObject({
                      body: proto.Message.InteractiveMessage.Body.fromObject({
                        text: "Silahkan Pilih Ram Server Panel Yang Tersedia Di Bawah Ini",
                      }),
                      carouselMessage:
                        proto.Message.InteractiveMessage.CarouselMessage.fromObject(
                          {
                            cards: [
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *1GB*
* CPU Server *40%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 1GB","title":"Create","id":".cp1gbv5"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *2GB*
* CPU Server *60%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 2GB","title":"Create","id":".cp2gbv5"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *3GB*
* CPU Server *80%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 3GB","title":"Create","id":".cp3gbv5"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *4GB*
* CPU Server *100%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 4GB","title":"Create","id":".cp4gbv5"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *5GB*
* CPU Server *120%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 5GB","title":"Create","id":".cp5gbv5"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *6GB*
* CPU Server *140%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 6GB","title":"Create","id":".cp6gbv5"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *7GB*
* CPU Server *160%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 7GB","title":"Create","id":".cp7gbv5"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *8GB*
* CPU Server *180%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 8GB","title":"Create","id":".cp8gbv5"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *9GB*
* CPU Server *220%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 9GB","title":"Create","id":".cp9gbv5"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *10GB*
* CPU Server *220%*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram 10GB","title":"Create","id":".cp10gbv5"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                              {
                                body: proto.Message.InteractiveMessage.Body.fromObject(
                                  {
                                    text: `*Spesifikasi Server Panel :*

* Status Server *Ready ✅*
* Ram Server *Unlimited*
* CPU Server *Unlimited*`,
                                  }
                                ),
                                footer:
                                  proto.Message.InteractiveMessage.Footer.create(
                                    {
                                      text: "© Powered By " + namabot2,
                                    }
                                  ),
                                header:
                                  proto.Message.InteractiveMessage.Header.fromObject(
                                    {
                                      hasMediaAttachment: false,
                                      ...imgnya,
                                    }
                                  ),
                                nativeFlowMessage:
                                  proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
                                    {
                                      buttons: [
                                        {
                                          name: "quick_reply",
                                          buttonParamsJson:
                                            '{"display_text":"Create Server Ram Unlimited","title":"Create","id":".cpunliv5"}',
                                        },
                                      ],
                                    }
                                  ),
                              },
                            ],
                          }
                        ),
                    }),
                },
              },
            },
            { userJid: m.sender, quoted: qpayment }
          );

          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "cp1gbv4":
      case "cp2gbv4":
      case "cp3gbv4":
      case "cp4gbv4":
      case "cp5gbv4":
      case "cp6gbv4":
      case "cp7gbv4":
      case "cp8gbv4":
      case "cp9gbv4":
      case "cp10gbv4":
      case "cpunliv4":
        {
          if (!isOwner && !isPremium) return reply(msg.owner);
          if (global.panel == null)
            return reply("Nama/Username Tidak Di Temukan");
          var ram;
          var disknya;
          var cpu;
          if (command == "cp1gbv4") {
            ram = "1125";
            disknya = "1125";
            cpu = "40";
          } else if (command == "cp2gbv4") {
            ram = "2125";
            disknya = "2125";
            cpu = "60";
          } else if (command == "cp3gbv4") {
            ram = "3125";
            disknya = "3125";
            cpu = "80";
          } else if (command == "cp4gbv4") {
            ram = "4125";
            disknya = "4125";
            cpu = "100";
          } else if (command == "cp5gbv4") {
            ram = "5125";
            disknya = "5125";
            cpu = "120";
          } else if (command == "cp6gbv4") {
            ram = "6125";
            disknya = "6125";
            cpu = "140";
          } else if (command == "cp7gbv4") {
            ram = "7125";
            disknya = "7125";
            cpu = "160";
          } else if (command == "cp8gbv4") {
            ram = "8125";
            disknya = "8125";
            cpu = "180";
          } else if (command == "cp9gbv4") {
            ram = "9124";
            disknya = "9125";
            cpu = "200";
          } else if (command == "cp10gbv4") {
            ram = "10125";
            disknya = "10125";
            cpu = "220";
          } else {
            ram = "0";
            disknya = "0";
            cpu = "0";
          }
          if (!isOwner && !isPremium) return reply(msg.owner);
          let username = global.panel[0].toLowerCase();
          let email = username + "@gmail.com";
          let name = capital(username);
          let password = username + crypto.randomBytes(2).toString("hex");
          let f = await fetch(domain + "/api/application/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
            body: JSON.stringify({
              email: email,
              username: username.toLowerCase(),
              first_name: name,
              last_name: "Server",
              language: "en",
              password: password.toString(),
            }),
          });
          let data = await f.json();
          if (data.errors)
            return reply(JSON.stringify(data.errors[0], null, 2));
          let user = data.attributes;
          let desc = tanggal(Date.now());
          let usr_id = user.id;
          let f1 = await fetch(
            domain + "/api/application/nests/5/eggs/" + egg,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + apikey,
              },
            }
          );
          let data2 = await f1.json();
          let startup_cmd = data2.attributes.startup;
          let f2 = await fetch(domain + "/api/application/servers", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
            body: JSON.stringify({
              name: name,
              description: desc,
              user: usr_id,
              egg: parseInt(egg),
              docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
              startup: startup_cmd,
              environment: {
                INST: "npm",
                USER_UPLOAD: "0",
                AUTO_UPDATE: "0",
                CMD_RUN: "npm start",
              },
              limits: {
                memory: ram,
                swap: 0,
                disk: disknya,
                io: 500,
                cpu: cpu,
              },
              feature_limits: {
                databases: 5,
                backups: 5,
                allocations: 5,
              },
              deploy: {
                locations: [parseInt(loc)],
                dedicated_ip: false,
                port_range: [],
              },
            }),
          });
          let result = await f2.json();
          if (result.errors)
            return reply(JSON.stringify(result.errors[0], null, 2));
          let server = result.attributes;
          var orang;
          if (isGroup) {
            orang = m.sender;
            await reply(
              "*Berhasil Membuat Akun Panel ✅*\nData Akun Sudah Dikirim Ke Private Chat"
            );
          } else {
            orang = m.chat;
          }
          var teks = `
*Berhasil Membuat Akun Panel ✅*

* *ID :* ${server.id}
* *Nama :* ${name}
* *Ram :* ${ram == "0" ? "Unlimited" : ram.charAt(0) + "GB"}
* *CPU :* ${cpu == "0" ? "Unlimited" : cpu + "%"}
* *Storage :* ${disknya == "0" ? "Unlimited" : disknya.charAt(0) + "GB"}
* *Created :* ${desc}
`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                      mentionedJid: [m.sender],
                      externalAdReply: {
                        showAdAttribution: true,
                      },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teks,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Login Server Panel\",\"url\":\"${global.domain}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_copy",
                              buttonParamsJson: `{\"display_text\":\"Copy Username\",\"id\":\"123456789\",\"copy_code\":\"${user.username}\"}`,
                            },
                            {
                              name: "cta_copy",
                              buttonParamsJson: `{\"display_text\":\"Copy Password\",\"id\":\"123456789\",\"copy_code\":\"${password}\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qchanel }
          );
          await Ibzz.relayMessage(orang, msgii.message, {
            messageId: msgii.key.id,
          });
          global.panel = null;
        }
        break;
      case "cp1gbv5":
      case "cp2gbv5":
      case "cp3gbv5":
      case "cp4gbv5":
      case "cp5gbv5":
      case "cp6gbv5":
      case "cp7gbv5":
      case "cp8gbv5":
      case "cp9gbv5":
      case "cp10gbv5":
      case "cpunliv5":
        {
          if (!isOwner && !isPremium) return reply(msg.owner);
          if (global.panel2 == null)
            return reply("Nama/Username Tidak Di Temukan");
          var ram;
          var disknya;
          var cpu;
          if (command == "cp1gbv5") {
            ram = "1125";
            disknya = "1125";
            cpu = "40";
          } else if (command == "cp2gbv5") {
            ram = "2125";
            disknya = "2125";
            cpu = "60";
          } else if (command == "cp3gbv5") {
            ram = "3125";
            disknya = "3125";
            cpu = "80";
          } else if (command == "cp4gbv5") {
            ram = "4125";
            disknya = "4125";
            cpu = "100";
          } else if (command == "cp5gbv5") {
            ram = "5125";
            disknya = "5125";
            cpu = "120";
          } else if (command == "cp6gbv5") {
            ram = "6125";
            disknya = "6125";
            cpu = "140";
          } else if (command == "cp7gbv5") {
            ram = "7125";
            disknya = "7125";
            cpu = "160";
          } else if (command == "cp8gbv5") {
            ram = "8125";
            disknya = "8125";
            cpu = "180";
          } else if (command == "cp9gbv5") {
            ram = "9124";
            disknya = "9125";
            cpu = "200";
          } else if (command == "cp10gbv5") {
            ram = "10125";
            disknya = "10125";
            cpu = "220";
          } else {
            ram = "0";
            disknya = "0";
            cpu = "0";
          }
          if (!isOwner && !isPremium) return reply(msg.owner);
          let username = global.panel2[0].toLowerCase();
          let email = username + "@gmail.com";
          let name = capital(username);
          let password = username + crypto.randomBytes(2).toString("hex");
          let f = await fetch(domain + "/api/application/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
            body: JSON.stringify({
              email: email,
              username: username.toLowerCase(),
              first_name: name,
              last_name: "Server",
              language: "en",
              password: password.toString(),
            }),
          });
          let data = await f.json();
          if (data.errors)
            return reply(JSON.stringify(data.errors[0], null, 2));
          let user = data.attributes;
          let desc = tanggal(Date.now());
          let usr_id = user.id;
          let f1 = await fetch(
            domain + "/api/application/nests/5/eggs/" + egg,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + apikey,
              },
            }
          );
          let data2 = await f1.json();
          let startup_cmd = data2.attributes.startup;
          let f2 = await fetch(domain + "/api/application/servers", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
            body: JSON.stringify({
              name: name,
              description: desc,
              user: usr_id,
              egg: parseInt(egg),
              docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
              startup: startup_cmd,
              environment: {
                INST: "npm",
                USER_UPLOAD: "0",
                AUTO_UPDATE: "0",
                CMD_RUN: "npm start",
              },
              limits: {
                memory: ram,
                swap: 0,
                disk: disknya,
                io: 500,
                cpu: cpu,
              },
              feature_limits: {
                databases: 5,
                backups: 5,
                allocations: 5,
              },
              deploy: {
                locations: [parseInt(loc)],
                dedicated_ip: false,
                port_range: [],
              },
            }),
          });
          let result = await f2.json();
          if (result.errors)
            return reply(JSON.stringify(result.errors[0], null, 2));
          let server = result.attributes;
          var orang = global.panel2[1];
          await reply(
            `*Berhasil Membuat Akun Panel ✅*\nData Akun Sudah Dikirim Ke Nomor ${
              orang.split("@")[0]
            }`
          );
          var teks = `
*Berhasil Membuat Akun Panel ✅*

* *ID :* ${server.id}
* *Nama :* ${name}
* *Ram :* ${ram == "0" ? "Unlimited" : ram.charAt(0) + "GB"}
* *CPU :* ${cpu == "0" ? "Unlimited" : cpu + "%"}
* *Storage :* ${disknya == "0" ? "Unlimited" : disknya.charAt(0) + "GB"}
* *Created :* ${desc}
`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                      mentionedJid: [m.sender],
                      externalAdReply: {
                        showAdAttribution: true,
                      },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teks,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Login Server Panel\",\"url\":\"${global.domain}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_copy",
                              buttonParamsJson: `{\"display_text\":\"Copy Username\",\"id\":\"123456789\",\"copy_code\":\"${user.username}\"}`,
                            },
                            {
                              name: "cta_copy",
                              buttonParamsJson: `{\"display_text\":\"Copy Password\",\"id\":\"123456789\",\"copy_code\":\"${password}\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qchanel }
          );
          await Ibzz.relayMessage(orang, msgii.message, {
            messageId: msgii.key.id,
          });
          global.panel2 = null;
        }
        break;
      case "listpanel":
      case "listp":
      case "listserver":
        {
          if (global.apikey.length < 1) return reply("Apikey Tidak Ditemukan!");
          let f = await fetch(domain + "/api/application/servers?page=1", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
          });
          let res = await f.json();
          let servers = res.data;
          if (servers.length < 1) return reply("Tidak Ada Server Bot");
          let messageText = "*LIST SERVER PANEL BOT⚡*\n\n";
          for (let server of servers) {
            let s = server.attributes;
            let f3 = await fetch(
              domain +
                "/api/client/servers/" +
                s.uuid.split`-`[0] +
                "/resources",
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + capikey,
                },
              }
            );
            let data = await f3.json();
            let status = data.attributes
              ? data.attributes.current_state
              : s.status;
            messageText += `\`📡ID Server ${s.id}\`
* Nama Server : *${s.name}*
* Ram : *${
              s.limits.memory == 0
                ? "Unlimited"
                : s.limits.memory.length > 3
                ? s.limits.memory.toString().charAt(1) + "GB"
                : s.limits.memory.toString().charAt(0) + "GB"
            }*
* CPU : *${s.limits.cpu == 0 ? "Unlimited" : s.limits.cpu.toString() + "%"}*
* Storage : *${
              s.limits.disk == 0
                ? "Unlimited"
                : s.limits.disk.length > 3
                ? s.limits.disk.toString().charAt(1) + "GB"
                : s.limits.disk.toString().charAt(0) + "GB"
            }*
* Created : ${s.created_at.split("T")[0]}\n\n`;
          }

          messageText += ` Total Server : *${res.meta.pagination.count} Server*`;

          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                      mentionedJid: [m.sender],
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: messageText,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "quick_reply",
                              buttonParamsJson:
                                '{"display_text":"Buat Server Panel","title":"Buat Panel","id":".cpanel"}',
                            },
                            {
                              name: "quick_reply",
                              buttonParamsJson:
                                '{"display_text":"Hapus Server Panel","title":"Hapus Panel","id":".delpanel"}',
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: m }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "delpanel":
        {
          let kontol = new Array();
          let f = await fetch(domain + "/api/application/servers?page=1", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
          });
          let res = await f.json();
          let servers = res.data;
          if (servers.length < 1) return reply("Tidak Ada Server Bot");
          for (let server of servers) {
            let s = server.attributes;
            let f3 = await fetch(
              domain +
                "/api/client/servers/" +
                s.uuid.split`-`[0] +
                "/resources",
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + capikey,
                },
              }
            );
            let data = await f3.json();
            let status = data.attributes
              ? data.attributes.current_state
              : s.status;
            let namanya = `${s.name}`;
            let idnya = `${s.id} ⚡`;
            let ramnya = `${
              s.limits.memory == 0
                ? "Unlimited"
                : s.limits.memory.length > 3
                ? s.limits.memory.toString().charAt(1) + "GB"
                : s.limits.memory.toString().charAt(0) + "GB"
            }`;
            let cpunya = `${
              s.limits.cpu == 0 ? "Unlimited" : s.limits.cpu.toString() + "%"
            }`;
            let disknya = `${
              s.limits.disk == 0
                ? "Unlimited"
                : s.limits.disk.length > 3
                ? s.limits.disk.toString().charAt(1) + "GB"
                : s.limits.disk.toString().charAt(0) + "GB"
            }`;
            await kontol.push({
              header: `ID Server ${idnya}`,
              title: `Nama Server : ${namanya}`,
              description: `Ram ${ramnya} | Cpu ${cpunya} | Disk ${disknya}`,
              id: `.respon_delpanel ${idnya}`,
            });
          }
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: "\nSilahkan Pilih *Server Panel* Yang Ingin Kamu Hapus, Untuk Melihat Lebih Detail Info Server Ketik *.listpanel*",
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "single_select",
                              buttonParamsJson: `{ title : "Klik Disini",
sections: [{
title: "Total Server Panel : ${res.meta.pagination.count} Server",
rows: ${JSON.stringify(kontol)}
}]}`,
                            },
                            {
                              name: "quick_reply",
                              buttonParamsJson:
                                '{"display_text":"List Server Panel","title":"List Panel","id":".listpanel"}',
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: m }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "respon_delpanel":
        {
          if (!isOwner && !isPremium) return reply(msg.owner);
          if (global.apikey.length < 1) return reply("Apikey Tidak Ditemukan!");
          if (!args[0])
            return reply(
              example(
                "idservernya\n\nuntuk melihat id server ketik *.listpanel*"
              )
            );
          let f = await fetch(domain + "/api/application/servers?page=1", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
          });
          let result = await f.json();
          let servers = result.data;
          let sections = [];
          for (let server of servers) {
            let s = server.attributes;
            if (args[0] == s.id.toString()) {
              sections.push(s.name.toLowerCase());
              let f = await fetch(domain + `/api/application/servers/${s.id}`, {
                method: "DELETE",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + apikey,
                },
              });
              let res = f.ok
                ? {
                    errors: null,
                  }
                : await f.json();
            }
          }
          let cek = await fetch(domain + "/api/application/users?page=1", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
          });
          let res2 = await cek.json();
          let users = res2.data;
          for (let user of users) {
            let u = user.attributes;
            if (sections.includes(u.username)) {
              let delusr = await fetch(
                domain + `/api/application/users/${u.id}`,
                {
                  method: "DELETE",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + apikey,
                  },
                }
              );
              let res = delusr.ok
                ? {
                    errors: null,
                  }
                : await delusr.json();
            }
          }
          if (sections.length == 0)
            return reply("*ID Server/User* Tidak Ditemukan");
          reply(`*Berhasil Menghapus Akun Panel ✅*
Nama Server : *${capital(sections[0])}*`);
        }
        break;
      case "sendpayment":
      case "payment":
      case "pay":
      case "listpayment":
        {
          if (!isOwner) return reply(msg.owner);
          let teksnya = `
Silahkan Pilih Payment Pembayaran Yang Tersedia Di Bawah Ini`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                      mentionedJid: [m.sender],
                      externalAdReply: {
                        showAdAttribution: true,
                      },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teksnya,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "single_select",
                              buttonParamsJson: `{ "title": "List Payment", "sections": [{ "title": "# Silahkan Pilih Salah Satu Di Bawah Ini", "highlight_label": \"Powered By ${namaowner}\", "rows": [{ "header": "Dana", "title": "Dana Payment", "id": ".dana" }, 
{ "header": "Ovo", "title": "Ovo Payment", "id": ".ovo" }, 
{ "header": "Gopay", "title": "Gopay Payment", "id": ".gopay" }, 
{ "header": "QRIS", "title": "QRIS Payment", "id": ".qris" }]}]}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qpayment }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "ambilq":
        {
          let jsonData = JSON.stringify(
            { [m.quoted.mtype]: m.quoted },
            null,
            2
          );
          reply(jsonData);
        }
        break;
      case "dana":
        {
          if (global.dana == false) return reply("Memproses Mengambil Nope Dana, Tunggu Sebentar . . .");
          let teks = `
*Nomor Dana :*
${global.dana}

*Note :*
Demi Keamanan Bersama, Buyyer Wajib Mengirim Bukti Pembayaran Agar Tidak Terjadi Hal Yang Tidak Di Inginkan!
`;
          Ibzz.sendText(m.chat, teks, qchanel);
        }
        break;
      case "ovo":
        {
          if (global.ovo == false) return reply("Memproses Mengambil Nope Ovo, Tunggu Sebentar . . .");
          let teks = `
*Nomor Ovo :*
${global.ovo}

*Note :*
Demi Keamanan Bersama, Buyyer Wajib Mengirim Bukti Pembayaran Agar Tidak Terjadi Hal Yang Tidak Di Inginkan!
`;
          Ibzz.sendText(m.chat, teks, qchanel);
        }
        break;
      case "gopay":
        {
          if (global.gopay == false)
            return reply("Memproses Mengambil Nope Gopay, Tunggu Sebentar . . .");
          let teks = `
*Nomor Gopay :*
${global.gopay}

*Note :*
Demi Keamanan Bersama, Buyyer Wajib Mengirim Bukti Pembayaran Agar Tidak Terjadi Hal Yang Tidak Di Inginkan!
`;
          Ibzz.sendText(m.chat, teks, qchanel);
        }
        break;
      case "qris":
        {
          if (global.qris == false) return reply("Payment Qris Tidak Tersedia");
          reply("Memproses Mengambil QRIS, Tunggu Sebentar . . .");
          let teks = `
*Untuk Pembayaran Melalui QRIS All Payment, Silahkan Scan Foto QRIS Diatas Ini*

*Note :*
Demi Keamanan Bersama, Buyyer Wajib Mengirim Bukti Pembayaran Agar Tidak Terjadi Hal Yang Tidak Di Inginkan!
`;
          Ibzz.sendMessage(
            m.chat,
            { image: global.qris, caption: teks },
            { quoted: qchanel }
          );
        }
        break;
      case "jadibot":
        {
          if (isGroup) return reply("Features Used Only For Private Chat!");
          //if (!isReseller) return reply("Kamu Belum Menjadi User Premium Silahkan Beli Premium Ke Owner Dengan Ketik .owner")
          jadibot(Ibzz, m, from);
        }
        break;
      case "stopjadibot":
        {
          if (isGroup) return reply("Features Used Only For Private Chat!");
          //if (!isReseller) return reply("Kamu Belum Menjadi User Premium Silahkan Beli Premium Ke Owner Dengan Ketik .owner")
          stopjadibot(Ibzz, from);
        }
        break;
      case "listjadibot": {
        if (isGroup) return reply("Features Used Only For Private Chat!");
        //if (!isReseller) return reply("Kamu Belum Menjadi User Premium Silahkan Beli Premium Ke Owner Dengan Ketik .owner")
        listjadibot(Ibzz, m);
      }
      case "cpanel3":
      case "addpanel3":
      case "buatpanel3":
        {
          if (!jangan) return reply("Group Belum Terdaftar");
          if (global.apikey.length < 1) return reply("Apikey Tidak Ditemukan!");
          if (!args[0]) return reply(example("nama,6283XXX"));
          if (!text.split(",")) return reply(example("nama,6283XXX"));
          var buyyer = text.split(",")[0].toLowerCase();
          if (!buyyer) return reply(example("nama,6283XXX"));
          var ceknya = text.split(",")[1];
          if (!ceknya) return reply(example("nama,6283XXX"));
          var client =
            text.split(",")[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          var check = await Ibzz.onWhatsApp(ceknya);
          if (!check[0].exists) return reply("Nomor Buyyer Tidak Valid!");
          global.panel3 = [buyyer, client];
          let teksnya = "Silahkan Pilih Ram Server Panel";
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                      mentionedJid: [m.sender],
                      externalAdReply: {
                        showAdAttribution: true,
                      },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teksnya,
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                      text: global.foother,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "single_select",
                              buttonParamsJson: `{ "title": "Pilih Ram Panel", "sections": [{ "title": "# Silahkan Pilih Salah Satu Di Bawah Ini", "highlight_label": \"Powered By ${namaowner}\", "rows": [{ "header": "Ram Unlimited", "title": "Ram Unlimited | CPU Unlimited", "id": ".cpunliv3" }, 
{ "header": "Ram 1GB", "title": "Ram 1GB | CPU 40%", "id": ".cp1gbv3" }, 
{ "header": "Ram 2GB", "title": "Ram 2GB | CPU 60%", "id": ".cp2gbv3" }, 
{ "header": "Ram 3GB", "title": "Ram 3GB | CPU 80%", "id": ".cp3gbv3" }, 
{ "header": "Ram 4GB", "title": "Ram 4GB | CPU 100%", "id": ".cp4gbv3" }, 
{ "header": "Ram 5GB", "title": "Ram 5GB | CPU 120%", "id": ".cp5gbv3" }, 
{ "header": "Ram 6GB", "title": "Ram 6GB | CPU 140%", "id": ".cp6gbv3" }, 
{ "header": "Ram 7GB", "title": "Ram 7GB | CPU 160%", "id": ".cp7gbv3" }, 
{ "header": "Ram 8GB", "title": "Ram 8GB | CPU 180%", "id": ".cp8gbv3" }, 
{ "header": "Ram 9GB", "title": "Ram 9GB | CPU 200%", "id": ".cp9gbv3" }, 
{ "header": "Ram 10GB", "title": "Ram 10GB | CPU 220%", "id": ".cp10gbv3" }]}]}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qchanel }
          );
          await Ibzz.relayMessage(msgii.key.remoteJid, msgii.message, {
            messageId: msgii.key.id,
          });
        }
        break;
      case "cp1gbv3":
      case "cp2gbv3":
      case "cp3gbv3":
      case "cp4gbv3":
      case "cp5gbv3":
      case "cp6gbv3":
      case "cp7gbv3":
      case "cp8gbv3":
      case "cp9gbv3":
      case "cp10gbv3":
      case "cpunliv3":
        {
          if (global.panel3 == null)
            return reply("Nama/Username Tidak Di Temukan");
          var ram;
          var disknya;
          var cpu;
          if (command == "cp1gbv3") {
            ram = "1125";
            disknya = "1125";
            cpu = "40";
          } else if (command == "cp2gbv3") {
            ram = "2125";
            disknya = "2125";
            cpu = "60";
          } else if (command == "cp3gbv3") {
            ram = "3125";
            disknya = "3125";
            cpu = "80";
          } else if (command == "cp4gbv3") {
            ram = "4125";
            disknya = "4125";
            cpu = "100";
          } else if (command == "cp5gbv3") {
            ram = "5125";
            disknya = "5125";
            cpu = "120";
          } else if (command == "cp6gbv3") {
            ram = "6125";
            disknya = "6125";
            cpu = "140";
          } else if (command == "cp7gbv3") {
            ram = "7125";
            disknya = "7125";
            cpu = "160";
          } else if (command == "cp8gbv3") {
            ram = "8125";
            disknya = "8125";
            cpu = "180";
          } else if (command == "cp9gbv3") {
            ram = "9124";
            disknya = "9125";
            cpu = "200";
          } else if (command == "cp10gbv3") {
            ram = "10125";
            disknya = "10125";
            cpu = "220";
          } else {
            ram = "0";
            disknya = "0";
            cpu = "0";
          }
          if (!jangan) return reply("Grup Belum Terdaftar");
          let username = global.panel3[0].toLowerCase();
          let email = username + "@gmail.com";
          let name = capital(username);
          let password = username + crypto.randomBytes(2).toString("hex");
          let f = await fetch(domain + "/api/application/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
            body: JSON.stringify({
              email: email,
              username: username.toLowerCase(),
              first_name: name,
              last_name: "Server",
              language: "en",
              password: password.toString(),
            }),
          });
          let data = await f.json();
          if (data.errors)
            return reply(JSON.stringify(data.errors[0], null, 2));
          let user = data.attributes;
          let desc = tanggal(Date.now());
          let usr_id = user.id;
          let f1 = await fetch(
            domain + "/api/application/nests/5/eggs/" + egg,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + apikey,
              },
            }
          );
          let data2 = await f1.json();
          let startup_cmd = data2.attributes.startup;
          let f2 = await fetch(domain + "/api/application/servers", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
            body: JSON.stringify({
              name: name,
              description: desc,
              user: usr_id,
              egg: parseInt(egg),
              docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
              startup: startup_cmd,
              environment: {
                INST: "npm",
                USER_UPLOAD: "0",
                AUTO_UPDATE: "0",
                CMD_RUN: "npm start",
              },
              limits: {
                memory: ram,
                swap: 0,
                disk: disknya,
                io: 500,
                cpu: cpu,
              },
              feature_limits: {
                databases: 5,
                backups: 5,
                allocations: 5,
              },
              deploy: {
                locations: [parseInt(loc)],
                dedicated_ip: false,
                port_range: [],
              },
            }),
          });
          let result = await f2.json();
          if (result.errors)
            return reply(JSON.stringify(result.errors[0], null, 2));
          let server = result.attributes;
          await reply(
            `*Berhasil Membuat Akun Panel ✅*\nData Akun Sudah Dikirim Ke Nomor ${
              global.panel3[1].split("@")[0]
            }`
          );
          var teks = `
*Berhasil Membuat Akun Panel Dari Rim Offc ✅*

* *ID :* ${server.id}
* *Nama :* ${name}
* *Ram :* ${ram == "0" ? "Unlimited" : ram.charAt(0) + "GB"}
* *CPU :* ${cpu == "0" ? "Unlimited" : cpu + "%"}
* *Storage :* ${disknya == "0" ? "Unlimited" : disknya.charAt(0) + "GB"}
* *Created :* ${desc}
`;
          let msgii = generateWAMessageFromContent(
            m.chat,
            {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                      mentionedJid: [m.sender],
                      externalAdReply: {
                        showAdAttribution: true,
                      },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: teks,
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                      text: global.foother,
                    }),
                    nativeFlowMessage:
                      proto.Message.InteractiveMessage.NativeFlowMessage.create(
                        {
                          buttons: [
                            {
                              name: "cta_url",
                              buttonParamsJson: `{\"display_text\":\"Login Server Panel\",\"url\":\"${global.domain}\",\"merchant_url\":\"https://www.google.com\"}`,
                            },
                            {
                              name: "cta_copy",
                              buttonParamsJson: `{\"display_text\":\"Copy Username\",\"id\":\"123456789\",\"copy_code\":\"${user.username}\"}`,
                            },
                            {
                              name: "cta_copy",
                              buttonParamsJson: `{\"display_text\":\"Copy Password\",\"id\":\"123456789\",\"copy_code\":\"${password.toString()}\"}`,
                            },
                          ],
                        }
                      ),
                  }),
                },
              },
            },
            { userJid: m.sender, quoted: qchanel }
          );
          await Ibzz.relayMessage(global.panel3[1], msgii.message, {
            messageId: msgii.key.id,
          });
          global.panel3 = null;
        }
        break;

      case "delgc":
        if (!isOwner) return reply("Maaf, command ini hanya untuk pemilik.");
        if (!isGroup) return reply("Khusus Grup");
        var ini = pler.indexOf(m.chat);
        pler.splice(ini, 1);
        fs.writeFileSync("./all/database/idgrup.json", JSON.stringify(pler));
        reply(`${command} Success Not Active 𝐑𝐢𝐦 - Official✅`);
        break;
      case "addgc":
        if (!isOwner) return reply("Maaf, command ini hanya untuk pemilik.");
        if (!isGroup) return reply("Khusus Grup");
        pler.push(m.chat);
        fs.writeFileSync("./all/database/idgrup.json", JSON.stringify(pler));
        reply(`${command} Success Active To Reseller Panel  𝐑𝐢𝐦 - Official✅`);
      default:
        if (budy.startsWith("$")) {
          if (!isOwner) return;
          exec(budy.slice(2), (err, stdout) => {
            if (err)
              return Ibzz.sendMessage(
                m.chat,
                { text: err.toString() },
                { quoted: m }
              );
            if (stdout)
              return Ibzz.sendMessage(
                m.chat,
                { text: util.format(stdout) },
                { quoted: m }
              );
          });
        }

        if (budy.startsWith(">")) {
          if (!isOwner) return;
          try {
            let evaled = await eval(text);
            if (typeof evaled !== "string") evaled = util.inspect(evaled);
            Ibzz.sendMessage(
              m.chat,
              { text: util.format(evaled) },
              { quoted: m }
            );
          } catch (e) {
            Ibzz.sendMessage(m.chat, { text: util.format(e) }, { quoted: m });
          }
        }

        if (budy.startsWith("=>")) {
          if (!isOwner) return;
          try {
            const evaling = await eval(`;(async () => { ${text} })();`);
            return Ibzz.sendMessage(
              m.chat,
              { text: util.format(evaling) },
              { quoted: m }
            );
          } catch (e) {
            return Ibzz.sendMessage(
              m.chat,
              { text: util.format(e) },
              { quoted: m }
            );
          }
        }
    }
  } catch (e) {
    console.log(e);
    Ibzz.sendMessage(
      `${owner}@s.whatsapp.net`,
      {
        text: `${util.format(e)}

Command From : ${m.sender.split("@")[0]}`,
      },
      { quoted: m }
    );
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
