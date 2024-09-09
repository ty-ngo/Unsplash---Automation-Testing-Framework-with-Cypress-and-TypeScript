// Student.ts
export class StudentDto {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    mobile: string;
    dob: string;
    subjects: string[];
    hobbies: string[];
    picture: string;
    currentAddress: string;
    state: string;
    city: string;

    constructor(data: any) {
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.email = data.email;
        this.gender = data.gender;
        this.mobile = data.mobile;
        this.dob = data.dob;
        this.subjects = data.subjects;
        this.hobbies = data.hobbies;
        this.picture = data.picture;
        this.currentAddress = data.current_address;
        this.state = data.state;
        this.city = data.city;
    }
}
