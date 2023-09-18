import { User } from './user.entity';
import { Message } from './message.entity';
import { Conversation } from './conversation-entity';
import { Network } from './network.entity';
import { Integration } from './integration.entity';
import { AnalyticsYoutube } from './analytics-youtube.entity';
import { Credential } from './credential.entitiy';

const entities = [
  Network,
  Credential,
  AnalyticsYoutube,
  Integration,
  User,
  Message,
  Conversation
];

export {
  Network,
  Credential,
  AnalyticsYoutube,
  Integration,
  User,
  Message,
  Conversation
};
export default entities;
