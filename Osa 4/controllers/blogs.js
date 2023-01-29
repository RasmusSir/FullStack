const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//Blogien hakeminen
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1, name:1})
    response.json(blogs)
    //console.log('blogit:', blogs)
})




// Blogin lisääminen (Post komento)
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    console.log('tältä näyttää requestin token joka määritetty middlewareen', (request.token));
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    //console.log('jokin mättää jos tähän ei päästä');
    console.log('decoded id', decodedToken)

    if (!decodedToken.id) {
        return response.status(401).json({error: 'token invalid'})
    }

    const user = await User.findById(decodedToken.id)

    

    const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
})


// Blogin päivittäminen
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    console.log('Päivitetty blogi blogs.js:', updatedBlog)
    
    response.json(updatedBlog)
})


// Blogin poistaminen
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})



module.exports = blogsRouter