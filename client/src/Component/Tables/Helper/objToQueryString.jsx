export function objToQueryString(obj) {
  if (Object.keys(obj).length === 0) {
    return '';
  }

  const keyValuePairs = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach(val => {
          keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
        });
      } else {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      }
    }
  }

  return '?' + keyValuePairs.join('&');
}