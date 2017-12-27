/**
 * Created by leibo on 17/11/29.
 */
import {postPromise} from '@/assets/js/public'
import $ from 'jquery'
export default {
  //首页初始化
  initFristData({commit}){
    commit('showLoading');
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/Traders', {
        Sid: '',
        SName: '',
        Delete: '',
        Wedo: '',
      })
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            commit('initHomeUsers', data.stationInfoList)
            relove()
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //商户初始化
  initCashUser({commit}, data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/Traders', data)
        .then(data => {
          var data = JSON.parse(data)
          if (Number(data.backCode) == 200) {
            for (var i = 0; i < data.stationInfoList.length; i++) {
              if (data.stationInfoList[i].SAutoOut == false) {
                data.stationInfoList[i].SAutoOut = 1;
              } else {
                data.stationInfoList[i].SAutoOut = 0;
              }
            }
            commit('initCashUser', data.stationInfoList)
            relove()
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //添加商户
  addCashUser({commit}, data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/AddTrader', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            relove()
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //修改商户
  updateCashUser({commit}, data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/UpdateByAdmin',
        {
          Sid: data.Sid,
          SPassword: data.SPassword,
          SName: data.SName,
          SFreeRate: data.SFreeRate,
          SType: data.SType,
          SHuiCardNo: data.SHuiCardNo,
          SOrganNo: data.SOrganNo,
          SOrganSecret: data.SOrganSecret,
          APPID: data.APPID,
          APPKEY: data.APPKEY,
          NotifyURL: data.NotifyURL,
          RefundURL: data.RefundURL,
          APPSECRET: data.APPSECRET,
          CertPath: data.CertPath,
          CertPassword: data.CertPassword,
          SubMchid: data.SubMchid,
          STelephone: data.STelephone,
          SWorkerName: data.SWorkerName,
          SWorkerBank: data.SWorkerBank,
          SWorkerCard: data.SWorkerCard,
          SAutoOut: data.SAutoOut,
          SWebServiceType: data.SWebServiceType,
          SWebSellFee: data.SWebSellFee,
          SEmail: data.SEmail,
          SPassengerUse: data.SPassengerUse,
          SSale: data.SSale,
          SSaleHalf: data.SSaleHalf,
          SSaleFree: data.SSaleFree,
          SAllSale: data.SAllSale,
          SSellTimeLimit: data.SSellTimeLimit,
          SIntroduce: data.SIntroduce,
          SPayType: data.SPayType,
          SPicture1URL: data.SPicture1URL,
          SPicture2URL: data.SPicture2URL,
          SPicture3URL: data.SPicture3URL,
          SPicture4URL: data.SPicture4URL,
          SPicture5URL: data.SPicture5URL,
          ISDelete: data.co_si_ISDelete,
          WeDo: data.co_si_WeDo,

        })
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            relove()
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //删除商户
  deleteCash({commit}, id){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/CancelTrader', {
        Sid: id
      })
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            relove()
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //初始化明细信息
  initMessage({commit}, data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/SellInfos', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            commit('initMessage', data.sellInfoList)
            relove(data.total)
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //初始化提现查询信息
  initCashSearchMag({commit}, data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/CashApplays', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            commit('initCashSearch', data.cashApplayList)
            relove(data.total)
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  sellInfosClick({commit}, data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/SellInfos', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            commit('initRowClick', data.sellInfoList)
            relove(data.total)
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //上传提现
  updateVisible(store, data){
    return new Promise(function (relove, reject) {
      $.post('http://114.55.248.116:42999/CashoutWebservice.asmx/UpdateImages', data, (data => {
        var data = JSON.parse(data);
        if (Number(data.backCode) == 200) {
          relove()
        } else {
          reject(data.backResult)
        }
      }))
    })
  },
  //自动提现查询
  automaticMentionObj({commit},data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/CashApplays',{
        SID:data.SID,
        FromDate:data.FromDate,
        ToDate:data.ToDate,
        CashStatus:data.CashStatus,
        PageNum:1,
        Rows:1
      })
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            if(data.cashApplayList.length){
              commit('initAutomaticMentionObj', data.cashApplayList[0])
              relove()
            }else{
              reject('数据不存在!')
            }
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //申请提现
  applicationSubmitBtn(store,data){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/ApplayCashOut',data)
        .then(data=>{
          var data = JSON.parse(data);
          if(Number(data.backCode)==200){
            relove(data.balance)
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //商户申请结账后短信通知
  SendMessage(store,data){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/SendMsg',data)
        .then(data=>{
          var data = JSON.parse(data);
          if(Number(data.backCode)==200){
            relove(data.backResult)
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //商户

  //初始化商户信息
  initInformation({commit},data){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/Traders',data)
        .then(data=>{
          var data = JSON.parse(data);
          if(Number(data.backCode)==200){
            commit('initInformation',data.stationInfoList)
            relove()
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //开通商户钱包
  openMoney({commit},id){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/OpenQiankePartner',{
        SID:id
      })
        .then(data=>{
          var data = JSON.parse(data);
          if(Number(data.backCode)==200){
            relove(data.backResult)
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //修改商户
  merchantModification({commit},data){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/UpdateByUser',{
        Sid:data.Sid,
        STelephone:data.STelephone,
        SWorkerName:data.SWorkerName,
        SWorkerBank:data.SWorkerBank,
        SWorkerCard:data.SWorkerCard,
        SAutoOut:data.SAutoOut,
        SWebServiceType:data.SWebServiceType,
        SWebSellFee:data.SWebSellFee,
        SEmail:data.SEmail,
        SPassengerUse:data.SPassengerUse,
        SSale:data.SSale,
        SSaleHalf:data.SSaleHalf,
        SSaleFree:data.SSaleFree,
        SAllSale:data.SAllSale,
        SSellTimeLimit:data.SSellTimeLimit,
        SIntroduce:data.SIntroduce,
        SPayType:data.SPayType,
        SPicture1URL:data.SPicture1URL,
        SPicture2URL:data.SPicture2URL,
        SPicture3URL:data.SPicture3URL,
        SPicture4URL:data.SPicture4URL,
        SPicture5URL:data.SPicture5URL
      })
        .then(data=>{
          var data = JSON.parse(data);
          if(Number(data.backCode)==200){
            relove(data.backResult)
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //初始化信息
  initData({commit},obj){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/GetCanOrNotOutMoney',{
        StationID:obj.id,
        Way: obj.num
      })
        .then(data=>{
          var data = JSON.parse(data);
          console.log()
          if(obj.num == 0){
            commit('initPrice',data.canOutMoney)
          }else {
            commit('noInitPrice',data.canOutMoney)
          }
        })
    })
  },
  //申请提现
  applicationSubmit(store,data){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/ApplayCashOut',data)
        .then(data=>{
          var data = JSON.parse(data);
          if(Number(data.backCode)==200){
            relove(data.balance)
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //商户申请结账后短信通知
  SendMsg(store,data){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/SendMsg',data)
        .then(data=>{
          var data = JSON.parse(data);
          if(Number(data.backCode)==200){
            relove(data.backResult)
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //初始化明细信息
  initSearch({commit},data){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/SellInfos',data)
        .then(data=>{
          var data = JSON.parse(data);
          if(Number(data.backCode)==200){
            commit('initSearch',data.sellInfoList)
            relove(data.total)
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //初始化提现查询信息
  initCashSearch({commit},data){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/CashApplays',data)
        .then(data=>{
          var data = JSON.parse(data);
          if(Number(data.backCode)==200){
            commit('initCashSearch',data.cashApplayList)
            relove(data.total)
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //提现查询上半部分点击关联下半部分
  rowClick({commit},data){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/SellInfos',data)
        .then(data=>{
          var data = JSON.parse(data);
          if(Number(data.backCode)==200){
            commit('initRowClick',data.sellInfoList)
            relove(data.total)
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //初始化钱包充值信息
  initPurseRecharge({commit},id){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/GetQiankePartner',{
        SID:id,
        BalanceFrom:'',
        BalanceTo:'',
        DateFrom:'',
        DateTo:'',
        Delete:0
      })
        .then(data=>{
          var data = JSON.parse(data);
          if(Number(data.backCode)==200){
            commit('initPurseRecharge',data.cashApplayList[0].qp_Balance)
            relove()
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //生成汇卡订单号
  getMoney(store,data){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/MakeHuiOrder',{
        OrderMoney:data.OrderMoney
      })
        .then(data=>{
          var data = JSON.parse(data);
          if(Number(data.Resultcode)==200){
            relove(data)
          }else{
            reject(data)
          }
        })
    })
  },
  //查询汇卡订单支付
  GetHuiOrderState(store,data){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/GetHuiOrderState',data)
        .then(data=>{
          var data = JSON.parse(data);
          if(Number(data.Resultcode)==200){
            relove(data)
          }else{
            return
            reject(data)
          }
        })
    })
  },
  //充值商户钱包
  rechargeMoney({commit},data){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/CharageQiankePartner',{
        SID:data.uid,
        CharageMoney:data.CharageMoney
      })
        .then(data=>{
          var data = JSON.parse(data);
          console.log(data)
          if(Number(data.backCode)==200){
            commit('rechargeMoney',data)
            relove(data.backResult)
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //初始化充值明细查询
  GetCharageInfo({commit},data){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/GetCharageInfo',data)
        .then(data=>{
          var data = JSON.parse(data);
          if(Number(data.backCode)==200){
            commit('GetCharageInfoList',data.charageInfoList)
            relove(Number(data.total))
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //消费明细查询
  GetCostInfo({commit},data){
    return new Promise(function (relove,reject) {
      postPromise('http://114.55.248.116:42999/CashoutWebservice.asmx/GetCostInfo',data)
        .then(data=>{
          var data = JSON.parse(data);
          console.log(data)
          if(Number(data.backCode)==200){
            commit('GetCostInfo',data.cstRecordList)
            relove(Number(data.total))
          }else{
            reject(data.backResult)
          }
        })
    })
  },
}
