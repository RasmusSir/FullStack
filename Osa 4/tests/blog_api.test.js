const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const blogsRouter = require('../controllers/blogs')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

//When some blogs are initially saved
test('4.8. blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('4.8. all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('4.9. the blogs have id as \'id\' ', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    console.log('Kaikki blogit:', blogs)

    blogs.forEach(blog => {
        console.log('yksittäinen blogi', blog)
        //Koitetaan että blogilla on id ominaisuus
        expect(blog.id).toBeDefined()
        //Koitetaan että id ominaisuuden nimi on tarkalleen "id"
        expect(blog).toHaveProperty('id')
    })
})


// Addition of new blogs
test('4.10. able to add blog with http post and lenght grows by one', async () => {
    const newBlog = {
        title: 'Hermione Potter',
        author: 'J.K. Rowling',
        url: 'hpandthedeadlyhallows.com',
        likes: '10'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    //Koitetaan että post menee läpi
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    //Koitetaan että post sisältää oikean tittelin
    expect(titles).toContain(
        'Hermione Potter'
    )
})


test('4.11. if likes not set, then likes = 0', async () => {
    //console.log('nolikesblog tulee sisään:', helper.noLikes)
    await api
        .post('/api/blogs')
        .send(helper.noTitle)
        .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 0)

})


test('4.12. if title or url is not set, then 400', async () => {
    //console.log('noTitle blog tulee sisään:', helper.noTitle)

    await api
        .post('/api/blogs')
        .send(helper.noTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    //console.log('response on', response.body)
    // Tarkastetaan samalla että listan pituus todella on sama kuin helperin initialBlogs (alkuperäisen) listan
    expect(response.body).toHaveLength(helper.initialBlogs.length + 0)
})

//Deletion of blogs

test('4.13. if blog is deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    console.log('blogit alussa:', blogsAtStart)
    const blogToDelete = blogsAtStart[0]
    console.log('blogi joka poistetaan:', blogToDelete)
    
    // tarkastetaan että .expect(204) toteutuu poiston yhteydessä.
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    console.log('Blogit lopussa:', blogsAtEnd)
    // Tarkastetaan samalla että listan pituus todella on sama kuin helperin initialBlogs (alkuperäisen) listan
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})


test('4.14. if blog is updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    console.log('blogit alussa:', blogsAtStart)
    const blogToUpdate = blogsAtStart[0]
    console.log('blogi jota päivitetään:', blogToUpdate)
    const blogUpdated = {
        ...blogToUpdate,
        title: 'updatedTitle'
    }

    
    // tarkastetaan että .expect(204) toteutuu poiston yhteydessä.
    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogUpdated)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    console.log('Blogit lopussa:', blogsAtEnd)
    // Tarkastetaan samalla että listan pituus todella on sama kuin helperin initialBlogs (alkuperäisen) listan
    expect(blogsAtEnd[0].title).toBe('updatedTitle')
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
  
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
  
        await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
  
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
    
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('expected `username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})