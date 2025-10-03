<script setup>
const applicationStore = useApplicationStore()
const {t} = useI18n()
const contactDetails = [
    {
        title: t("sections.contact_us.contact_info.address"),
        icon: "$MapMarker",
        content: "اليمن، حضرموت، المكلا، شارع الجسر الصيني، عمارة بن هلابي2، الدور الثالث، شقة رقم 2",
    },
    {
        title: t("sections.contact_us.contact_info.email"),
        icon: "mdi-email-outline",
        content: "info@almonaa.com",    
    },
    {
        title: t("sections.contact_us.contact_info.phone"),
        icon: "mdi-phone",
        content: "+967 783263332",
    },
    {
        title: t("sections.contact_us.contact_info.work_hours"),
        icon: "mdi-clock-outline",
        content: "الأحد - الخميس: 8:00 ص - 3:00 م الجمعة،السبت: مغلق"
    }
]
const subjects = [
    { id: 1, title: t('enums.exhibition_organization') },
    { id: 2, title: t('enums.marketing') },
    { id: 3, title: t('enums.project_management') },
    { id: 4, title: t('enums.business_execution') },
    { id: 5, title: t('enums.shoghlni_service') },
    { id: 0, title: t('enums.other') },
]
const form = ref(null)
const formData = ref({
    fullName: '',
    phone: '',
    email: '',
    serviceType: null,
    file: null,
    content: ''
})
const saveForm = async () => {
    const {valid} = await form.value.validate()
    console.log(valid)
    if (valid) {
        await applicationStore.AddNewApplication(formData.value)
    }
    // Logic to save form data
}
</script>
<template>
   <section id="contact-us" class="bg-gray-50">
     <v-container>
        <div class="text-center mb-16">
            <h1 class="title text-gradient">{{ $t("sections.contact_us.title") }}</h1>
            <p class="text-xl text-center mb-8">{{ $t("sections.contact_us.description") }}</p>
            <div class="line-gradient"></div>
        </div>
        <v-row>
            <!-- معلومات التواصل  -->
            <v-col class="d-flex flex-column ga-8" cols="12" md="6">
                <v-card>
                    <div class="d-flex flex-column ga-4">
                        <h1 class="text-2xl font-bold">{{ $t('contact_info') }}</h1>
                        <div class="d-flex flex-column ga-4">
                            <div class="d-flex ga-4" v-for="(detail, index) in contactDetails" :key="index">
                                <v-avatar size="48" color="avatar">
                                    <v-icon :icon="detail.icon" size="24" color="secondary"></v-icon>
                                </v-avatar>
                                <div>
                                    <h4 class="mb-2">{{ detail.title }}</h4>
                                    <p dir="ltr">{{ detail.content }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-card>
                <v-card>
                    <h2 class="text-2xl font-bold mb-6 ">{{ $t("sections.contact_us.follow_us") }}</h2>
                    <div class="d-flex ga-4 align-center follow-us">
                        <a href="https://www.facebook.com/share/1CWQNX7fvm/" target="_blank">
                            <v-avatar class="facebook" size="56">
                                    <v-icon size="24" color="primary" icon="$FacebookOutline"></v-icon>
                            </v-avatar>
                        </a>
                        <a href="https://www.instagram.com/almonaa.co?igsh=MXdvOHR2aWdwNHpocA==" target="_blank">

                            <v-avatar class="instagram" size="56">
                                    <v-icon size="24" color="primary">mdi-instagram</v-icon>
                            </v-avatar>
                        </a>
                        <a 
                        href="https://www.tiktok.com/@almonaa.co1?_t=ZS-8zDrVNIRqZV&_r=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            <v-avatar class="tiktok" size="56">
                                <v-icon size="24" color="primary" icon="$Tiktok"></v-icon>
                            </v-avatar>
                        </a>
                        <a 
                        href="https://wa.me/783273332"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            <v-avatar class="message" size="56">
                                <v-icon size="24" color="primary" icon="$MessageCircle"></v-icon>
                            </v-avatar>
                        </a>
                        
                    </div>
                </v-card>
                <div class="card-gradient">
                    <h2 class="text-2xl font-bold">{{ $t("sections.contact_us.special_services") }}</h2>
                    <div>
                        <h4 class=mb-2>{{ $t("sections.contact_us.participant_control_panel") }}</h4>
                        <v-btn :text="$t('button.participant_enter')" variant="tonal" class="white"/>
                    </div>
                    <div>
                        <h4 class=mb-2>{{ $t("sections.contact_us.participant_control_panel") }}</h4>
                        <div class="d-flex flex-column ga-2">
                            <v-btn :text="$t('button.register_as_trainee')" variant="tonal" class="white" block/>
                            <v-btn :text="$t('button.register_as_training_institution')" variant="tonal" class="white" block/>
                        </div>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="6">
               <v-card class="h-100">
                <h2 class="text-2xl font-bold mb-6 ">{{ $t("sections.contact_us.send_us_message.title") }}</h2>
                <v-form @submit.prevent="saveForm" ref="form">
                <div class="d-flex flex-column ga-1">
                    <div>
                        <label class="mb-2 d-block text-sm">{{ $t("sections.contact_us.send_us_message.form.full_name") }} *</label>
                        <v-text-field :placeholder="$t('sections.contact_us.send_us_message.form.full_name_placeholder')" v-model="formData.fullName" :rules="requiredField"/>
                    </div>
                    <div>
                        <label class="mb-2 d-block text-sm">{{ $t("sections.contact_us.send_us_message.form.phone") }} *</label>
                        <v-text-field :placeholder="$t('sections.contact_us.send_us_message.form.phone_placeholder')" v-model="formData.phone" :rules="requiredField"/>
                    </div>
                    <div>
                        <label class="mb-2 d-block text-sm">{{ $t("sections.contact_us.send_us_message.form.email") }} *</label>
                        <v-text-field :placeholder="$t('sections.contact_us.send_us_message.form.email_placeholder')" v-model="formData.email" :rules="requiredField"/>
                    </div>
                    <div>
                        <label class="mb-2 d-block text-sm">{{ $t("sections.contact_us.send_us_message.form.subject") }} *</label>
                        <v-select :placeholder="$t('sections.contact_us.send_us_message.form.subject_placeholder')" :items="subjects" item-title="title" item-value="id" v-model="formData.serviceType" :rules="requiredField"/>
                    </div>
                    <div>
                        <label class="mb-2 d-block text-sm">{{ $t("sections.contact_us.send_us_message.form.file") }} *</label>
                        <v-file-input :label="$t('sections.contact_us.send_us_message.form.file_placeholder')" v-model="formData.file" :rules="requiredField" prepend-icon="" append-inner-icon="mdi-paperclip" show-size  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
                    </div>
                    <div>
                        <label class="mb-2 d-block text-sm">{{ $t("sections.contact_us.send_us_message.form.message") }} *</label>
                        <v-textarea :placeholder="$t('sections.contact_us.send_us_message.form.message_placeholder')" v-model="formData.content" :rules="requiredField"/>
                    </div>
                    <v-btn class="glowing-gradient-button" :text="$t('button.send_message')" size="large" append-icon="$Send" rounded="lg" type="submit"/>
                </div>
                
               </v-form>
               </v-card>
            </v-col>
        </v-row>
    </v-container>
   </section>
</template>