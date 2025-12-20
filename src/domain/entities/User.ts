import { Email } from "../valueObjects/Email.js";
import { TelegramChatId } from "../valueObjects/TelegramChatId.js";

interface UserProps {
  name: string;
  email: Email;
  telegramChatId?: TelegramChatId;
  topics: string[];
}

export class User {
  private props: UserProps;
  private _id?: string;

  constructor(props: UserProps) {
    if (!props.name?.trim()) throw new Error("Name cannot be empty");
    if (!props.topics || props.topics.length === 0)
      throw new Error("User must have at least one topic");

    this.props = props;
  }

  setId(id: string) {
    if (this._id) throw new Error("ID has already been set");
    this._id = id;
  }

  get id() {
    return this._id;
  }
  get email() {
    return this.props.email;
  }
  get telegramChatId() {
    return this.props.telegramChatId;
  }
  get name() {
    return this.props.name;
  }
  get topics() {
    return this.props.topics;
  }
  updateTopics(topics: string[]) {
    if (topics.length === 0)
      throw new Error("User must have at least one topic");

    this.props.topics = topics;
  }
}
