// function sum (x, y) {
//     if (typeof x != 'number' || typeof y != 'number') {
//         throw new Error("one of the arguments is not a number")
//     }
//     return x + y;
// }

// try {
//     sum("2", "3")
// } catch (err) {
//     console.log(err)
// }


var user = {username: "sam", password: "123abc"};
function login(username, password){
    if (username != user.username || password != user.password) {
        throw new Error("login failed, username or password don't match")
    }
    console.log("login successful")
}

try {
    login("sam", "123abc")
} catch (err) {
    console.log(err)
}