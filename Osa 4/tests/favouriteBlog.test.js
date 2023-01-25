const listHelper = require('../utils/list_helper')

describe('favourite blog', () => {
 
    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'The winner',
            author: 'R. Siren',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 6,
            __v: 0
        },
    ]

    test('the blog with most likes', () => {
        const result = listHelper.favouriteBlog(listWithMultipleBlogs)
        expect(result).toEqual(
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'The winner',
                author: 'R. Siren',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 6,
                __v: 0
            }
        )
    })

 
})