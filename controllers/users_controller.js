const User = require("../models/users");

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){console.log('err in loading profile page!'); return;}
            if(user){
                //user id matches to one of the users
                return res.render('user_profile',{
                    title:"User Profile",
                    user: user
                });
            }else{
                return res.redirect('/users/login');
            }
        });
    }else{
        return res.redirect('/users/login');
    }
    
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
        if(err){ console.log('error in finding user in sign up!'); return;}
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
    //steps to authenticate
    //find user
    User.findOne({email:req.body.email}, function(err,user){
        if(err){ console.log('error in finding user in sign in!'); return;}
        if(user){
            //handle user pw didn't match
            if(user.pw!=req.body.pw)
            {   
                console.log("PW didn't match");
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else{
            //handle user not found
            console.log("user not found!!");
            return res.redirect('back');
        }

    })
}