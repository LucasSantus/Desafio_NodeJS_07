import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function createStudent(name: string, age: number, note: number, title_course: string){
    await prisma.student.create({
		data: {
		    name: name,
            age: age,
            note: note,
            course: {
                create: { title: title_course },
            },
		}
	})
}

export async function getAllStudent(){
    const courses = await prisma.course.findMany()
	for(let item of courses){
		const student = await prisma.student.findUnique({
			where:{
				id: item.studentId || undefined
			}
		})
		console.log(`\nID: ${student?.id}, Nome: ${student?.name}, Idade: ${student?.age}, Nota: ${student?.note}, Curso: ${item?.title}`)
	}
}

export async function updateStudent(id: string, name: string){
    await prisma.student.update({
        where: { id: id },
        data: {
		    name: name,
		}
    })
}