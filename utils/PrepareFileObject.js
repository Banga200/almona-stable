// utils/fileUploader.js

/**
 * Convert a File to Base64 string
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]); // remove base64 prefix
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Generate SHA-256 hash from a File
 */
async function hashFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Process a File and return an object ready for upload
 */
export async function prepareUploadFileObject(file) {
  if (!(file instanceof File)) {
    throw new Error('Input must be a File object.');
  }

  const base64 = await fileToBase64(file);
  const hash = await hashFile(file);

  return {
    fileName: file.name,
    originalFileName: file.name,
    fileExtension: file.name.split('.').pop() || '',
    fileSize: file.size,
    fileHash: hash,
    fullPath: '',
    hashAlgorithmName: 'SHA256',
    contentAsBase64: base64,
    mimeType: file.type,
  };
}
