import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'
import CreateUser from '@/views/user/create.vue'
import EditUser from '@/views/user/edit.vue'
import UserList from '@/views/user/list.vue'
import CreatePost from '@/views/post/create.vue'
import EditPost from '@/views/post/edit.vue'
import PostList from '@/views/post/list.vue'
import CreateTopic from '@/views/topic/create.vue'
import EditTopic from '@/views/topic/edit.vue'
import TopicList from '@/views/topic/list.vue'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        //using el svg icon, the elSvgIcon first when at the same time using elSvgIcon and icon
        meta: { title: 'Dashboard', elSvgIcon: 'Fold' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: {
        title: 'User',
        icon: 'user'
    },
    children: [
        {
            path: 'create',
            component: CreateUser,
            name: 'CreateUser',
            meta: { title: 'CreateUser', icon: 'edit' }
        },
        {
            path: ':id(\\d+)/edit',
            component: EditUser,
            name: 'EditUser',
            meta: { title: 'EditUser', noCache: true },
            hidden: true
        },
        {
            path: 'list',
            component: UserList,
            name: 'UserList',
            meta: { title: 'UserList', icon: 'list' }
        }
    ]
  },
  {
      path: '/post',
      component: Layout,
      redirect: '/post/list',
      name: 'Post',
      meta: {
          title: 'Post',
          icon: 'documentation'
      },
      children: [
          {
              path: 'create',
              component: CreatePost,
              name: 'CreatePost',
              meta: { title: 'CreatePost', icon: 'edit' }
          },
          {
              path: ':id(\\d+)/edit',
              component: EditPost,
              name: 'EditPost',
              meta: { title: 'EditPost', noCache: true },
              hidden: true
          },
          {
              path: 'list',
              component: PostList,
              name: 'PostList',
              meta: { title: 'PostList', icon: 'list' }
          }
      ]
  },
  {
      path: '/topic',
      component: Layout,
      redirect: '/topics/list',
      name: 'Topic',
      meta: {
          title: 'Topic',
          icon: 'edit'
      },
      children: [
          {
              path: 'create',
              component: CreateTopic,
              name: 'CreateTopic',
              meta: { title: 'CreateTopic', icon: 'edit' }
          },
          {
              path: ':id(\\d+)/edit',
              component: EditTopic,
              name: 'EditTopic',
              meta: { title: 'EditTopic', noCache: true },
              hidden: true
          },
          {
              path: 'list',
              component: TopicList,
              name: 'TopicList',
              meta: { title: 'TopicList', icon: 'list' }
          }
      ]
  },
  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/setting-switch'),
        name: 'Setting',
        meta: { title: 'Setting', icon: 'example' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  // using pathMatch install of "*" in vue-router 4.0
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
