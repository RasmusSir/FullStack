const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

//Blogien hakeminen
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1, name:1})
    response.json(blogs)
    //console.log('blogit:', blogs)
})


// Blogin lisääminen
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.title || !body.url) {
        return response.status(400).json()
    }

    const user = await User.findById(body.userId)

    const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
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
    console.log('Päivitetty blogi blogs.js:', updatedBlog);
    
    response.json(updatedBlog)
})


// Blogin poistaminen
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})



module.exports = blogsRouter