// set initial screen number
let screenNum = 1;

// set the total number of screens
let totalScreens = $("section").length;

// transition duration
let duration = 1;

// delay for the starting screen
// equal to the duration + a litte more time
let delay = duration + 0.5;

// will disable nav when transitioning from screen to screen
let navActive = true;

// variables to handle navigation 
let currentScreen;
let prevScreen;
let nextScreen;


let begin = gsap.fromTo("#begin", {
    duration: duration,
    y: $(window).height(),
    ease: "back.out"
},{
    opacity: 1,
    y: 0

}).pause();

$(document).ready(function(){
    console.log("jquery document ready");

    //fade out loading spinner
    gsap.to("#loading", {
        duration: duration,
        opacity: 0,
        onComplete: function(){
            begin.play();
        }
    });

    // set up nav on page load
    showNav(screenNum);
});


$("section:gt("+ (screenNum-1) +")").hide();

// begin button clicked
$("#begin").click(function(){

    $("#begin").hide();

    $("main").show();

   //animate the main element on
   main.play();
});

let main =  gsap.from("main",{
    duration: 1,
    y: $(window).height(),
    ease: "ease.out",
    onComplete: function(){

        // set volume of bg music to zero
        $("#backgroundMusic").prop("volume", 0);

        // play bg music
        $("#backgroundMusic").trigger("play");

        // fade bg music to 
        $("#backgroundMusic").animate({volume: 0.2}, 2000);

        // call loadscreen function for 1st screen
        window["loadScreen" + screenNum]();
    }
}).pause();


// next and prev navigation functions
function showNextScreen(){
   
    // check if nav is active
    if (navActive == true){

        // disable the nav
        navActive = false;

        // targets the current screen
        currentScreen = "#screen" + screenNum;

        // set the nextscreen number
        screenNum++; // add 1 to the current screen

        // hide nav
        hideNav();

        // targets the next screen
        nextScreen = "#screen" + screenNum;

        // transition out the current screen
        gsap.fromTo(currentScreen, {
            x: 0
        },{
            duration: duration,
            delay: 0.5,
            x: -960,
            ease: "power2.inOut"
        });

        // unhide the next screen
        $(nextScreen).show();

        // transition in the next screen
        gsap.fromTo(nextScreen, {
            x: 960
        }, {
            duration: duration,
            delay: 0.5,
            x: 0,
            ease: "power2.inOut",
            onComplete: function(){
                //hide the current screen
                $(currentScreen).hide();

                // re-enable the and show the nav
                navActive = true;
                showNav(screenNum);
            }
        });

        // load function to animate the content of current screen
        window["loadScreen" + screenNum]();

        // stop the current voiceover from playing while switching screens
        $("#voiceover").trigger("pause");

    }

} 

function showPrevScreen(){

    // check to see if nav is active
    if (navActive == true){

        //disable the nav
        navActive = false;

        // targets the current screen
        currentScreen = "#screen" + screenNum;

        // set the nextscreen number
        screenNum--; // minus 1 to the current screen

        //hide nav
        hideNav();

        // targets the "next" screen (previous one)
        prevScreen = "#screen" + screenNum;

        // transition out the current screen
        gsap.fromTo(currentScreen, {
            x: 0
        }, {
            duration: duration,
            delay: 0.5,
            x: 960,
            ease: "power2.inOut"
        });

        //unhide the prev screen
        $(prevScreen).show();

        // transition in the prev screen
        gsap.fromTo(prevScreen, {
            x: -960
        }, {
            duration: duration,
            delay: 0.5,
            x: 0,
            ease: "power2.inOut",
            onComplete: function(){
                // hide current screen
                $(currentScreen).hide();

                // re-enable and show the nav
                navActive = true;
                showNav(screenNum);
            }
        });

        // load function to animate the content of current screen
        window["loadScreen" + screenNum]();

         // stop the current voiceover from playing while switching screens
         $("#voiceover").trigger("pause");
    }

} 

// next and prev button clicks
$("#next").click(showNextScreen);
$("#prev").click(showPrevScreen);

// function to show/hide the nav buttons

function hideNav(){
    gsap.to("#next, #prev, #playPause", {
        duration: 0.5,
        y: 60,
        ease: "power2.inOut"
    });
}

function showNav(currentScreen){

    if (currentScreen == 1){
        $("#prev").fadeOut(500);
    } else if (currentScreen == totalScreens){ 
        $("#next").fadeOut(500);
    } else{
        $("#prev").fadeIn(1000);
        $("#next").fadeIn(1000);
    }

    gsap.to("#next, #prev, #playPause", {
        duration: 0.5,
        delay: 0.5,
        y: 0,
        ease: "power2.inOut"
    });
}

// LOAD SCREEN AUDIO //////////////////////////////////////////
function loadScreenAudio(){
   
    // change the source of the audio track
    //                          "audio/screen2.mp3"
    $("#voiceover").attr("src", "audio/screen" + screenNum + ".mp3");
    

    // tell the new audio source to play
    $("#voiceover").trigger("play");
}

// Control Background Audio
$("#playPause").click(function(){
    // console.log("play/pause clicked");

    let controlSymbol = $("#playPause div");

    if (controlSymbol.hasClass("pause")){
        //true
        console.log("clicked pause")

        // pause the background music
        $("#backgroundMusic").trigger("pause");

        // switch classes to change the css control symbol
        controlSymbol.removeClass("pause");
        controlSymbol.addClass("play");

    } else {
        //false class = play
        console.log("clicked play")

        // play the background music
        $("#backgroundMusic").trigger("play");

        // switch classes to change the css control symbol
        controlSymbol.removeClass("play");
        controlSymbol.addClass("pause");
    }

});


// functions for loading on content for each screen

// LOAD SCREEN 1 ////////////////////////////////////////////////////
function loadScreen1(){
    console.log("LOAD SCREEN 1"); 
}


// LOAD SCREEN 2 ////////////////////////////////////////////////////
function loadScreen2(){
    console.log("LOAD SCREEN 2");

    gsap.from("#screen2 h1",{
        duration: duration,
        delay: delay,
        opacity: 0
    });

    gsap.from(".s2ele2", {
        duration: duration,
        delay: delay + 0.5,
        scale: 0,
        ease: "power2.out"
    });

    gsap.delayedCall(delay + 0.75, function(){
         $("#pop").trigger("play");
    });

    
    gsap.from(".s2ele3", {
        duration: duration,
        delay: delay + 1,
        scale: 0,
        ease: "power2.out"
    });
    
    gsap.delayedCall(delay + 1.25, function(){
        $("#pop").trigger("play");
    });


    gsap.from(".s2ele4", {
        duration: duration,
        delay: delay + 1.5,
        scale: 0,
        ease: "power2.out"
    });
    
    gsap.delayedCall(delay + 1.75, function(){
        $("#pop").trigger("play");
    });

    gsap.from(".s2ele5", {
        duration: duration,
        delay: delay + 2,
        scale: 0,
        ease: "power2.out"
    });
    
    gsap.delayedCall(delay + 2.25, function(){
        $("#pop").trigger("play");
    });


    gsap.from(".s2ele6", {
        duration: duration,
        delay: delay + 2.5,
        scale: 0,
        ease: "power2.out"
    });
    
    gsap.delayedCall(delay + 2.75, function(){
        $("#pop").trigger("play");
    });


    gsap.from(".s2ele7", {
        duration: duration,
        delay: delay + 3,
        scale: 0,
        ease: "power2.out"
    });
    
    gsap.delayedCall(delay + 3.25, function(){
        $("#pop").trigger("play");
    });

    gsap.delayedCall(delay + 3, loadScreenAudio);

} 
    
$("#s2ele13").click(function(){
    $("#shwoosh").trigger("play");
    $("#s2ele13").hide();
    $("#s2ele10").show();
});

$("#s2ele12").click(function(){
    $("#chime").trigger("play");
    $("#s2ele12").hide();
    $(".s2ele11").show();
}); 



// LOAD SCREEN3 ////////////////////////////////////////////////////
function loadScreen3(){
    console.log("LOAD SCREEN 2");

    gsap.from("#screen3 h1",{
        duration: duration,
        delay: delay,
        opacity: 0
    });

    gsap.from(".s3ele4", {
        duration: duration,
        delay: delay + 0.5,
        scale: 0,
        ease: "power2.out"
    });

    gsap.delayedCall(delay + 0.75, function(){
         $("#pop").trigger("play");
    });

    gsap.from(".s3ele5", {
        duration: duration,
        delay: delay + 1,
        scale: 0,
        ease: "power2.out"
    });

    gsap.delayedCall(delay + 1.25, function(){
         $("#pop").trigger("play");
    });

    gsap.from(".s3ele6", {
        duration: duration,
        delay: delay + 1.5,
        scale: 0,
        ease: "power2.out"
    });

    gsap.delayedCall(delay + 1.75, function(){
         $("#pop").trigger("play");
    });

    gsap.delayedCall(delay + 1.5, loadScreenAudio);

}

$(".s3ele4").click(function(){
    $("#click").trigger("play");
    $(".s3ele9").show();
});

$(".s3ele5").click(function(){
    $("#click").trigger("play");
    $(".s3ele10").show();
});

$(".s3ele6").click(function(){
    $("#click").trigger("play");
    $(".s3ele11").show();
});

$("#s3ele7").click(function(){
    $("#chime").trigger("play");
    $("#s3ele7").hide();
    $(".s3ele8").show();
});



// LOAD SCREEN 4 ////////////////////////////////////////////////////
function loadScreen4(){
    console.log("LOAD SCREEN 4");

    gsap.from("#screen4 h1",{
        duration: duration,
        delay: delay,
        opacity: 0
    });

    gsap.from(".s4ele1", {
        duration: duration,
        delay: delay + 0.5,
        scale: 0,
        ease: "power2.out"
    });

    gsap.delayedCall(delay + 0.75, function(){
         $("#pop").trigger("play");
    });

    gsap.from(".s4ele2", {
        duration: duration,
        delay: delay + 1,
        scale: 0,
        ease: "power2.out"
    });

    gsap.delayedCall(delay + 1.25, function(){
         $("#pop").trigger("play");
    });

    gsap.from(".s4ele3", {
        duration: duration,
        delay: delay + 1.5,
        scale: 0,
        ease: "power2.out"
    });

    gsap.delayedCall(delay + 1.75, function(){
         $("#pop").trigger("play");
    });

    gsap.delayedCall(delay + 2, loadScreenAudio);

}

$("#s4ele7").click(function(){
    $("#chime").trigger("play");
    $("#s4ele7").hide();
    $(".s4ele8").show();
});

$("#s4ele10").click(function(){
    $("#shwoosh").trigger("play");
    $("#s4ele10").hide();
    $("#s4ele4").show();
    $(".s4ele5").show();
    $(".s4ele6").show();
});


// LOAD SCREEN 5 ////////////////////////////////////////////////////
function loadScreen5(){
    console.log("LOAD SCREEN 5");

    gsap.from("#screen5 h1",{
        duration: duration,
        delay: delay,
        opacity: 0
    });

    gsap.from("#s5ele1", {
        duration: duration,
        delay: delay + 0.5,
        scale: 0,
        ease: "power2.out"
    });

    gsap.delayedCall(delay + 0.75, function(){
         $("#pop").trigger("play");
    });

    
    gsap.from("#s5ele2", {
        duration: duration,
        delay: delay + 1,
        scale: 0,
        ease: "power2.out"
    });
    
    gsap.delayedCall(delay + 1.25, function(){
        $("#pop").trigger("play");
    });


    gsap.from("#s5ele3", {
        duration: duration,
        delay: delay + 1.5,
        scale: 0,
        ease: "power2.out"
    });
    
    gsap.delayedCall(delay + 1.75, function(){
        $("#pop").trigger("play");
    });

    gsap.from("#s5ele4", {
        duration: duration,
        delay: delay + 2,
        scale: 0,
        ease: "power2.out"
    });
    
    gsap.delayedCall(delay + 2.25, function(){
        $("#pop").trigger("play");
    });


    gsap.from("#s5ele5", {
        duration: duration,
        delay: delay + 2.5,
        scale: 0,
        ease: "power2.out"
    });
    
    gsap.delayedCall(delay + 2.75, function(){
        $("#pop").trigger("play");
    });


    gsap.from("#s5ele6", {
        duration: duration,
        delay: delay + 3,
        scale: 0,
        ease: "power2.out"
    });
    
    gsap.delayedCall(delay + 3.25, function(){
        $("#pop").trigger("play");
    });

    $(".s5ele7").hover(function(){

        $(".s5ele10").show();

        //mouse in
        gsap.fromTo(".s5ele10", {
            duration: 1.5,
            delay: 0.5,
            opacity: 0,
            ease: "power2.out"
        },{
            opacity: 1
        });

        // play when mouse hovers element
        $("#hover").trigger("play");

    }, function(){
        //mouse out
        gsap.to(".s5ele10", {
            duration: 0.5,
            opacity: 0,
            ease: "power2.out",
            onComplete: function(){
                $(".s5ele10").hide();
            }
        });
    });

    gsap.delayedCall(delay + 3, loadScreenAudio);
}

$("#s5ele8").click(function(){
    $("#chime").trigger("play");
    $("#s5ele8").hide();
    $(".s5ele9").show();
});


// LOAD SCREEN 6 ////////////////////////////////////////////////////
function loadScreen6(){
    console.log("LOAD SCREEN 6");

    gsap.delayedCall(delay + 0.5, loadScreenAudio);

}



