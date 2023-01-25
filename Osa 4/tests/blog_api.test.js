const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

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


beforeEach(async () => {
    await Blog.deleteMany({})
    let noteObject = new Blog(initialBlogs[0])
    await noteObject.save()
    noteObject = new Blog(initialBlogs[1])
    await noteObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r)
    console.log('blogin sisällöt', contents)
    
  
    expect(contents).toContain(
        'id'
    )
})

afterAll(async () => {
    await mongoose.connection.close()
})