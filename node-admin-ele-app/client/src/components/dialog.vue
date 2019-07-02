<template>
  <el-dialog title="献上你的宝贝" :visible.sync="dialogStatus.show">
    <el-form>
      <el-form-item label="活动名称" label-width="120px">
        <el-row>
          <el-col :span="22">
            <el-input autocomplete="off"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'Dialog',
  props: {
    dialogStatus: {
      type: Object,
      required: true
    }
  }
}
</script>
