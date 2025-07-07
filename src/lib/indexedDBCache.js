// src/lib/indexedDBCache.js
import { openDB } from 'idb';

const DB_NAME     = 'BubbleCache';
const STORE_NAME  = 'messageCache';
const DB_VERSION  = 1;

let dbPromise = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'channel_id' });
        }
      }
    });
  }
  return dbPromise;
}

/**
 * @param {string} channel_id
 * @returns {Promise<{ channel_id: string, messages: any[], cachedAt: number }|undefined>}
 */
export async function getCachedMessages(channel_id) {
  const db = await getDb();
  return db.get(STORE_NAME, channel_id);
}

/**
 * @param {{ channel_id: string, messages: any[], cachedAt: number }} record
 */
export async function setCachedMessages(record) {
    
    let data = {};

    data.channel_id = record.channel_id;

    data.cachedAt = record.cachedAt;

    data.messages = record.messages.map(m => JSON.parse(JSON.stringify(m)))

    const db = await getDb();

    await db.put(STORE_NAME, data);
}
