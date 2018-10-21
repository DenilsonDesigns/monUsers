const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    john = new User({ name: "John" });
    jane = new User({ name: "Jane" });
    jeff = new User({ name: "Jeff" });

    Promise.all([joe.save(), john.save(), jane.save(), jeff.save()]).then(() =>
      done()
    );
  });

  it("finds all users with a name of joe", done => {
    User.find({
      name: "Joe"
    }).then(users => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("find a user with a particular id", done => {
    User.findOne({
      _id: joe._id
    }).then(user => {
      assert(user.name === "Joe");
      done();
    });
  });

  it.only("can skip and limit the result set", done => {
    User.find({})
      .sort({ name: 1 }) //sort by name (asc), -1 for (desc)
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(users[0].name === "John");
        assert(users[1].name === "Jane");
        done();
      });
  });
});
