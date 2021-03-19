import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Room from '../views/Room.vue'
import RoomHome from '../views/RoomHome.vue'
import CharacterSheet from '../views/CharacterSheet.vue'
import SteadingSheet from '../views/SteadingSheet.vue'
import NoteSheet from '../views/NoteSheet.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/room/:roomId',
    name: 'Room',
    component: Room,
    children: [
      {
        path: 'character-sheet/:characterId',
        name: 'CharacterSheet',
        component: CharacterSheet,
        props: true
      },
      {
        path: 'steading/:steadingId',
        name: 'SteadingSheet',
        component: SteadingSheet,
        props: true
      },
      {
        path: 'note/:noteId',
        name: 'NoteSheet',
        component: NoteSheet,
        props: true
      },
      { path: '/', component: RoomHome },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
