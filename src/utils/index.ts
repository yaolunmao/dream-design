export const objectDeepClone = (object: object, default_val: any = {}) => {
  if (!object) {
    return default_val;
  }
  return JSON.parse(JSON.stringify(object));
};
/**
 * 生成随机字符串
 * @param len 生成个数
 */
export const randomString = (len?: number) => {
  len = len || 10;
  const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const maxPos = str.length;
  let random_str = "";
  for (let i = 0; i < len; i++) {
    random_str += str.charAt(Math.floor(Math.random() * maxPos));
  }
  return random_str;
};
export const cssToJson = (css_str: string) => {
  //记录第一个花括号的位置
  const firstbrackets_index = css_str.indexOf('{');
  const lastbrackets_index = css_str.indexOf('}');
  //将括号外的都视为垃圾数据
  const effective_str = css_str.substring(firstbrackets_index + 1, lastbrackets_index).replace(/\s/g, "");
  //根据分号分隔成数组
  const effective_arr = effective_str.split(';');
  let _json = ''
  effective_arr.forEach(f => {
    if (f.includes(':')) {
      const temp_json_arr = f.split(':');
      _json += `,"${temp_json_arr[0]}":"${temp_json_arr[1]}"`;
    }
  });
  _json = `{${_json.substring(1)}}`;
  return _json;
}
export const objectToCss = (ob: {
  [key: string]: string;
}) => {
  let _css = "";
  for (let ob_item in ob) {
    _css += `;\n\t${ob_item}:${ob[ob_item]}`;
  }
  if (_css) {
    _css = `{${_css.substring(1)};\n}`;
  }
  else {
    _css = `{\n\n}`;
  }


  return _css;
}
