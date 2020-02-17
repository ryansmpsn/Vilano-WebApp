export default function nav_perm_check(route) {
  var perm = sessionStorage.getItem(route);
  return perm;
}
