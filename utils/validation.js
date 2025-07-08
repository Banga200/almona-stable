export const requiredField = [
  (value) => {
    if (value) return true;

    return "الحقل مطلوب";
  },
];
