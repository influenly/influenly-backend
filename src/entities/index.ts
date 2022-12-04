import { Creator } from './creator.entity';
import { Advertiser } from './advertiser.entity';
import { Connection } from './connection.entity';
import { Contract } from './contract.entity';
import { Stage } from './stage.entity';
import { Analytics } from './analytics.entity';
import { AnalyticsYoutube } from './analytics-youtube.entity';
import { YoutubeTokenInfo } from './youtube-token-info.entity';
import { User } from './user.entity';

const entities = [
  Creator,
  Advertiser,
  Connection,
  Contract,
  Stage,
  Analytics,
  AnalyticsYoutube,
  YoutubeTokenInfo,
  User
];

export {
  Creator,
  Advertiser,
  Connection,
  Contract,
  Stage,
  Analytics,
  AnalyticsYoutube,
  YoutubeTokenInfo,
  User
};
export default entities;
