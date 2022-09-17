import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN!;
const bot = new TelegramBot(token);

export default async function handler(req, res) {
  await bot.sendMessage(1694554229, 'Get in contact: ' + req.body.email);
  res.status(200).json({});
}
