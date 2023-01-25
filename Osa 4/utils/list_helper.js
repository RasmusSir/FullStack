const reverse = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}
  
const average = (array) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    return array.length === 0
        ? 0 
        : array.reduce(reducer, 0) / array.length
}


const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        console.log('näistä summataan likesit yhteen', blog)
        return sum + blog.likes
    }
    console.log('reducerin arvo', blogs.reduce(reducer, 0))
    console.log('blogs lenghti on', blogs.length)
    
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

  
module.exports = {
    reverse,
    average,
    dummy,
    totalLikes,
}