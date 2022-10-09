export function parseDate(tdate) {
  const created = new Date(Date.parse(tdate));
  const now = new Date();
  const diff = Math.floor((now - created) / 1000);
  console.log(new Date(tdate));
  console.log(created);
  if (diff <= 86400) {
    console.log(chatTime(tdate));
    return chatTime(tdate);
  }

  const month = created.toLocaleDateString('default', { month: 'long' });
  return `${month} ${created.getDate()}일`;
}

export function chatTime(tDate) {
  const created = new Date(tDate);

  return `${created.getHours()}:${created.getMinutes()}`;
}
