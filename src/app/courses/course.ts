export class Course {
    public id: string;
    public name: string;
    public description: string;
    public date: string;
    public duration: number;


    constructor(id, name, description, duration, date) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.duration = duration;
    }
}