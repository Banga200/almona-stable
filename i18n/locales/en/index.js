import sidebar from './sidebar.json';
import labels from "./label.json";
import button from "./button.json";
import paragraph from "./paragraph.json";
import heading from "./heading.json";
import enums from "./enums.json";

export default defineI18nLocale(async locale => {
    return {
         ...sidebar,
         ...labels,
         ...button,
         ...paragraph,
         ...heading,
         ...enums,
        
    }
})