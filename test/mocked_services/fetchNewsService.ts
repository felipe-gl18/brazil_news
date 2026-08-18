import { IFetchNewsService } from "../../src/application/interfaces/IFetchNewsService";

const fetchNewsService: IFetchNewsService = {
  async fetchLatestNews(topics) {
    return [
      {
        content: "content",
        link: "",
        publishedAt: new Date(),
        title: "title",
        topic: "fitness",
      },
    ];
  },
};
export { fetchNewsService };
