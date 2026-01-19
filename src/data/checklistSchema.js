export const CHECKLIST_SCHEMA = [
    {
        title: "General & Safety",
        titleTm: "பொது மற்றும் பாதுகாப்பு",
        titleHi: "सामान्य और सुरक्षा",
        items: [
            { id: "cleanliness", label: "General Machine Cleanliness", labelTm: "இயந்திரம் தூய்மை", labelHi: "सामान्य मशीन सफाई" },
            { id: "battery", label: "Battery Terminals Status", labelTm: "பேட்டரி டெர்மினல் நிலை", labelHi: "बैटरी टर्मिनल स्थिति" },
            { id: "air_filter", label: "Clean Air Filter (Compressed Air)", labelTm: "காற்று வடிகட்டியை சுத்தம் செய்தல்", labelHi: "एयर फिल्टर साफ करें (कम्प्रेस्ड एयर)" },
            { id: "reverse_camera", label: "Reverse Camera Condition", labelTm: "ரிவர்ஸ் கேமரா நிலை", labelHi: "रिवर्स कैमरा की स्थिति" },
            { id: "collision_sensor", label: "Anti-Collision Sensor", labelTm: "மோதல் தடுப்பு சென்சார்", labelHi: "टक्कर रोधी सेंसर" },
            { id: "reverse_horn", label: "Reverse Horn Sound", labelTm: "ரிவர்ஸ் ஹார்ன் ஒலி", labelHi: "रिवर्स हॉर्न की आवाज" },
            { id: "brakes", label: "Brake Condition (All)", labelTm: "அனைத்து பிரேக் நிலை", labelHi: "ब्रेक की स्थिति (सभी)" },
            { id: "glass_mirror", label: "Cabin Glass & Rear View Mirror", labelTm: "கேபின் கிளாஸ் & ரியர் வியூ மிரர்", labelHi: "केबिन ग्लास और रियर व्यू मिरर" },
        ]
    },
    {
        title: "Fluids & Levels",
        titleTm: "திரவங்கள் & நிலைகள்",
        titleHi: "तरल पदार्थ और स्तर",
        items: [
            { id: "engine_oil", label: "Engine Oil Level (Max 40 L)", labelTm: "எஞ்சின் ஆயில் நிலை (அதிகபட்சம் 40 லிட்டர்)", labelHi: "इंजन ऑयल स्तर (अधिकतम 40 ली)" },
            { id: "coolant", label: "Coolant Level", labelTm: "குளிரூட்டி நிலை", labelHi: "कूलेंट का स्तर" },
            { id: "hydraulic_oil", label: "Hydraulic Oil Level", labelTm: "ஹைட்ராலிக் ஆயில் நிலை", labelHi: "हाइड्रोलिक ऑयल स्तर" },
            { id: "transmission_oil", label: "Transmission Oil Level (Max 75 L)", labelTm: "டிரான்ஸ்மிஷன் ஆயில் நிலை (அதிகபட்சம் 75 லிட்டர்)", labelHi: "ट्रांसमिशन ऑयल स्तर (अधिकतम 75 ली)" },
            { id: "brake_oil", label: "Brake Oil Level", labelTm: "பிரேக் ஆயில் நிலை", labelHi: "ब्रेक ऑयल स्तर" },
            { id: "fuel_level", label: "Fuel Level", labelTm: "எரிபொருள் அளவு", labelHi: "ईंधन स्तर" },
            { id: "hydraulic_leakage", label: "Hydraulic Hoses Leakages", labelTm: "ஹைட்ராலிக் குழாய் கசிவுகள்", labelHi: "हाइड्रोलिक होज़ लीकेज" },
        ]
    },
    {
        title: "Operation & Systems",
        titleTm: "இயக்கம் & அமைப்புகள்",
        titleHi: "संचालन और तंत्र",
        items: [
            { id: "air_indicator", label: "Air Filter Indicator", labelTm: "காற்று வடிகட்டி காட்டி", labelHi: "एयर फिल्टर इंडिकेटर" },
            { id: "fan_belt", label: "Fan / Alternator Belt", labelTm: "மின் விசிறி / மின்னாக்கி பெல்ட்", labelHi: "फैन / अल्टरनेटर बेल्ट" },
            { id: "twistlock_camera", label: "Twistlock Camera Working Condition", labelTm: "ட்விஸ்ட்லாக் கேமரா நிலை", labelHi: "ट्विस्ट-लॉक कैमरा स्थिति" },
            { id: "cabin_camera", label: "Cabin Camera Working Condition", labelTm: "கேபின் கேமரா நிலை", labelHi: "केबिन कैमरा स्थिति" },
            { id: "error_codes", label: "Any Error Codes?", labelTm: "ஏதேனும் பிழை குறியீடுகள்?", labelHi: "कोई त्रुटि कोड?" },
            { id: "cabin_lock", label: "Operator Cabin Lock Condition", labelTm: "ஆபரேட்டர் கேபின் பூட்டு நிலை", labelHi: "ऑपरेटर केबिन लॉक स्थिति" },
            { id: "container_lock", label: "Container Lock Signal", labelTm: "கண்டெய்னர் பூட்டு சிக்னல்", labelHi: "कंटेनर लॉक सिग्नल" },
            { id: "biometric", label: "Biometric Working Condition", labelTm: "பயோமெட்ரிக் நிலை", labelHi: "बायोमेट्रिक की स्थिति" },
            { id: "tyres", label: "Tyre Condition", labelTm: "டயர் நிலை", labelHi: "टायर की स्थिति" },
            { id: "lights", label: "All Lights Condition", labelTm: "அனைத்து விளக்குகள் நிலை", labelHi: "सभी लाइटों की स्थिति" },
            { id: "ppe", label: "Wear All PPE during Operation", labelTm: "பாதுகாப்பு கவசங்களை அணியவும்", labelHi: "संचालन के दौरान सभी PPE पहनें" },
            { id: "noise", label: "Abnormal Noise (Engine/Trans/Axle/Hydraulic)", labelTm: "அசாதாரண சத்தம் (என்ஜின்/டிரான்ஸ்/ஆக்சில்)", labelHi: "असामान्य शोर (इंजन / ट्रांस)" }
        ]
    }
];
