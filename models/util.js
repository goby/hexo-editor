/*
 * Author: tajpure
 * Since: 2015-11-15
*/
'use strict';


function compareDate(date0, date1) {
  const dateTime0 = new Date(date0).getTime();
  const dateTime1 = new Date(date1).getTime();
  if (dateTime0 < dateTime1) {
    return 1;
  } else if (dateTime0 === dateTime1) {
    return 0;
  } else {
    return -1;
  }
}

module.exports = {
  sortPosts(posts) {
    if (!posts instanceof Array) {
      throw new Error('The posts should be Array.');
    } else {
      posts.sort(function(post0, post1){ return compareDate(post0.date, post1.date)});
    }
  },
  formatDateStr(date, fmt) {
    //author: meizz
    var o = {
        "m+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
        "M+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
};
