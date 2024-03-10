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
        // should return the img url to each corresponding platform
        profileImg: 'default',
        name: url.split('.com/')[1]
      });
    });
  }
  return newNetworksInfo;
};

export const youtubeNetworksGenerator = (
  userId,
  youtubeChannelsInfo,
  integratedNetwork: Network
): {
  channelId: string;
  name: string;
  userId: number;
  url: string;
  platform: Platforms.YOUTUBE;
}[] => {
  const newYoutubeNetworksInfo = youtubeChannelsInfo
    .filter(
      (channelInfo) =>
        channelInfo.id != integratedNetwork?.channelId
    )
    .map((channelInfo) => ({
      channelId: channelInfo.id,
      name: channelInfo.name,
      userId,
      url: `https://www.youtube.com/channel/${channelInfo.id}`,
      platform: Platforms.YOUTUBE
    }));
  return newYoutubeNetworksInfo;
};
