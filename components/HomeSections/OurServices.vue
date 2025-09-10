<script setup>
const props = defineProps(['services', "loading"])
// const services = [
//      {
//     image: "/images/events.webp",
//     icon: "$Event",
//     title: "تنظيم المعارض والمؤتمرات",
//     description: "نقوم بتنظيم وإدارة المعارض التجارية والمؤتمرات بأعلى معايير الجودة والاحتراف",
//     items: [
//       "التحضير والتنسيق",
//       "إدارة المشاركين",
//       "الدعاية والإعلان",
//       "التقييم والمتابعة"
//     ],
//     linkText: "اعرف المزيد"
//   },
//   {
//     image: "/images/events.webp",
//     icon: "$Chart",
//     title: "إدارة المشاريع",
//     description: "خدمات شاملة لإدارة المشاريع من التخطيط حتى التنفيذ والمتابعة",
//     items: [
//       "التخطيط الاستراتيجي",
//       "إدارة المشروع",
//       "تنفيذ التنفيذ",
//       "فصل العمليات"
//     ],
//     linkText: "اعرف المزيد"
//   },
//  {
//     image: "/images/events.webp",
//     icon: "$Speaker",
//     title: "خدمات التسويق",
//     description: "استراتيجيات تسويقية متكاملة لتعزيز حضور علامتك التجارية في السوق",
//     items: [
//       "التسويق الرقمي",
//       "إدارة المحتوى",
//       "تحليل السوق",
//       "بناء الهوية البصرية"
//     ],
//     linkText: "اعرف المزيد"
//   },
//   {
//     image: "/images/events.webp",
//     icon: "$FileCheck",
//     title: "خدمة إنجاز الأعمال",
//     description: "نساعدك في إنجاز معاملاتك التجارية والإدارية بسرعة وكفاءة",
//     items: [
//       "المعاملات الحكومية",
//       "التراخيص الرسمية",
//       "الاستشارات القانونية",
//       "المتابعة الإدارية"
//     ],
//     linkText: "اعرف المزيد"
//   },
//    {
//     image: "/images/events.webp",
//     icon: "$Customers",
//     title: "خدمة شغلي",
//     description: "منصة تربط الباحثين عن عمل بجهات التدريب والتوظيف",
//     items: [
//       "تسجيل السير الذاتية",
//       "ربط المؤسسات",
//       "فرص تدريبية",
//       "فرص عمل"
//     ],
//     linkText: "اعرف المزيد"
//   },
//   {
//     image: "/images/events.webp",
//     icon: "$Building",
//     title: "الاستشارات التجارية",
//     description: "استشارات متخصصة لتطوير أعمالك وتحقيق أهدافك التجارية",
//     items: [
//       "دراسة الجدوى",
//       "الخطة التشغيلية",
//       "تحليل المخاطر",
//       "تحقيق النمو"
//     ],
//     linkText: "اعرف المزيد"
//   },
 
// ];

</script>
<template>
    <section id="ourServices" class="bg-gray-50">
        <v-container>
            <div class="text-center mb-16">
                <h1 class="title text-gradient">{{ $t('sections.our_services.title') }}</h1>
                <p class="text-center mb-8 text-xl">{{ $t('sections.our_services.description') }}</p>
                <div class="line-gradient"></div>
            </div>
             <div class="text-end mb-4">
                <v-btn variant="outlined" :text="$t('button.view_all')" append-icon="mdi-arrange-bring-forward" to="/services" color="primary" v-if="props.services && props.services?.length > 0"/>
            </div>
            <v-row>
                <v-col v-for="(service, index) in props.services" :key="index" cols="12" md="6">
                    <ServiceCard :info="service"/>
                </v-col>
            </v-row>
            <div class="mt-4 text-center" v-if="props.loading">
             <v-progress-circular indeterminate color="primary"/>
            </div>
            <div class="card-gradient mt-16 d-flex flex-column align-center justify-center ga-4">
                <h1 class="text-3xl">{{ $t('sections.our_services.do_you_need_service') }}</h1>
                <p class="text-xl">{{ $t('sections.our_services.contact_us') }}</p>
                <v-btn :text="$t('button.contact_us')" append-icon="mdi-arrow-left" rounded="xl" size="x-large" class="font-bold  custom-button" @click="() => $router.push('/#contact-us')"/>

            </div>
        </v-container>
    </section>
</template>