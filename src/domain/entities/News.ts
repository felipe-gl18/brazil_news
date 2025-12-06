interface NewsProps {
  title: string;
  content: string;
  publishedAt: Date;
  images?: string[];
  topics: string[];
}

export class News {
  private props: NewsProps;

  constructor(props: NewsProps) {
    if (!props.title?.trim()) throw new Error("Tittle cannot be empty");
    if (!props.content?.trim()) throw new Error("Content cannot be empty");

    this.props = props;
  }

  get title() {
    return this.props.title;
  }
  get content() {
    return this.props.content;
  }
  get publishedAt() {
    return this.props.publishedAt;
  }
  get images() {
    return this.props.images;
  }
  get topics() {
    return this.props.topics;
  }
}
