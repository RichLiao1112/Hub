import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { Block as BlockEntity } from './entities/block.entity';
import { QueryBlocksDto } from './dto/query-block.dto';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(BlockEntity)
    private readonly blockRepository: Repository<BlockEntity>,
  ) {}

  async create(createBlockInput: CreateBlockDto) {
    const Block = this.blockRepository.create(createBlockInput);
    return await this.blockRepository.save(Block);
  }

  async findAll() {
    const [blocks, total] = await this.blockRepository.findAndCount({ order: { sort: 'ASC' } });
    return {
      list: blocks,
      total,
    };
  }

  async findAllByPage(queryBlocks: QueryBlocksDto) {
    const [blocks, total] = await this.blockRepository.findAndCount({
      order: {
        sort: 'ASC',
      },
      take: queryBlocks.pageSize,
      skip: (queryBlocks.page - 1) * queryBlocks.pageSize,
    });
    return {
      list: blocks,
      total,
      ...queryBlocks,
    };
  }

  async findOneName(name: string) {
    return await this.blockRepository.findOneBy({ name });
  }

  async findOneById(id: string) {
    return await this.blockRepository.findOneBy({ id });
  }

  async update(id: string, updateBlockInput: UpdateBlockDto) {
    return await this.blockRepository.update({ id }, updateBlockInput);
  }

  async remove(id: string) {
    return await this.blockRepository.delete({ id });
  }
}
