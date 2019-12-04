import { TestBed } from "@angular/core/testing";

import { VoteService } from "./vote.service";

describe("VoteServiceService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should start empty", () => {
    const service: VoteService = TestBed.get(VoteService);
    expect(service.getItems()).toEqual([]);
  });

  it("should add to the list", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.addItem("Beta");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 },
      { name: "Beta", votes: 0 }
    ]);
  });

  it("should be able to undo after adding", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.addItem("Beta");
    service.undo();
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
    service.undo();
    expect(service.getItems()).toEqual([]);
  });

  // TODO - test removeItem
  it("should be able to remove item", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.addItem("Beta");
    service.removeItem("Beta");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
    // expect(service.getItems()).toEqual([]);
  });

  // TODO - test removeItem & undo
  it("should be able to remove item and undo", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.addItem("Beta");
    service.removeItem("Beta");
    service.undo();
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 },
      { name: "Beta", votes: 0 }
    ]);
    // expect(service.getItems()).toEqual([]);
  });

  // TODO - test upvote
  it("should be able to upvote", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.upvote("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 1 }]);
  });

  // TODO - test upvote & undo
  it("should be able to upvote and undo", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.upvote("Alpha");
    service.undo();
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
  });

  // TODO - test downvote
  it("should be able to downvote", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.upvote("Alpha");
    service.upvote("Alpha");
    service.upvote("Alpha");
    service.downvote("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 2 }]);
  });

  // TODO - test downvote & undo
  it("should be able to downvote and undo", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.upvote("Alpha");
    service.upvote("Alpha");
    service.upvote("Alpha");
    service.downvote("Alpha");
    service.undo();
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 3 }]);
  });
});
