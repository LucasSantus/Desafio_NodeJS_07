/**
 * Required External Modules
 */

import { PrismaClient } from "@prisma/client";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { createStudent } from "./controllers/students";

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

// Criar um menu de opções para exibição.
app.listen(PORT, async () => {
	console.log(`Listening on port ${PORT}`);

	console.log(`Deseja registrar algum curso?`)

	let register_course = readline.question('\n[Y/n]: ')
	let title_course: string
	
	if(register_course.lowerCase() === "y"){
		title_course = readline.question("\nInsira o título do curso: ")
	}

	let students_length = parseInt(readline.question('\nQuantidade de alunos: '))

	for(let counter = 1; counter <= students_length; counter++){
		console.log(`\nInserção do ${counter}º aluno`)
		let name = readline.question('\nNome do aluno: ')
		let age = parseInt(readline.question('Idade do aluno: '))
		let note = parseFloat(readline.question('Nota do aluno: '))

		await createStudent(name, age, note);
	}

	console.log("\nprograma finalizado!")
});
