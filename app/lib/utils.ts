export function convertToFormData(object: {
  [key: string]: string | undefined;
}) {
  let form_data = new FormData();

  for (let key in object) {
    const value = object[key];
    if (value !== undefined) form_data.append(key, value);
  }
  return form_data;
}
