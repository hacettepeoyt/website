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
        firstName: 'Xavi',
        lastName: 'Hernandez',
        studentID: '123456789',
        degree: 'Doktora',
        email: 'xavi@barcelona.com',
        department: 'Bilgisayar Mühendisliği',
        mobileNumber: '05066660606',
        groupChat: 'WhatsApp'
    },
    {
        firstName: 'Andres',
        lastName: 'Iniesta',
        studentID: '987654321',
        degree: '2. Sınıf',
        email: 'iniesta@barcelona.com',
        department: 'Bilgisayar Mühendisliği',
        mobileNumber: '05088880808',
        groupChat: 'Telegram'
    },
    {
        firstName: 'Lionel',
        lastName: 'Messi',
        studentID: '135792468',
        degree: 'Diğer',
        email: 'messi@barcelona.com',
        department: 'Yapay Zeka Mühendisliği',
        mobileNumber: '05100001010',
        groupChat: '-'
    }
]

const seedFaqs = [
    {
        question: 'What is Linux?',
        answer: 'It is one of the most fundamental questions as many people tend to confuse it a bit. Linux by itself is not an operating system, instead, it is the central and most important part of an OS called the Kernel. The kernel is the program inside the OS that has complete control over everything in the system and as such, it is the first program that loads up when the OS boots.'
    },
    {
        question: 'What are Linux Distributions or Distros?',
        answer: 'As I’ve said earlier, Linux is just the Kernel and a Linux Distribution is the complete OS that contains Linux as their Kernel with added programs and other software based on what the OS is targeted towards. Distributions, in short, are referred to as Distros.'
    },
    {
        question: 'Where do I find help if I encounter any problem?',
        answer: 'Fear not, there are plenty of places to find help in Linux. Here at LinuxAndUbuntu, you’ll find excellent articles related to Linux like Installation Guides, Software Reviews, etc. Also, there are lots of forums and wikis that’ll help you out a lot when you have any queries or run into some problem. Popular distros even contain an IRC channel where you can directly ask someone when you face a problem.'
    }

    // Sample questions and answers belong to https://www.linuxandubuntu.com/home/linux-faqsfrequently-asked-questions-from-a-newbie-perspective
]

const seedProjects = [
    {
        img: 'https://cdn-icons-png.flaticon.com/512/1208/1208782.png?w=1060&t=st=1664029088~exp=1664029688~hmac=804d0c63464c0e9f35ee1da5456fac63785bc46718953db97e7f73516a22b65f',
        name: 'Yepyeni Website',
        description: 'This is the first project!',
        status: 60,
        repository: 'https://github.com/hacettepeoyt/website'
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/1208/1208782.png?w=1060&t=st=1664029088~exp=1664029688~hmac=804d0c63464c0e9f35ee1da5456fac63785bc46718953db97e7f73516a22b65f',
        name: 'Age of Empires 2 HU Edition',
        description: 'Efsane oyun, efsane edition!',
        status: 0,
        repository: 'https://github.com/hacettepeoyt/website'
    }
]

const seedEvents = [
    {
        img: 'https://cdn-icons-png.flaticon.com/512/1255/1255386.png?w=1060&t=st=1664029426~exp=1664030026~hmac=ba0436be4bc15e8f0c89742d50c281a430fcd277cc80dcf69815b529cb98f088',
        name: 'Linus Torvalds Nvidia Konferansı',
        description: 'I love you Nvidia',
        location: 'Seminer Salonu - Bilgisayar Mühendisliği',
        time: '15.00',
        date: '01.01.1970',
        duration: '2 saat'
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/1255/1255386.png?w=1060&t=st=1664029426~exp=1664030026~hmac=ba0436be4bc15e8f0c89742d50c281a430fcd277cc80dcf69815b529cb98f088',
        name: 'Harika Etkinlik',
        description: 'Bu bir açıklama, uzun yazı da olabilirdi.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis dolor turpis, vitae viverra quam finibus non. Pellentesque congue quam et ex hendrerit, vitae viverra sapien posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam consequat ipsum nisi, non porttitor nulla blandit ut. Nullam euismod est et nisi faucibus consectetur. Etiam sodales nulla vitae pretium sollicitudin. Quisque auctor diam ut fermentum hendrerit. Praesent ac nibh lectus. Sed id nisi tincidunt, viverra nisl id, tincidunt diam. Aenean nec felis vel magna sollicitudin pellentesque. In bibendum volutpat porta. Morbi pharetra arcu sed sodales pellentesque. Nulla facilisi. Fusce vehicula ante euismod, malesuada arcu cursus, sodales velit. Curabitur sit amet sapien pellentesque, sollicitudin dolor a, cursus nunc.\nQuisque dictum rhoncus est quis lobortis. Quisque tempus elit a hendrerit ultrices. Donec nec tincidunt lectus. Donec dolor nisi, convallis vitae libero sed, auctor euismod quam. Mauris vehicula diam nec pharetra sagittis. Cras interdum sodales interdum. Pellentesque luctus nunc quis ullamcorper tempor. Aenean congue, tellus et suscipit gravida, neque neque auctor turpis, a lobortis magna mauris in massa. Curabitur aliquet vitae mi ac bibendum. \nSed pretium nisi vel augue tempus tincidunt. Pellentesque sapien erat, feugiat eu risus sed, consectetur placerat justo. Donec dolor neque, elementum vitae porttitor sit amet, mollis vitae dui. Phasellus ut nisl sit amet eros venenatis convallis vel ac lacus. Vivamus fringilla vulputate nisi, eu rutrum purus porttitor at. Phasellus pretium, nulla ac mattis interdum, nunc odio tempus nulla, efficitur auctor justo dui quis ex. Phasellus elementum nisi quis libero semper, id rutrum turpis hendrerit. Sed quam risus, tincidunt at rhoncus tempus, blandit vel ex.',
        location: 'Amfi',
        time: '19.00',
        date: '02.01.1970',
        duration: '1 hafta'
    }
]

const seedCourses = [
    {
        img: 'https://cdn-icons-png.flaticon.com/512/1225/1225982.png?w=1060&t=st=1664029668~exp=1664030268~hmac=0d7cb3fade15a60d9ccc7ab4ea5a3eca30e64057070279c6f26f3c9572762a1a',
        name: 'Linux 201',
        description: 'Harika bu kurs, kesinlikle katıl!!',
        preRequisite: ['Linux 101', 'Linux 102'],
        location: 'D3 - Bilgisayar Mühendisliği',
        time: '15.00',
        date: '01.01.1970',
        duration: '10 hafta'
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/1225/1225982.png?w=1060&t=st=1664029668~exp=1664030268~hmac=0d7cb3fade15a60d9ccc7ab4ea5a3eca30e64057070279c6f26f3c9572762a1a',
        name: 'Linux 102',
        description: 'Harika bu kurs, kesinlikle katılmalısın!!',
        preRequisite: ['Linux 101'],
        location: 'D2 - Bilgisayar Mühendisliği',
        time: '12.00',
        date: '01.01.1970',
        duration: '7 hafta'
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/1225/1225982.png?w=1060&t=st=1664029668~exp=1664030268~hmac=0d7cb3fade15a60d9ccc7ab4ea5a3eca30e64057070279c6f26f3c9572762a1a',
        name: 'Linux 101',
        description: 'Harika bu kurs başlangıç için, kesinlikle katıl!!!!',
        location: 'D3 - Bilgisayar Mühendisliği',
        time: '10.00',
        date: '01.01.1970',
        duration: '6 hafta'
    }
]

////////// END //////////


const seed = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/oyt-website')
        .then(() => {
            console.log('Connected to database!');
        })
        .catch((err) => {
            console.log('Error while connecting to database!', err);
        })
        
    await Member.insertMany(seedMembers);
    await Faq.insertMany(seedFaqs);
    await Project.insertMany(seedProjects);
    await Event.insertMany(seedEvents);
    await Course.insertMany(seedCourses);

    console.log('Done!')
    process.exit();
}

seed();
