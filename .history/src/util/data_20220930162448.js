export function parseDate(tdate) {
  const created = new Date(Date.parse(tdate));
  const now = new Date();
  const diff = Math.floor((now - created) / 1000);

  if (diff <= 86400) {
    return chatTime(tdate);
  }

  const month = created.toLocaleDateString('default', { month: 'long' });
  return `${month} ${created.getDate()}일`;
}

export function chatTime(tDate) {
  const created = new Date(tDate);

  return `${created.getHours()}:${created.getMinutes()}`;
}
