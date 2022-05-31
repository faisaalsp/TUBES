let user = [
    {username:"martin", password:"martin123"},
    {username:"faisal", password:"faisal123"},
    {username:"ivan", password:"ivan123"}
];

localStorage.setItem("array_user",JSON.stringify(user));
let arrayUser = (JSON.parse(localStorage.getItem('array_user')));

function loginValidation() {
    let usernameInput = document.getElementById('username').value;
    let passwordInput = document.getElementById('pass').value;

    for(let i=0; i<arrayUser.length;i++) {
        let usernameData = arrayUser[i].username;
        let passwordData = arrayUser[i].password;
        let userCompleteData = arrayUser[i];
        
        if(usernameInput=="" || passwordInput=="" || usernameInput!=usernameData || passwordInput!= passwordData) {
            if(i==3) {
                Swal.fire("Alert","Wrong Password or Username","warning");
            }
        }
        else {
            window.location.href = "../views/manageAkunAdmin.ejs";
            localStorage.setItem('current_user', JSON.stringify(userCompleteData));
            break;
        }
    }
}