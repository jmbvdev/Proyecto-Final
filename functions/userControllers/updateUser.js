const { admin } = require("../config/firebase.js");

module.exports = async function updateUser(
  uid,
  displayName,
  password,
  email,
  phoneNumber,
  photoURL,
  role,
  disabled,
  adress,
  adressNumber,
  city
) {
  const auth = admin.auth();

  const user = await auth.updateUser(uid, {
    displayName,
    password,
    email,
    phoneNumber,
    photoURL,
    disabled,
  });
  await admin
    .auth()
    .setCustomUserClaims(user.uid, { role, adress, adressNumber, city });
  return;
};
