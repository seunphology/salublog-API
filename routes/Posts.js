const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Post = require('../models/Post');


//create post 
router.post('/', async (req,res)=> {
  const newPost = await new Post(req.body);
  try {
        
        const savedPost = await newPost.save()
        res.status(200).json(savedPost);
    
    } catch (error) {
        res.status(500).json(error);
    }
    
    })
    //update post
    router.put('/:id', async (req,res)=> {
     try {
        const post = await Post.findById(req.params.id);
        
        if(post.username === req.body.username) {

          try {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
          $set:req.body
            },{new:true}
            );
res.status(200).json(updatedPost)
          }catch(error) {
            res.status(500).json(error)

          }
        
         
    
        } else {
            res.status(403).json('you can only update your post');
        }
     } catch (error) {
         res.status(500).json(error)
     }
    
    });
    //delete post 
    router.delete('/:id', async (req,res)=> {
   try {
   
      if(req.body.username === req.body.username) {

         try {

             await Post.delete();
       
       res.status(200).json('post has been deleted')
         } catch (error) {
            res.status(500).json(error);
         
         }
  
      } else {
          res.status(403).json('you can only delete your post');
      }
    
  }catch (error) {
    res.status(500).json(error)
  }
})
    //get one post 
    router.get('/:id',async(req,res)=> {
    
      try {
        const post = await Post.findById(req.params.id);

        
      
      
        res.status(200).json(post);
      } catch (error) {
        res.status(500).json(error);
      }
    });

    //get All posts  //localhost:4000/api/posts?user=gbenga ...This gets all the posts made by gbenga
router.get('/', async (req,res) => {

  const username = req.query.user;
  const conte = req.query.cont;
  try {

    let posts;
    if(username) {
    posts = await Post.find({username});
    }else if (conte) {
      posts = await Post.find({
        content: {
          $in: [conte],


        },

      });
    }else {
      posts = await Post.find();
    }
  res.status(200).json(posts);

  } catch (error) {
   res.status(500).json(error); 
  }
});




module.exports = router;