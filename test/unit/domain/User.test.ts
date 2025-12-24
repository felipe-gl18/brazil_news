import assert from "assert";
import { describe, it } from "node:test";
import { User } from "../../../src/domain/entities/User.js";
import { Email } from "../../../src/domain/valueObjects/Email.js";

describe("User Entity", () => {
  it("should not allow empty name", () => {
    assert.throws(
      () =>
        new User({
          name: "",
          email: new Email("a@b.com"),
          topics: ["fitness"],
          createdAt: new Date(),
          updatedAt: new Date(),
          deliveryTime: new Date(),
          timezone: "south-america",
          nextDeliveryAt: new Date(),
        }),
      { message: "Name cannot be empty" }
    );
  });
  it("should not allow empty topics", () => {
    assert.throws(
      () =>
        new User({
          name: "John Doe",
          email: new Email("a@b.com"),
          topics: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          deliveryTime: new Date(),
          timezone: "south-america",
          nextDeliveryAt: new Date(),
        }),
      {
        message: "User must have at least one topic",
      }
    );
  });
  it("should not allow setting ID once", () => {
    assert.throws(
      () => {
        const user = new User({
          name: "John Doe",
          email: new Email("a@b.com"),
          topics: ["fitness"],
          createdAt: new Date(),
          updatedAt: new Date(),
          deliveryTime: new Date(),
          timezone: "south-america",
          nextDeliveryAt: new Date(),
        });
        user.setId("123");
        user.setId("456");
      },
      { message: "ID has already been set" }
    );
  });
  it("should not allow updating to empty topics", () => {
    assert.throws(
      () =>
        new User({
          name: "John Doe",
          email: new Email("a@b.com"),
          topics: ["fitness"],
          createdAt: new Date(),
          updatedAt: new Date(),
          deliveryTime: new Date(),
          timezone: "south-america",
          nextDeliveryAt: new Date(),
        }).setTopics([]),
      {
        message: "User must have at least one topic",
      }
    );
  });
  it("should allow setting ID once", () => {
    const user = new User({
      name: "John Doe",
      email: new Email("a@b.com"),
      topics: ["fitness"],
      createdAt: new Date(),
      updatedAt: new Date(),
      deliveryTime: new Date(),
      timezone: "south-america",
      nextDeliveryAt: new Date(),
    });
    user.setId("123");
    assert.equal(user.id, "123");
  });
  it("should allow updating topics with valid array", () => {
    const user = new User({
      name: "John Doe",
      email: new Email("a@b.com"),
      topics: ["fitness"],
      createdAt: new Date(),
      updatedAt: new Date(),
      deliveryTime: new Date(),
      timezone: "south-america",
      nextDeliveryAt: new Date(),
    });
    user.setTopics(["fitness", "health"]);
  });
  it("should read getters correctly", () => {
    const email = new Email("a@b.com");
    const user = new User({
      name: "John Doe",
      email,
      topics: ["fitness"],
      createdAt: new Date(),
      updatedAt: new Date(),
      deliveryTime: new Date(),
      timezone: "south-america",
      nextDeliveryAt: new Date(),
    });
    assert.equal(user.name, "John Doe");
    assert.equal(user.email.valueOf, "a@b.com");
    assert.deepEqual(user.topics, ["fitness"]);
  });
});
