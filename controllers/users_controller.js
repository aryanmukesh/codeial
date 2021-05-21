const User = require("../models/users");

module.exports.profile = function(req,res){
    return res.render('users', {
        title: "Users"
    });
}
//Render the Sign-Up page
module.exports.signUp = function(req,res){
    return res.render('signUp',{
        title : "Sign Up"
    });
}
//Render the Sign-in page
module.exports.login = function(req,res){
    return res.render('login',{
        title:"Login!"
    });
}

//get the sign up data
module.exports.create = function(req,res){
    console.log(req.body);
    if(req.body.pw != req.body.cpw){
        console.log('WRONG CPW');
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log('error in finding user in sign up!'); return;}
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log('error in creating user in sign up!'); return;
                } 
                return res.redirect('/users/login');
            });
        }
        else{
            console.log('User found');
            return res.redirect('back');
            }
    });
}

//sign in to create a session for the user
module.exports.createSession = function(req,res){
    //to-do later
}