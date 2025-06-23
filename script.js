const cardsContainer = document.getElementById("cc")
const reveal = document.getElementById("rv")
const video =  document.getElementsByClassName("background")[0]
const heroText = document.getElementById("tt")
const wind = document.getElementsByClassName("wrapper")[0]
const para = document.getElementsByClassName("c-para")
const cardParent = document.getElementById("cp")
const text1 = document.getElementsByClassName("text-container")
const threeDDiv = document.getElementsByClassName("three-d-div")
const parallax_element = document.getElementsByClassName("parallax")
const follower = document.getElementsByClassName("follower")[0]
const paragraph = document.getElementsByClassName("split-para")[0]
const oscarDiv = document.getElementsByClassName("oscar-div-container");
gsap.registerPlugin(SplitText, ScrollTrigger) 




window.addEventListener("wheel",(event)=>{
    const element = cardParent.getBoundingClientRect()
    const element1 = text1[0].getBoundingClientRect()
    const element2 = threeDDiv[0].getBoundingClientRect()

    if(Math.floor(element.top) < window.innerHeight - 150){
        cardParent.style.transform="translateY(0)";
        cardParent.style.opacity="1"
    }
    // if(Math.floor(element1.top) < window.innerHeight - 150){
    //     text1[0].childNodes[3].style.transform="translateY(0)";
    //     text1[0].childNodes[3].style.opacity="1";
    // }
    // if(Math.floor((element2.top)) < window.innerHeight - 50){
    //     threeDDiv[0].style.transform="rotateX(0) translateY(0)"
    // }else{
    //     threeDDiv[0].style.transform="rotateX(75deg) translateY(30px)"
    // }
})

// text1[0].childNodes[3].style.transform="scale(0)"

// text1[0].addEventListener("mousemove",(e)=>{

//     let x = e.clientX
//     let y = e.clientY/1.2 

//     follower[0].style.left = `${x}px`
//     follower[0].style.top = `${y}px`

// })


// text1[0].addEventListener("mouseenter",()=>{
//     text1[0].childNodes[3].style.transform="scale(1)"
// })
// text1[0].addEventListener("mouseleave",()=>{
//     text1[0].childNodes[3].style.transform="scale(0)"
// })

const header = wind.childNodes[1]
wind.addEventListener("mousemove",(event)=>{
    const fontSize = Math.floor(wind.scrollTop);
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const moveX = mouseX - window.innerWidth/2;
    const moveY = mouseY - window.innerHeight/2;

    heroText.style.transform=`translate(${moveX/2.5}px,${moveY/2.5}px)`;
    // video.style.transform=`translate(${moveX/15}px,${moveY/15}px)`;
    Array.from(parallax_element).forEach((element) => {
        let speedX = element.dataset.speedx
        let speedY = element.dataset.speedy
        element.style.transform = `translateX(calc(-50% + ${-moveX/4}px *${speedX})) translateY(calc(-50% + ${-moveY/4}px *${speedY}))`
    });
    
})



// wind.addEventListener('mouseenter', ()=>{
//     follower.style.transform = "scale(1)"
// })
// wind.addEventListener('mouseleave', ()=>{
//     follower.style.transform = "scale(0)"
// })

wind.addEventListener('scroll',()=>{
    let value = wind.scrollTop
    let oscarValue = oscarDiv[0].scrollTop
    heroText.style.marginTop = value * 0.5 +'px'
    Array.from(parallax_element)[0].style.marginTop = value +'px'
    Array.from(parallax_element)[5].style.marginTop = value * 0.3 +'px'
    Array.from(parallax_element)[8].style.marginTop = value * 0.5 +'px'
    Array.from(parallax_element)[9].style.marginTop = value * 0.7 +'px'
})

let mm =gsap.matchMedia();
mm.add("(min-width: 600px)",()=>{

    const photos = gsap.utils.toArray(".cards:not(:first-child)")
    gsap.set(photos, {yPercent:100})
    
    const animation = gsap.to(photos,{
        yPercent:0, duration:1, stagger:1, ease: "none"
    })
    
    ScrollTrigger.create({
      trigger: ".card-container",
      scroller: '.wrapper',
      start: "top top", 
      end: "bottom bottom",
      pin: '.left-div', 
      animation: animation,
      scrub: true,
      markers: false
    });

    const cardyArray = gsap.utils.toArray(".cardy")
    gsap.set(cardyArray, {xPercent: 100})
    const animation2 = gsap.to(cardyArray,{
        xPercent: 0, 
        ease:"none"
    })
    ScrollTrigger.create({
        trigger: ".text-container",
        scroller: '.wrapper',
        start: "top top", 
        end: "bottom bottom",
        pin:".text-container",
        scrub: true,
        markers: false,
        animation:animation2
    })

    const oscarArray = gsap.utils.toArray(".oscar-div")
// gsap.set(oscarArray, {xPercent: 100 * oscarArray.length})
const oscarAnimation = gsap.to(oscarArray,{
    xPercent: 100 * -(oscarArray.length -1), 
    ease:"none"
})

ScrollTrigger.create({
        trigger: '.oscar-div-section',
        scroller: '.wrapper',
        scrub: 1,
        pin:true,
        start:"top top",
        // end: "bottom bottom",     
        end: "+=500%",   
        animation: oscarAnimation,
        // markers:true
})
})

mm.add("(max-width: 600px)",()=>{
gsap.fromTo('.oscarimgs',{y: '-30vh'},{
    y: '30vh',
    scrollTrigger:{
        trigger: '.text-container',
        scroller: '.wrapper',
        scrub: 1,
        start:"top bottom",
        end:"bottom top",
        // markers: true
    }
})
})



gsap.fromTo('.shaq-div',{y: '-30vh'},{
    y: '8vh',
    scrollTrigger:{
        trigger: '.footer-container',
        scroller: '.wrapper',
        scrub: 1,
        start:"top bottom",
        end:"bottom top",
        // markers: true
    }
})





document.fonts.ready.then(()=>{
        let split = SplitText.create(".split-para", { type: "words, chars" });

        function isInViewport(el, offset = 150) {
            const rect = el.getBoundingClientRect();
            return rect.top < window.innerHeight - offset;
        }
        let hasAnimated = false;
        

        wind.addEventListener('scroll', () => {
            if (!hasAnimated && isInViewport(paragraph)) {
                gsap.from(split.chars, {
                duration: 1, 
                x: 150,   
                opacity: 0, 
                duration: 0.07,
                ease: "power4",
                stagger: 0.04 
            });
        hasAnimated = true;
        }
        });
})