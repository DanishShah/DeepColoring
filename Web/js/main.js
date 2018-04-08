function setImage(folder){

    var dir = "../images/"+folder+"/";
    var fileextension = ".jpg";
    $.ajax({
        //This will retrieve the contents of the folder if the folder is configured as 'browsable'
        url: dir,
        success: function (data) {
            $("ul").empty();
            //Lsit all png file names in the page
            $(data).find("a:contains(" + fileextension + "), a:contains(" + ".png" + ")").each(function () {
                var filename = this.href.replace(window.location.host, "").replace("http:///", "");
                var a = filename.split('.')[1]
                // console.log(a);
                var stat = null;
                if(a == "jpg"){
                    stat = "original";
                    var id = filename.replace(".png", "");
                    $('.test-container').append('<li><div class="col l5 offset-l1 image" id="'+stat+'" onclick="setActive(this)"></div></li>');
                    $('#'+stat).css('background', 'url(' + dir + filename + ')');
                    $('#'+stat).css('background-repeat', 'no-repeat');
                    $('#'+stat).css('background-position', 'center');
                }else{
                    stat = "colored";
                    var id = filename.replace(".jpg", "");
                    $('.test-container').append('<li><div class="col l5 offset-l1 image" id="'+stat+'" onclick="setActive(this)"></div></li>');
                    $('#'+stat).css('background', 'url(' + dir + filename + ')');
                    $('#'+stat).css('background-repeat', 'no-repeat');
                    $('#'+stat).css('background-position', 'center');
                }
                
                
                // $("#image-"+id).append($("<img src=" + dir + filename + "></img>"));
            });

            var ul = document.querySelector('.test-container');
            var r = getRandomInt(100);
            // console.log(r);
            if(r%2 == 0){
                ul.append(ul.firstElementChild);
            }
        }
    });
}

var selection = null;
var counter = 1;

var message = ["That's sad, Lets try again!", "Good! You got 1", "Nice Try!", "You can do better", "Don't strain your eyes"]

function setActive(ele){
    var z = document.getElementsByClassName('image');
    for(var i=0;i<z.length;i++){
        z[i].style.backgroundColor = "#fff";
        z[i].style.transitionDuration = ".3s";
    }
    ele.style.backgroundColor =  "#eee";

    selection = ele.id;
    // console.log(selection);
}

document.querySelector('.container').addEventListener('click', function(){
    var z = document.getElementsByClassName('image');
    for(var i=0;i<z.length;i++){
        z[i].style.backgroundColor = "#fff";
        z[i].style.transitionDuration = ".3s";
    }
})

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var score = 0;

document.querySelector('#nextBtn').addEventListener('click', function(){
    if(counter == 10){
        document.querySelector('.test-container').style.display = "none";
        document.querySelector('.score-board').style.display = "block";
        document.querySelector('.score').innerHTML = score + "/10";
        document.querySelector('.message').innerHTML = message[score];
        document.querySelector('#nextBtn').innerHTML = "RESET"
        document.querySelector('#nextBtn').addEventListener('click', function(){
            window.location.reload()
        })
    }
    if(selection == "original"){
        score++;
    }
    counter = counter + 1;
    setImage(counter);
    document.querySelector(".determinate").style.width = counter * 10 +"%";
})

