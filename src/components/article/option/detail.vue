<style lang="stylus">
  #detail
    .ivu-form-item-label
      font-size 13px
      font-weight 800

</style>

<template>
  <div id="detail">
      <Form :model="form" :label-width="80">
        <FormItem label="ID:">
          {{form.id}}
        </FormItem>
        <FormItem label="标题:">
          {{form.title}}
        </FormItem>
        <FormItem label="语言:">
          {{form.language}}
        </FormItem>
        <FormItem label="内容:">
          <div v-html="form.content"></div>
        </FormItem>
        <FormItem label="概览:">
          {{form.preview}}
        </FormItem>
      </Form>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        getID: '',
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
      }
    }
  }
</script>

