import { User } from './user.entity';
import { Message } from './message.entity';
import { Conversation } from './conversation-entity';
import { Profile } from './profile.entity';
import { Integration } from './integration.entity';
import { AnalyticsYoutube } from './analytics-youtube.entity';
import { Credential } from './credential.entitiy';

const entities = [
  Profile,
  Credential,
  AnalyticsYoutube,
  Integration,
  User,
  Message,
  Conversation
];

export {
  Profile,
  Credential,
  AnalyticsYoutube,
  Integration,
  User,
  Message,
  Conversation
};
export default entities;
