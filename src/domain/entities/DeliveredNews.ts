interface DeliveredNewsProps {
  link: string;
  topic: string;
  userId: string;
  sentAt?: Date;
}
export class DeliveredNews {
  private props: DeliveredNewsProps;
  private _id?: string;

  constructor(props: DeliveredNewsProps) {
    if (!props.link?.trim()) throw new Error("Link cannot be empty");
    if (!props.topic?.trim()) throw new Error("Topic cannot be empty");
    if (!props.userId?.trim()) throw new Error("UserId cannot be empty");
    this.props = props;
  }

  get link() {
    return this.props.link;
  }
  get topic() {
    return this.props.topic;
  }
  get userId() {
    return this.props.userId;
  }
  get sentAt() {
    return this.props.sentAt;
  }
  get Id() {
    return this._id;
  }
}
