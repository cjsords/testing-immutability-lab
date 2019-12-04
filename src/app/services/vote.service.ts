import { Injectable } from "@angular/core";
import { VoteItem } from "../interfaces/vote-item";

@Injectable({
  providedIn: "root"
})
export class VoteService {
  private history: VoteItem[][] = [];
  private items: VoteItem[] = [];
  private arr2: VoteItem[];

  constructor() {}

  getItems(): VoteItem[] {
    return this.items;
  }

  addItem(name: string): void {
    this.markHistoryBeforeChange();

    const newItem: VoteItem = { name, votes: 0 };
    // TODO - this needs to be immutable
    // this.items.push(newItem);
    this.items = [...this.items, newItem];
    console.log(this.items);
  }

  removeItem(name: string): void {
    this.markHistoryBeforeChange();
    let i = this.items.findIndex(element => element.name === name);
    // console.log(item);
    // let i = this.items.findIndex(item);
    console.log(i);
    this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)];
    // TODO find the item in the list and remove it immutably
  }

  upvote(name: string): void {
    this.markHistoryBeforeChange();

    // TODO find the item in the list and add 1 to the votes
    let i = this.items.findIndex(element => element.name === name);
    let item = this.items[i];
    this.items = [
      ...this.items.slice(0, i),
      { ...this.items[i], votes: this.items[i].votes + 1 },
      ...this.items.slice(i + 1)
    ];
  }

  downvote(name: string): void {
    this.markHistoryBeforeChange();

    // TODO find the item in the list and remove 1 from the votes
    let i = this.items.findIndex(element => element.name === name);
    let item = this.items[i];
    this.items = [
      ...this.items.slice(0, i),
      { ...this.items[i], votes: this.items[i].votes - 1 },
      ...this.items.slice(i + 1)
    ];
  }

  undo() {
    if (this.history.length) {
      // Take the most recent history and use it to replace the list.
      this.items = this.history.pop();
    } else {
      throw new Error("No more undos available.");
    }
  }

  private markHistoryBeforeChange() {
    // Add a snapshot to the history.
    this.history.push(this.items);
  }
}
