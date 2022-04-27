/**
 * Required External Modules
 */

import { PrismaClient } from "@prisma/client";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { createStudent, getAllStudent, updateStudent } from "./controllers/students";

const prisma = new PrismaClient()

const readline = require('readline-sync');

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

async function isUpdateStudent(){

	await getAllStudent();

	console.log("Deseja Editar um Aluno?")
	let is_edit = readline.question('[Y/n]')
	
	if(is_edit == "Y" || is_edit == "y"){
		let id_student = readline.question('Insira o ID do aluno: ')

		const student = await prisma.student.findUnique({
			where:{
				id: id_student || undefined
			}
		})

		if(student){
			let name = readline.question('\nNome do aluno: ')
			updateStudent(id_student, name);
		}
		else{
			console.log("Aluno não encontrado!")
		}
	}
}

app.listen(PORT, async () => {
	console.log(`Listening on port ${PORT}`);

	let students_length = parseInt(readline.question('\nQuantidade de alunos: '))

	for(let counter = 1; counter <= students_length; counter++){
		console.log(`\nInserção do ${counter}º aluno`)
		let name = readline.question('\nNome do aluno: ')
		let age = parseInt(readline.question('Idade do aluno: '))
		let note = parseFloat(readline.question('Nota do aluno: '))
		let course = readline.question('Curso do aluno: ')

		await createStudent(name, age, note, course);
	}

	await isUpdateStudent();
});
