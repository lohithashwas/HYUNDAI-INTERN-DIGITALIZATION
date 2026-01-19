import React, { createContext, useState, useContext } from 'react';

// Translations for static UI elements
export const TRANSLATIONS = {
    en: {
        welcome: "Welcome",
        sattvaPortal: "Sattva Portal",
        forkliftPortal: "Forklift Portal",
        adminPortal: "Admin Portal",
        dailyChecklist: "Daily Checklist",
        operatorEntry: "Enter as Operator",
        adminLogin: "Admin Login",
        password: "Password",
        cancel: "Cancel",
        login: "Login",
        logout: "Logout",
        submitSuccess: "Checklist Submitted Successfully!",
        errorSubmit: "Error submitting: ",
        loading: "Loading...",
        actionRequired: "Action Required",
        completeChecklist: "Please complete today's checklist",
        allSet: "You're All Set!",
        submittedMsg: "Today's checklist has been submitted.",
        activity: "Activity",
        status: "Status",
        remarks: "Remarks",
        ok: "OK",
        notOk: "NOT OK",
        na: "N/A",
        signature: "Signature",
        submit: "SUBMIT CHECKLIST",
        submitting: "Submitting...",
        signatureReq: "Signature Required",
        signatureCap: "Signature Captured",
        recordAudio: "Record Audio",
        stopRecording: "Stop Recording",
        audioRecorded: "Audio Recorded",
        listening: "Listening...",
        speakToText: "Tap to Speak",
        generatedReport: "Daily Checklist Report",
        sattvaDesc: "Daily checklist entry for operators.",
        forkliftDesc: "Daily checklist for TVS Diesel Forklift.",
        adminDesc: "Report management and analytics.",
        adminAuth: "Admin Authentication",
        incorrectPwd: "Incorrect Password"
    },
    ta: {
        welcome: "நல்வரவு",
        sattvaPortal: "சத்வா போர்டல்",
        forkliftPortal: "ஃபோர்க்லிஃப்ட் போர்டல்",
        adminPortal: "நிர்வாக போர்டல்",
        dailyChecklist: "தினசரி சரிபார்ப்பு பட்டியல்",
        operatorEntry: "ஆபரேட்டராக டிக் செய்யவும்",
        adminLogin: "நிர்வாக உள்நுழைவு",
        password: "கடவுச்சொல்",
        cancel: "ரத்து செய்",
        login: "உள்நுழை",
        logout: "வெளியேறு",
        submitSuccess: "சரிபார்ப்பு பட்டியல் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!",
        errorSubmit: "சமர்ப்பிப்பதில் பிழை: ",
        loading: "ஏற்றுகிறது...",
        actionRequired: "நடவடிக்கை தேவை",
        completeChecklist: "இன்றைய சரிபார்ப்பு பட்டியலை முடிக்கவும்",
        allSet: "எல்லாம் தயார்!",
        submittedMsg: "இன்றைய சரிபார்ப்பு பட்டியல் சமர்ப்பிக்கப்பட்டது.",
        activity: "செயல்பாடு",
        status: "நிலை",
        remarks: "குறிப்புகள்",
        ok: "சரி",
        notOk: "சரியில்லை",
        na: "பொருந்தாது",
        signature: "கையெழுத்து",
        submit: "சமர்ப்பிக்கவும்",
        submitting: "சமர்ப்பிக்கிறது...",
        signatureReq: "கையெழுத்து தேவை",
        signatureCap: "கையெழுத்து பெறப்பட்டது",
        recordAudio: "ஆடியோ பதிவு சீய்யவும்",
        stopRecording: "பதிவை நிறுத்து",
        audioRecorded: "ஆடியோ பதிவு செய்யப்பட்டது",
        listening: "கேட்கிறது...",
        speakToText: "பேசவும்",
        generatedReport: "தினசரி அறிக்கை",
        sattvaDesc: "ஆபரேட்டர்களுக்கான தினசரி பட்டியல்.",
        forkliftDesc: "TVS டீசல் ஃபோர்க்லிஃப்ட் பட்டியல்.",
        adminDesc: "அறிக்கை மேலாண்மை.",
        adminAuth: "நிர்வாக அங்கீகாரம்",
        incorrectPwd: "தவறான கடவுச்சொல்"
    },
    hi: {
        welcome: "स्वागत है",
        sattvaPortal: "सत्व पोर्टल",
        forkliftPortal: "फोर्कलिफ्ट पोर्टल",
        adminPortal: "एडमिन पोर्टल",
        dailyChecklist: "दैनिक चेकलिस्ट",
        operatorEntry: "ऑपरेटर प्रवेश",
        adminLogin: "एडमिन लॉगिन",
        password: "पासवर्ड",
        cancel: "रद्द करें",
        login: "लॉगिन",
        logout: "लॉग आउट",
        submitSuccess: "चेकलिस्ट सफलतापूर्वक जमा हो गई!",
        errorSubmit: "जमा करने में त्रुटि: ",
        loading: "लोड हो रहा है...",
        actionRequired: "कार्रवाई आवश्यक",
        completeChecklist: "कृपया आज की चेकलिस्ट पूरी करें",
        allSet: "सब हो गया!",
        submittedMsg: "आज की चेकलिस्ट जमा कर दी गई है।",
        activity: "गतिविधि",
        status: "स्थिति",
        remarks: "टिप्पणियाँ",
        ok: "ठीक है",
        notOk: "ठीक नहीं",
        na: "लागू नहीं",
        signature: "हस्ताक्षर",
        submit: "चेकलिस्ट जमा करें",
        submitting: "जमा हो रहा है...",
        signatureReq: "हस्ताक्षर आवश्यक",
        signatureCap: "हस्ताक्षर ले लिया गया",
        recordAudio: "ऑडियो रिकॉर्ड करें",
        stopRecording: "रिकॉर्डिंग रोकें",
        audioRecorded: "ऑडियो रिकॉर्ड किया गया",
        listening: "सुन रहा हूँ...",
        speakToText: "बोलने के लिए टैप करें",
        generatedReport: "दैनिक रिपोर्ट",
        sattvaDesc: "ऑपरेटरों के लिए दैनिक चेकलिस्ट।",
        forkliftDesc: "TVS डीजल फोर्कलिफ्ट चेकलिस्ट।",
        adminDesc: "रिपोर्ट प्रबंधन और विश्लेषण।",
        adminAuth: "व्यवस्थापक प्रमाणीकरण",
        incorrectPwd: "गलत पासवर्ड"
    }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default English

    const t = (key) => {
        return TRANSLATIONS[language][key] || TRANSLATIONS['en'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
