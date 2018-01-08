<style lang="stylus">

</style>

<template>
  <div id="detail">
    <Modal
      :width="960"
      v-model="visible"
      title="详情"
      :footerHide="true"
    >
      <Form :model="form" :label-width="80">
        <FormItem label="ID">
          <Input v-model="form.id" />
        </FormItem>
        <FormItem label="标题">
          <Input v-model="form.title" />
        </FormItem>
        <FormItem label="内容">
          <ueditor :value="form.content" :config="config" ref="ueditor"></ueditor>
        </FormItem>
        <FormItem label="语言">
          <Input v-model="form.language" />
        </FormItem>
        <FormItem label="概览">
          <Input v-model="form.preview" />
        </FormItem>
      </Form>
    </Modal>
  </div>

</template>

<script>
  import ueditor from '../../ueditor.vue'

  export default {
    components: {
      ueditor
    },
    data() {
      return {
        form: {
          id: 0,
          title: '',
          content: '',
          language: '',
          preview: ''
        },
        isLoading: false,
        visible: false,
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 320
        }
      }
    },
    methods: {
      show(article) {
        if (article) {
          this.form = {
            id: article.ID,
            title: article.Title,
            content: article.Content,
            language: article.Language,
            preview: article.Preview
          }
        } else {
          if (this.form.id) {
            this.form = {
              id: 0,
              title: '',
              content: '',
              language: '',
              preview: ''
            }
          }
        }
        this.visible = true
      }
    }
  }
</script>

