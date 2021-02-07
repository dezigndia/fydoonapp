import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import appSchema from './schema/app';

import Message from './model/Message';
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema: appSchema,
    dbName: 'fydoonApp', // optional database name or file system path
    // migrations, // optional migrations
    synchronous: true, // synchronous mode only works on iOS. improves performance and reduces glitches in most cases, but also has some downsides - test with and without it
    // experimentalUseJSI: true, // experimental JSI mode, use only if you're brave
})

// Then, make a Watermelon database from it!
const database = new Database({
    adapter,
    modelClasses: [
        Message
    ],
    actionsEnabled: true,
})