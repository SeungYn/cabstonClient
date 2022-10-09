export function parseDate(tdate) {
  const created = new Date(Date.parse(tdate));
  const now = new Date();
  console.log(new Date(tdate));
  console.log(created);
  const diff = Math.floor((now - created) / 1000);

  if (diff <= 86400) {
    console.log(chatTime(tdate));
    return chatTime(tdate);
  }

  const month = created.toLocaleDateString('default', { month: 'long' });
  return `${month} ${created.getDate()}일`;
}

export function chatTime(tDate) {
  const created = new Date(tDate);
  console.log(tDate);
  console.log(created);
  return `${created.getHours()}:${created.getMinutes()}`;
}
