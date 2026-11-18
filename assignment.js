class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        this.items = this.items.filter((i) => i !== item);
    }
    getAllItems() {
        return this.items;
    }
}
class User {
    id;
    name;
    email;
    password;
    phone;
    age;
    notebooks = [];
    constructor(id, name, email, password, phone, age) {
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60");
        }
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }
    displayInfo() {
        console.log(`User -> id: ${this.id}, name: ${this.name}, email: ${this.email}, phone: ${this.phone}, age: ${this.age}`);
    }
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
    getNotebooks() {
        return this.notebooks;
    }
}
class Admin extends User {
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    manageNotes(notebook, noteId) {
        console.log(`Admin ${this.name} (phone ${this.phone}) removes note ${noteId}`);
        notebook.removeNote(noteId);
    }
}
class Note {
    id;
    title;
    content;
    userId;
    author;
    constructor(id, title, content, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.userId = author.id;
    }
    preview() {
        if (this.content.length <= 20) {
            return this.content;
        }
        return this.content.slice(0, 20) + "...";
    }
}
class NoteBook {
    id;
    name;
    notes = [];
    nextNoteId = 1;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    addNote(title, content, author) {
        const note = new Note(this.nextNoteId, title, content, author);
        this.nextNoteId++;
        this.notes.push(note);
        return note;
    }
    removeNote(noteId) {
        this.notes = this.notes.filter((note) => note.id !== noteId);
    }
    getNotes() {
        return this.notes;
    }
}
const ahmed = new User(1, "Ahmed", "ahmed@test.com", "Pass123", "01000000000", 25);
const admin = new Admin(2, "Sara", "sara@test.com", "Admin123", "01111111111", 30);
ahmed.displayInfo();
admin.displayInfo();
try {
    new User(3, "Kid", "kid@test.com", "123", "010", 15);
}
catch (error) {
    console.log("Error:", error.message);
}
const myNotebook = new NoteBook(1, "Study");
ahmed.addNotebook(myNotebook);
myNotebook.addNote("TypeScript", "TypeScript is JavaScript with types", ahmed);
myNotebook.addNote("Shopping", "Milk and bread", ahmed);
for (const note of myNotebook.getNotes()) {
    console.log(`Note ${note.id} by ${note.author.name}: ${note.title} -> ${note.preview()}`);
}
admin.manageNotes(myNotebook, 2);
console.log("Notes left:", myNotebook.getNotes().length);
const numbers = new Storage();
numbers.addItem(10);
numbers.addItem(20);
numbers.removeItem(10);
console.log("Numbers:", numbers.getAllItems());
const names = new Storage();
names.addItem("Ahmed");
names.addItem("Sara");
console.log("Names:", names.getAllItems());
const users = new Storage();
users.addItem(ahmed);
users.addItem(admin);
console.log("Users count:", users.getAllItems().length);
export {};
