import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';

@Controller('/api/block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  create(@Body() createBlockDto: CreateBlockDto) {
    return this.blockService.create(createBlockDto);
  }

  @Get()
  findAll() {
    return this.blockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockService.findOneById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
    const resource = await this.blockService.findOneById(id);
    if (!resource) {
      throw new HttpException(`Resource not found where id=${id} from Blocks.`, HttpStatus.NOT_FOUND);
    }
    return this.blockService.update(id, updateBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blockService.remove(id);
  }
}
