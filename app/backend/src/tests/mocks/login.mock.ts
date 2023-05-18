const adminLoginResponse = {
  dataValues: {
    email: 'admin@admin.com',
    id: 1,
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    role: 'admin',
    username: 'Admin',
  }
};

const adminLogin = {
  "email": "admin@admin.com",
  "password": "secret_admin",
}

const missingEmail = {
  "password": "secret_admin",
}

const missingPassword = {
  "email:": "admin@admin.com",
}

const wrongEmail = {
  "email": "askjdkas",
  "password": "--adm2@21!!--"
}

const wrongPassword = {
  "email": "admin@admin.com",
  "password": "aa",
}

export default {
  adminLoginResponse,
  adminLogin,
  missingEmail,
  missingPassword,
  wrongEmail,
  wrongPassword,
}