<template>
  <div style="margin-top: 40px">

    <!--<el-button @click="addArticle()">添加文章</el-button>-->
    <div class="articles-area">
      <h1 style="text-align: center">
        海滨用电管理系统公告
      </h1>
      <el-card style="text-align: left">
        <div v-for="article in articles" :key="article.id">
          <div style="float:left;width:85%;height: 150px;">
            <router-link class="article-link" :to="{path:'article/articles',query:{id: article.id}}"><span style="font-size: 20px"><strong>{{article.title}}</strong></span></router-link>
            <el-divider content-position="left">{{article.date}}</el-divider>
            <router-link class="article-link" :to="{path:'article/articles',query:{id: article.id}}"><p>{{article.summary}}</p></router-link>
          </div>
          <el-image
            style="margin:18px 0 0 30px;width:100px;height: 100px"
            :src="article.cover"
            fit="cover"></el-image>
          <el-divider></el-divider>
        </div>
        <el-card>

          <el-pagination
              background
              layout="total, prev, pager, next, jumper"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              :total="total">
          </el-pagination>
        </el-card>
      </el-card>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Articles',
    data () {
      return {
        articles: [],
        pageSize: 4,
        total: 0
      }
    },
    mounted () {
      this.loadArticles()
    },
    methods: {
      loadArticles () {
        var _this = this
        this.$axios.get('/article/' + this.pageSize + '/1').then(resp => {
          if (resp && resp.data.code === 200) {
            _this.articles = resp.data.result.content
            _this.total = resp.data.result.totalElements
          }
        })
      },
      handleCurrentChange (page) {
        var _this = this
        this.$axios.get('/article/' + this.pageSize + '/' + page).then(resp => {
          if (resp && resp.data.code === 200) {
            _this.articles = resp.data.result.content
            _this.total = resp.data.result.totalElements
          }
        })
      }
    }
  }
</script>

<style scoped>
  .articles-area {
    width: 990px;
    height: 750px;
    margin-left: auto;
    margin-right: auto;
  }

  .article-link {
    text-decoration: none;
    color: #606266;
  }

  .article-link:hover {
    color: #409EFF;
  }
</style>
