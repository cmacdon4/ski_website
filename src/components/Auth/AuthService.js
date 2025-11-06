import Parse from "../../parseConfig";

// used in auth register component
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  console.log("User: ", user);
  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// used in auth login component
// used in auth login component
export const loginUser = async (currUser) => {
  try {
    // Parse uses "username" for login even if you're using email
    const loggedInUser = await Parse.User.logIn(currUser.email, currUser.password);
    return loggedInUser;
  } catch (error) {
    alert(`Error: ${error.message}`);
    return null;
  }
};


export const checkUser = () => {
  return Parse.User.current()?.authenticated;
};
