import { EmailNotificationService } from "./infra/services/EmailNotificationService.js";
import { RSSFetchNewsService } from "./infra/services/RSSFetchNewsService.js";
import { TelegramNotificationService } from "./infra/services/TelegramNotificationService.js";

const rssFetchNewsService = new RSSFetchNewsService();
const emailNotificationService = new EmailNotificationService();
const telegramNotificationService = new TelegramNotificationService();
(async () => {
  const news = await rssFetchNewsService.fetchLatestNews(["technology"]);
  await emailNotificationService.notify({
    news,
    recipient: { email: "felipegadelha2004@gmail.com" },
  });
  await telegramNotificationService.notify({
    news,
    recipient: { telegramChatId: "5666871731" },
  });
})();
