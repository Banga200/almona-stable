export const requiredField = [
  (value) => {
    if (value) return true;

    return "الحقل مطلوب";
  },
];
export const emailFormat = (value) => {
  // تحقق فارغ: إذا أردت السماح بالحقل الفارغ اجعل هذا الشرط يعيد true
  if (!value) return true; // -> استخدم هذا إذا كان البريد غير إلزامي

  // تعبير منتظم بسيط ومُعقول لبريد إلكتروني
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(value) ? true : "البريد الإلكتروني غير صالح";
};