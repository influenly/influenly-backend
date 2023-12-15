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
        url,
        profileImg: 'default',
        name: url.split('.com/')[1],
        platform: Platforms[platformName.toUpperCase()],
        userId
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
 //ojo, que pasa si channelInfo no tiene data ?? esta funcionando OK el scrapping ?
    .filter((channelInfo) => channelInfo.id != integratedNetwork.channelId)
    .map((channelInfo) => ({
      ...channelInfo,
      url: `https://www.youtube.com/channel/${channelInfo.id}`,
      userId: integratedNetwork.userId,
      platform: Platforms.YOUTUBE
    }));
  return newYoutubeNetworksInfo;
};
