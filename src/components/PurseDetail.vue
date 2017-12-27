<template>
  <div>
    <h1 class="title">充值记录</h1>
    <template>
      <el-table
        v-loading="listLoading"
        height="500"
        style="width: 100%"
        :data="GetCharageInfoList"
      >
        <el-table-column
          label="ID"
          type="index"
          align="center"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="ci_ID"
          label="编号"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="ci_QiankePartnerID"
          label="商户号"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="ci_Balance"
          label="充值前余额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="ci_CharageMoney"
          label="充值金额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="ci_AfterCharageMoney"
          label="充值后金额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="ci_CharageWay"
          label="充值方式"
          align="center">
        </el-table-column>
        <el-table-column
          label="充值时间"
          align="center">
          <template slot-scope="scope">
            {{scope.row.ci_CharageTime | getNewDate}}
          </template>
        </el-table-column>
        <el-table-column
          prop="ci_Remark"
          label="备注"
          align="center">
        </el-table-column>
      </el-table>
    </template>
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        style="float: right;"
        :page-size="5"
        v-show="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-col>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: '',
    computed: mapGetters([
      'user',
      'GetCharageInfoList'
    ]),
    data(){
      return {
        total:0,
        listLoading:false,
        getData:{
          PartnerID:'',
          CharageMoneyFrom:'',
          CharageMoneyTo:'',
          CharageWay:'',
          CharageTimeFrom:'',
          CharageTimeTo:'',
          PageNum:1,
          Rows:5
        }
      }
    },
    methods: {
      initData(page,row){
        setTimeout(()=>{
          this.getData.PartnerID = this.user.Sid;
          this.getData.PageNum = page?page:1
          this.getData.Rows = row?row:5
          this.listLoading = true;
          this.$store.dispatch('GetCharageInfo',this.getData)
            .then(total=>{
              this.total = total;
              this.listLoading = false;
            },err=>{
              this.$message({
                message: err,
                type: 'error'
              });
            })
        },30)
      },
      handleCurrentChange(val) {
        this.initData(val,5)
      }
    },
    created(){
      this.initData()
    }
  }
</script>
<style>
  .title {
    font: bold 20px/2 "宋体";
  }
</style>
