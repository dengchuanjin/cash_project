/**
 * Created by leibo on 17/11/29.
 */
export default {
  //加载动画
  loadingShow: (state) => state.loadingShow,
  //初始化动画
  transtionActive: (state) => state.transtionActive,
  //初始化商户信息
  users: state => state.users,
  //商户信息
  cashUserList: state => state.cashUserList,
  //修改商户信息obj
  cashUserObj: state => state.cashUserObj,
  //登陆用户信息
  user: state => state.user,
  DetailEnquiriesList: state => state.DetailEnquiriesList,
  //初始化提现查询列表
  CashSearchList:state=>state.CashSearchList,
  //初始化明细记录
  RowClickList:state=>state.RowClickList,
  //管理员自动提现
  AutomaticMentionObj:state=>state.AutomaticMentionObj,
  //登陆用户信息
  newUser: state =>state.newUser,
  //商户信息
  InformationList:state=>state.InformationList,
  //商户修改
  merchantModificationList:state=>state.merchantModificationList,
  //计算金额
  price:state=>state.price,
  noPrice:state=>state.noPrice,
  //充值商户钱包
  rechargeMoneyList:state=>state.rechargeMoneyList,
  //充值
  toPrice:state=>state.toPrice,
  //初始化充值明细查询
  GetCharageInfoList:state=>state.GetCharageInfoList,
  //消费明细查询
  GetCostInfoList:state=>state.GetCostInfoList,
}
