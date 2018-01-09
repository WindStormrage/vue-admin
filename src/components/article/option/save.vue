<style lang="stylus">

</style>

<template>
  <div id="saveArticle">
      <Form :model="form" :label-width="80">
        <FormItem label="标题">
          <Input v-model="form.title" placeholder="请输入"/>
        </FormItem>
        <FormItem label="内容">
          <ueditor :value="form.content" :config="config" ref="ueditor"></ueditor>
        </FormItem>
        <FormItem label="语言">
          <Select v-model="form.language"  placeholder="通用">
            <Option v-for="item in languages" :value="item.Lang" :key="item.Lang">{{ item.Name }}</Option>
          </Select>
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
  import ueditor from '../../ueditor.vue'

  export default {
    components: {
      ueditor
    },
    data() {
      return {
        getID: '',
        isEdit: false,
        languages: [],
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
    created() {
      this.listLanguage()
      this.getID = this.$route.query.id
      if (this.getID !== undefined) {
        this.getDetail()
      }
    },
    methods: {
      getDetail () {
        this.$http.post('/api/admin/article/detail?id=' + this.getID).then((response) => {
          let res = response.data
          if (res.status === 10000) {
            this.form = {
              id: res.article.ID,
              title: res.article.Title,
              content: res.article.Content,
              language: res.article.Language,
              preview: res.article.Preview
            }
          } else {
            this.$Message.error('获取失败，请稍候再试')
          }
        }).catch(() => {
          this.$Message.error('通讯失败，请重试')
        })
      },
//      show(article) {
//        if (article) {
//          this.isEdit = false
//          this.form = {
//            id: article.ID,
//            title: article.Title,
//            content: article.Content,
//            language: article.Language,
//            preview: article.Preview
//          }
//        } else {
//          this.isEdit = true
//          if (this.form.id) {
//            this.form = {
//              id: 0,
//              title: '',
//              content: '',
//              language: '',
//              preview: ''
//            }
//          }
//        }
//        this.visible = true
//      },
      listLanguage() {
//        this.$ShowLoading()
        this.$http.post('/api/admin/language/list').then((response) => {
          let res = response.data
          if (res.status === 10000) {
            this.languages = res.languages
          } else {
            this.$Message.error('获取失败，请稍候再试')
          }
//          this.$HideLoading()
        }).catch(() => {
//          this.$HideLoading()
          this.$Message.error('通讯失败，请重试')
        })
      },
      submit() {
        this.form.content = this.$refs.ueditor.getContent()
        console.log(this.form)
        if (!this.form.title || !this.form.preview || !this.form.content) {
          this.$Message.error('内容填写不完整')
          return
        }
        if (!this.form.language) {
          this.form.language = '通用'
        }
//        this.$ShowLoading()
        this.$http.post('/api/admin/article/save', qs.stringify(this.form)).then((response) => {
          let res = response.data
          if (res.status === 10001) {
            this.$Message.error('对应文章不存在')
          } else if (res.status === 10000) {
            this.$Message.success('保存成功')
            this.$router.push({path: '/admin/main/article'})
            this.$emit('refresh')
            this.form = {
              id: 0,
              title: '',
              content: '',
              language: '',
              preview: ''
            }
            this.visible = false
          } else {
            this.$Message.error('操作失败，请稍候再试')
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

