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
        钱包金额 : {{toPrice}}元
      </div>
      <div>
        <el-button type="success" style="width: 120px" @click="getCenterDialogVisible">充值</el-button>
      </div>
    </el-card>
    <el-dialog
      title="充值窗口"
      :visible.sync="centerDialogVisible"
      width="20%"
      center>
      <!--<el-input-->
      <!--v-model="money"-->
      <!--placeholder="请输入充值金额"-->
      <!--size="small"-->
      <!--ref="setMoney"-->
      <!--&gt;</el-input>-->
      <input  type="text" v-model="money"
              placeholder="请输入充值金额"
              ref="setMoney"
              class="textBox"
      >

      <div class="codeBox" :class="hide" ref="ewm"></div>
    </el-dialog>


  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {postPromise} from '../assets/js/public'
  export default{
    name: '',
    computed: mapGetters([
      'user',
      'toPrice',
      'rechargeMoneyList'
    ]),
    data(){
      return {
        i:false,
        hide:false,
        money:'',
        timer:null,
        centerDialogVisible:false,
        isLoad:0
      }
    },
    mounted(){
      let user = JSON.parse(sessionStorage.getItem('user'));
      this.$store.dispatch('initPurseRecharge',user.Sid)
      this.$store.dispatch('initData',{id:user.Sid,num:0})
      this.$store.dispatch('initData',{id:user.Sid,num:1})
    },
    methods: {
      getCenterDialogVisible(){
        this.$store.commit('setTranstionFalse');
        this.centerDialogVisible = true;
        this._getQart()
      },
      _getQart(){

        if(this.i==false){
          setTimeout(()=>{
            var qrcode = new QRCode(this.$refs.ewm, {
              width : 200,//设置宽高
              height : 200
            });
            this.$refs.setMoney.onkeyup =()=>{
              if(!Number(this.money)&&this.money!=''){
                this.$message({
                  message: '不能输入0!',
                  type: 'error'
                });
                return
              }
              if(this.money==''){
                this.$message({
                  message: '请输入金额!',
                  type: 'error'
                });
                return
              }
              if(this.isLoad>0){
                return;
              }
              this.$store.dispatch('getMoney',{
                OrderMoney:this.money
              })
                .then(data=>{
                  if(this.isLoad>0){
                    return;
                  }
                  qrcode.makeCode(data.Resultcontent);
                  this.timer= setInterval(()=>{
                    this.$store.dispatch('GetHuiOrderState',{
                      OrderNo:data.Out_trade_no,
                      HicardOrderNo:data.Hicardorderno,
                    })
                      .then(data=>{
                        if(this.isLoad>0){
                          return;
                        }
                        console.log(this.money,data)
                        this.$store.dispatch('rechargeMoney',{
                          uid:this.user.Sid,
                          CharageMoney:this.money,
                        })
                          .then(()=>{
                            if(this.isLoad>0){
                              return;
                            }
                            this.isLoad++;

                            clearInterval(this.timer)
                            this.$message({
                              message: '成功',
                              type: 'success'
                            });
                            this.initData()
                            this.centerDialogVisible = false
                          });
                      })
                  },300)
                })
            };
          },30)
        }
        this.i = true;
      },
      getEwm(){
        if(this.i==false){
          //生成二维码
          var qrcode = new QRCode(this.$refs.ewm,{
            width:200,
            height:200
          });
          this.$store.dispatch('getMoney',{
            OrderMoney:this.money
          })
            .then(data=>{
              if(this.isLoad>0){
                return;
              }
              qrcode.makeCode(data.Resultcontent);
              console.log(data)

            })
        }
        this.i = true;
      },
      //初始化
      initData(){
        this.$store.dispatch('initPurseRecharge',this.user.Sid)
      },
      clear(){
        this.money = ""
      },
      submitMoney(){
        if( this.money == "" ){
          this.$message({
            message: '请输入充值金额',
            type: 'error'
          });
        }else{

//            })
        }
      },
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
    padding:0 2px;
  }
  .codeBox {
    width: 200px;
    height: 200px;
    border:1px solid #ddd;
    margin: 20px auto 0;
  }
  #qrcode{
    height: 200px;
    width: 200px;
    margin: auto;
  }
  .hide{
    visibility:hidden;
  }
  .textBox {
    width:100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 40px;
  }
</style>
