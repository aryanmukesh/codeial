module.exports.mypost = function(req,res){
    res.render('posts',{
        title: "Posts"
    });
}