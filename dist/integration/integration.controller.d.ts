import { User } from 'src/entities';
import { CreateIntegrationDto } from './dto';
import { IntegrationService } from './integration.service';
export declare class IntegrationController {
    private readonly integrationService;
    constructor(integrationService: IntegrationService);
    createIntegration(user: User, createIntegrationDto: CreateIntegrationDto): Promise<{
        ok: boolean;
        integration: import("src/entities").Integration;
    }>;
}
