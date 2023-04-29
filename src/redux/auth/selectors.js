
const selectIsLoggedIn = state => state.auth.isLoggedIn;

const selectUsername = state => state.auth.user.name;
const selectUserEmail = state => state.auth.user.email;

const selectIsRefreshing = state => state.auth.isRefreshing;

const authSelectors = {
  selectIsLoggedIn,
  selectUsername,
  selectIsRefreshing,
  selectUserEmail,
};
export default authSelectors;
