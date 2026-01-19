// TVS Daily Checklist for Diesel Forklift Schema
export const FORKLIFT_CHECKLIST_SCHEMA = [
    {
        title: "Brake & Safety Systems",
        titleTm: "பிரேக் மற்றும் பாதுகாப்பு அமைப்புகள்",
        titleHi: "ब्रेक और सुरक्षा प्रणाली",
        items: [
            { id: "foot_brake", label: "Check Foot Brake Condition", labelTm: "கால் பிரேக் செயல்பாட்டை சரிபார்க்கவும்", labelHi: "फुट ब्रेक की स्थिति की जाँच करें" },
            { id: "hand_brake", label: "Check Hand Brake Condition", labelTm: "ஹேண்ட் பிரேக் செயல்பாட்டை சரிபார்க்கவும்", labelHi: "हैंड ब्रेक की स्थिति की जाँच करें" },
            { id: "emergency_switch", label: "Check Emergency Button/Switch - OFF switch working condition", labelTm: "எமர்ஜென்சி சுவிட்ச் செயல்பாட்டை சரிபார்க்கவும்", labelHi: "आपातकालीन स्विच की जाँच करें" },
            { id: "battery_cable", label: "Check Battery Cable, Sleeve & Terminal Lug Condition & Ensure Dust Free on Battery", labelTm: "பேட்டரி கேபிள், ஸ்லீவ் மற்றும் டெர்மினல் நிலை சரிபார்க்கவும்", labelHi: "बैटरी केबल और टर्मिनल स्थिति की जाँच करें" },
            { id: "seat_belt", label: "Check Seat Belt Condition", labelTm: "சீட் பெல்ட் நிலையை சரிபார்க்கவும்", labelHi: "सीट बेल्ट की स्थिति की जाँच करें" },
        ]
    },
    {
        title: "Fluids & Filters",
        titleTm: "திரவங்கள் மற்றும் வடிகட்டிகள்",
        titleHi: "तरल पदार्थ और फिल्टर",
        items: [
            { id: "fan_coolant", label: "Check Fan & Coolant Condition", labelTm: "FAN குளிர்பதன செயல்பாட்டை சரிபார்க்கவும்", labelHi: "पंखे और कूलेंट की स्थिति की जाँच करें" },
            { id: "mirror_accessibility", label: "Check the Mirror Accessibility - Automation & vibrator", labelTm: "கண்ணாடி அணுகலை சரிபார்க்கவும்", labelHi: "दर्पण पहुँच की जाँच करें" },
            { id: "hydraulic_oil", label: "Check the Hydraulic Oil, Engine Oil and Brake Oil Level", labelTm: "ஹைட்ராலிக் ஆயில், என்ஜின் ஆயில் மற்றும் பிரேக் ஆயில் நிலையை சரிபார்க்கவும்", labelHi: "हाइड्रोलिक, इंजन और ब्रेक ऑयल स्तर की जाँच करें" },
            { id: "radiator_water", label: "Check the Radiator Water Level (Coolant Oil)", labelTm: "ரேடியேட்டர் நீர் நிலையை சரிபார்க்கவும் (குளிர்பதன எண்ணெய்)", labelHi: "रेडिएटर जल स्तर की जाँच करें" },
            { id: "oil_leaks", label: "Check for Any Oil Leaks", labelTm: "ஆயில் கசிவு உள்ளதா என சரிபார்க்கவும்", labelHi: "किसी भी तेल रिसाव की जाँच करें" },
        ]
    },
    {
        title: "Keys & Sensors",
        titleTm: "சாவிகள் மற்றும் சென்சார்கள்",
        titleHi: "चाबियाँ और सेंसर",
        items: [
            { id: "key_availability", label: "Check Key Availability", labelTm: "சாவி கிடைக்குமா என சரிபார்க்கவும்", labelHi: "चाबी उपलब्धता की जाँच करें" },
            { id: "seat_sensor", label: "Check Seat & Seat Sensor Working Condition - SEAT வரி நிமிர் லி மா SEAT SENSOR செயல்பாடு சரிபார்க்கவும்", labelTm: "சீட் மற்றும் சீட் சென்சார் செயல்பாட்டை சரிபார்க்கவும்", labelHi: "सीट और सीट सेंसर की जाँच करें" },
            { id: "seat_belt_condition", label: "Check Seat Belt Condition", labelTm: "சீட் பெல்ட் நிலையை சரிபார்க்கவும்", labelHi: "सीट बेल्ट की स्थिति की जाँच करें" },
        ]
    },
    {
        title: "Lights & Horn",
        titleTm: "விளக்குகள் மற்றும் ஹார்ன்",
        titleHi: "लाइट्स और हॉर्न",
        items: [
            { id: "horn_reverse", label: "Check Horn and Reverse Horn - தொடக்க மற்றும் ரிவர்ஸ் ஹார்ன்", labelTm: "ஹார்ன் மற்றும் ரிவர்ஸ் ஹார்ன் சரிபார்க்கவும்", labelHi: "हॉर्न और रिवर्स हॉर्न की जाँच करें" },
            { id: "indicators_headlights", label: "Check Indicators and Head Lights are in Working Conditions", labelTm: "இண்டிகேட்டர்கள் மற்றும் ஹெட் லைட்கள் செயல்படுகிறதா சரிபார்க்கவும்", labelHi: "इंडिकेटर और हेडलाइट्स की जाँच करें" },
            { id: "warning_lamp", label: "Check Warning Lamp/Blinker", labelTm: "எச்சரிக்கை விளக்கு/ப்ளிங்கர் சரிபார்க்கவும்", labelHi: "चेतावनी लैंप / ब्लिंकर की जाँच करें" },
            { id: "earth_cable", label: "Check Earth Cable Whether Touch with Ground (For Non-Marking Tyre)", labelTm: "எர்த் கேபிள் நிலத்தை தொடுகிறதா சரிபார்க்கவும் (வெள்ளை டயர்)", labelHi: "अर्थ केबल की जाँच करें" },
        ]
    },
    {
        title: "Fork & Lock Systems",
        titleTm: "ஃபோர்க் மற்றும் பூட்டு அமைப்புகள்",
        titleHi: "फोर्क और लॉक सिस्टम",
        items: [
            { id: "fork_lock", label: "Check Fork & Fork Lock Condition - FORK LOCK செயல்பாடு சரிபார்க்கவும்", labelTm: "ஃபோர்க் மற்றும் ஃபோர்க் லாக் நிலையை சரிபார்க்கவும்", labelHi: "फोर्क और फोर्क लॉक की जाँच करें" },
            { id: "wheel_bolt", label: "Check Wheel Bolt Condition", labelTm: "வீல் போல்ட் நிலையை சரிபார்க்கவும்", labelHi: "व्हील बोल्ट की स्थिति की जाँच करें" },
            { id: "tyre_condition", label: "Check Tyre Condition - LMI கண்ட்ரோலர் சரிபார்க்கவும்", labelTm: "டயர் நிலையை சரிபார்க்கவும்", labelHi: "टायर की स्थिति की जाँच करें" },
        ]
    },
    {
        title: "Camera & Safety Equipment",
        titleTm: "கேமரா மற்றும் பாதுகாப்பு உபகரணங்கள்",
        titleHi: "कैमरा और सुरक्षा उपकरण",
        items: [
            { id: "spot_light", label: "Check SPOT Light Availability & Working Condition - ஸ்பாட் லைட் செயல்பாடு", labelTm: "ஸ்பாட் லைட் கிடைக்குமா மற்றும் செயல்படுகிறதா சரிபார்க்கவும்", labelHi: "स्पॉट लाइट की जाँच करें" },
            { id: "reverse_camera", label: "Check Reverse Camera Sensor", labelTm: "ரிவர்ஸ் கேமரா சென்சார் சரிபார்க்கவும்", labelHi: "रिवर्स कैमरा सेंसर की जाँच करें" },
            { id: "fire_extinguisher", label: "Check Fire Extinguisher Availability and Ensure Pressure Gauge Level in Green", labelTm: "தீ அணைப்பான் மற்றும் பிரஷர் கேஜ் அளவு பச்சை நிலையில் உள்ளதா சரிபார்க்கவும்", labelHi: "अग्निशामक यंत्र की जाँच करें" },
        ]
    }
];

// Equipment information for the forklift
export const FORKLIFT_INFO = {
    company: "TVS",
    equipmentType: "Diesel Forklift",
    shopCode: "C1Y",
    contractCode: "TV65C3"
};
