"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_repository_1 = require("./user.repository");
const constants_1 = require("../common/constants");
const integration_service_1 = require("../integration/integration.service");
const analytics_service_1 = require("../analytics/analytics.service");
const network_service_1 = require("./network/network.service");
const youtube_service_1 = require("../libs/youtube/youtube.service");
const generateNetworks_1 = require("../utils/generateNetworks");
let UserService = class UserService {
    constructor(userRepository, networkService, analyticsService, integrationService, youtubeService, dataSource) {
        this.userRepository = userRepository;
        this.networkService = networkService;
        this.analyticsService = analyticsService;
        this.integrationService = integrationService;
        this.youtubeService = youtubeService;
        this.dataSource = dataSource;
    }
    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        return user;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        return user;
    }
    async getCreators({ minFollowers, maxFollowers, contentTagsArr }) {
        const userCreators = await this.userRepository.findAllCreators({
            contentTagsArr
        });
        const creatorsWithIntegratedNetworksInfo = await Promise.all(userCreators.map(async (userCreator) => {
            const creatorNetworks = await this.networkService.getByUserId(userCreator.id, {
                integrated: true
            });
            const creatorNetworksWithBA = await this.getBAForIntegratedNetworks(creatorNetworks);
            return Object.assign(Object.assign({}, userCreator), { networks: creatorNetworksWithBA });
        }));
        const creatorsWithTotalFollowers = creatorsWithIntegratedNetworksInfo.map((creator) => {
            let totalFollowers = 0;
            creator.networks.reduce((acc, network) => {
                totalFollowers = network.basicAnalytics.totalSubs || 0;
                return acc + totalFollowers;
            }, totalFollowers);
            return Object.assign(Object.assign({}, creator), { totalFollowers });
        });
        if (minFollowers !== undefined || maxFollowers !== undefined) {
            const creatorsWithFollowersFiltered = creatorsWithTotalFollowers.filter((creator) => (creator.totalFollowers > minFollowers || 0) &&
                (creator.totalFollowers < maxFollowers || Infinity));
            return creatorsWithFollowersFiltered;
        }
        return creatorsWithTotalFollowers;
    }
    async getProfileByUserId(id) {
        const [user, userNetworks] = await Promise.all([
            this.userRepository.findById(id),
            this.networkService.getByUserId(id)
        ]);
        const userNetworksWithBA = await this.getBAForIntegratedNetworks(userNetworks);
        return { user, networks: userNetworksWithBA };
    }
    async getBAForIntegratedNetworks(userNetworks) {
        const userNetworksWithBA = await Promise.all(userNetworks.map(async (network) => {
            const integration = await this.integrationService.getByNetworkId(network.id);
            if (!integration) {
                throw new Error('Network must be integrated to obtain Basic Analytics');
            }
            const { totalSubs, totalVideos } = await this.analyticsService.getBAByIntegrationId(integration.id);
            return Object.assign(Object.assign({}, network), { basicAnalytics: { totalSubs, totalVideos } });
        }));
        return userNetworksWithBA;
    }
    async create(signUpRequestDto) {
        try {
            const createUserInput = Object.assign({}, signUpRequestDto);
            const newUser = await this.userRepository.createAndSave(createUserInput);
            common_1.Logger.log(`User ${newUser === null || newUser === void 0 ? void 0 : newUser.id} created succesfully.`);
            delete newUser.password;
            return newUser;
        }
        catch (err) {
            common_1.Logger.error(`User creation has failed`);
            throw new Error(err.message);
        }
    }
    async updateById(user, updateUserDto) {
        const inputNetworks = updateUserDto.networks;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const userNetworks = await this.networkService.getByUserId(user.id);
        if (Object.keys(inputNetworks).length) {
            const inputNetworksUrls = [].concat(...Object.values(inputNetworks));
            const networksToDelete = userNetworks.filter((network) => !inputNetworksUrls.includes(network.url));
            await Promise.all(networksToDelete.map((network) => this.networkService.deleteNetwork(network.id, queryRunner)));
            const userNetworksUrls = userNetworks.map((network) => network.url);
            const integratedNetwork = userNetworks.filter((network) => network.integrated)[0];
            const { youtube } = inputNetworks;
            const youtubeChannelsInfo = await Promise.all(youtube.map((url) => this.youtubeService.getChannelInfoFromUrl(url)));
            const existingYoutubeChannelsInfo = youtubeChannelsInfo.filter((c) => c !== 'NOT FOUND');
            const newYoutubeNetworksInfo = (0, generateNetworks_1.youtubeNetworksGenerator)(existingYoutubeChannelsInfo, integratedNetwork);
            const newNetworksInfo = (0, generateNetworks_1.networksGenerator)(inputNetworks, user.id);
            const newNetworks = [
                ...newYoutubeNetworksInfo,
                ...newNetworksInfo
            ].filter((network) => !userNetworksUrls.includes(network.url));
            if (newNetworks.length) {
                await this.networkService.create(newNetworks, queryRunner);
            }
            delete updateUserDto['networks'];
        }
        const updatedUser = await this.userRepository.updateById(user.id, updateUserDto, queryRunner);
        return { user: updatedUser, networks: userNetworks };
    }
    async completeOnboarding(user, completeOnboardingDto) {
        if (user.onboardingCompleted)
            throw new Error('User has already completed the onboarding');
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { description, birthDate, username, contentTags, networks: networksInput, networkIntegratedId } = completeOnboardingDto;
            const isCreator = user.type === constants_1.UserTypes.CREATOR;
            if (isCreator) {
                if (!birthDate)
                    throw new Error('birthDate is required to complete the onboarding of a creator');
                if (!networkIntegratedId)
                    throw new Error('networkIntegratedId is required to complete the onboarding of a creator');
            }
            const integration = await this.integrationService.getByUserId(user.id);
            const integratedNetwork = await this.networkService.getById(networkIntegratedId);
            const { youtube } = networksInput;
            const youtubeChannelsInfo = await Promise.all(youtube.map((url) => this.youtubeService.getChannelInfoFromUrl(url)));
            const existingYoutubeChannelsInfo = youtubeChannelsInfo.filter((channel) => channel !== 'NOT FOUND' && channel.id != integratedNetwork.channelId);
            const newYoutubeNetworksInfo = (0, generateNetworks_1.youtubeNetworksGenerator)(existingYoutubeChannelsInfo, integratedNetwork);
            const newNetworksInfo = (0, generateNetworks_1.networksGenerator)(networksInput, user.id);
            const newNetworks = [...newYoutubeNetworksInfo, ...newNetworksInfo];
            if (newNetworks.length) {
                await this.networkService.create(newNetworks, queryRunner);
            }
            const { totalSubs, totalVideos } = await this.analyticsService.getBAByIntegrationId(integration[0].id, queryRunner);
            const integratedNetworkWithBasicAnalytics = Object.assign(Object.assign({}, integratedNetwork), { basicAnalytics: {
                    totalSubs,
                    totalVideos
                } });
            const updatedUser = await this.userRepository.updateById(user.id, {
                description,
                username,
                contentTags,
                birthDate,
                onboardingCompleted: true
            }, queryRunner);
            await queryRunner.commitTransaction();
            common_1.Logger.log(`User ${user.id} onboaring completed succesfully.`);
            newNetworks.push(integratedNetworkWithBasicAnalytics);
            return {
                updatedUser,
                networks: newNetworks
            };
        }
        catch (err) {
            common_1.Logger.error(`Onboarding completion transaction has failed. Error: ${err}`);
            await queryRunner.rollbackTransaction();
            throw new Error(err.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async deleteUser(id) {
        const queryResult = await this.userRepository
            .createQueryBuilder()
            .delete()
            .where({
            id
        })
            .returning('*')
            .execute();
        return queryResult.raw[0];
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        network_service_1.NetworkService,
        analytics_service_1.AnalyticsService,
        integration_service_1.IntegrationService,
        youtube_service_1.YoutubeService,
        typeorm_1.DataSource])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map