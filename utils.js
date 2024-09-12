function formatBirthday(bdayDate) {
  const newDate = new Date(bdayDate * 1000);
  const bdayYear = newDate.getFullYear();
  const bdayMonth = newDate.getMonth() + 1;
  const bdayDay = newDate.getDate();
  const birthday = bdayYear + "-" + bdayMonth + "-" + bdayDay;
  return birthday;
}

module.exports = { formatBirthday };
