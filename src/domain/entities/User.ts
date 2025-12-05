import { Email } from "../valueObjects/Email";
import { WhatsApp } from "../valueObjects/WhatsApp";

interface UserProps {
  id: string;
  name: string;
  email: Email;
  whatsapp: WhatsApp;
  topics: string[];
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    if (!props.name?.trim()) throw new Error("Name cannot be empty");
    if (!props.topics || props.topics.length === 0)
      throw new Error("User must have at least one topic");

    this.props = props;
  }

  get id() {
    return this.props.id;
  }
  get email() {
    return this.props.email;
  }
  get whatsapp() {
    return this.props.whatsapp;
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
