function getUrlParams() {
  const t = "123";
  console.log(t);
  console.log("getUrlParams");
  return "getUrlParams";
}
function cookies() {
  const t = "456";
  console.log(t);
  function get() {
  }
  function set() {
  }
  function del() {
  }
  return {
    get,
    set,
    del
  };
}
export { cookies, getUrlParams };
