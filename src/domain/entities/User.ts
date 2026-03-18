import { EmptyDeliveryTimeError } from "../erros/EmptyDeliveryTimeError.js";
import { EmptyEmailError } from "../erros/EmptyEmailError.js";
import { emptyLanguageError } from "../erros/EmptyLanguageError.js";
import { EmptyNameError } from "../erros/EmptyNameError.js";
import { EmptyTimezoneError } from "../erros/EmptyTimezoneError.js";
import { EmptyTopicsError } from "../erros/EmptyTopicsError.js";
import { Email } from "../valueObjects/Email.js";
import { TelegramChatId } from "../valueObjects/TelegramChatId.js";

export type Language = "pt" | "en" | "es" | "fr" | "de";

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
  language: Language;
}

export class User {
  private props: UserProps;
  private _id?: string;

  constructor(props: UserProps, id?: string) {
    if (!props.name?.trim()) throw new EmptyNameError();
    if (!props.email.valueOf.trim()) throw new EmptyEmailError();
    if (!props.deliveryTime) throw new EmptyDeliveryTimeError();
    if (!props.timezone?.trim()) throw new EmptyTimezoneError();
    if (!props.topics || props.topics.length === 0)
      throw new EmptyTopicsError();
    if (!props.language) throw new emptyLanguageError();

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
  get language() {
    return this.props.language;
  }
  setName(name: string) {
    this.props.name = name;
  }
  setEmail(email: Email) {
    this.props.email = email;
  }
  setDeliveryTime(time: Date) {
    this.props.deliveryTime = time;
  }
  setTimezone(timezone: string) {
    this.props.timezone = timezone;
  }
  setNextDeliveryAt(nextDeliveryAt: Date) {
    this.props.nextDeliveryAt = nextDeliveryAt;
  }
  setTopics(topics: string[]) {
    this.props.topics = topics;
  }
  setLanguage(language: Language) {
    this.props.language = language;
  }
}
