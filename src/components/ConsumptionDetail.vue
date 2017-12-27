<template>
  <div>
    <h1 class="title">消费记录</h1>
    <template>
      <el-table
        v-loading="listLoading"
        height="600"
        style="width: 100%"
        border
        :data="GetCostInfoList"
      >
        <el-table-column
          label="ID"
          type="index"
          align="center"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="cr_ID"
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
          prop="ci_CostMoney"
          label="消费金额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="ci_CostWay"
          label="消费方式"
          align="center">
        </el-table-column>
        <el-table-column
          label="消费时间"
          align="center">
          <template slot-scope="scope">
            {{scope.row.ci_CreateTime | getNewDate}}
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
        :page-size="10"
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
      'GetCostInfoList'
    ]),
    data(){
      return {
        total:0,
        listLoading:false,
        getData:{
          PartnerID:'',
          CostTimeFrom:'',
          CostTimeTo:'',
          PageNum:1,
          Rows:10
        },
      }
    },
    methods: {
      initData(page,row){
        setTimeout(()=>{
          this.getData.PartnerID = this.user.Sid;
          this.getData.PageNum = page?page:1
          this.getData.Rows = row?row:10
          this.listLoading = true;
          this.$store.dispatch('GetCostInfo',this.getData)
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
        this.initData(val,10)
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
