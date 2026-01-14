import tmi from "tmi.js";

const client = new tmi.Client({
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.BOT_OAUTH
  },
  channels: [process.env.CHANNEL]
});

client.connect().catch(console.error);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).end();
    return;
  }
  const { mensaje } = req.body;

  await client.say(process.env.CHANNEL, mensaje);

  res.status(200).json({ sent: true });
}
