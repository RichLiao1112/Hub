export interface CreateBlockDto {
  name?: string;
  banner?: string;
  lan_link?: string;
  wan_link?: string;
  link_target?: "_blank" | "_self" | "_parent" | "_top";
  sort?: number;
}

export interface UpdateBlockDTO extends CreateBlockDto {
  id: string;
}

// {
//   name: '应用名',
//   banner: '封面图地址',
//   lan_link: '内网访问地址',
//   wan_link: '公网访问地址',
//   link_target: '打开方式',
//   sort: '排序（数字，越小越靠前）',
//   id: 'id'
// }
