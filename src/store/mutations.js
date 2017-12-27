/**
 * Created by leibo on 17/11/29.
 */
import getters from './getters'

const state = {
	//加载动画
	loadingShow: false,
	//初始化动画
	transtionActive: {
		isActive: false,
		isMove: false
	},
  //初始化商户
  users:[],
  //商户信息
  cashUserList:[],
  //初始化修改商户信息
  cashUserObj:{},
  //初始化明细信息
  DetailEnquiriesList:[],
  //初始化提现查询信息
  CashSearchList:[],
  //初始化明细记录
  RowClickList:[],
  //管理员自动提现
  AutomaticMentionObj:{},

  newUser:{},
  //初始化商户信息
  InformationList:[],
  //修改商户信息商户信息
  merchantModificationList:[],
  //计算金额
  price:0,
  noPrice:0,
  //初始化提现查询信息
  CashSearchList:[],
  //初始化明细记录
  RowClickList:[],
  //充值商户信息
  rechargeMoneyList:[],
  //初始化钱包充值
  PurseRechargeList:[],
  toPrice:'',
  //充值明细查询
  GetCharageInfoList:[],
  //消费明细查询
  GetCostInfoList:[],
};

const mutations = {
  clearData(state){
    state.cashUserList = state.DetailEnquiriesList = state.CashSearchList = state.RowClickList = [];
    state.DetailEnquiriesList = state.CashSearchList  = state.RowClickList = state.PurseRechargeList = state.InformationList = state.merchantModificationList = state.rechargeMoneyList = state.GetCostInfoList = state.GetCharageInfoList = [];
  },
	//loading动画过渡
	showLoading(state) {
		state.loadingShow = true
	},
	hideLoading() {
		state.loadingShow = false
	},
	//初始化动画
	setTranstionFalse(state) {
		state.transtionActive = {
			isActive: false,
			isMove: false
		}
	},
	oPTranstionFalse() {
		state.transtionActive = {
			isActive: !state.transtionActive.isActive,
			isMove: !state.transtionActive.isMove
		}
	},
  initHomeUsers(state,data){
	  state.users = data;
  },
  initUser(state,obj){
    state.user = obj;
  },
  //商户信息
  initCashUser(state,data){
	  state.cashUserList = data;
  },
  //初始化修改商户信息obj
  initCashUserObj(state,id){
    state.cashUserObj = state.cashUserList.filter(item=>{
      if(item.Sid===id){
        return true
      }
      return false
    })[0]
  },
  initMessage(state,data){
    state.DetailEnquiriesList = data;
  },
  initCashSearch(state,data){
    state.CashSearchList = data;
  },
  initRowClick(state,data){
    state.RowClickList = data;
  },
  //管理员自动提现
  initAutomaticMentionObj(state,data){
    state.AutomaticMentionObj = data;
  },


  //初始化商户信息
  initInformation(state,stationInfoList){
    state.InformationList = stationInfoList
  },
  //初始化商户信息
  merchantModification(state,UpdateByUserList){
    state.merchantModificationList = UpdateByUserList
  },
  //商户信息设置初始化
  setNewUser(state,obj){
    state.newUser = obj;
  },
  //可提现金额计算
  initPrice(state,price){
    state.price = Number(price);
  },
  //不可提现金额计算
  noInitPrice(state,price){
    state.noPrice = Number(price);
  },
  //
  initSearch(state,data){
    state.DetailEnquiriesList = data;
  },
  //初始化明细查询数据
  initCashSearch(state,data){
    state.CashSearchList = data;
  },
  //点击查询数据
  initRowClick(state,data){
    state.RowClickList = data;
  },
  //充值商户钱包
  rechargeMoney(state,obj){
    state.rechargeMoneyList = obj;
  },
  //钱包充值
  initPurseRecharge(state,price){
    state.toPrice = price
  },
  //初始化充值明细查询数据
  GetCharageInfoList(state,data) {
    state.GetCharageInfoList = data;
  },
  //消费明细查询
  GetCostInfo(state,data){
    state.GetCostInfoList = data;
  }
};

export default {
	getters,
	state,
	mutations
}
