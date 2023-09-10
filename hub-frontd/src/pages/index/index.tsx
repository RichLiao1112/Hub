import { useCallback, useState } from 'react';
import { useLoad } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Block, { IBlock } from '@/components/Block';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import MyInput from '@/components/Input';
import { CreateBlockDto, UpdateBlockDTO } from '@/services/block-dto';
import MyButton from '@/components/MyButton';
import { queryBlocks, createBlock, deleteBlock, updateBlock } from '@/services/apis';

import * as S from './index.styled'

export default function Index() {
  const [blocks, setBlocks] = useState<UpdateBlockDTO[]>([]);

  const [addModal, setAddModal] = useState(false)

  const [loading, setLoading] = useState(false);

  const [createBlockDto, setCreateBlockDto] = useState<CreateBlockDto | UpdateBlockDTO>(new CreateBlockDto());

  const getAllBlocks = useCallback(() => {
    queryBlocks().then(res => {
      setBlocks(res.data.list);
    })
  }, [])

  useLoad(() => {
    getAllBlocks();
  })

  const showAddBlockModal = useCallback((dto: CreateBlockDto = new CreateBlockDto()) => {
    setAddModal(true);
    setCreateBlockDto(dto)
  }, [addModal]) 

  const closeAddBlockModal = useCallback(() => {
    setAddModal(false);
    setCreateBlockDto(new CreateBlockDto());
  }, [addModal])

  const renderBlock = (payload: UpdateBlockDTO) => {
    return <Block {...payload} key={payload.id} onSetting={() => showAddBlockModal(new UpdateBlockDTO(payload))} onClick={() => window.open(payload.wan_link, payload.link_target)} />
  }

  const renderInput = (name: keyof typeof CreateBlockDto) => {
    const currentValueType = CreateBlockDto.inputType[name];
    return (
      <MyInput
        key={name}
        inputProps={{ 
          name,
          type: currentValueType,
          value: createBlockDto[name]?.toString(),
          placeholder: CreateBlockDto.label[name],
          onInput: (event) => {
            const Dto = createBlockDto instanceof UpdateBlockDTO ? UpdateBlockDTO : CreateBlockDto;
            const instance = new Dto(createBlockDto);
            instance[name] = CreateBlockDto.inputType[name] === 'number' ? Number(event.detail.value) : event.detail.value;
            setCreateBlockDto(instance);
          }
        }}
      />
    )
  }

  const onSubmit = useCallback(() => {
    const { errors, values } = CreateBlockDto.validate(createBlockDto);
    if (!errors) {
      setLoading(true);
      let requestFn;
      let resource: UpdateBlockDTO | CreateBlockDto;
      if (values instanceof UpdateBlockDTO && values.id) {
        resource = new UpdateBlockDTO(values)
        requestFn = updateBlock;
      } else {
        resource = new CreateBlockDto(values);
        requestFn = createBlock;
      }
      requestFn(resource)
        .then(() => {
          getAllBlocks();
          setAddModal(false);
        })
        .catch(err => {
        })
        .finally(() => setLoading(false))
    }
  }, [createBlockDto])

  const onDeleteBlock = async () => {
    if (createBlockDto instanceof UpdateBlockDTO && createBlockDto.id) {
      setLoading(true);
      try {
        await deleteBlock(createBlockDto.id);
        await getAllBlocks();
        setLoading(false);
        setAddModal(false);
      } catch (err) {
        setLoading(false);
      }
    }
  };

  return (
    <S.Index>
      <Header
        right={
          <MyButton type="primary" onClick={showAddBlockModal} text="添加" width={100} />
        }
      />
      <S.Blocks>
        { blocks.map(renderBlock) }
      </S.Blocks>
      <Modal
        visible={addModal}
        title={<S.ModalTitle>编辑应用</S.ModalTitle>}
        onCancel={closeAddBlockModal}
        container={(
          <S.ModalContainer>
            {Object.keys(createBlockDto).map(renderInput)}
          </S.ModalContainer>
        )}
        footer={(
          <S.Footer>
            {createBlockDto instanceof UpdateBlockDTO && createBlockDto.id ? <MyButton text='删除' type='error' onClick={onDeleteBlock} loading={!!loading}/> : <View />}
            <MyButton text='保存' type='primary' onClick={onSubmit} loading={!!loading} />
          </S.Footer>
        )}
      />
    </S.Index>
  )
}
