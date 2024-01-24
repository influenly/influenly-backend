import { Platforms } from 'src/common/constants/enums';
import { INetworks } from 'src/common/interfaces';
import { Network } from 'src/entities';

export const networksGenerator = (networksInput: INetworks, userId: number) => {
  const nonIntegratedNetworks = { ...networksInput };
  delete nonIntegratedNetworks.youtube;

  let newNetworksInfo: Partial<Network>[] = [];

  for (const [platformName, platformNetworks] of Object.entries(
    nonIntegratedNetworks
  )) {
    platformNetworks.forEach((url) => {
      newNetworksInfo.push({
        userId,
        url,
        platform: Platforms[platformName.toUpperCase()],
        profileImg: 'default',
        name: url.split('.com/')[1],
      });
    });
  }
  return newNetworksInfo;
};

export const youtubeNetworksGenerator = (
  youtubeChannelsInfo,
  integratedNetwork: Network
) => {
  const newYoutubeNetworksInfo = youtubeChannelsInfo
    .filter((channelInfo) => channelInfo.id != integratedNetwork.channelId)
    .map((channelInfo) => ({
      ...channelInfo,
      userId: integratedNetwork.userId,
      url: `https://www.youtube.com/channel/${channelInfo.channelId}`,
      platform: Platforms.YOUTUBE
    }));
  return newYoutubeNetworksInfo;
};
