import React, { useCallback, useEffect, useState } from "react";
import { View, Image, Input, Text } from "@tarojs/components";
import { deleteBlock, queryBlocks } from "@/services/apis";
import { UpdateBlockDTO, CreateBlockDto } from "@/services/block-dto";
import { isInnerIPFn } from "@/common";
import styles from "./index.module.less";

export default function Home() {
  const [isInnerIp, setIsInnerIp] = useState(false);
  const [blocks, setBlocks] = useState<UpdateBlockDTO[]>([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"edit" | "read">("read");
  const [createBlockDto, setCreateBlockDto] = useState<
    CreateBlockDto | UpdateBlockDTO
  >();

  const getAllBlocks = useCallback(() => {
    queryBlocks().then((res) => {
      setBlocks(res.data.list);
    });
  }, []);

  useEffect(() => {
    getAllBlocks();
    setIsInnerIp(isInnerIPFn());
  }, []);

  const handlerBlockClick = useCallback(
    (block: UpdateBlockDTO) => {
      if (mode === "edit") {
        setVisible(true);
        return;
      }

      if (!block.lan_link && !block.wan_link) return;
      if (isInnerIp) {
        window.open(block.lan_link || block.wan_link || "", block.link_target);
      } else {
        window.open(block.wan_link || block.lan_link || "", block.link_target);
      }
    },
    [mode, isInnerIp]
  );

  const deleteAlert = useCallback((block: UpdateBlockDTO) => {
    console.log(block);
    if (confirm("Delete " + block.name + "?")) {
      postDelete(block);
    }
  }, []);

  const postDelete = async (block: UpdateBlockDTO) => {
    setLoading(true);
    try {
      await deleteBlock(block.id);
      await getAllBlocks();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const renderBlock = (block: UpdateBlockDTO) => {
    return (
      <View className={styles.BlockWrapper} key={block.id}>
        {mode === "edit" && (
          <View
            className={`at-icon at-icon-subtract-circle ${styles.DeleteIcon}`}
            onClick={() => deleteAlert(block)}
          />
        )}
        <View
          className={`${styles.Block} ${mode === "edit" && styles.Shaking}`}
          onClick={() => handlerBlockClick(block)}
        >
          <Image
            className={styles.BlockLogo}
            src={block.banner || ""}
            mode="aspectFit"
          />
          <View className={styles.BlockName}>{block.name}</View>
        </View>
      </View>
    );
  };

  const onInput = (e: any) => {
    setCreateBlockDto((prev) => ({
      ...(prev || {}),
      [e.target.name]: e.detail.value,
    }));
  };

  return (
    <View className={styles.Home}>
      <View className={styles.Container}>
        <View className={styles.Header}>
          <View className={styles.HeaderLeft}>Hub</View>
          <View className={styles.HeaderRight}>
            {mode === "read" ? (
              <View
                className={styles.EditButton}
                onClick={() => setMode("edit")}
              >
                Edit
              </View>
            ) : (
              <View
                className={styles.EditButton}
                onClick={() => setMode("read")}
              >
                Complete
              </View>
            )}
            <View className={styles.CreateButton}>New</View>
          </View>
        </View>
        <View className={styles.Content}>
          <View className={styles.Blocks}>{blocks.map(renderBlock)}</View>
        </View>
      </View>
      <View className={styles.Overlayer}>
        <View className={`${styles.Container} ${styles.OverlayerContent}`}>
          <View className={styles.OverlayerTitle}>Edit</View>
          <View className={styles.Form}>
            <View className={styles.FormItem}>
              <View className={styles.FormLabel}>name</View>
              <Input className={styles.Input} name="name" onInput={onInput} />
            </View>
            <View className={styles.FormItem}>
              <View className={styles.FormLabel}>banner</View>
              <Input className={styles.Input} name="banner" onInput={onInput} />
            </View>
            <View className={styles.FormItem}>
              <View className={styles.FormLabel}>lan link</View>
              <Input
                className={styles.Input}
                name="lan_link"
                onInput={onInput}
              />
            </View>
            <View className={styles.FormItem}>
              <View className={styles.FormLabel}>wan link</View>
              <Input
                className={styles.Input}
                name="wan_link"
                onInput={onInput}
              />
            </View>
            <View className={styles.FormItem}>
              <View className={styles.FormLabel}>target</View>
              <Input className={styles.Input} name="target" onInput={onInput} />
            </View>
            <View className={styles.FormItem}>
              <View className={styles.FormLabel}>sort</View>
              <Input className={styles.Input} name="sort" onInput={onInput} />
            </View>
            <View className={styles.FormItem}>
              <View className={styles.FormLabel}>id</View>
              <Input className={styles.Input} name="id" />
            </View>
          </View>

          <View className={styles.Operations}>
            <View className={`${styles.CreateButton} ${styles.Submit}`}>
              Submit
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

// name: 'text',
// banner: 'text',
// lan_link: 'text',
// wan_link: 'text',
// link_target: 'text',
// sort: 'number',
// id: 'text'
