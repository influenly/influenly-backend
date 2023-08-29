import { MessageTypes } from '../enums';

export type MessageType =
  | MessageTypes.REGULAR
  | MessageTypes.INITIAL
  | MessageTypes.FINAL;
