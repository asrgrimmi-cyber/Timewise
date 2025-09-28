
'use client';

/**
 * A service for interacting with the browser's localStorage.
 * Provides a simple, typed interface for getting and setting data.
 */

/**
 * Retrieves an item from localStorage and parses it as JSON.
 * @param key The key of the item to retrieve.
 * @param defaultValue The default value to return if the item doesn't exist.
 * @returns The parsed data or the default value.
 */
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Saves an item to localStorage after converting it to a JSON string.
 * @param key The key under which to save the item.
 * @param value The value to save.
 */
export function setInStorage<T>(key: string, value: T): void {
    if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage for key "${key}":`, error);
  }
}
