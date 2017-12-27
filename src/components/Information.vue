<template>
  <section id="wrap">
    <h1 class="userClass">商户信息</h1>
    <el-table
      :data="InformationList"
      border
      v-loading="listLoading"
      style="width: 100%"
      height="200"
      highlight-current-row
    >
      <el-table-column
        label="申请时间"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.SCreateTime | getNewDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="Sid"
        label="商户号"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="SName"
        label="商户名称"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="SWorkerName"
        label="收款人"
        align="center"
        width="220">
      </el-table-column>
      <el-table-column
        prop="SWorkerCard"
        label="银行卡号"
        align="center"
        width="170">
      </el-table-column>
      <el-table-column
        prop="SWorkerBank"
        label="办卡银行"
        align="center"
        width="240">
      </el-table-column>
      <el-table-column
        label="自动提现"
        align="center"
        width="120">
        <template slot-scope="scope">
          {{scope.row.SAutoOut?"是":"否"}}
        </template>
      </el-table-column>
      <el-table-column
        label="是否有效"
        align="center"
        width="120">
        <template slot-scope="scope">
          {{scope.row.co_si_ISDelete==0?"是":"否"}}
        </template>
      </el-table-column>
      <el-table-column
        prop="SWebSellFee"
        label="服务费"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="SFreeRate"
        label="提现费率"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="STelephone"
        label="联系电话"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        label="联系邮箱"
        align="center"
        width="200">
        <template slot-scope="scope">
          {{scope.row.SEmail}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="140"
        align="center"
      >
        <template slot-scope="scope">
          <el-button @click="updateCash(scope.row.Sid)" type="text">修改</el-button>
          <el-button type="text" @click="openMoney(scope.row.Sid)" >开通钱包</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--修改商户-->
    <el-dialog title="修改商户" :visible.sync="updateCashUserDialog">
      <el-form :model="newUser"  size="small">
        <el-form-item label="商户编号" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="newUser.Sid" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="提现费率" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="newUser.SFreeRate" auto-complete="off" :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px" :required="isOff">
          <el-input v-model="newUser.STelephone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款人姓名" label-width="120px" :required="isOff">
          <el-input v-model="newUser.SWorkerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="办卡银行" label-width="120px" :required="isOff">
          <el-input v-model="newUser.SWorkerBank" auto-complete="off"></el-input>
        </el-form-item>

        <!--<el-form-item label="汇卡卡号" :label-width="formLabelWidth" :required="isOff">-->
          <!--<el-input v-model="newUser.SHuiCardNo" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="机构号" :label-width="formLabelWidth" :required="isOff">-->
          <!--<el-input v-model="newUser.SOrganNo" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="机构密钥" :label-width="formLabelWidth" :required="isOff">-->
          <!--<el-input v-model="newUser.SOrganSecret" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="微信 APPID" :label-width="formLabelWidth" :required="isOff">-->
          <!--<el-input v-model="newUser.APPID" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="微信 APPKEY" :label-width="formLabelWidth" :required="isOff">-->
          <!--<el-input v-model="newUser.APPKEY" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="支付回调地址" :label-width="formLabelWidth" :required="isOff">-->
          <!--<el-input v-model="newUser.NotifyURL" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="退款回调地址" :label-width="formLabelWidth" :required="isOff">-->
          <!--<el-input v-model="newUser.RefundURL" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="商户密钥" :label-width="formLabelWidth" :required="isOff">-->
          <!--<el-input v-model="newUser.APPSECRET" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="退款证书路径" :label-width="formLabelWidth" :required="isOff">-->
          <!--<el-input v-model="newUser.CertPath" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="证书密码" :label-width="formLabelWidth" :required="isOff">-->
          <!--<el-input v-model="newUser.CertPassword" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="收款人姓名" label-width="140px" :required="isOff">-->
          <!--<el-input v-model="newUser.SWorkerName" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="办卡银行" label-width="140px" :required="isOff">-->
          <!--<el-input v-model="newUser.SWorkerBank" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="银行卡号" label-width="120px" :required="isOff">
          <el-input v-model="newUser.SWorkerCard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否每日自动提现" label-width="120px" :required="isOff">
          <el-select v-model="newUser.SAutoOut" placeholder="是否每日自动提现">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网售服务费的类型" label-width="120px" :required="isOff">
          <el-select v-model="newUser.SWebServiceType" placeholder="网售服务费的类型">
            <el-option label="固定设置" value="0"></el-option>
            <el-option label="根据票价" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网售服务费" label-width="120px" :required="isOff">
          <el-input v-model="newUser.SWebSellFee" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" label-width="120px" :required="isOff">
          <el-input v-model="newUser.SEmail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用添加乘客功能" label-width="120px" :required="isOff">
          <el-select v-model="newUser.SPassengerUse" placeholder="是否启用添加乘客功能">
            <el-option label="不启用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打折金额" label-width="120px" :required="isOff">
          <el-input v-model="newUser.SSale" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否售半价票" label-width="120px" :required="isOff">
          <el-select v-model="newUser.SSaleHalf" placeholder="是否售半价票">
            <el-option label="不售" value="0"></el-option>
            <el-option label="售" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否售免票" label-width="120px" :required="isOff">
          <el-select v-model="newUser.SSaleFree" placeholder="是否售免票">
            <el-option label="不售" value="0"></el-option>
            <el-option label="售" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否读取全部班次" label-width="120px" :required="isOff">
          <el-select v-model="newUser.SAllSale" placeholder="是否读取全部班次">
            <el-option label="不全读" value="0"></el-option>
            <el-option label="全读" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班次提前多少分钟可微信购票" label-width="120px" :required="isOff">
          <el-input v-model="newUser.SSellTimeLimit" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户简介" label-width="120px" :required="isOff">
          <el-input v-model="newUser.SIntroduce" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="支付方式" label-width="140px" :required="isOff">-->
          <!--<el-input v-model="newUser.SPayType" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="服务商下的子商户" label-width="140px" :required="isOff">-->
          <!--<el-input v-model="newUser.SubMchid" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateCashUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateCashUserSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    computed: mapGetters([
      'user',
      'newUser',
      'InformationList',
      'merchantModificationList'
    ]),
    data(){
      return {
        options: [{
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
        }],
        formLabelWidth:'120px',
        isOff:true,
        addCashUserDialog:false,//添加弹窗
        updateCashUserDialog:false,//修改弹窗
        value:'',
        listLoading: false,
        //请求参数
        getData: {
          Sid:'',
          SName:'',
          Delete:0,
          Wedo:0,
        },
      }
    },
    methods: {
      //初始化
      initData(){
        let user = JSON.parse(sessionStorage.getItem('user'))
        this.getData.SName = '';
        this.getData.Sid = user.Sid
        this.listLoading = true;

        this.$store.dispatch('initInformation', this.getData)
          .then(() => {
            this.listLoading = false;
          }, err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
      },
      //修改商户
      updateCash(id){
        this.updateCashUserDialog = true;
        this.$store.commit('setTranstionFalse');
        var obj = {};
        if(this.user['SAutoOut']==false){
          this.user['SAutoOut'] = 0;
        }else{
          this.user['SAutoOut'] = 1;
        }

        for(var attr in this.user){
          obj[attr] = this.user[attr];
        }
        this.$store.commit('setNewUser',obj)
      },
      //开通钱包
      openMoney(id){
        this.$store.dispatch('openMoney', this.user.Sid)
          .then((success) => {
            this.$message({
              message: success,
              type: 'success'
            });
          }, err => {
            this.$message({
              message: err,
              type: 'error'
            });
          });
      },
      //修改商户提交
      updateCashUserSubmit(){
        if(this.newUser.Sid==''
          ||this.newUser.SPassword==''
          ||this.newUser.SName==''
          ||this.newUser.SType==''
          ||this.newUser.WeDo==''
        ){
          this.$message({
            showClose: true,
            message: '输入内容不能为空！',
            type: 'error'
          });
          return;
        }
        if(this.newUser.SAutoOut==1){
          this.newUser.SAutoOut = 'False';
        }else{
          this.newUser.SAutoOut = 'True';
        }
        for(let attr in this.newUser){
          if(this.newUser==null){
            this.newUser[attr] = '';
          }
        }
        this.$store.dispatch('merchantModification',this.newUser)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
            this.initData();
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
        this.updateCashUserDialog = false;
      },
//      删除商户
      deleteCash(id){
        this.$store.dispatch('deleteCash',id)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.initData();
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      }
    },
    mounted(){
      this.initData()
    },
  }
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  #wrap {
    background: #fff;
  }

  .formSearch {
    padding: 20px 0 0 20px;
  }

  .userClass {
    padding: 20px 0 0 20px;
    font-size: 18px;
    margin-bottom:40px;
  }

</style>
