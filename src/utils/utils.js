export const playCount = (num) => {
  if (num > 100000000) return (num / 100000000).toFixed(1) + '亿'
  else if (num > 10000) return (num / 10000).toFixed(1) + '万'
}
