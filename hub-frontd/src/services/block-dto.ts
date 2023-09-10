export class CreateBlockDto {
  name?: string;
  banner?: string;
  lan_link?: string;
  wan_link?: string;
  link_target?: '_blank' | '_self' | '_parent' | '_top' = '_blank';
  sort?: number = 100;

  constructor(params?: any) {
    this.name = params?.name;
    this.banner = params?.banner;
    this.lan_link = params?.lan_link;
    this.wan_link = params?.wan_link;
    this.link_target = params?.link_target ?? '_blank';
    this.sort = params?.sort ?? 100;
  }

  static get inputType(): Record<string, 'text' | 'number'> {
    return {
      name: 'text',
      banner: 'text',
      lan_link: 'text',
      wan_link: 'text',
      link_target: 'text',
      sort: 'number',
      id: 'text'
    }
  }

  static get label() {
    return {
      name: '应用名',
      banner: '封面图地址',
      lan_link: '内网访问地址',
      wan_link: '公网访问地址',
      link_target: '打开方式',
      sort: '排序（数字，越小越靠前）',
      id: 'id'
    }
  }

  static get getRules() {
    const label = CreateBlockDto.label;
    return {
      name: [
        { required: true, message: `请填写${label.name}` },
      ],
      sort: [
        { type: 'number', message: `请填写数字` }
      ]
    }
  }

  static validate<T>(values: T) {
    const rules = CreateBlockDto.getRules;
    const errors: any[] = [];
    Object.entries(rules).forEach(([k, v]) => {
      v.some(item => {
        if (item.required) {
          if (!!values[k] === false) {
            errors.push({ ...item, name: k });
            return false
          }
        }
        if (item.type) {
          if (typeof values[k] !== item.type) {
            errors.push({ ...item, name: k });
            return false
          }
        }
        return true;
      })
    })
    return {
      errors: errors.length > 0 ? errors : undefined,
      values
    };
  }
}

export class UpdateBlockDTO extends CreateBlockDto {
  id: string;
  
  constructor(params?: any) {
    super(params);
    this.id = params.id;
  }
}
