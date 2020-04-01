const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((prev, next) => prev + next.likes, 0);
};

const favoriteBlog = blogs => {
  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b));
};

const mostBlogs = blogs => {
  let authorsWithBlogs = {};
  for (var i = 0; i < blogs.length; i++) {
    if (!authorsWithBlogs[blogs[i].author]) {
      authorsWithBlogs[blogs[i].author] = { author: blogs[i].author, blogs: 1 };
    } else {
      authorsWithBlogs[blogs[i].author].blogs += 1;
    }
  }
  return Object.values(authorsWithBlogs).reduce((a, b) => (a.blogs > b.blogs ? a : b));
};

const mostLikes = blogs => {
  let authorsWithLikes = {};
  for (var i = 0; i < blogs.length; i++) {
    if (!authorsWithLikes[blogs[i].author]) {
      authorsWithLikes[blogs[i].author] = { author: blogs[i].author, likes: blogs[i].likes };
    } else {
      authorsWithLikes[blogs[i].author].likes += blogs[i].likes;
    }
  }
  return Object.values(authorsWithLikes).reduce((a, b) => (a.likes > b.likes ? a : b));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
