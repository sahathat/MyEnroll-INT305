import { createRouter, createWebHistory } from 'vue-router'
import SemesterView from '../views/SemesterView.vue'
import SemesterCourse from '../views/SemesterCourse.vue'
import CourseView from '../views/CourseView.vue'
import LecturerView from '../views/LecturerView.vue'
import Credit from '../views/Credit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'semester',
      component: SemesterView
    },
    {
      path: '/:id',
      name: 'semesterCourse',
      component: SemesterCourse
    },
    {
      path: '/course',
      name: 'course',
      component: CourseView
    },
    {
      path: '/lecturer',
      name: 'lecturer',
      component: LecturerView
    },
    {
      path: '/credit',
      name: 'credit',
      component: Credit
    }
  ]
})

export default router
