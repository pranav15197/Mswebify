/*
This file contains the description of keyboard shortcuts
Author : Pranav Tiwari
*/
//---------------------
/*
variables  -
istyping : to check whether the user is typing, so that keyboard shortcuts are not executed
*/
function keycheck(event) {//main event that checks for all keypresses
    if (!istyping) {
        console.log(event.keyCode);

        if (event.keyCode == 70) {
            console.log(event.keyCode);
            b2f();
        }
        else if (event.keyCode == 66) {
            console.log(event.keyCode);
            b2b();
        }
        else if (event.keyCode == 46) {
            console.log(event.keyCode);
            del();
        }

        else if (event.keyCode == 68) {
            console.log(event.keyCode);
            darken();
        }
        else if (event.keyCode == 76) {
            console.log(event.keyCode);
            lighten();
        }
            else if(event.keyCode==39){
            console.log(event.keyCode);
            rotate();
            }
            else if(event.keyCode==37){
            console.log(event.keyCode);
            rotatel();
            }
        else if (event.keyCode == 67 && event.ctrlKey) {
            copydiv = curdiv;
            console.log('copied Div is ' + copydiv);
        }
        else if (event.keyCode == 86 && event.ctrlKey) {
            console.log('paste');
            paste();
        }

    }
}