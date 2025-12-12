interface NewsProps {
  title: string;
  content: string;
  publishedAt: Date;
  images?: string[];
  topic: string;
  link: string;
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
  get topic() {
    return this.props.topic;
  }
  get link() {
    return this.props.link;
  }
}
