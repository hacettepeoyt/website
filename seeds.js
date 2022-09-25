const mongoose = require('mongoose');
const content = require('./models/content');
const Member = require('./models/member');

const Faq = content.Faq;
const Project = content.Project;
const Event = content.Event;
const Course = content.Course;


////////// Seeds //////////

const seedMembers = [
    {
        firstName: "Xavi",
        lastName: "Hernandez",
        studentID: "123456789",
        email: "xavi@barcelona.com",
        department: "Bilgisayar Mühendisliği",
        mobileNumber: "05066660606",
        groupChat: true
    },
    {
        firstName: "Andres",
        lastName: "Iniesta",
        studentID: "987654321",
        email: "iniesta@barcelona.com",
        department: "Bilgisayar Mühendisliği",
        mobileNumber: "05088880808",
        groupChat: false
    },
    {
        firstName: "Lionel",
        lastName: "Messi",
        studentID: "135792468",
        email: "messi@barcelona.com",
        department: "Yapay Zeka Mühendisliği",
        mobileNumber: "05100001010",
        groupChat: false
    }
]

const seedFaqs = [
    {
        question: "Nasılsın?",
        answer: "İyiyim"
    },
    {
        question: "Kaç yaşındasın?",
        answer: "-1"
    },
    {
        question: "Bu bir soru mu?",
        answer: "Hayır"
    }
]

const seedProjects = [
    {
        img: "https://cdn-icons-png.flaticon.com/512/1208/1208782.png?w=1060&t=st=1664029088~exp=1664029688~hmac=804d0c63464c0e9f35ee1da5456fac63785bc46718953db97e7f73516a22b65f",
        name: "Yepyeni Website",
        description: "This is the first project!",
        status: 60,
        repository: "https://github.com/hacettepeoyt/website"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/1208/1208782.png?w=1060&t=st=1664029088~exp=1664029688~hmac=804d0c63464c0e9f35ee1da5456fac63785bc46718953db97e7f73516a22b65f",
        name: "Age of Empires 2 HU Edition",
        description: "Efsane oyun, efsane edition!",
        status: 0,
        repository: "https://github.com/hacettepeoyt/website"
    }
]

const seedEvents = [
    {
        img: "https://cdn-icons-png.flaticon.com/512/1255/1255386.png?w=1060&t=st=1664029426~exp=1664030026~hmac=ba0436be4bc15e8f0c89742d50c281a430fcd277cc80dcf69815b529cb98f088",
        name: "Linus Torvalds Nvidia Konferansı",
        description: "I love you Nvidia",
        location: "Seminer Salonu - Bilgisayar Mühendisliği",
        time: "15.00",
        date: "01.01.1970",
        duration: "2 saat"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/1255/1255386.png?w=1060&t=st=1664029426~exp=1664030026~hmac=ba0436be4bc15e8f0c89742d50c281a430fcd277cc80dcf69815b529cb98f088",
        name: "Harika Etkinlik",
        description: "Bu bir açıklama, uzun yazı da olabilirdi.",
        location: "Amfi",
        time: "19.00",
        date: "02.01.1970",
        duration: "1 hafta"
    }
]

const seedCourses = [
    {
        img: "https://cdn-icons-png.flaticon.com/512/1225/1225982.png?w=1060&t=st=1664029668~exp=1664030268~hmac=0d7cb3fade15a60d9ccc7ab4ea5a3eca30e64057070279c6f26f3c9572762a1a",
        name: "Linux 201",
        description: "Harika bu kurs, kesinlikle katıl!!",
        preRequisite: ["Linux 101", "Linux 102"],
        location: "D3 - Bilgisayar Mühendisliği",
        time: "15.00",
        date: "01.01.1970",
        duration: "10 hafta"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/1225/1225982.png?w=1060&t=st=1664029668~exp=1664030268~hmac=0d7cb3fade15a60d9ccc7ab4ea5a3eca30e64057070279c6f26f3c9572762a1a",
        name: "Linux 102",
        description: "Harika bu kurs, kesinlikle katılmalısın!!",
        preRequisite: ["Linux 101"],
        location: "D2 - Bilgisayar Mühendisliği",
        time: "12.00",
        date: "01.01.1970",
        duration: "7 hafta"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/1225/1225982.png?w=1060&t=st=1664029668~exp=1664030268~hmac=0d7cb3fade15a60d9ccc7ab4ea5a3eca30e64057070279c6f26f3c9572762a1a",
        name: "Linux 101",
        description: "Harika bu kurs başlangıç için, kesinlikle katıl!!!!",
        location: "D3 - Bilgisayar Mühendisliği",
        time: "10.00",
        date: "01.01.1970",
        duration: "6 hafta"
    }
]

////////// END //////////


const seed = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/oyt-website')
        .then(() => {
            console.log("Connected to database!");
        })
        .catch((err) => {
            console.log("Error while connecting to database!", err);
        })
        
    await Member.insertMany(seedMembers);
    await Faq.insertMany(seedFaqs);
    await Project.insertMany(seedProjects);
    await Event.insertMany(seedEvents);
    await Course.insertMany(seedCourses);

    console.log("Done!")
    process.exit();
}

seed();
