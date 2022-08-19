export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    if (typeof _hmt !== 'undefined') {
      if (to.path) {
        _hmt.push(['_trackPageview', to.fullPath]) // 添加埋点上报
      }
    }
    next() // 执行路由跳转
  })
}
