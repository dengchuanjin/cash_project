<template>
  <section>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户资金</span>
      </div>
      <div class="text item">
        商户编号 : {{user.Sid}}
      </div>
      <div class="text item">
        商户名称 : {{user.SName}}
      </div>
      <div class="text item">
        总金额 : {{price + noPrice}}元
      </div>
      <div class="text item">
        可提现金额 :
        <span style="color:green; font-weight: bold;">{{price}}</span>元
      </div>
      <div class="text item">
        不可提现金额 :
        <span style="color:red; font-weight: bold;">{{noPrice}}</span>元
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>结算账户</span>
      </div>
      <div class="text item">
        开户姓名 : {{user.SWorkerName}}
      </div>
      <div class="text item">
        开户银行 : {{user.SWorkerBank}}
      </div>
      <div class="text item">
        银行账户 : {{user.SWorkerCard}}
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>提现信息</span>
      </div>
      <div class="text item">
        商户编号 : {{user.Sid}}
      </div>
      <div class="text item">
        商户名称 : {{user.SName}}
      </div>
      <div class="text item">
        截止时间 : <span style="color:#00c; font-weight: bold;">{{new Date() | getNewTimeDate}}</span>
      </div>
      <div class="text item">
        提现金额 : <span style="color:green; font-weight: bold;">{{price}}</span>元
      </div>
      <div class="text item">
        手续费率 : {{user.SFreeRate}}
      </div>
      <div class="text item">
        到账金额 : <span style="color:green; font-weight: bold;">{{price*(1-user.SFreeRate)}}</span>元
      </div>
      <div class="text item">
        <el-date-picker
          v-model="FromDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="哪一天开始结账">
        </el-date-picker>
      </div>
      <div class="text item">
        <el-date-picker
          v-model="ToDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="结账到哪一天">
        </el-date-picker>
      </div>
      <div class="text item">
        登录密码 : <input class="loginPassword" type="password" v-model="loginPassword">
      </div>
    </el-card>
    <div class="block">
      <el-button type="success" style="width: 400px;height: 50px" :loading="isSubmit" @click="submit">申请提现</el-button>
    </div>


  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    computed: {
      ...mapGetters([
        'user',
        'price',
        'noPrice'
      ])
    },
    data(){
      return {
        isSubmit:false,
        loginPassword:'',
        ToDate:'',
        FromDate:''
      }
    },
    mounted(){
      let user = JSON.parse(sessionStorage.getItem('user'));
      this.$store.dispatch('initData',{id:user.Sid,num:0})
      this.$store.dispatch('initData',{id:user.Sid,num:1})
    },
    methods: {
      submit(){
        this.isSubmit = true;
        this.$store.dispatch('applicationSubmit',{
          StationID:this.user.Sid,
          Password:this.loginPassword,
          FromDate:this.FromDate,
          ToDate:this.ToDate
        })
          .then((balance)=>{
            this.$store.dispatch('SendMsg',{
              StationID:this.user.Sid,
              Password:this.loginPassword,
              TotalMoney:Number(balance)
            })
              .then((resulte)=>{
                this.$message({
                  message: '短信'+resulte,
                  type: 'success'
                });
                window.location.reload()
              })
            this.$message({
              message: '恭喜你,提现成功！',
              type: 'success'
            });
            this.isSubmit = false;
          },(err)=>{
            this.isSubmit = false;
            this.$message({
              message: err,
              type: 'error'
            });
          })
      }
    }
  }
</script>
<style scoped>
  .block{
    width: 400px;
    margin: 0 auto;
  }
  input {
    border:none;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    margin-bottom: 20px;
  }
  .loginPassword {
    border: 1px solid green;
    border-radius: 3px;
    padding: 0 2px;
  }
</style>
