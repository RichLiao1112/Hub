import { IPluginContext } from '@tarojs/service';
import qiniu from 'qiniu';
import fs from 'fs';

interface IDeploy {
  accessKey: string;
  secretKey: string;
  filename: string;
}

class DeployQiniuCDN {
  params: IDeploy;
  mac: qiniu.auth.digest.Mac;

  constructor(params: IDeploy) {
    this.params = params;
    if (!params.accessKey || !params.secretKey) {
      throw Error('Miss accessKey or secretKey')
    }
    this.mac = new qiniu.auth.digest.Mac(params.accessKey, params.secretKey)
  }

  // 上传凭证
  initSDK (overwriteFile) {
    const options = {
      scope: 'rich-cdn' + ':' + overwriteFile
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(this.mac)
    const config = new qiniu.conf.Config({
      zone: qiniu.zone.Zone_z2,
      useCdnDomain: true,
      useHttpsDomain: true
    })
    return { config, uploadToken, options }
  }

  /**
   * 遍历文件夹递归上传
   * @param {path} src 本地路径
   * @param {string} dist oos文件夹名
   * @param {boolean} isDir 是否为文件夹下文件
   */
  async addFileToOSSSync (src) {
    const docs = fs.readdirSync(src);
    for(const doc of docs) {
      let _src = src + doc
      let st = fs.statSync(_src)
      if (st.isFile()) {
        await this.putOSS(_src, _src.split('dist/')[1])
      } else {
        await this.addFileToOSSSync(_src + '/')
      }
    }
  }

  /**
   *单个文件上传至oss
  */
  async putOSS (src, dist) {
    // if (dist === 'index.html') return
    try {
      const key = this.params.filename + dist
      const { config, uploadToken } = this.initSDK(key)
      const localFile = src
      const formUploader = new qiniu.form_up.FormUploader(config)
      const putExtra = new qiniu.form_up.PutExtra()
      // 文件上传
      await formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
        if (respErr) {
          throw respErr
        }
        if (respInfo.statusCode === 200) {
          console.log(key + '上传oss成功')
        } else {
          console.log(respInfo.statusCode)
          console.log(respBody)
        }
      })
    } catch (e) {
      console.log('上传失败', e)
    }
  }

  /**
   *上传文件启动
  */
  async uploadFile (dist: string) {
    try {
      // let src = path.join(__dirname, '/') + 'dist/'

      await this.addFileToOSSSync(dist)
      console.log('上传结束')
    } catch (err) {
      console.log('上传oss失败', err)
    }
  }

  async refresh () {
    const cdnManager = new qiniu.cdn.CdnManager(this.mac)
    cdnManager.refreshDirs(['https://rich-cdn.xy-design.top/' + this.params.filename], function (err, respBody, respInfo) {
      if (err) {
        console.log('刷新缓存失败: ', err)
        throw err
      }
      console.log(respInfo)
    })
  }
}


export default (ctx: IPluginContext, options: { command: string; mode: string; }) => {
  ctx.onBuildComplete(async () => {
    if (options.mode === 'production' && options.command === 'build') {
      const Deploy = new DeployQiniuCDN({
        accessKey: process.env.TARO_APP_QINIU_ACCESS_KEY as string,
        secretKey: process.env.TARO_APP_QINIU_SECRET_KEY as string,
        filename: `hub-frontd/${options.mode}/`
      });
      await Deploy.uploadFile(ctx.paths.outputPath + '/');
    }
  })
}