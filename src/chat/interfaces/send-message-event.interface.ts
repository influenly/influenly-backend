export interface ISendMessageEvent {
  conversationId: number;
  senderUserId: number;
  receiverUserId: number;
  content: string;
  initialMessage: boolean;
}
