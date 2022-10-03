const {db} = require('./src/models/index');
const { movies, music } = require('./src/models/index');

async function seedDatabase() {
  db.sync();

  await movies.create({title: 'Top Gun: Maverick', genre: 'action', year: 2022});
  await movies.create({title: 'The Batman', genre: 'action', year: 2022});
  await movies.create({title: 'CODA', genre: 'drama', year: 2021});
  await movies.create({title: 'Don\'t look up', genre: 'comedy', year: 2021});
  await movies.create({title: 'Greyhound', genre: 'adventure', year: 2020});
  await movies.create({title: 'Trial of the Chicago 7', genre: 'drama', year: 2020});
  await movies.create({title: 'Avengers: Endgame', genre: 'action', year: 2019});
  await movies.create({title: 'Parasite', genre: 'thriller', year: 2019});
  await movies.create({title: 'Avengers: Infinity War', genre: 'action', year: 2018});
  await movies.create({title: 'Hereditary', genre: 'horror', year: 2018});
  await movies.create({title: 'Dunkirk', genre: 'action', year: 2017});
  await movies.create({title: 'Blade Runner 2049', genre: 'science fiction', year: 2017});
  await movies.create({title: 'La La Land', genre: 'comedy', year: 2016});
  await movies.create({title: 'Arrival', genre: 'science fiction', year: 2016});
  await movies.create({title: 'Big Short', genre: 'comedy', year: 2015});
  await movies.create({title: 'Mad Max: Fury Road', genre: 'science fiction', year: 2015});
  await movies.create({title: 'Gone Girl', genre: 'thriller', year: 2014});
  await movies.create({title: 'Interstellar', genre: 'adventure', year: 2014});
  await movies.create({title: 'Wolf of Wall Street', genre: 'comedy', year: 2013});
  await movies.create({title: 'Prisoners', genre: 'drama', year: 2013});
  await movies.create({title: 'Les Miserables', genre: 'drama', year: 2012});
  await movies.create({title: 'Skyfall', genre: 'action', year: 2012});
  await movies.create({title: 'Harry Potter and the Deathly Hallows: Part 2', genre: 'adventure', year: 2011});
  await movies.create({title: 'Drive', genre: 'action', year: 2011});
  await movies.create({title: 'Black Swan', genre: 'thriller', year: 2010});
  await movies.create({title: 'Inception', genre: 'adventure', year: 2010});

  await music.create({song: 'I Ain\'t Worried', artist: 'OneRepublic', genre: 'pop', 'year': 2022});
  await music.create({song: 'abcdefu', artist: 'GAYLE', genre: 'pop', 'year': 2022});
  await music.create({song: 'All Too Well', artist: 'Taylor Swift', genre: 'pop', year: 2021});
  await music.create({song: 'Your Power', artist: 'Billie Ellish', genre: 'pop', year: 2021});
  await music.create({song: 'Starting Over', artist: 'Chris Stapleton', genre: 'country', year: 2020});
  await music.create({song: 'Folklore', artist: 'Taylor Swift', genre: 'pop', year: 2020});
  await music.create({song: 'If I Cant Have You', artist: 'Shawn Medes', genre: 'pop', year: 2019});
  await music.create({song: 'Thank U, Next', artist: 'Ariana Grande', genre: 'pop', year: 2019});
  await music.create({song: 'Scorpion', artist: 'Drake', genre: 'hip hop', year: 2018});
  await music.create({song: 'Golden Hour', artist: 'Kacey Musgraves', genre: 'other', year: 2018});
  await music.create({song: 'divide', artist: 'Ed Sheeran', genre: 'pop', year: 2017});
  await music.create({song: 'Reputation', artist: 'Taylor Swift', genre: 'pop', year: 2017});
  await music.create({song: 'Anti', artist: 'Rihanna', genre: 'hip hop', year: 2016});
  await music.create({song: 'Blond', artist: 'Fronk Ocean', genre: 'r&b', year: 2016});
  await music.create({song: 'Hamilton', artist: 'Lin-Manuael Miranda', genre: 'other', year: 2015});
  await music.create({song: 'St. Vincent', artist: 'St. Vincent', genre: 'heavy metal', year: 2015});
  await music.create({song: 'Platinum', artist: 'Miranda Lambert', genre: 'rock', year: 2014});
  await music.create({song: 'X', artist: 'Ed Sheeran', genre: 'pop', year: 2014});
  await music.create({song: 'Same Trailer, Different Park', artist: 'Kacey Musgraves', genre: 'country', year: 2013});
  await music.create({song: 'AM', artist: 'Artic Monkeys', genre: 'heavy metal', year: 2013});
  await music.create({song: 'Channel Orange', artist: 'Frank Ocean', genre: 'r&b', year: 2012});
  await music.create({song: 'Babel', artist: 'Mumford & Sons', genre: 'country', year: 2012});
  await music.create({song: '21', artist: 'Adele', genre: 'other', year: 2011});
  await music.create({song: 'Born This Way', artist: 'Lady Gaga', genre: 'pop',year: 2011});
  await music.create({song: 'Need You Now', artist: 'Lady Antebellum', genre: 'country', year: 2010});
  await music.create({song: 'Speak Now', artist: 'Taylor Swift', genre: 'pop', year: 2010});

}

seedDatabase();
