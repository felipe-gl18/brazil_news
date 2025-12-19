import { FetchNewsDTO } from "../../application/dtos/FetchNewsDTO";
import { IFetchNewsService } from "../../application/services/IFetchNewsService";
import { News } from "../../domain/entities/News.js";
import Parser from "rss-parser";
const BBC_FEEDS: Record<string, string> = {
  technology: "https://feeds.bbci.co.uk/news/technology/rss.xml",
  business: "https://feeds.bbci.co.uk/news/business/rss.xml",
  health: "https://feeds.bbci.co.uk/news/health/rss.xml",
  world: "https://feeds.bbci.co.uk/news/world/rss.xml",
};
export class RSSFetchNewsService implements IFetchNewsService {
  private rssParser: Parser;
  constructor() {
    this.rssParser = new Parser({});
  }
  async fetchLatestNews(topics: string[]): Promise<FetchNewsDTO[]> {
    const feeds = topics.map((topic) => BBC_FEEDS[topic]).filter(Boolean);
    const results = await Promise.all(
      feeds.map(async (feedUrl) => {
        const { items } = await this.rssParser.parseURL(feedUrl);
        return items.map(
          (item) =>
            new News({
              title: item.title!,
              content: item.content!,
              link: item.link!,
              publishedAt: new Date(item.pubDate!),
              topic: this.resolveTopic(feedUrl),
            })
        );
      })
    );
    const flattedNews = results.flat();
    // limiting the amount of news to 6
    const slicedNews = flattedNews.slice(0, 6);
    return slicedNews;
  }
  private resolveTopic(feedURL: string): string {
    return (
      Object.entries(BBC_FEEDS).find(([, url]) => url === feedURL)?.[0] ??
      "unknown"
    );
  }
}
