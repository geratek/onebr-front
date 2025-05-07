import router from '@/main/router'

router.addRoutes([
  {
    path: '/perspectivas',
    name: 'perspective',
    component: () => import(/* webpackChunkName: "perspective" */ './pages/Perspective.vue'),
  },
])
