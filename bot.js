import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Bot } from 'node-telegram-bot-api';
import { run } from 'node-telegram-bot-api/node';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const statePath = path.join(__dirname, 'bot-state.json');
const envPath = path.join(__dirname, '.env');

const loadEnvFile = async () => {
  try {
    const raw = await fs.readFile(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
        continue;
      }

      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value.replace(/^['"]|['"]$/g, '');
    }
  } catch (error) {
    // Ignore missing .env file; environment variables may be provided externally.
  }
};

await loadEnvFile();
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.warn('TELEGRAM_BOT_TOKEN topilmadi. Bot ishlamayapti. .env faylga haqiqiy token qo\'ying: TELEGRAM_BOT_TOKEN=YOUR_TOKEN');
}

const normalizePhone = (value = '') => String(value).replace(/\D/g, '');

const readVerifiedPhones = async () => {
  try {
    const raw = await fs.readFile(statePath, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    return {};
  }
};

const writeVerifiedPhones = async (phones) => {
  await fs.writeFile(statePath, JSON.stringify(phones, null, 2), 'utf8');
};

const saveVerifiedPhone = async (phone, chatId) => {
  const phones = await readVerifiedPhones();
  const normalizedPhone = normalizePhone(phone);

  if (!normalizedPhone) {
    return { ok: false, reason: 'empty' };
  }

  const chatKey = String(chatId || 'unknown');
  const existingByChat = phones[chatKey];

  if (existingByChat && existingByChat.phone && existingByChat.phone !== normalizedPhone) {
    return { ok: false, reason: 'mismatch', phone: existingByChat.phone };
  }

  phones[chatKey] = {
    phone: normalizedPhone,
    chatId: chatKey,
    updatedAt: Date.now(),
  };

  phones[normalizedPhone] = {
    phone: normalizedPhone,
    chatId: chatKey,
    updatedAt: Date.now(),
  };

  await writeVerifiedPhones(phones);
  return { ok: true, phone: normalizedPhone };
};

if (!token) {
  console.log('Telegram bot o\'chirilgan holda ishlayapti. Real token qo\'shilgach, bot avtomatik ishga tushadi.');
  process.exit(0);
}

const bot = new Bot(token);

bot.command('start', async (ctx) => {
  const firstName = ctx.from?.first_name || 'do\'st';
  const lastName = ctx.from?.last_name || '';
  const displayName = [firstName, lastName].filter(Boolean).join(' ') || ctx.from?.username || 'do\'st';

  await ctx.reply(`Salom, ${displayName}!\n\nSiz Raqamli biznes nazorati botga xush kelibsiz.\nRaqamingiz faollashishi uchun menga raqamingizni yuboring.`, {
    reply_markup: {
      keyboard: [[{ text: '📞 Raqamni yuborish', request_contact: true }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

bot.on('message', async (ctx) => {
  const phone = ctx.message?.contact?.phone_number;

  if (!phone) {
    return;
  }

  const result = await saveVerifiedPhone(phone, ctx.chat?.id);

  if (result?.ok === false && result.reason === 'mismatch') {
    await ctx.reply('Bu raqam sizga tegishli emas. Telegram akkauntingizga biriktirilgan raqamni qayta yuboring.', {
      reply_markup: { remove_keyboard: true },
    });
    return;
  }

  if (result?.ok === false && result.reason === 'empty') {
    await ctx.reply('Telefon raqami topilmadi. Qayta urinib ko\'ring.', {
      reply_markup: { remove_keyboard: true },
    });
    return;
  }

  await ctx.reply(`Raqamingiz serverga yozildi: ${result.phone}.`, {
    reply_markup: { remove_keyboard: true },
  });
});

bot.catch((err) => {
  console.warn('Telegram bot token yoki ulanish xatosi. .env dagi TOKEN tekshiring:', err?.message || err);
  process.exit(0);
});

console.log('Telegram bot ishga tushdi.');
await run(bot);
