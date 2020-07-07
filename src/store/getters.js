const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  login_id: state => state.user.login_id,
  nick_name: state => state.user.nick_name,
  image: state => state.user.image,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles
}
export default getters
