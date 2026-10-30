const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'temudonutsmp-s1.aternos.me',
    port: 20420,
    username: 'BotOffici',
    version: false
  });

  bot.on('login', () => {
    console.log('[NPC] Conexión establecida con el servidor de Minecraft.');
  });

  bot.on('spawn', () => {
    console.log('[NPC] El bot ha aparecido correctamente en el mapa.');
  });

  // Anti-AFK: jump every 45 seconds
  setInterval(() => {
    if (!bot.entity) return;

    bot.setControlState('jump', true);

    setTimeout(() => {
      bot.setControlState('jump', false);
    }, 500);

    console.log('[NPC] Acción anti-inactividad completada con éxito.');
  }, 45000);

  bot.on('end', (reason) => {
    console.log(`[NPC] Conexión finalizada por: ${reason}. Reintentando en 25 segundos...`);
    setTimeout(createBot, 25000);
  });

  bot.on('error', (err) => {
    console.log(`[NPC] Error de red: ${err.message}`);
  });
}

createBot();
