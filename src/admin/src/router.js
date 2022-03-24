import { createRouter,createWebHistory } from 'vue-router';

import store from '@/store'
import Layout from '@/views/layout/Layout.vue'
import { getToken } from '@/utils/auth'

import Home from '@/views/home.vue'
import CreateUser from '@/views/user/create.vue'
import EditUser from '@/views/user/edit.vue'
import UserList from '@/views/user/list.vue'
import CreatePost from '@/views/post/create.vue'
import EditPost from '@/views/post/edit.vue'
import PostList from '@/views/post/list.vue'
import CreateTopic from '@/views/topic/create.vue'
import EditTopic from '@/views/topic/edit.vue'
import TopicList from '@/views/topic/list.vue'

const whiteList = ['/login']

export const constantRouterMap = [
    {
      path: '/redirect',
      component: Layout,
      hidden: true,
      children: [
        {
          path: '/redirect/:path*',
          component: () => import('@/views/redirect/index.vue')
        }
      ]
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login.vue'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: Home,
                name: 'Home',
                meta: { title: 'Home', icon: 'dashboard', affix: true }
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
        path: '/404',
        component: () => import('@/views/errorPage/404.vue'),
        hidden: true
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  if (getToken()) {
      /* has token*/
    if (to.path === '/login') {
        next({ path: '/' })
    } else {
        if (!store.getters.avatar) {
            store.dispatch('GetUserInfo').then(() => {
                next({ ...to, replace: true })
            })
        }
        next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

export default router
