import { login, getInfo } from '@/api/index'
import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    draw_process: null,
    avatar: null,
    email: null,
    id:null,
    level:null,
    name:null,
    phone:null,
    remain_num:null,
    status:null,
    user_no:null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_USER_NO: (state, user_no) => {
    state.user_no = user_no
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_DRAW_PROCESS:(state, draw_process) => {
    state.draw_process = draw_process
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_LEVEL: (state, level) => {
    state.level = level
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_REMAIN_NUM: (state, remain_num) => {
    state.remain_num = remain_num
  },
  SET_STATUS: (state, status) => {
    state.status = status
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { name , password  } = userInfo
    return new Promise((resolve, reject) => {
      login({ name: name.trim(), password: password}).then(res => {
        const { data } = res
        // console.log('res',res);
        if(res.status_code==200) {
          commit('SET_TOKEN', data.token_type + ' ' + data.access_token)
          setToken(data.token_type + ' ' + data.access_token)
        }
        resolve(res);
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        console.log('response',response);
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar,draw_process,email,id,level,phone,remain_num,status,user_no,} = data
        
        commit('SET_NAME',name);
        commit('SET_AVATAR', avatar);
        commit('SET_DRAW_PROCESS', draw_process);
        commit('SET_EMAIL', email);
        commit('SET_ID', id);
        commit('SET_LEVEL', level);
        commit('SET_PHONE', phone);
        commit('SET_REMAIN_NUM', remain_num);
        commit('SET_STATUS', status);
        commit('SET_USER_NO', user_no);
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

