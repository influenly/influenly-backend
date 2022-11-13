import { Injectable } from '@nestjs/common';

@Injectable()
export class CreatorService {
  getCreators(): string {
    return 'Get Creators!';
  }

  getCreator(id: string): string {
    return `Get creator with id ${id}!`;
  }

  createCreator(): string {
    return 'Create Creator!';
  }

  updateCreator(): string {
    return 'Update Creator!';
  }

  deleteCreator(id: string): string {
    return `Delete Creator with id ${id}!`;
  }
}
