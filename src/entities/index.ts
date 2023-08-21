import { User } from './user.entity';
import { Message } from './message.entity';
import { Conversation } from './conversation-entity';
import { CreatorInfo } from './creator-info.entity';
import { AdvertiserInfo } from './advertiser-info.entity';
import { Connection } from './connection.entity';
import { AnalyticsYoutube } from './analytics-youtube.entity';
import { Integration } from './integration.entitiy';

const entities = [
  CreatorInfo,
  AdvertiserInfo,
  Connection,
  AnalyticsYoutube,
  Integration,
  User,
  Message,
  Conversation
];

export {
  CreatorInfo,
  AdvertiserInfo,
  Connection,
  AnalyticsYoutube,
  Integration,
  User,
  Message,
  Conversation
};
export default entities;
