<style lang="stylus">

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
          this.form = {
            id: response.data.article.ID,
            title: response.data.article.Title,
            content: response.data.article.Content,
            language: response.data.article.Language,
            preview: response.data.article.Preview
          }
        })
      }
    }
  }
</script>

