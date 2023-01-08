


import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function getCourses() {
  const courses = await prisma.course.findMany()
  return courses
//   var options = '';

//   for (var i = 0; i < courses.length; i++) {
//     options += '<option value="' + courses[i].name + '" className={styles.option}/>';
//   }
//   return options
}