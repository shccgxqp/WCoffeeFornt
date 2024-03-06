export const setCookie = (name, value, day) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + day * 24 * 60 * 60 * 1000);
  const cookieValue =
    encodeURIComponent(value) + ';expires=' + expires.toUTCString();
  document.cookie = name + '=' + cookieValue;
};

export const getCookie = (name) => {
  const cookieName = name + '=';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return decodeURIComponent(
        cookie.substring(cookieName.length, cookie.length),
      );
    }
  }
  return null;
};

export const getTokenFromCookie = () => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    console.log(name, value);
    if (name === 'token') {
      return value;
    }
  }
  return null;
};
