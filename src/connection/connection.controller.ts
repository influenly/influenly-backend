import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConnectionService } from './connection.service';
import { CreateConnectionDto } from './dto';

@ApiTags('connection')
@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}
  @Get()
  async getConnections() {
    try {
      const connections = await this.connectionService.getConnections();
      return connections;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getConnection(@Param('id', ParseIntPipe) connectionId: number) {
    try {
      const connection = await this.connectionService.getConnection(
        connectionId
      );
      if (!connection) {
        throw new Error(`Connection with id ${connectionId} not found`);
      }
      return connection;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createConnection(@Body() createConnectionDto: CreateConnectionDto) {
    try {
      const connection = await this.connectionService.createConnection(
        createConnectionDto
      );
      return connection;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteConnection(@Param('id', ParseIntPipe) connectionId: number) {
    try {
      const deletedConnection = await this.connectionService.deleteConnection(
        connectionId
      );
      if (!deletedConnection) {
        throw new Error('Problem at deleting');
      }
      return deletedConnection;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
