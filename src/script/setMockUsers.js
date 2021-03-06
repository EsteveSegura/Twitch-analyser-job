(async () => {
  process.env.NODE_ENV = 'run';

  const {MongoClient: mongo} = require('mongodb');
  const MUUID = require('uuid-mongodb');
  const {mongo: {mongoConnectionUri, dbName, timeout}} = require('../infrastructure/config/index');

  const connect = async () => {
    try {
      const client = await mongo.connect(mongoConnectionUri,
          {useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: timeout});
      const db = await client.db(dbName);


      return db;
    } catch (err) {
      console.error(`Error in database connection: ${err}`);
    }
  };

  const insertUser = (id, name, idTwitch) => {
    return {
      _id: MUUID.from(id),
      name,
      idTwitch,
    };
  };

  const users = [
    {
      id: 'ffbd8683-a72c-4d64-a053-8b9ecec25c4f',
      name: 'girlazo',
      idTwitch: '148382191',
    },
    {
      id: '68fa4927-f9d1-4f8a-876d-8ca5589712a1',
      name: 'gonsabellla',
      idTwitch: '405208912',
    },
    {
      id: 'b5ce1f4b-2091-48ab-9af6-3b36d9112410',
      name: 'rubius',
      idTwitch: '39276140',
    },
    {
      id: '2743f7b3-eb10-4c72-aec5-81e114aa3d6a',
      name: 'shadoune666',
      idTwitch: '36533048',
    },
  ];


  console.log('Inserting users');

  const db = await connect();
  await db.collection('streamers').deleteMany({});

  let ok = 0;
  let ko = 0;
  for (user of users) {
    try {
      const streamerMock = insertUser(user.id, user.name, user.idTwitch);
      await db.collection('streamers').insertOne(streamerMock);
      ok++;
    } catch (err) {
      ko++;
    }
  }

  console.log('Users inserted');
  console.log({ok, ko});

  process.exit();
})();
