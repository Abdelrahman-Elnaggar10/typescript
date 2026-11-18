export {}; 

class Storage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  getAllItems(): T[] {
    return this.items;
  }
}

class User {
  public id: number;
  public name: string;
  public email: string;
  private password: string; 
  protected phone: string;
  public age: number;

  
  private notebooks: NoteBook[] = [];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number
  ) {
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

  displayInfo(): void {
    console.log(
      `User -> id: ${this.id}, name: ${this.name}, email: ${this.email}, phone: ${this.phone}, age: ${this.age}`
    );
  }

  addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  getNotebooks(): NoteBook[] {
    return this.notebooks;
  }
}

class Admin extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number
  ) {
    super(id, name, email, password, phone, age); 
  }

  manageNotes(notebook: NoteBook, noteId: number): void {
    console.log(`Admin ${this.name} (phone ${this.phone}) removes note ${noteId}`);
    notebook.removeNote(noteId);
  }
}

class Note {
  public id: number;
  public title: string;
  public content: string;
  public userId: number; 
  public author: User; 

  constructor(id: number, title: string, content: string, author: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.userId = author.id;
  }

  preview(): string {
    if (this.content.length <= 20) {
      return this.content;
    }
    return this.content.slice(0, 20) + "...";
  }
}

class NoteBook {
  public id: number;
  public name: string;
  private notes: Note[] = [];
  private nextNoteId: number = 1;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  addNote(title: string, content: string, author: User): Note {
    const note = new Note(this.nextNoteId, title, content, author);
    this.nextNoteId++;
    this.notes.push(note);
    return note;
  }

  removeNote(noteId: number): void {
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }

  getNotes(): Note[] {
    return this.notes;
  }
}

const ahmed = new User(1, "Ahmed", "ahmed@test.com", "Pass123", "01000000000", 25);
const admin = new Admin(2, "Sara", "sara@test.com", "Admin123", "01111111111", 30);

ahmed.displayInfo();
admin.displayInfo();

try {
  new User(3, "Kid", "kid@test.com", "123", "010", 15);
} catch (error) {
  console.log("Error:", (error as Error).message);
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

const numbers = new Storage<number>();
numbers.addItem(10);
numbers.addItem(20);
numbers.removeItem(10);
console.log("Numbers:", numbers.getAllItems());

const names = new Storage<string>();
names.addItem("Ahmed");
names.addItem("Sara");
console.log("Names:", names.getAllItems());

const users = new Storage<User>();
users.addItem(ahmed);
users.addItem(admin);
console.log("Users count:", users.getAllItems().length);
