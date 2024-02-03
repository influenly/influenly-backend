"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubeNetworksGenerator = exports.networksGenerator = void 0;
const enums_1 = require("../common/constants/enums");
const networksGenerator = (networksInput, userId) => {
    const nonIntegratedNetworks = Object.assign({}, networksInput);
    delete nonIntegratedNetworks.youtube;
    let newNetworksInfo = [];
    for (const [platformName, platformNetworks] of Object.entries(nonIntegratedNetworks)) {
        platformNetworks.forEach((url) => {
            newNetworksInfo.push({
                userId,
                url,
                platform: enums_1.Platforms[platformName.toUpperCase()],
                profileImg: 'default',
                name: url.split('.com/')[1]
            });
        });
    }
    return newNetworksInfo;
};
exports.networksGenerator = networksGenerator;
const youtubeNetworksGenerator = (youtubeChannelsInfo, integratedNetwork) => {
    const newYoutubeNetworksInfo = youtubeChannelsInfo
        .filter((channelInfo) => channelInfo.id != integratedNetwork.channelId)
        .map((channelInfo) => ({
        channelId: channelInfo.id,
        name: channelInfo.name,
        userId: integratedNetwork.userId,
        url: `https://www.youtube.com/channel/${channelInfo.id}`,
        platform: enums_1.Platforms.YOUTUBE
    }));
    return newYoutubeNetworksInfo;
};
exports.youtubeNetworksGenerator = youtubeNetworksGenerator;
//# sourceMappingURL=generateNetworks.js.map