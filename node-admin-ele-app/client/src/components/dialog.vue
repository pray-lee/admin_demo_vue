<template>
  <el-dialog title="献上你的宝贝" :visible.sync="dialogStatus.show" center>
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item label="收支类型:" label-width="120px">
        <el-row>
          <el-col :span="22">
            <el-select v-model="form.type" placeholder="收支类型">
              <el-option v-for="(item, index) in form_type_list" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="收支描述:" label-width="120px" prop="describe">
        <el-row>
          <el-col :span="22">
            <el-input v-model="form.describe" autocomplete="请输入描述"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="收入:" label-width="120px" prop="income">
        <el-row>
          <el-col :span="22">
            <el-input v-model="form.income" autocomplete="请输入收入"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="支出:" label-width="120px" prop="expend">
        <el-row>
          <el-col :span="22">
            <el-input v-model="form.expend" autocomplete="请输入支出"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="账户现金:" label-width="120px" prop="cash">
        <el-row>
          <el-col :span="22">
            <el-input v-model="form.cash" autocomplete="请输入现金"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="备注:" label-width="120px">
        <el-row>
          <el-col :span="22">
            <el-input v-model="form.remark" type="textarea" autocomplete="备注"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" @click="dialogStatus.show=false">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">提 交</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'Dialog',
  data () {
    return {
      form: {
        remark: '',
        cash: '',
        income: '',
        expend: '',
        describe: '',
        type: ''
      },
      form_type_list: [
        '提现', 
        '提现手续费', 
        '优惠券', 
        '充值', 
        '充值礼券', 
        '转账' 
      ],
      rules: {
        describe: [
          {required: true, message: '请输入描述', trigger: 'blur'}
        ],
        income: [
          {required: true, message: '请输入收入', trigger: 'blur'}
        ],
        expend: [
          {required: true, message: '请输入支出', trigger: 'blur'}
        ],
        cash: [
          {required: true, message: '请输入现金', trigger: 'blur'}
        ]
      }
    }
  },
  props: {
    dialogStatus: {
      type: Object,
      required: true
    }
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // commit add data
        }
      })
    }
  }
}
</script>
