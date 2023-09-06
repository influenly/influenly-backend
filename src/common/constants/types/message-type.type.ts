import { MessageTypes } from '../enums';

export type MessageType =
  | MessageTypes.REGULAR
  | MessageTypes.INITIALIZER
  | MessageTypes.FINISHER;
