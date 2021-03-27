<template>
  <div>

    <article-editor></article-editor>
  </div>
</template>

<script>
import ArticleEditor from '../content/ArticleEditor'

export default {
  name: 'Notice',
  components: {ArticleEditor},
  data () {
    return {
      article: {},
      dialogVisible: false
    }
  },
  mounted () {
    if (this.$route.params.article) {
      this.article = this.$route.params.article
    }
  },
  methods: {}
}
</script>

