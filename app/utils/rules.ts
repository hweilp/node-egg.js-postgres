const loginRules = {
  userName: {
    type: 'string',
    required: true,
    msg: '请输入登录名',
  },
  password: {
    type: 'string',
    required: true,
    // reg: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
    regMsg: '登陆密码格式不正确,包含数字大小写字母并且长度在6~15之间的密码组合,可使用特殊字符',
    msg: '请输入登陆密码',
  },
};

const registerRules = {
  userName: {
    type: 'string',
    required: true,
    msg: '请输入登录名',
  },
  userMobile: {
    type: 'string',
    required: true,
    msg: '请输入手机号',
    reg: /^1[3|4|5|7|8][0-9]{9}$/,
    regMsg: '手机号格式有误!',
  },
  password: {
    type: 'string',
    required: true,
    reg: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
    regMsg: '登陆密码格式不正确,包含数字大小写字母并且长度在6~15之间的密码组合,可使用特殊字符',
    msg: '请输入登陆密码',
  },
};

export {
  loginRules, registerRules,
};
