import { User } from './user.entity';
import { Message } from './message.entity';
import { Conversation } from './conversation-entity';
import { ProfileInfo } from './profile-info.entity';
import { Analytics } from './analytics.entity';
import { AnalyticsYoutube } from './analytics-youtube.entity';
import { Integration } from './integration.entitiy';

const entities = [
  ProfileInfo,
  Analytics,
  AnalyticsYoutube,
  Integration,
  User,
  Message,
  Conversation
];

export {
  ProfileInfo,
  Analytics,
  AnalyticsYoutube,
  Integration,
  User,
  Message,
  Conversation
};
export default entities;
