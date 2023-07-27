// document.cookie = "food_id=abc";
// document.cookie = "ad_code=year2020";
// var my_cookies = document.cookie;

// console.log(my_cookies); // food_id=def; ad_code=year2020

// document.cookie = "ad_code=year2020; expires=Thu, 18 Dec 2999 03:00:00 UTC";
// document.cookie = "ad_code=; expires=Thu, 18 Dec 2018 03:00:00 UTC";

// 設定 cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  // 取得 cookie 的值
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  // 檢查某 cookie 是否存在
  function checkCookie(cname) {
    var cookie_value = getCookie(cname);
    if (cookie_value != "") {
      return true;
    } else {
      return false;
    }
  }

  //setCookie("new_cookie", "new_value", 1); // 建立 cookie
//console.log(getCookie("new_cookie"));    // 取得 new_cookie 的值
//console.log(checkCookie("new_cookie"));  // 檢查 new_cookie 是否存在