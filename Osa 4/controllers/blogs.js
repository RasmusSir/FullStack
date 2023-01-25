const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//Blogien hakeminen
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
    console.log('blogit:', blogs)
})

// Blogin lisääminen
blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    try {
        const result = await blog.save()
        response.status(201).json(result)
    } catch(error) {
        next(error)
    }
})


module.exports = blogsRouter