<template>
    <div class="worker-card card">
        <div class="relative">
            <v-img src="/images/worker.jpeg" cover height="256"/>
        </div>
        <div class="d-flex flex-column align-center justify-center ga-4 text-center pa-6">
            <div>
                <h1 class="text-xl font-bold">أ. فيصل علي</h1>
                <h3 class="job-name mt-2 text-primary">المدير العام</h3>
            </div>
            <p>قائد الفريق ومؤسس الشركة، يتمتع بخبرة واسعة في إدارة الأعمال والمعارض</p>
            <div>
                <h4>التخصصات:</h4>
                <div class="d-flex flex-wrap justify-center ga-2 mt-2">
                    <v-chip text="الإدارة الاستراتيجية" color="primary" size="small"/>
                    <v-chip text="تطوير الأعمال" color="primary" size="small"/>
                    <v-chip text="القيادة" color="primary" size="small"/>
                </div>
            </div>
            <!-- Socail Media  -->
             <div class="d-flex align-center justify-center ga-2 social-media-icons">
                <v-btn icon variant="text">
                    <v-icon icon="$Linkedin"/>
                </v-btn>
                <v-btn icon variant="text">
                    <v-icon>mdi-email-outline </v-icon>
                </v-btn>
                <v-btn icon variant="text">
                    <v-icon>mdi-phone</v-icon>
                </v-btn>

             </div>
        </div>
    </div>
</template>