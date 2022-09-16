const app = new Vue({
    el: "#boolzApp",
    data: {
        adminSearch: "",
        display: "menu",
        displayIndex: false,
        numberValue: 0,
        actualDay: "",
        actualTime: "",
        newSms: '',
        answer: '',
        menuSms: '',
        minutes: [],
        data: [],
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
                newSmsArray: [],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ], newSmsArray: [],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ], newSmsArray: []
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ], newSmsArray: [],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '09/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '09/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ], newSmsArray: [],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ], newSmsArray: [],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '18/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '18/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ], newSmsArray: [],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '22/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '22/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '22/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ], newSmsArray: [],
            }
        ],
        answerDef: [
            "Torno Subito",
            "Chiamami",
            "Sono occupata",
            "Va bene",
            "Non mi piace"
        ]
    },
    methods: {
        changeMenuClass() {
            if (!this.displayIndex) {
                this.display = "display"
                this.displayIndex = true
            } else {
                this.display = "menu"
                this.displayIndex = false
            }
        },
        takeIndexValue(i) {
            this.numberValue = i
            console.log(this.numberValue, i)
        },
        showContactClick(i) {
            return i === this.numberValue
        },
        getDay() {
            let date = new Date().toLocaleDateString();
            return date;
        },
        getTime() {
            const hour = new Date().getHours();
            let min = new Date().getMinutes();
            if (min < 10) {
                min = `0${min}`
            }
            const time = `${hour}:${min}`
            return time
        },
        searchConctact() {
            let mySearch = this.adminSearch
            this.contacts.forEach(element => {
                element.visible = false
                let contactName = element.name
                contactName = contactName.toLowerCase()
                if (contactName.includes(mySearch)) {
                    element.visible = true
                }
            });

        },
        sendMessage() {
            this.newSms = {
                date: `${this.actualDay} alle ${this.actualTime}`,
                message: this.newSms.trim(),
                status: "sent",
            }
            if (this.newSms.message != "") {
                this.contacts[this.numberValue].newSmsArray.push(this.newSms)
                this.intervalAnswer();
            }
            this.newSms = '';
        },
        intervalAnswer() {
            setTimeout(() => {
                const answerlength = this.answerDef.length
                this.answer = {
                    date: `${this.actualDay} alle ${this.actualTime}`,
                    message: this.answerDef[this.getRandomNumbers(1, answerlength)],
                    status: "received",
                }
                this.contacts[this.numberValue].newSmsArray.push(this.answer);
                this.answer = '';
            }, 1000);
        },
        showMenuSmsGet(i) {
            if (this.menuSms === '') {
                this.menuSms = i
            } else {
                this.menuSms = ''
            }
        },
        deleteMessage(position) {
            this.contacts[this.numberValue].messages.splice(position, 1)
            this.menuSms = ""
        },
        fixedTime() {
            this.contacts[this.numberValue].messages.forEach((mess) => {
                let datetot = mess.date.split(' ')
                let orario = datetot[1]
                let time = orario.split(':');
                let minute = ''
                minute += time[0] + ":" + time[1];
                this.minutes.push(minute)

            })
        },
        takeData() {
            this.contacts.forEach((element, index) => {
                let datetot = element.messages[0].date.split(' ')
                let datasing = datetot[0]
                this.data.push(datasing)
            })
        },
        getRandomNumbers(min, max) {
            const range = max - min + 1;
            const randomNumber = Math.floor(Math.random() * range);
            return randomNumber;
        }
    },
    created: function () {
        this.actualDay = this.getDay()
        this.actualTime = this.getTime()
        this.fixedTime();
        this.takeData();
    },
})