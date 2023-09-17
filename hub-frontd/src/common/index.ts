export function getIpNum(ipAddress: string) {
  /*获取IP数*/
  const ip = ipAddress.split(".");
  const a = parseInt(ip[0]);
  const b = parseInt(ip[1]);
  const c = parseInt(ip[2]);
  const d = parseInt(ip[3]);
  const ipNum = a * 256 * 256 * 256 + b * 256 * 256 + c * 256 + d;
  return ipNum;
}

export function isInner(userIp, begin, end) {
  return userIp >= begin && userIp <= end;
}

export function isInnerIPFn() {
  let curPageUrl = window.location.href;

  const reg1 = /(http|ftp|https|www):\/\//g; //去掉前缀
  curPageUrl = curPageUrl.replace(reg1, "");

  const reg2 = /\:+/g; //替换冒号为一点
  curPageUrl = curPageUrl.replace(reg2, ".");

  const curPageUrlSplit = curPageUrl.split("."); //通过一点来划分数组

  const ipAddress =
    curPageUrlSplit[0] +
    "." +
    curPageUrlSplit[1] +
    "." +
    curPageUrlSplit[2] +
    "." +
    curPageUrlSplit[3];

  let isInnerIp = false; //默认给定IP不是内网IP
  const ipNum = getIpNum(ipAddress);
  /**
   * 私有IP：A类  10.0.0.0    -10.255.255.255
   *       B类  172.16.0.0  -172.31.255.255
   *       C类  192.168.0.0 -192.168.255.255
   *       D类   127.0.0.0   -127.255.255.255(环回地址)
   **/
  const aBegin = getIpNum("10.0.0.0");
  const aEnd = getIpNum("10.255.255.255");
  const bBegin = getIpNum("172.16.0.0");
  const bEnd = getIpNum("172.31.255.255");
  const cBegin = getIpNum("192.168.0.0");
  const cEnd = getIpNum("192.168.255.255");
  const dBegin = getIpNum("127.0.0.0");
  const dEnd = getIpNum("127.255.255.255");
  isInnerIp =
    isInner(ipNum, aBegin, aEnd) ||
    isInner(ipNum, bBegin, bEnd) ||
    isInner(ipNum, cBegin, cEnd) ||
    isInner(ipNum, dBegin, dEnd);
  return isInnerIp;
}
