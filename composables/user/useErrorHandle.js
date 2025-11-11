import { ref } from "vue";
import { useUserStore } from "~/stores/auth";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
export default function () {
    const userStore = useUserStore();
    const toast = useToast();
    const router = useRouter();
    
    const user = ref(null);
    const isAdmin = ref(null)
    if (userStore.getUser) {
        userStore.getUser.UserName === "Admin" ? isAdmin.value = true: isAdmin.value = false;
        user.value = userStore.getUser
    }
    const token = userStore.getToken ? userStore.getToken : null
    function handelErros(error) {
        if (error.data) {
            handelAPIsErrors(error.data)
        }
        else {

        if(error.statusCode) {
            // Check for specific status codes and show toast messages accordingly
            const statusCode = error.statusCode;
            if (statusCode === 404) {
              toast.error('لم يجد المصادر 404');
            } else if (statusCode === 429) {
              toast.warning('طلبات على الخادم كثيرة, الرجاء المحاولة لاحقا');
            } else if (statusCode === 401) {
              toast.error('غير مصرح لك');
            }
            else if (statusCode >= 500) {
              toast.error('خطا في الخادم: حدث خطا داخلي في الخادم');
            } else if (error.message === 'Network Error') {
              //implement retry here
              toast.error('لا يوجد انترنت: الرجاء المحاولة لاحقا');
            }
          } 
          else if (error.request) {
            // The request was made, but no response was received
            toast.error('لايوجد رد من الخادم');
          }
          else if(error.code === 1002) {toast.error('كلمة السر القديمة غير متطابقة')}
          else {
            // A different error occurred here
            toast.error('حدث خطا غير متوقع, الرجاء المحاولة لاحقا');
            console.log(error)
          }
        }
        }

        function handelAPIsErrors(error) {
            const code = error.code
            if(code === 1001) {toast.error('اسم المستخدم او كلمة السر غير صحيحة')}
            if(code === 1003) {toast.error('الرمز غير صالح!')}
            if(code === 1004) {toast.error('اسم المستخدم او البريد الإلكتروني غير صحيحة')}
            if(code === 1005) {
                toast.error('حسابك غير مفعل, سيتم تحويلك الى صفحة التحقق!');
                // وجهه الى صفحة رمز التحقق

            }
            if(code === 1006) {
                toast.error('غير مسموح لك!');
                // وجهه الى صفحة الى الصفحة الرئيسية
                router.push('/')
            }
            if(code === 1007) {toast.error('المستخدم موجود')}
            // if(code === 1009) {toast.error('رمز التحقق !')}
            if(code === 1010) {toast.error('رمز التحقق غير صحيح!')}
            // Database Codes
            if(code === 3002) {toast.error('لم يتم العثور على السجلات')}
            if(code === 3003) {toast.error('لايمكن حذف بعض السجلات')}
            if(code === 3004) {toast.error('غير قادر على فتح الملف، الملف غير موجود')}
            if(code === 3005) {toast.error('غير قادر على إدراج البيانات')}
            if(code === 3006) {toast.error('غير قادر على تعديل البيانات')}
            if(code === 3007) {toast.error('غير قادر على حذف البيانات')}

        }   
    
    return {
        handelErros,
    }
}