import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function createStudent(name: string, age: number, note: number, title_course?: string){
    await prisma.student.create({
		data: {
		    name: name,
            age: age,
            note: note,
            course: {
                create: { title: title_course! },
            },
		}
	})
}

export async function getStudent(){
    const students = await prisma.student.findMany()
    console.log(students)
}

export async function updateStudent(id: string, name: string, age: number, note: number){
    await prisma.student.update({
        where: { id: id },
        data: {
		    name: name,
            age: age,
            note: note
		}
    })
}

// export async function createCourse(title: string){
//     await prisma.course.create({
// 		data: {
//             title: title
//         }
// 	})
// }