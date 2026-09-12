const DB_NAME = 'RomanticAppAudioDB';
const STORE_NAME = 'audioStore';
const AUDIO_KEY = 'custom_bg_music';
const AUDIO_META_KEY = 'custom_bg_music_meta';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveAudioToStorage(file: File): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(file, AUDIO_KEY);
    store.put({ name: file.name, type: file.type, size: file.size }, AUDIO_META_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadAudioFromStorage(): Promise<{ blob: Blob; meta: { name: string } } | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const reqAudio = store.get(AUDIO_KEY);
      const reqMeta = store.get(AUDIO_META_KEY);

      tx.oncomplete = () => {
        if (reqAudio.result) {
          resolve({
            blob: reqAudio.result,
            meta: reqMeta.result || { name: 'Uploaded Song' },
          });
        } else {
          resolve(null);
        }
      };
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.warn('Could not load audio from IndexedDB', e);
    return null;
  }
}

export async function clearAudioFromStorage(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(AUDIO_KEY);
      store.delete(AUDIO_META_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.warn('Could not clear audio from IndexedDB', e);
  }
}
