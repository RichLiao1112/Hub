import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import * as dayjs from 'dayjs';

@Entity()
export class Block extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Index()
  @Column({ comment: '名字', nullable: false })
  name: string;

  @Column({ comment: '主图', nullable: true })
  banner: string;

  @Column({ comment: '局域网地址', nullable: true })
  lan_link: string;

  @Column({ comment: '互联网地址', nullable: true })
  wan_link: string;

  @Column({ comment: '打开标签页方式', nullable: true, default: '_blank' })
  link_target: string;

  @Column({ comment: '排序', nullable: true, default: 99 })
  sort: number;

  @CreateDateColumn()
  @Column({ comment: '创建时间', nullable: true })
  create_at: string;

  @UpdateDateColumn()
  @Column({ comment: '更新时间', nullable: true })
  update_at: string;

  @BeforeInsert()
  insertCreated() {
    this.create_at = `${dayjs().unix()}`;
    this.update_at = `${dayjs().unix()}`;
  }

  @BeforeUpdate()
  insertUpdated() {
    this.update_at = `${dayjs().unix()}`;
  }
}
