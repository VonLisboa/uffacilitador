
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/disciplinas',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Disciplinas.vue') }
    ]
  },
  {
    path: '/chat',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Chat.vue') }
    ]
  },
  {
    path: '/horasaula',
    component: () => import('layouts/HorasAula.vue'),
    children: [
      { path: '', component: () => import('pages/PageHorasAula.vue') }
    ]
  },
  {
    path: '/takephoto',
    component: () => import('pages/TakePhoto.vue'),
    children: [
      // { path: '', component: () => import('pages/TakePhoto.vue') }
    ]
  },
  {
    path: '/quadro_horarios',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/QuadroHorarios.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
