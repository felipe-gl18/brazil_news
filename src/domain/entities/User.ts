import { Email } from "../valueObjects/Email.js";
import { TelegramChatId } from "../valueObjects/TelegramChatId.js";

interface UserProps {
  name: string;
  email: Email;
  telegramChatId?: TelegramChatId;
  deliveryTime: Date;
  timezone: string;
  nextDeliveryAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
  topics: string[];
}

export class User {
  private props: UserProps;
  private _id?: string;

  constructor(props: UserProps, id?: string) {
    if (!props.name?.trim()) throw new Error("Name cannot be empty");
    if (!props.email.valueOf.trim()) throw new Error("Email must not be empty");
    if (!props.topics || props.topics.length === 0)
      throw new Error("User must have at least one topic");

    this._id = id && id;
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
  get deliveryTime() {
    return this.props.deliveryTime;
  }
  get timezone() {
    return this.props.timezone;
  }
  get nextDeliveryAt() {
    return this.props.nextDeliveryAt;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get setdAt() {
    return this.props.updatedAt;
  }
  setName(name: string) {
    if (!name) throw new Error("Name can't be empty");
    this.props.name = name;
  }
  setEmail(email: Email) {
    this.props.email = email;
  }
  setDeliveryTime(time: Date) {
    this.props.deliveryTime = time;
  }
  setTimezone(timezone: string) {
    if (!timezone) throw new Error("Timezone can't be empty");
    this.props.timezone = timezone;
  }
  setNextDeliveryAt(nextDeliveryAt: Date) {
    this.props.nextDeliveryAt = nextDeliveryAt;
  }
  setTopics(topics: string[]) {
    if (topics.length === 0)
      throw new Error("User must have at least one topic");
    this.props.topics = topics;
  }
}
