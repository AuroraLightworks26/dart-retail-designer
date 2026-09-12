import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { JWT } from 'google-auth-library';

type Bindings = {
  GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
  GOOGLE_PRIVATE_KEY: string;
  GOOGLE_SHEET_ID: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for Jaspr Client
app.use('/api/*', cors({
  origin: ['*'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}));

// Retrieve Google Auth Token via Service Account
async function getGoogleAuthToken(env: Bindings, scopes: string[]) {
  const privateKey = env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
  const client = new JWT({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes,
  });
  const tokens = await client.getAccessToken();
  return tokens.token;
}

// REST Sync Route
app.post('/api/sync', async (c) => {
  try {
    const payload = await c.req.json();
    const token = await getGoogleAuthToken(c.env, [
      'https://www.googleapis.com/auth/spreadsheets',
    ]);

    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${c.env.GOOGLE_SHEET_ID}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`;

    const response = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [[
          payload.styleNumber,
          payload.price,
          payload.department,
          new Date().toISOString(),
        ]],
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API Error: ${await response.text()}`);
    }

    return c.json({ status: 'success', syncedAt: new Date().toISOString() });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

export default app;