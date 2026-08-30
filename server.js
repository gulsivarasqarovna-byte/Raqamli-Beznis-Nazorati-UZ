import express from 'express';
import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const envPath = path.join(__dirname, '.env');

const loadEnvFile = async () => {
  try {
    const raw = await readFile(envPath, 'utf8');
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
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');
const statePath = path.join(__dirname, 'bot-state.json');

const normalizePhone = (value = '') => String(value).replace(/\D/g, '');

const readVerifiedPhones = async () => {
  try {
    const raw = await readFile(statePath, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    return {};
  }
};

const checkTelegramStart = async (phone) => {
  const normalized = normalizePhone(phone);

  if (!normalized) {
    return false;
  }

  const verifiedPhones = await readVerifiedPhones();
  return Boolean(verifiedPhones[normalized]);
};

if (!existsSync(indexPath)) {
  console.warn('dist/index.html not found. Run "npm run build" before starting the server.');
}

app.use(express.json());
app.use(express.static(distPath));

app.post('/api/verify-telegram-start', async (req, res) => {
  const phone = normalizePhone(req.body?.phone);

  if (!phone || phone.length < 9) {
    return res.status(400).json({ verified: false, reason: 'invalid-phone', error: 'Telefon raqam noto\'g\'ri.' });
  }

  try {
    const verified = await checkTelegramStart(phone);
    return res.json({ verified, reason: verified ? 'match' : 'mismatch' });
  } catch (error) {
    console.error('Telegram verification failed:', error);
    return res.status(500).json({ verified: false, reason: 'telegram-error-fallback', error: 'Telegram tekshiruvi amalga oshmadi.' });
  }
});

app.get('*', (req, res) => {
  if (!existsSync(indexPath)) {
    return res.status(503).send('Build not found. Please run "npm run build" first.');
  }

  res.sendFile(indexPath);
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the running process or use another port: PORT=3001 npm start`);
    process.exit(1);
  }

  console.error('Server error:', error.message);
  process.exit(1);
});
