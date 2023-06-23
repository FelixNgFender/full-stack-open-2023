const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  let max = null;
  for (const blog of blogs) {
    if (max === null || max.likes < blog.likes) {
      max = blog;
    }
  }
  if (max === null) {
    return null;
  }
  return {
    title: max.title,
    author: max.author,
    likes: max.likes,
  };
};

const mostBlogs = (blogs) => {
  const authors = {};
  for (const blog of blogs) {
    if (authors[blog.author] === undefined) {
      authors[blog.author] = 1;
    } else {
      authors[blog.author] += 1;
    }
  }
  let max = null;
  for (const author in authors) {
    if (max === null || max.blogs < authors[author]) {
      max = {
        author: author,
        blogs: authors[author],
      };
    }
  }
  if (max === null) {
    return null;
  }
  return max;
};

const mostLikes = (blogs) => {
  const authors = {};
  for (const blog of blogs) {
    if (authors[blog.author] === undefined) {
      authors[blog.author] = blog.likes;
    } else {
      authors[blog.author] += blog.likes;
    }
  }
  let max = null;
  for (const author in authors) {
    if (max === null || max.likes < authors[author]) {
      max = {
        author: author,
        likes: authors[author],
      };
    }
  }
  if (max === null) {
    return null;
  }
  return max;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
