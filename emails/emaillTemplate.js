const  emailHTML = (partners_name, birthday) => {
  return {
    subject: `Birthday Reminder`,
    content: `<h1>Email Reminder</h1>
                <p>Just reminding you that it is ${partners_name}'s birthday on ${birthday}<p/>`,
  };
}

module.exports = { emailHTML };
