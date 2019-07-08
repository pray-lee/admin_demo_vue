<template>
  <div class="container">
    <div class="add-container">
      <el-form :inline="true" class="">
        <el-form-item class="button-wrapper">
          <el-button type="success" size="small" @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table
        :data="list"
        size="medium"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收支类型"
        >
          align="center"
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收支描述"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.describe }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收入"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px;color: forestgreen">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="支出"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px; color: #ff5252">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="现金"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px; color: cornflowerblue">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-container">
      <addDialog :dialogStatus="dialogStatus" :form="form" @finished="updateProfile"></addDialog>
    </div>
  </div>
</template>
<script>
  import getProfiles from '@/api/profile/getProfiles'
  import delProfile from '@/api/profile/delProfile'
  import addDialog from './dialog'
  export default {
    name: 'fundList',
    components: {
      addDialog
    },
    data() {
      return {
        list: [],
        dialogStatus: {
          show: false,
          title: '',
          type: 'add'
        },
        form: {
          remark: '',
          cash: '',
          income: '',
          expend: '',
          describe: '',
          type: ''
        },
      }
    },
    created() {
      this.getAllProfiles()
    },
    methods: {
      getAllProfiles () {
        getProfiles()
          .then(res => {
            if (res.status === 200) {
              this.list = res.data
            }
          })
      },
      handleAdd () {
        this.dialogStatus = {
          show: true,
          title: '添加资产',
          type: 'add'
        }
      },
      handleEdit(index, row) {
        this.form = {
         remark: row.remark,
          cash: row.cash,
          income: row.income,
          expend: row.expend,
          describe: row.describe,
          type: row.type,
          id: row._id
        }
        this.dialogStatus = {
          show: true,
          title: '修改资产',
          type: 'edit'
        }
      },
      handleDelete(index, row) {
        delProfile(row._id) 
          .then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // reload
            this.updateProfile()
          })
          .catch(err => console.log(err))
      },
      updateProfile () {
        this.getAllProfiles()
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .container
    padding: 20px
    .button-wrapper
      float:right
      margin-right:60px
</style>
