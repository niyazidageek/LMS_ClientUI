export function distinctBy(array) {
  const result = [];
  const map = new Map();
  for (const item of array) {
    if (!map.has(item.appUserId)) {
      map.set(item.appUserId, true); // set any value to Map
      result.push({
        id:item.id,
        appUserId: item.appUserId,
        name: item.appUser.name,
        surname: item.appUser.surname,
      });
    }
  }
  return result;
}
