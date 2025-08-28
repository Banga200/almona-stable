<script setup>

const cards = [
    {
        icon: "mdi-bullseye",
        title: "الهدف",
        description: 'تحقيق التميز في خدمة عملائنا وتطوير السوق المحلي',
    },
    {
        icon: "$Eye",
        title: "الرؤية",
        description: 'أن نكون الشركة الرائدة التي تحظى بثقة الجميع',
    },
    {
        icon: "mdi-heart-outline",
        title: "القيم",
        description: 'الاحتراف، الشفافية، والالتزام بأعلى معايير الجودة',
    },
    {
        icon: "$Lamp",
        title: "التميز",
        description: 'نقدم حلولاً مبتكرة تلبي احتياجات عملائنا المتنوعة',
    },
]
</script>
<template>
    <section id="aboutus">
        <!-- <span class="top_long_line line"></span>
        <span class="top_short_line line"></span> -->
        <v-container>
            <div class="text-center mb-16">
                <h1 class="title">عن <span class="text-gradient">الشركة</span></h1>
                <div class="line-gradient"></div>
            </div>
            <v-row class="flex-wrap flex-md-nowrap d-flex align-center ga-12 mb-16" dense>
                <v-col cols="12" md="6">
                    <p class="text-lg">نحن شركة يمنية رائدة في تقديم خدمات المعارض، التسويق، إدارة المشاريع، وإنجاز الأعمال. نمتلك فريقاً شغوفاً بخدمة عملائنا وتحقيق نتائج ملموسة تعكس رؤيتنا في تطوير السوق اليمني.</p>
                    <p class="mt-4 text-lg">منذ تأسيسنا، نسعى لتقديم خدمات متميزة تجمع بين الخبرة المحلية والمعايير العالمية، مما يضمن تحقيق أهداف عملائنا بأعلى مستويات الجودة والاحتراف.</p>
                    <div class="d-flex ga-4 align-center mt-6 pt-4">
                        <v-avatar size="56" image="/logo.png" class="pa-4" color="avatar"></v-avatar>
                        <div>
                            <h3 class="text-dark font-bold">المُنى الذهبية</h3>
                            <p class="text-sm">شريكك في النجاح</p>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="auto">
                    <div class="card-gradient">
                        <v-img src="/images/about-us.webp" aspect-ratio="4/3" />
                        <h1 class="text-2xl font-bold">فريق متخصص ومتفاني</h1>
                        <p class="opacity-90">نضم طاقم من الشباب المتميز في مختلف المجالات لضمان تقديم أفضل الخدمات لعملائنا الكرام</p>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="(card, index) in cards"
                    :key="index" cols="12" md="6" lg="3">
                     <AboutCard
                        :icon="card.icon"
                        :title="card.title"
                        :description="card.description"
                        iconSize="64"
                        flat="flat-card"
                    />
                </v-col>
            </v-row>
        </v-container>
        <!-- <span class="bottom_short_line line"></span>
        <span class="bottom_long_line line"></span> -->
    </section>
</template>