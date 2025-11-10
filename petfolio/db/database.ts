import { type SQLiteDatabase } from 'expo-sqlite';
import uuid from 'react-native-uuid';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  //ALWAYS INCREASE THIS WITH 1 WHEN YOU INSERT NEW MIGRATIONS!!!!!!
  const DATABASE_VERSION = 5;
  const result = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );


  let currentDbVersion = result?.user_version ?? 0;
  console.log('Current DB version:', currentDbVersion);
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  // Initial database setup
  if (currentDbVersion === 0) {
    console.log('Migrating to version 1');
    await db.execAsync(`
            PRAGMA journal_mode = 'wal';
            CREATE TABLE IF NOT EXISTS pets (
            id TEXT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            birthdate TEXT NOT NULL,
            description TEXT
            );
        `);


    currentDbVersion = 1;
  }
  //seed database
  if (currentDbVersion === 1) {
    const seed = [
      { name: 'Lena', birthdate: '2015-04-26', desc: 'Brown Cat loves boxes' },
      { name: 'Marieke', birthdate: '2015-04-26', desc: 'Brown Cat with orange spots' },
      { name: 'Bengel', birthdate: '2012-09-22', desc: 'Orange Cat with White spots' },
      { name: 'Pebbles', birthdate: '2016-04-29', desc: 'Shetland Sheepdog Tricolor, no teeth' },
    ];
    const esc = (s: string) => (s ?? '').toString().replace(/'/g, "''");
    // the line of values for each pet in the seed list
    const tuples = seed
      .map(p => `('${esc(uuid.v4().toString())}','${esc(p.name)}','${esc(p.birthdate)}','${esc(p.desc)}')`)
      .join(',\n');
    //insert the lines into the table
    const sql = `INSERT OR IGNORE INTO pets (id, name, birthdate, description) VALUES\n${tuples};`;
    await db.execAsync(sql);

    currentDbVersion = 2;
  }

  //seed database again
  if (currentDbVersion === 2) {
    const seed = [
      { name: 'Momo', birthdate: '2024-06-01', desc: 'White rabbit with brown spots' },
      { name: 'Azula', birthdate: '2023-01-01', desc: 'White Rabbit with brown and black spots' },
    ];
    const esc = (s: string) => (s ?? '').toString().replace(/'/g, "''");
    // the line of values for each pet in the seed list
    const tuples = seed
      .map(p => `('${esc(uuid.v4().toString())}','${esc(p.name)}','${esc(p.birthdate)}','${esc(p.desc)}')`)
      .join(',\n');
    //insert the lines into the table
    const sql = `INSERT OR IGNORE INTO pets (id, name, birthdate, description) VALUES\n${tuples};`;
    await db.execAsync(sql);

    currentDbVersion = 3;
  }


  if (currentDbVersion === 3) {
    await db.execAsync(`
            PRAGMA journal_mode = 'wal';

            CREATE TABLE IF NOT EXISTS users (
              id TEXT PRIMARY KEY,
              firstname VARCHAR(100) NOT NULL,
              lastname VARCHAR(100) NOT NULL,
              email VARCHAR(100) UNIQUE NOT NULL,
              phonenumber VARCHAR(15) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              owner_id TEXT UNIQUE NOT NULL
            );
        `);

    const userSeed = [
      { firstname: 'Nina', lastname: 'de Weerd', email: 'nina.deweerd@student.ucll.be', phonenumber: '0123456789', password: 'welkom123', ownerId: "1" },
      { firstname: 'Ode', lastname: 'Malfait', email: 'ode malfait@ucll.be', phonenumber: '0123456789', password: 'welkom321', ownerId: "2" },
      { firstname: 'Ashley', lastname: 'Timmermans', email: 'ashley.timmermans@student.ucll.be', phonenumber: '0123456789', password: 'welkom1234', ownerId: "3" },
      { firstname: 'Lotte', lastname: 'Geeraerts', email: 'lotte.geeraerts@ucll.be', phonenumber: '0123456789', password: 'welkom4321', ownerId: "4" }
    ];
    const esc = (s: string) => (s ?? '').toString().replace(/'/g, "''");
    // the line of values for each pet in the seed list
    const tuples = userSeed
      .map(u => `('${esc(uuid.v4().toString())}','${esc(u.firstname)}','${esc(u.lastname)}','${esc(u.email)}','${esc(u.phonenumber)}','${esc(u.password)}','${esc(u.ownerId)}')`)
      .join(',\n');
    //insert the lines into the table
    const sql = `INSERT OR IGNORE INTO users (id, firstname, lastname, email, phonenumber, password, owner_id) VALUES\n${tuples};`;
    await db.execAsync(sql);

    currentDbVersion = 4;
  }


  if (currentDbVersion === 4) {
    await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
      pictures TEXT
    );
  `);

    const profileSeed = [
      { userId: '1', pictures: null },
      { userId: '2', pictures: null },
      { userId: '3', pictures: null },
      { userId: '4', pictures: null },
    ];

    const esc = (s: string) => (s ?? '').toString().replace(/'/g, "''");

    const tuples = profileSeed
      .map(u => `('${esc(uuid.v4().toString())}','${esc(u.userId)}','${esc(u.pictures)}')`)
      .join(',\n');

    const sql = `INSERT OR IGNORE INTO profiles (id, user_id, pictures) VALUES\n${tuples};`;
    await db.execAsync(sql);

    currentDbVersion = 5;
  }
}