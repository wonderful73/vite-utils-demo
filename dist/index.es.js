function cookies() {
  const t = "456";
  console.log(t);
  function get() {
    console.log("get");
  }
  function set() {
    console.log("set");
  }
  function del() {
    console.log("del");
  }
  return {
    get,
    set,
    del
  };
}
function getUrlParams() {
  const t = "123";
  console.log(t);
  console.log("getUrlParams");
  return "getUrlParams";
}
export { cookies, getUrlParams };
