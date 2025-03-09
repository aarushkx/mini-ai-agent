import { db } from "../db/index.js";
import { todosTable } from "../db/schema.js";
import { eq, ilike } from "drizzle-orm";

async function getAllTodos() {
    return await db.select().from(todosTable);
}

async function createTodo(todo) {
    const [result] = await db
        .insert(todosTable)
        .values({ todo })
        .returning({ id: todosTable.id });
    return result.id;
}

async function deleteTodoById(id) {
    await db.delete(todosTable).where(eq(todosTable.id, id));
}

async function searchTodo(searchTerm) {
    return await db
        .select()
        .from(todosTable)
        .where(ilike(todosTable.todo, searchTerm));
}

export { getAllTodos, createTodo, deleteTodoById, searchTodo };
