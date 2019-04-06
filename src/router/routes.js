
const routes = [
  {
    path: '/main',
    component: () => import('layouts/MyLayout.vue'),
    children: [
     // { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('components/auth/Login.vue')
  },
  {
    path: '/register',
    component: () => import('components/auth/Register.vue')
  },
  {
    path: '/register-team',
    component: () => import('components/auth/RegisterTeam.vue')
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
