<style lang="stylus">

</style>

<template>
  <div id="saveArticle">
      <Form :model="form" :label-width="80">
        <FormItem label="ID">
          <Input v-model="form.id" placeholder="请输入"/>
        </FormItem>
        <FormItem label="标题">
          <Input v-model="form.title" placeholder="请输入"/>
        </FormItem>
        <FormItem label="语言">
          <Input v-model="form.language" placeholder="请输入"/>
        </FormItem>
        <FormItem label="概览">
          <Input v-model="form.preview" placeholder="请输入"/>
        </FormItem>
        <FormItem>
          <Button :loading="isLoading" @click="submit" type="primary">提交</Button>
        </FormItem>
      </Form>
  </div>

</template>

<script>
  import qs from 'qs'

  export default {
//    props: [
//      'option'
//    ],
    data() {
      return {
        form: {
          id: 0,
          title: '',
          language: '',
          preview: ''
        },
        cover: '',
        isLoading: false,
        visible: false
      }
    },
    methods: {
      show(article) {
//        console.log(article)
        if (article) {
          this.form = {
            id: article.ID,
            name: article.Title,
            cover: article.Language,
            star: article.Preview
          }
        } else {
          if (this.form.id) {
            this.form = {
              id: 0,
              title: '',
              language: '',
              preview: ''
            }
          }
        }
//        console.log('show')
        this.visible = true
      },
      submit() {
        if (!this.form.id || !this.form.title || !this.form.language || !this.form.preview) {
          this.$Message.error('内容填写不完整')
          return
        }
//        this.$ShowLoading()
        this.$http.post('/api/admin/article/save', qs.stringify(this.form)).then((response) => {
          let res = response.data
          if (res.status === 10001) {
            this.$Message.error('对应选项不存在')
          } else if (res.status === 10000) {
            this.$Message.success('保存成功')
            this.$emit('refresh')
            this.form = {
              id: 0,
              title: '',
              language: '',
              preview: ''
            }
            this.visible = false
          } else if (res.status === 10002) {
            this.$Message.error('礼物错误')
          } else if (res.status === 10003) {
            this.$Message.error('保存失败，请稍候再试')
          }
//          this.$HideLoading()
        }).catch(() => {
//          this.$HideLoading()
          this.$Message.error('通讯失败，请重试')
        })
      }
    }
  }
</script>

