const TelegramBot = require('node-telegram-bot-api');
const config = require('./config/configs');
const bot = new TelegramBot(config.token, {polling: true});
let mediaID;
let chatID;

let arrombados = config.arrombados;
let pagantes = config.pagantes;
let msgArrombados;
// Cross   \u{274C}
// Check   \u{2705}
bot.onText(/\/pagar/, (msg) => {
    const chatId = msg.chat.id;
    const opts = {
        reply_markup:
            {
                inline_keyboard: [[
                    {
                        text: 'Picpay',
                        callback_data: 'picpay'
                    },
                    {
                        text: 'BB',
                        callback_data: 'bb'
                    },
                    {
                        text: 'Nuconta',
                        callback_data: 'nuconta'
                    },
                    {
                        text: 'Caixa',
                        callback_data: 'caixa'
                    }
                ]]
            }
    };
    bot.sendMessage(chatId, "Quer pagar como arrombado? (26 bozos)", opts);
    bot.sendPhoto(chatId,config.media.start).then(resp => {
        mediaID = resp.message_id;
        chatID = resp.chat.id;
    });
});

bot.onText(/\/paguei/, (msg) => {
    const chatId = msg.chat.id;
    const paganteName = msg.from.first_name;
    // const newPagante = "\n\u{274C} "+paganteName;
    // console.log(msg);
    for (let i = 0; i<arrombados.length; i++){
        if(arrombados[i] == paganteName) {
            if(i==0)
                msgArrombados = "\u{2705} " + arrombados[i];
            else
                msgArrombados += "\n\u{2705} " + arrombados[i];
            pagantes[i] = true;
        }
        else {
            if(i==0)
                msgArrombados = "\u{274C} " + arrombados[i];
            else
                msgArrombados += "\n\u{274C} " + arrombados[i];
        }
    }
    bot.sendMessage(chatId, msgArrombados);
});

bot.onText(/\/naopaguei/, (msg) => {
    const chatId = msg.chat.id;
    const paganteName = msg.from.first_name;
    // const newPagante = "\n\u{274C} "+paganteName;
    // console.log(msg);
    for (let i = 0; i<arrombados.length; i++){
        if(arrombados[i] == paganteName) {
            if(i==0)
                msgArrombados = "\u{274C} " + arrombados[i];
            else
                msgArrombados += "\n\u{274C} " + arrombados[i];
        }
        else {
            if(i==0)
                msgArrombados = "\u{2705} " + arrombados[i];
            else
                msgArrombados += "\n\u{2705} " + arrombados[i];
        }
    }
    bot.sendMessage(chatId, msgArrombados);
});

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const opts = {
        chat_id: chatID,
        message_id: mediaID
    };
    if (action === 'picpay') {
        let link = config.link.picpay;
        bot.editMessageMedia({type: 'photo', media: 'https://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data='+link+'&qzone=1&margin=0&size=400x400&ecc=L&format=png', caption: link}, opts);
    }
    else if (action === 'bb') {
        let link = config.link.bb;
        bot.editMessageMedia({type: 'photo', media: 'https://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data='+link+'&qzone=1&margin=0&size=400x400&ecc=L&format=png', caption: link}, opts);
    }
    else if (action === 'nuconta') {
        let link = config.link.nuconta;
        bot.editMessageMedia({type: 'photo', media: 'https://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data='+link+'&qzone=1&margin=0&size=400x400&ecc=L&format=png', caption: link}, opts);
    }
    else if (action === 'caixa') {
        let link = config.link.caixa;
        bot.editMessageMedia({type: 'photo', media: config.media.caixa, caption: link}, opts);
    }
    // console.log(msg);
    // bot.answerCallbackQuery(callbackQuery.id, "Teste de Alerta", true);
});