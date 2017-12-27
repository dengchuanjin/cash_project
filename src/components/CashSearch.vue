<template>
  <section id="wrap">
    <!--工具条-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true" :model="getData">
        <el-form-item>
          <span>申请时间:</span>
          <el-date-picker
            v-model="getData.FromDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="哪一天开始查询">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <span>到:</span>
          <el-date-picker
            v-model="getData.ToDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="查询到哪一天">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="提现状态:">
          <el-select v-model="getData.CashStatus" placeholder="提现状态">
            <el-option label="处理中" value="0"></el-option>
            <el-option label="处理完成" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>

    </el-col>
    <el-table
      @row-click="rowClick"
      :height="initHeight"
      :data="CashSearchList"
      v-loading="listLoading"
      style="width: 100%;"
      border
      size="small"
      highlight-current-row
      :summary-method="getSummaries"
      show-summary
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column
        label="ID"
        type="index"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="CStationid"
        label="商户号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="结算开始时间"
        align="center"
        width="140"
      >
        <template slot-scope="scope">
          {{scope.row.CPayForm | getNewDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="结算结束时间"
        align="center"
        width="140"
      >
        <template slot-scope="scope">
          {{scope.row.CPayTo | getNewDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="申请时间"
        align="center"
        width="140"
      >
        <template slot-scope="scope">
          {{scope.row.CCreateTime | getNewDate}}
        </template>
      </el-table-column>
      <el-table-column
        width="140"
        label="反馈时间"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.CBackTime | getNewDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="CStationName"
        label="车站名称"
        align="center"
        width="140"
      >
      </el-table-column>
      <el-table-column
        prop="CApplayPrice"
        label="提现金额"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="CFreeRate"
        label="提现费率"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="CFree"
        label="提现手续费"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="CBackPrice"
        label="到账金额"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        label="提现状态"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.CStatus ==0?"处理中":"处理完成"}}
        </template>
      </el-table-column>
      <el-table-column
        label="查看回款单"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-button  @click="look(scope.row.CBackBill)" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="CRemark"
        label="备注"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="CRemarkImage"
        label="备注图片"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="CBillNo"
        label="流水单号"
        align="center"
        width="160"
      >
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        v-show="total"
        style="float: right;"
      >
      </el-pagination>
    </el-col>

    <el-table
      :height="initHeight"
      :data="RowClickList"
      v-loading="listLoading2"
      style="width: 100%;"
      highlight-current-row
      :summary-method="getSummaries2"
      show-summary
      size="small"
      border
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column
        label="ID"
        type="index"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="交易时间"
        align="center"
        width="140"
      >
        <template slot-scope="scope">
          {{scope.row.SSellTime | getNewDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="SStationid"
        label="商户号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="SOrderNo"
        label="微信订单号"
        align="center"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="SHuiOrderNo"
        label="汇卡订单号"
        align="center"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="STicketPrice"
        label="订单金额"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="SBuyerName"
        label="售票员名称"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="SFromSiteName"
        label="上车站点"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="SEndSiteName"
        label="到达站点"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="SClassDate"
        label="班次日期"
        align="center"
        width="140"
      >
      </el-table-column>
      <el-table-column
        prop="SDpartureTime"
        label="发车时间"
        align="center"
        width="140"
      >
      </el-table-column>
      <el-table-column
        prop="SBillNo"
        label="提现流水号"
        align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="交易状态"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.STicketState | getTicketStatus}}
        </template>
      </el-table-column>
      <el-table-column
        prop="SPayWay"
        label="支付方式"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="SFreeRate"
        label="是否提现"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.SCashOut | getTicketCashOut}}
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
        :current-page="currentPage9"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total2"
        v-show="total2"
        style="float: right;"
      >
      </el-pagination>
    </el-col>





  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    computed: mapGetters([
      'user',
      'CashSearchList',
      'RowClickList'
    ]),
    data(){
      return {
        listLoading2:false,
        initHeight:450,
        size:20,
        total:0,
        total2:0,
        currentPage4:0,
        currentPage9:0,
        formLabelWidth:'120px',
        isOff:true,
        addCashUserDialog:false,//添加弹窗
        updateCashUserDialog:false,//修改弹窗
        value:'',
        listLoading: false,
        uid:'',
        userSearch: {
          name: ''
        },
        //添加参数
        AddCashUser:{
          Sid:'',
          SPassword:'',
          SName:'',
          SFreeRate:'',
          SType:'',
          SHuiCardNo:'',
          SOrganNo:'',
          SOrganSecret:'',
          APPID:'',
          APPKEY:'',
          NotifyURL:'',
          RefundURL:'',
          APPSECRET:'',
          CertPath:'',
          CertPassword:'',
          SubMchid:'',
          WeDo:''
        },
        //请求参数
        getData: {
          SID:'',
          FromDate:'',
          CashStatus:'',
          ToDate:'',
          PageNum:1,
          Rows:10
        },
        getRecordData: {
          SStationid:'',
          SSellTimeFrom:'',
          SSellTimeTO:'',
          SHuiOrderNo:'',
          SCashOut:'',
          BillNo:'',
          PageNum:1,
          Rows:10
        },
      }
    },
    methods: {
      look(CBackBill){
        if(CBackBill){
          window.open('http://shanghu.1000da.com.cn'+CBackBill)
//          window.location.href = 'http://shanghu.1000da.com.cn'+CBackBill;
        }else{
          this.$message({
            message: '图片不存在！',
            type: 'error'
          });
        }
      },
      //计算条数
      handleSizeChange(val) {
        this.initData(1,val)
        this.getData.Rows = val
      },
      //计算页数
      handleCurrentChange(val) {
        this.initData(val,this.getData.Rows)
      },
      //计算条数
      handleSizeChange2(val) {
        this.initData2(1,val)
        this.getData.Rows = val
      },
      //计算页数
      handleCurrentChange2(val) {
        this.initData2(val,this.getData.Rows)
      },
      initData2(num,rows){
        this.getRecordData.SStationid = this.uid;
        this.getRecordData.PageNum = num;
        this.getRecordData.Rows = rows;
        this.listLoading2 = true;
        this.$store.dispatch('rowClick',this.getRecordData)
          .then(total=>{
            this.total2 = Number(total);
            this.listLoading2 = false;
          },err=>{
            this.$message({
              message: err,
              type: 'error'
            });
          })
      },
      //初始化
      initData(num,rows){
        this.getData.SID = this.user.Sid;
        this.getData.PageNum = num;
        this.getData.Rows = rows;
        this.listLoading = true;
        this.$store.dispatch('initCashSearch',this.getData)
          .then(total=>{
            this.total = Number(total);
            this.listLoading = false;
          },err=>{
            this.$message({
              message: err,
              type: 'error'
            });
          })
      },
      //搜索
      search(){
        this.initData(1,this.size)
      } ,
      //计算总价（上）
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => {
            if(column.property=='CApplayPrice' || column.property=='CFree' || column.property=='CBackPrice'){
              return Math.round(item[column.property])
            }
          });
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });
        return sums;
      },
      //计算总价（下）
      getSummaries2(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => {
            if(column.property=='STicketPrice'){
              return Number(item.STicketPrice)
            }
          });
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });
        return sums;
      },
      rowClick(row){
        this.uid = row.CStationid;
        if(row.CStatus==0){
          this.getRecordData.SCashOut = 2;
        }else{
          this.getRecordData.SCashOut = 0;
        }
        this.getRecordData.SStationid = row.CStationid
        this.listLoading2 = true;
        this.$store.dispatch('rowClick',this.getRecordData)
          .then(total=>{
            this.total2 = Number(total);
            this.listLoading2 = false;
          },err=>{
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
  }

</style>
