import {User} from "./user";

export class Announcement {
  id: number;
  date: Date;
  title: string;
  message: string;
  author: User;

  constructor(
    id: number,
    date: Date,
    title: string,
    message: string,
    author: User
  ) {
    this.id = id;
    this.date = date;
    this.title = title;
    this.message = message;
    this.author = author;
  }
}
