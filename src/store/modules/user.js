


const user = {
  state: {
    nick_name: '',
    image: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_LOGIN_ID: (state, login_id) => {
      state.login_id = login_id
    },
    SET_NICK_NAME: (state, nick_name) => {
      state.nick_name = nick_name
    },
    SET_IMAGE: (state, image) => {
      state.image = image
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录

  }
}

export default user
