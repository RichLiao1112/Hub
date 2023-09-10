import { CreateBlockDto, UpdateBlockDTO } from "./block-dto";
import { withRequest } from "./request";

export interface IQueryBlocks {
  list: UpdateBlockDTO[];
  total: number;
}

export const queryBlocks = () => {
  return withRequest<IQueryBlocks>({
    url: '/api/block',
    method: 'GET',
  })
}

export const createBlock = (data: CreateBlockDto) => {
  return withRequest<UpdateBlockDTO>({
    url: '/api/block',
    method: 'POST',
    data
  })
}

export const deleteBlock = (id: string) => {
  return withRequest({
    url: `/api/block/${id}`,
    method: 'DELETE',
  })
}

export const updateBlock = (data: UpdateBlockDTO) => {
  return withRequest({
    url: `/api/block/${data.id}`,
    method: 'PATCH',
    data
  })
}