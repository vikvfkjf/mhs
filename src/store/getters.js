const getters = {
  draw_process: state => state.user.draw_process,
  avatar: state => state.user.avatar,
  email: state => state.user.email,
  id:state => state.user.id,
  level:state => state.user.level,
  name:state => state.user.name,
  phone:state => state.user.phone,
  remain_num:state => state.user.remain_num,
  status:state => state.user.status,
  user_no:state => state.user.user_no,
  token:state => state.user.token
}
export default getters
