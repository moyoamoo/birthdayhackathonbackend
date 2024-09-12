const addBirthday = `INSERT INTO users
(username, email, email_frequency, partner_name, birthday, product_interests)
  values
    (?, ?, ?, ?, ?, ?)`;

const getEmailDetails = `SELECT * FROM users
    WHERE email_frequency LIKE ?`;

modules.export = {
  addBirthday,
};
