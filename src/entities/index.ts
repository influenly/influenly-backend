import { User } from './user.entity';
import { Message } from './message.entity';
import { Conversation } from './conversation-entity';
import { Profile } from './profile.entity';
import { Analytics } from './analytics.entity';
import { AnalyticsYoutube } from './analytics-youtube.entity';
import { Integration } from './integration.entitiy';

const entities = [
  Profile,
  Analytics,
  AnalyticsYoutube,
  Integration,
  User,
  Message,
  Conversation
];

export {
  Profile,
  Analytics,
  AnalyticsYoutube,
  Integration,
  User,
  Message,
  Conversation
};
export default entities;
