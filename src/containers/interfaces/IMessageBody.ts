import { IAuthorBody } from "./IAuthorBody";

export interface IMessageBody {
  content: string;
  updated: string;
  id: number;
  author: IAuthorBody;
}
