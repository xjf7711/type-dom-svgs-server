/**
 * @param str 字符串
 * @param separator 分割符(默认"-")
 * @param topIsCapital 开头是否大写(默认是)
 */
export function toHump(str, separator = '-', topIsCapital = true) {
  if (str.endsWith(separator)) {
    // 最后是减号的处理
    str = str + 'minus';
  }
  const strAry = str.split(separator);
  return strAry
    .map((item, index) => {
      if (!topIsCapital && index === 0) return item;
      return item.replace(/^./, item.match(/^./)[0].toLocaleUpperCase());
    })
    .join('');
}
