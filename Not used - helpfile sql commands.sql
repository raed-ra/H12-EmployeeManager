INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Ahmed", TRUE, "Rockington", 100);

INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Ahmed", TRUE, "Rockington", 100);

INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Jacob", TRUE, "Misty", 10);

INSERT INTO people (name, has_pet)
VALUES ("Peter", false);

-- Updates the row where the column name is peter --
UPDATE people
SET has_pet = true, pet_name = "Franklin", pet_age = 2
WHERE name = "Peter";

SELECT * FROM people;



-- show ALL books with authors
-- INNER JOIN will only return all matching values from both tables
SELECT title, firstName, lastName
FROM books
INNER JOIN authors ON books.authorId = authors.id;

-- show ALL books, even if we don't know the author
-- LEFT JOIN returns all of the values from the left table, and the matching ones from the right table
SELECT title, firstName, lastName
FROM books
LEFT JOIN authors ON books.authorId = authors.id;

-- show ALL books, even if we don't know the author
-- RIGHT JOIN returns all of the values from the right table, and the matching ones from the left table
SELECT title, firstName, lastName
FROM books
RIGHT JOIN authors ON books.authorId = authors.id;


  connection.query("SELECT * FROM songs", function(err, res) {
  connection.query("SELECT * FROM songs WHERE genre=?", ["Dance"], function(err, res) {
  connection.query( "DELETE FROM products WHERE ?",{flavor: "strawberry" },function(err, res)
  connection.query("SELECT * FROM products", function(err, res) {
      connection.query(
        "INSERT INTO auctions SET ?",
        {
          item_name: answer.item,
          category: answer.category,
          starting_bid: answer.startingBid || 0,
          highest_bid: answer.startingBid || 0
        },
        function(err) {


      var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, { artist: answer.artist }, function(err, res) {

      var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
     connection.query(query, function(err, res) {

      var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {

      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {

     var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, { artist: answer.artist }, function(err, res) {

    var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";

    var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
    connection.query(query, [answer.start, answer.end], function(err, res) {

    connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {

    var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
    query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";


var query = "INSERT INTO" + tablename + "SET  ?";
connection.query(query,tabledata,function(err, res) {}

//------------

tabledata =
{first_name: answer.first_name,
    second_name: answer.second_name,
    role_id:answer.roleid,
    manager_id: answer.manamgerid ||null}

tabledata =
	{title: answer.title,
    salary: answer.salary,
    department_id:answer.departmentid}

tabledata =
	{ name: answer.departmentname }

    //---------

var query = "SELECT * FROM" + tablename;
    connection.query(query, function(err, res) {

//---------

var query = "UPDATE employee SET role_id=? WHERE (first_name = ? AND second_name = ?)" 
connection.query(query, employeerole ,function(err, res) {}


