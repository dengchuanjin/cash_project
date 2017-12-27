/**
 * Created by leibo on 17/11/29.
 */
import Login from '@/components/Login' //登录
import Home from '@/components/Home'  //首页
import CashUser from '@/components/CashUser'  //管理员用户信息
import DetailsSearch from '@/components/DetailsSearch'  //管理员明细查询
import Withdrawal from '@/components/Withdrawal'  //管理员提现记录
import AutomaticMention from '@/components/AutomaticMention'  //管理员自动提现


import Information from '@/components/Information' //商户信息
import User from '@/components/User' //用户信息
import DetailEnquiries from '@/components/DetailEnquiries' //明细查询
import CashSearch from '@/components/CashSearch' //提现查询
import PurseRecharge from '@/components/PurseRecharge' //钱包充值
import PurseDetail from '@/components/PurseDetail' //充值明细
import ConsumptionDetail from '@/components/ConsumptionDetail' //消费明细
export default [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    hidden: true,
    redirect: { name: 'Login' }
  },
  {
    path : '/home',
    component : Home,
    name : 'Home',
    children:[
      {
        path: 'cashUser',
        components: {
          default: Home,
          User: CashUser
        },
        name:'CashUser'
      },
      {
        path: 'detailsSearch',
        components: {
          default: Home,
          User: DetailsSearch
        },
        name:'DetailsSearch'
      },
      {
        path: 'withdrawal',
        components: {
          default: Home,
          User: Withdrawal
        },
        name:'Withdrawal'
      },
      {
        path: 'automaticMention',
        components: {
          default: Home,
          User: AutomaticMention
        },
        name:'AutomaticMention'
      },
      {
        path: 'information',
        components: {
          default: Home,
          User: Information
        },
        name:'Information'
      },
      {
        path: 'user',
        components: {
          default: Home,
          User: User
        },
        name:'User'
      },
      {
        path: 'detailEnquiries',
        components: {
          default: Home,
          User: DetailEnquiries
        },
        name:'DetailEnquiries'
      },
      {
        path: 'cashSearch',
        components: {
          default: Home,
          User: CashSearch
        },
        name:'CashSearch'
      },
      {
        path: 'purseRecharge',
        components: {
          default: Home,
          User: PurseRecharge
        },
        name:'PurseRecharge'
      },
      {
        path: 'purseDetail',
        components: {
          default: Home,
          User: PurseDetail
        },
        name:'PurseDetail'
      },
      {
        path: 'consumptionDetail',
        components: {
          default: Home,
          User: ConsumptionDetail
        },
        name:'ConsumptionDetail'
      }
    ]
  }
]
