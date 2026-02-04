import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendOrderNotification = action({
  args: {
    orderId: v.string(),
    name: v.string(),
    phone: v.string(),
    pickup_location: v.string(),
    dropoff_location: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in Convex environment");
      return { success: false, error: "Configuration missing" };
    }

    const orderIdShort = args.orderId.slice(-6);

    const message = `
📦 طلب توصيل جديد #${orderIdShort}

👤 الاسم: ${args.name}
📞 الهاتف: ${args.phone}
📍 من: ${args.pickup_location}
📦 إلى: ${args.dropoff_location}
📝 ملاحظات: ${args.notes || "-"}
`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      const data = await response.json();
      if (!data.ok) {
        console.error("Telegram API Error:", data.description);
        return { success: false, error: data.description };
      }

      return { success: true };
    } catch (error: any) {
      console.error("Failed to send Telegram notification:", error);
      return { success: false, error: error.message };
    }
  },
});
