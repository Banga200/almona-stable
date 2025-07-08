<script setup>
const contactDetails = [
    {
        title: "العنوان",
        icon: "$MapMarker",
        content: "اليمن، حضرموت، المكلا، شارع الجسر الصيني، عمارة بن هلابي2، الدور الثالث، شقة رقم 2",
    },
    {
        title: "البريد الإلكتروني",
        icon: "mdi-email-outline",
        content: "info@almonaa.com",    
    },
    {
        title: "رقم الهاتف",
        icon: "mdi-phone",
        content: "967+ 783263332",
    },
    {
        title: "ساعات العمل",
        icon: "mdi-clock-outline",
        content: "الأحد - الخميس: 8:00 ص - 3:00 م الجمعة،السبت: مغلق"
    }
]
const subjects = [
    {
        id: 1,
        title: 'تنظيم المعارض'
    },
    {
        id: 2,
        title: 'التسويق' 
    },
    {
        id: 3,
        title: 'إدارة المشاريع'
    },
    {
        id: 4,
        title: 'إنجاز الأعمال'
    },
    {
        id: 5,
        title: 'خدمة شغلني'
    },
    {
        id: 0,
        title: 'اخرى'
    },
]
</script>
<template>
   <section id="contact-us" class="bg-gray-50">
     <v-container>
        <div class="text-center mb-16">
            <h1 class="title text-gradient">تواصل معنا</h1>
            <p class="text-xl text-center mb-8">نحن هنا لخدمتك والإجابة على جميع استفساراتك. تواصل معنا عبر الطرق التالية</p>
            <div class="line-gradient"></div>
        </div>
        <v-row>
            <!-- معلومات التواصل  -->
            <v-col class="d-flex flex-column ga-8" cols="12" md="6">
                <v-card>
                    <div class="d-flex flex-column ga-4">
                        <h1 class="text-2xl font-bold">معلومات التواصل</h1>
                        <div class="d-flex flex-column ga-4">
                            <div class="d-flex ga-4" v-for="(detail, index) in contactDetails" :key="index">
                                <v-avatar size="48" color="avatar">
                                    <v-icon :icon="detail.icon" size="24" color="secondary"></v-icon>
                                </v-avatar>
                                <div>
                                    <h4 class="mb-2">{{ detail.title }}</h4>
                                    <p>{{ detail.content }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-card>
                <v-card>
                    <h2 class="text-2xl font-bold mb-6 ">تابعنا على</h2>
                    <div class="d-flex ga-4 align-center follow-us">
                        <v-avatar class="facebook" size="56">
                            <v-icon size="24" color="primary" icon="$FacebookOutline"></v-icon>
                        </v-avatar>
                        <v-avatar class="instagram" size="56">
                            <v-icon size="24" color="primary">mdi-instagram</v-icon>
                        </v-avatar>
                        <v-avatar class="message" size="56">
                            <v-icon size="24" color="primary" icon="$MessageCircle"></v-icon>
                        </v-avatar>
                    </div>
                </v-card>
                <div class="card-gradient">
                    <h2 class="text-2xl font-bold">خدمات خاصة</h2>
                    <div>
                        <h4 class=mb-2>لوحة تحكم المشاركين</h4>
                        <v-btn text="دخول المشاركين" variant="tonal" class="white"/>
                    </div>
                    <div>
                        <h4 class=mb-2>لوحة تحكم المشاركين</h4>
                        <div class="d-flex flex-column ga-2">
                            <v-btn text="تسجيل كمتدرب " variant="tonal" class="white" block/>
                            <v-btn text="تسجيل كمؤسسة تدريبية" variant="tonal" class="white" block/>
                        </div>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="6">
               <v-card class="h-100">
                <h2 class="text-2xl font-bold mb-6 ">أرسل لنا رسالة</h2>
                <v-form>
                <div class="d-flex flex-column ga-1">
                    <div>
                        <label class="mb-2 d-block text-sm">الاسم الكامل *</label>
                        <v-text-field placeholder="أدخل الاسم الكامل"/>
                    </div>
                    <div>
                        <label class="mb-2 d-block text-sm">البريد الإلكتروني *</label>
                        <v-text-field placeholder="أدخل البريد الإلكتروني"/>
                    </div>
                    <div>
                        <label class="mb-2 d-block text-sm">الاسم الكامل *</label>
                        <v-select placeholder="اختر الموضوع" :items="subjects" item-title="title"/>
                    </div>
                    <div>
                        <label class="mb-2 d-block text-sm">الرسالة *</label>
                        <v-textarea placeholder="اكتب رسالتك هنا..."/>
                    </div>
                    <v-btn class="glowing-gradient-button" text="إرسال رسالة" size="large" append-icon="$Send" rounded="lg"/>
                </div>
                
               </v-form>
               </v-card>
            </v-col>
        </v-row>
    </v-container>
   </section>
</template>