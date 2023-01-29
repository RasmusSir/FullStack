const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        url: 'hpandthedeadlyhallows.com',
        likes: '10'
    },
    {
        title: 'Harry Potter.io',
        author: 'J.K. Rowling',
        url: 'hpandthedeadlyhallows.com',
        likes: '10'
    },
]

const noLikes = {
    title: 'noLikes',
    author: 'J.K. Rowling',
    url: 'hpandthedeadlyhallows.com'
}

const noTitle = {
    url: 'hpandthedeadlyhallows.com',
    likes: '10'
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}
  

module.exports = {
    initialBlogs,
    noLikes,
    noTitle,
    blogsInDb,
    usersInDb,
}