// scroll reveal
// ScrollReveal().reveal('.nav-links')
const sr = ScrollReveal({
    duration: 1000,
    reset: true,
    mobile: true
})
sr.reveal('h1', {
	// interval: 16, ???
})
sr.reveal('.digits', {
    delay: 500
})
sr.reveal('.digit', {
    delay: 1000
}, 200) // delai en cascade en millisecondes

// burger menu
const hamburger = document.querySelector('.hamburger')
const navLinks = document.querySelector('.nav-links')
const links = document.querySelectorAll('.nav-links li')
const header = document.querySelector("header")

// toggle nav
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open')
    links.forEach(link => {
        link.classList.toggle('fade')
    })
    // burger animated cross
    hamburger.classList.toggle('toggle')
    // after a link clicked allows user to click on burger cross to reach the section
    header.classList.toggle("open")
})


// dark/light switch
const darkMode = document.getElementById('toggle')
darkMode.addEventListener('change' , () => {
    document.body.classList.toggle('dark')
})


// greetings according to time of day
function greetings() {
    if (new Date().getHours() >= 2 && new Date().getHours() < 12) {
        greets = "Hey, good morning!<br>I'm Nathalie."
    } else if (new Date().getHours() >= 12 && new Date().getHours() < 18) {
        greets = "Hey, good afternoon!<br>I'm Nathalie."
    } else {
        greets = "Hey, good evening!<br>I'm Nathalie."
    }
    // careful with security issues using innerHTML (user input only?)
    document.getElementById("greetings").innerHTML = greets
}
greetings()


// letter animation
// wrap every letter in a span
// const textWrapper = document.querySelector('.work .letters')
// textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>")
// anime.timeline({loop: true})
//     .add({
//         targets: '.work .letter',
//         rotateY: [-90, 0],
//         duration: 1300,
//         delay: (el, i) => 45 * i
//     })
//     .add({
//         targets: '.work',
//         opacity: 0,
//         duration: 1000,
//         easing: "easeOutExpo",
//         delay: 1000
//     })

const textWrapper = document.querySelector('.work')
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>")
anime.timeline({loop: true})
  .add({
    targets: '.work .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 30 * i
  })
  .add({
    targets: '.work .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i
  })

// carousel
let carousel = document.getElementById("carousel")
slides = carousel.getElementsByClassName("slider")
counter = 0

setInterval(function () {
  slides[counter].style.opacity = 0; // Hide the previous image
  counter = (counter + 1) % slides.length; // Increment counter
  slides[counter].style.opacity = 1; // Show the next image
}, 3000); // setInterval


// countdown
let Countdown = function (options) {
    this.options = {
        $elem: options.$elem || undefined,
        elemSelector: options.elemSelector || 'data-countdown',
        startDate: options.startDate || new Date(),
        endDate: options.endDate || new Date(new Date().getTime() + 60000),
        leadingZero: options.leadingZero !== undefined ? options.leadingZero : true,
        setCssProperties: options.setCssProperties !== undefined ? options.setCssProperties : true,
        separateDigits: options.separateDigits !== undefined ? options.separateDigits : true,
        nextDigits: options.nextDigits !== undefined ? options.nextDigits : true,
        labels: options.labels || {
            days: "Days",
            hours: "Hours",
            minutes: "Minutes",
            seconds: "Seconds",
        },
        ariaLabels: options.ariaLabels || {
            time: "%days, %hours, %minutes, and %seconds remaining",
            days: {
                zero: "%d days",
                single: "%d day",
                plural: "%d days",
            },
            hours: {
                zero: "%d hours",
                single: "%d hour",
                plural: "%d hours"
            },
            minutes: {
                zero: "%d minutes",
                single: "%d minute",
                plural: "%d minutes",
            },
            seconds: {
                zero: "%d seconds",
                single: "%d second",
                plural: "%d seconds",
            },
        }
    }
    
    // Initialise
    this.$elem = this.options.$elem || document.querySelector(options.elemSelector)
    this.startDate = new Date(this.options.startDate)
    this.endDate = new Date(this.options.endDate)
    this.ticker = 0
    this.$elem.querySelector('.days .label').innerText = this.options.labels.days
    this.$elem.querySelector('.hours .label').innerText = this.options.labels.hours
    this.$elem.querySelector('.minutes .label').innerText = this.options.labels.minutes
    this.$elem.querySelector('.seconds .label').innerText = this.options.labels.seconds
    
    // Start ticker
    this.update()
    this.run()
}
  
Countdown.prototype.getLabel = function (labelSet, labelName, value) {
    if (["labels", "ariaLabels"].indexOf(labelSet) === -1) {
        throw new Error("Invalid labelSet given: must be labels or ariaLabels")
    }
    if (["days", "hours", "minutes", "seconds"].indexOf(labelName) === -1) {
        throw new Error("Invalid labelName given: must be days, hours, minutes or seconds")
    }
    let valueQuant = value === 0 ? "zero" : value === 1 ? "single" : "plural"
    return this.options[labelSet][labelName][valueQuant].replace("%d", value)
}
  
Countdown.prototype.leadingZero = function (value, length) {
    if (this.options.leadingZero && String(value).length < length) {
        let padLength = length - String(value).length;
        let output = String(value)
        for (let i=0; i < padLength; i++) {
            output = '0' + output
        }
        return output
    }
    return value
}
  
Countdown.prototype.separateDigits = function (value) {
    if (this.options.separateDigits && String(value).length) {
        let _value = String(value).split("")
        let output = ''
        for (let i=(_value.length - 1); i >= 0 ; i--) {
            let digit = parseInt(_value[i], 10)
            output = '<span class="digit digit-' + Math.pow(10, _value.length - 1 - i) + '"' +
            (this.options.nextDigits
            ? ' data-countdown-next-digit="' + ((digit + 1) % 10) + '"'
            : '') + '>' + digit + '</span>' + output
        }
      return output
    } else {
        return value
    }
}
  
Countdown.prototype.update = function () {
    let now = new Date()
    let diffSeconds = Math.floor((this.endDate.getTime() - now.getTime()) / 1000)
    let diffMinutes = Math.floor(diffSeconds / 60)
    let diffHours = Math.floor(diffSeconds / 3600)
    let diffDays = Math.floor(diffSeconds / 86400)
    let days = 0
    let hours = 0
    let minutes = 0
    let seconds = 0
    
    if (this.startDate <= now && this.endDate > now) {
        seconds = diffSeconds % 60
        minutes = diffMinutes % 60
        hours = diffHours % 24
        days = diffDays
    }
    
    // Update title/aria label
    let ariaLabel = this.options.ariaLabels.time
        .replace("%days", this.getLabel("ariaLabels", "days", days))
        .replace("%hours", this.getLabel("ariaLabels", "hours", hours))
        .replace("%minutes", this.getLabel("ariaLabels", "minutes", minutes))
        .replace("%seconds", this.getLabel("ariaLabels", "seconds", seconds))
    this.$elem.setAttribute("title", ariaLabel)
    this.$elem.setAttribute("aria-label", ariaLabel)
    
    // Update visible amounts
    this.$elem.querySelector('.seconds .amount').innerHTML = this.separateDigits(this.leadingZero(seconds, 2))
    this.$elem.querySelector('.minutes .amount').innerHTML = this.separateDigits(this.leadingZero(minutes, 2))
    this.$elem.querySelector('.hours .amount').innerHTML = this.separateDigits(this.leadingZero(hours, 2))
    this.$elem.querySelector('.days .amount').innerHTML = this.separateDigits(this.leadingZero(days, 2))
    
    // Next digits
    if (this.options.nextDigits) {
        this.$elem.querySelector('.seconds .amount')
            .setAttribute('data-countdown-next-digits', (seconds + 1) % 60)
        this.$elem.querySelector('.minutes .amount')
            .setAttribute('data-countdown-next-digits', (minutes + 1) % 60)
        this.$elem.querySelector('.hours .amount')
            .setAttribute('data-countdown-next-digits', (hours + 1) % 24)
        this.$elem.querySelector('.days .amount')
            .setAttribute('data-countdown-next-digits', days + 1)
    }
    
    // Update CSS properties
    if (this.options.setCssProperties) {
        let maxDiffSeconds = Math.floor((this.endDate.getTime() - this.startDate.getTime()) / 1000)
        let maxDiffMinutes = Math.floor(maxDiffSeconds / 60)
        let maxDiffHours = Math.floor(maxDiffSeconds / 3600)
        let maxDiffDays = Math.floor(maxDiffSeconds / 86400)
      
        this.$elem.style.setProperty("--countdown-percent", maxDiffSeconds > 0
            ? diffSeconds / maxDiffSeconds : 0)
        this.$elem.style.setProperty("--countdown-percent-seconds", maxDiffSeconds > 0
            ? diffSeconds / maxDiffSeconds : 0)
        this.$elem.style.setProperty("--countdown-percent-minutes", maxDiffMinutes > 0
            ? diffMinutes / maxDiffMinutes : 0)
        this.$elem.style.setProperty("--countdown-percent-hours", maxDiffHours > 0
            ? diffHours / maxDiffHours : 0);
        this.$elem.style.setProperty("--countdown-percent-days", maxDiffDays > 0
            ? diffDays / maxDiffDays : 0)
    }
}
  
Countdown.prototype.run = function () {
    let self = this;
    let now = new Date()
    
    self.update()
    
    if (now < this.endDate) {
        self.ticker = setTimeout(function () {
            self.run()
        }, 1000)
    } else {
        clearTimeout(self.ticker)
        self.$elem.setAttribute('data-countdown-ended', true)
    }
}
  
// Initialise countdowns on HTML elements
let countdowns = document.querySelectorAll('[data-countdown]')
    if (countdowns.length > 0) {
        for (let i=0; i < countdowns.length; i++) {
            let leadingZero = countdowns[i].getAttribute('data-countdown-option-leadingzero')
            let setCssProperties = countdowns[i].getAttribute('data-countdown-option-setcssproperties')
            let separateDigits = countdowns[i].getAttribute('data-countdown-option-separatedigits')
            let nextDigits = countdowns[i].getAttribute('data-countdown-option-nextdigits')
      
            leadingZero = leadingZero === true ||
                leadingZero === "true" ||
                leadingZero === "1" ||
                leadingZero === 1
                ? true
                : false
      
            setCssProperties = setCssProperties === true ||
                setCssProperties === "true" ||
                setCssProperties === "1" ||
                setCssProperties === 1
                ? true
                : false
      
            separateDigits = separateDigits === true ||
                separateDigits === "true" ||
                separateDigits === "1" ||
                separateDigits === 1
                ? true
                : false
      
            nextDigits = nextDigits === true ||
                nextDigits === "true" ||
                nextDigits === "1" ||
                nextDigits === 1
                ? true
                : false
      
        new Countdown({
            $elem: countdowns[i],
            startDate: countdowns[i].getAttribute('data-countdown-option-startdate'),
            endDate: countdowns[i].getAttribute('data-countdown'),
            leadingZero: leadingZero,
            setCssProperties: setCssProperties,
            separateDigits: separateDigits,
            nextDigits: nextDigits,
        })
    }
}


// const textWrap = document.querySelector('.touch')
// textWrap.innerHTML = textWrap.textContent.replace(/\S/g, "<span class='letter'>$&</span>")
// anime.timeline({loop: true})
//     .add({
//         targets: '.touch .letter',
//         translateY: [-60,0],
//         easing: "easeOutExpo",
//         duration: 1400,
//         delay: (el, i) => 30 * i
//     })
//     .add({
//         targets: '.touch',
//         opacity: 0,
//         duration: 1000,
//         easing: "easeOutExpo",
//         delay: 1000
//     })

// Wrap every letter in a span for the "Get in touch" letter animation with anime
const textWrap = document.querySelector('.touch')
textWrap.innerHTML = textWrap.textContent.replace(/\S/g, "<span class='letter'>$&</span>")
anime.timeline({loop: true})
  .add({
    targets: '.touch .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 30 * i
  })
  .add({
    targets: '.touch .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i
  })


// Cursor coloured animation
const cursor = document.querySelector('.cursor')
let timeout 

// follow cursor on mousemove
document.addEventListener('mousemove', (e) => {
    // let x = e.pageX
    // let y = e.pageY
    // if issues when hovering over links or scrolling, replace with:
    let x = e.clientX
    let y = e.clientY
    cursor.style.top = y + 'px'
    cursor.style.left = x + 'px'
    cursor.style.display = 'block'

    // cursor effects on mouse stopped
    function mouseStopped(){
        cursor.style.display = 'none'
    }
    clearTimeout(timeout)
    timeout = setTimeout(mouseStopped, 1000)
})

// cursor effects on mouseout
document.addEventListener('mouseout', () => {
    cursor.style.display = 'none'  
})


// landing animation - text too long here for good readability - works best with short titles
// wrap every letter in a span
// const textWrapper1 = document.querySelector('.fluid1')
// textWrapper1.innerHTML = textWrapper1.textContent.replace(/\S/g, "<span class='letter'>$&</span>")
// anime.timeline({loop: true})
//   .add({
//     targets: '.fluid1 .letter',
//     translateY: [-100,0],
//     easing: "easeOutExpo",
//     duration: 1400,
//     delay: (el, i) => 30 * i
//   })
//   .add({
//     targets: '.fluid1',
//     opacity: 0,
//     duration: 1000,
//     easing: "easeOutExpo",
//     delay: 1000
//   })
// const textWrapper2 = document.querySelector('.fluid2')
// textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>")
// anime.timeline({loop: true})
//     .add({
//       targets: '.fluid2 .letter',
//       translateY: [-100,0],
//       easing: "easeOutExpo",
//       duration: 1400,
//       delay: (el, i) => 30 * i
//     })
//     .add({
//       targets: '.fluid2',
//       opacity: 0,
//       duration: 1000,
//       easing: "easeOutExpo",
//       delay: 1000
//     })
// const textWrapper3 = document.querySelector('.fluid3')
// textWrapper3.innerHTML = textWrapper3.textContent.replace(/\S/g, "<span class='letter'>$&</span>")
// anime.timeline({loop: true})
//     .add({
//         targets: '.fluid3 .letter',
//         translateY: [-100,0],
//         easing: "easeOutExpo",
//         duration: 1400,
//         delay: (el, i) => 30 * i
//     })
//     .add({
//         targets: '.fluid3',
//         opacity: 0,
//         duration: 1000,
//         easing: "easeOutExpo",
//         delay: 1000
//     })
// const textWrapper4 = document.querySelector('.fluid4')
// textWrapper4.innerHTML = textWrapper4.textContent.replace(/\S/g, "<span class='letter'>$&</span>")
// anime.timeline({loop: true})
//     .add({
//         targets: '.fluid4 .letter',
//         translateY: [-100,0],
//         easing: "easeOutExpo",
//         duration: 1400,
//         delay: (el, i) => 30 * i
//     })
//     .add({
//         targets: '.fluid4',
//         opacity: 0,
//         duration: 1000,
//         easing: "easeOutExpo",
//         delay: 1000
//     })


// ----------------------------------------------------------------

// Modulus operator
// let simple_math = 25 % 6;
// document.getElementById("landing").innerHTML = "When you divide 25 by 6 you have a remainder of: " + simple_math;

// Negation operator
// let x = 10;
// document.getElementById("landing").innerHTML = -x;

// Increment operator ++ / Decrement operator --
// let x = 5;
// x++;
// // document.getElementById("landing").innerHTML = x;
// // document.write(x);
// // console.log(x);
// alert(x);

// Dictionary + delete
// let animal = {
//     species: "dog",
//     color: "black",
//     breed: "Labrador",
//     sound: "Bark!"
// };
// alert(animal.sound);
// document.getElementById("landing").innerHTML = animal.sound; 
// delete animal.sound;
// console.log(animal.breed, animal.sound);

// typeof
// console.log(typeof "This is a str");
// console.log(typeof 21);

// isNaN function
// console.log(isNaN("Hi!"));
// console.log(isNaN(21));

// concat()
// let one = "I ";
// let two = "love ";
// let three = "you.";
// let wholeSentence = one.concat(two, three);
// document.getElementById("softskills").innerText = wholeSentence;

// slice()
// let sentence = "All you need is love.";
// let extract = sentence.slice(16, 20);
// document.getElementById("softskills").textContent = extract;
// console.log(extract);

// timer countdown
// in HTLM: 
// <p>How many seconds would you like to set your alarm for?</p>
// <input id="seconds" value=""/>
// <button onclick="countdown()">Click here</button>
// <p id="timer"></p>
// function countdown() {
//     let seconds = document.getElementById("seconds").value;
//     function  tick() {
//         seconds = seconds -1;
//         TimeRanges.innerHTML = seconds;
//         //programme pauses for 1,000 milliseconds i.e. 1 second
//         setTimeout(tick, 1000);
//         if (seconds == -1) {
//             alert("Time's up!");
//         }
//     }
//     tick();
// }
