import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatorService } from './creator.service';

@Controller('creator')
export class CreatorController {
  constructor(private readonly creatorService: CreatorService) {}

  @Get()
  getCreators(): string {
    return this.creatorService.getCreators();
  }

  @Get(':id')
  getCreator(@Param() params): string {
    const creatorId = params.id;
    return this.creatorService.getCreator(creatorId);
  }

  @Post()
  createCreator(): string {
    return this.creatorService.createCreator();
  }

  @Patch()
  updateCreator(): string {
    return this.creatorService.updateCreator();
  }

  @Delete(':id')
  deleteCreator(@Param() params): string {
    const creatorId = params.id;
    return this.creatorService.deleteCreator(creatorId);
  }
}
