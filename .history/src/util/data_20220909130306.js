export function parseDate(tdate) {
  const created = new Date(Date.parse(tdate));
  const now = new Date();
  const diff = Math.floor((now - created) / 1000);

  if (diff <= 86400) {
    return chatTime(created);
  }
  if (diff <= 129600) {
    return '1 day ago';
  }
  if (diff < 604800) {
    return Math.round(diff / 86400) + ' days ago';
  }
  if (diff <= 777600) {
    return '1 week ago';
  }
  const month = created.toLocaleDateString('default', { month: 'long' });
  return `on ${month} ${created.getDate()}`;
}

export function chatTime(tDate) {
  const created = new Date(tDate);

  return `${created.getHours()}:${created.getMinutes()}`;
}
