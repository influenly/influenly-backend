export interface ICreateMessageInput {
  conversationId: number;
  senderUserId: number;
  content: string;
  initialMessage: boolean;
}
