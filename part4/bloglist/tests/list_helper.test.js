const listHelper = require("../utils/list_helper");
const { listWithOneBlog, listWithManyBlogs } = require("./test_helper");

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("of empty list is null", () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });

  test("when list has only one blog, equals that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  test("of a list with multiple favorite blogs is calculated right", () => {
    const result = listHelper.favoriteBlog(
      listWithManyBlogs.concat({
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Edsger W. Dijkstra",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 12,
        __v: 0,
      })
    );
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("most blogs", () => {
  test("of empty list is null", () => {
    expect(listHelper.mostBlogs([])).toBe(null);
  });

  test("when list has only one blog, equals that blog's author", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostBlogs(listWithManyBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("of a list with multiple authors with most blogs is calculated right", () => {
    const result = listHelper.mostBlogs(
      listWithManyBlogs.concat({
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Edsger W. Dijkstra",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 12,
        __v: 0,
      })
    );
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
  test("of empty list is null", () => {
    expect(listHelper.mostLikes([])).toBe(null);
  });

  test("when list has only one blog, equals that blog's author", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostLikes(listWithManyBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });

  test("of a list with multiple authors with most likes is calculated right", () => {
    const result = listHelper.mostLikes(
      listWithManyBlogs.concat({
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Edsger W. Dijkstra",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 12,
        __v: 0,
      })
    );
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 29,
    });
  });
});
