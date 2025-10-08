export function convertToFormData(object: {
  [key: string]: string | undefined;
}) {
  const form_data = new FormData();

  for (const key in object) {
    const value = object[key];
    if (value !== undefined) form_data.append(key, value);
  }
  return form_data;
}
