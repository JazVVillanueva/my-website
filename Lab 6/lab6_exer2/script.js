// Check time when page loads
window.onload = function(){

    let now = new Date();
    let hour = now.getHours();

    let greeting = "";

    if(hour >= 5 && hour < 12){
        greeting = "Good Morning!";
    }
    else if(hour >= 12 && hour < 17){
        greeting = "Good Afternoon!";
    }
    else if(hour >= 17 && hour < 21){
        greeting = "Good Evening!";
    }
    else{
        greeting = "Good Night!";
    }

    // Dialog box greeting
    alert(greeting);

    // Start clock
    startClock();
}

function startClock(){

    setInterval(function(){

        let now = new Date();

        let hours = now.getHours().toString().padStart(2,'0');
        let minutes = now.getMinutes().toString().padStart(2,'0');
        let seconds = now.getSeconds().toString().padStart(2,'0');

        document.getElementById("time").innerHTML =
        hours + ":" + minutes + ":" + seconds;

    },1000);

}