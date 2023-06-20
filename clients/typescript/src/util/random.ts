export const randomValue = (): string => {
  return Math.random().toString(16).substr(2)
}

export const genUUID = (): string => {
  const bytes = new Uint8Array(16);

  if (!!crypto && !!crypto.getRandomValues) {
    // use the crypto api
    crypto.getRandomValues(bytes);
  } else {
    // fallback to Math.random
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40; // Set the 4 most significant bits to 0100
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // Set the 2 most significant bits to 10

  const hexValues: string[] = [];
  bytes.forEach(byte => {
    hexValues.push(byte.toString(16).padStart(2, '0'));
  });

  return hexValues.slice(0, 4).join('') + '-' +
         hexValues.slice(4, 6).join('') + '-' +
         hexValues.slice(6, 8).join('') + '-' +
         hexValues.slice(8, 10).join('') + '-' +
         hexValues.slice(10).join('');
}
