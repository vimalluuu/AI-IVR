import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'gu' | 'kn' | 'ml' | 'pa';

interface Translations {
  notice: string;
  noticeText: string;
  subtitle: string;
  description: string;
  watchDemo: string;
  github: string;
  contact: string;
  howToUse: string;
  howToUseDesc: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  applyForSchemes: string;
  openInNewTab: string;
  footer: string;
  readyForCall: string;
  ringing: string;
  connected: string;
  listening: string;
  thinking: string;
  speaking: string;
  callEnded: string;
  assistantName: string;
}

const translations: Record<Language, Translations> = {
  en: {
    notice: 'Notice:',
    noticeText: 'Due to temporary Amazon Connect availability issues and Exotel trial call limitations during development, this prototype simulates the phone call interface directly in the website. The backend AI conversation pipeline remains the same and is powered by AWS, Bhashini, and Bedrock.',
    subtitle: 'Government Scheme Voice Assistant',
    description: 'AI-powered voice assistant helping rural citizens discover government schemes.',
    watchDemo: 'YouTube',
    github: 'GitHub',
    contact: 'Contact',
    howToUse: 'How to Use Trust Leaf Assistant',
    howToUseDesc: 'Follow these simple steps to interact with our AI-powered voice assistant.',
    step1Title: '1. Start the Call',
    step1Desc: 'Click the Call Button on the phone interface. The system will begin ringing to connect you to the agent.',
    step2Title: '2. Speak to Mic',
    step2Desc: 'Once connected, press the Microphone Button and ask your question about any government scheme within 3 seconds.',
    step3Title: '3. Get AI Response',
    step3Desc: 'The AI will process your request and respond with voice and text. Whenever you have more questions, simply click the mic button again!',
    applyForSchemes: 'Apply for Schemes',
    openInNewTab: 'Open in new tab',
    footer: '© 2024 Trust Leaf. Built for AI for Bharat.',
    readyForCall: 'Ready for a call',
    ringing: 'Ringing...',
    connected: 'Connected',
    listening: 'Listening...',
    thinking: 'Thinking...',
    speaking: 'Assistant speaking...',
    callEnded: 'Call Ended',
    assistantName: 'Trust Leaf Assistant',
  },
  hi: {
    notice: 'सूचना:',
    noticeText: 'विकास के दौरान अमेज़न कनेक्ट की अस्थायी उपलब्धता की समस्याओं और एक्सोटेल ट्रायल कॉल सीमाओं के कारण, यह प्रोटोटाइप फोन कॉल इंटरफ़ेस को सीधे वेबसाइट पर सिमुलेट करता है। बैकएंड AI conversation pipeline वही है और AWS, Bhashini और Bedrock द्वारा संचालित है।',
    subtitle: 'सरकारी योजना वॉइस असिस्टेंट',
    description: 'ग्रामीण नागरिकों को सरकारी योजनाओं की खोज में मदद करने वाला AI-संचालित वॉइस असिस्टेंट।',
    watchDemo: 'YouTube',
    github: 'GitHub',
    contact: 'संपर्क',
    howToUse: 'ट्रस्ट लीफ असिस्टेंट का उपयोग कैसे करें',
    howToUseDesc: 'हमारे AI-संचालित वॉइस असिस्टेंट से बातचीत करने के लिए इन सरल चरणों का पालन करें।',
    step1Title: '1. कॉल शुरू करें',
    step1Desc: 'फोन इंटरफ़ेस पर कॉल बटन दबाएं। सिस्टम एजेंट से कनेक्ट करने के लिए रिंग करना शुरू कर देगा।',
    step2Title: '2. माइक में बोलें',
    step2Desc: 'कनेक्ट होने के बाद, माइक्रोफ़ोन बटन दबाएं और 3 सेकंड के भीतर किसी भी सरकारी योजना के बारे में अपना प्रश्न पूछें।',
    step3Title: '3. AI प्रतिक्रिया प्राप्त करें',
    step3Desc: 'AI आपके अनुरोध को संसाधित करेगा और वॉइस और टेक्स्ट में जवाब देगा। जब भी आपके और प्रश्न हों, बस माइक बटन फिर से दबाएं!',
    applyForSchemes: 'योजनाओं के लिए आवेदन करें',
    openInNewTab: 'नए टैब में खोलें',
    footer: '© 2024 ट्रस्ट लीफ। AI for Bharat के लिए बनाया गया।',
    readyForCall: 'कॉल के लिए तैयार',
    ringing: 'रिंग हो रही है...',
    connected: 'कनेक्टेड',
    listening: 'सुन रहे हैं...',
    thinking: 'सोच रहे हैं...',
    speaking: 'असिस्टेंट बोल रहा है...',
    callEnded: 'कॉल समाप्त',
    assistantName: 'ट्रस्ट लीफ असिस्टेंट',
  },
  ta: {
    notice: 'அறிவிப்பு:',
    noticeText: 'வளர்ச்சி போது Amazon Connect இடைக்கால இடுக்குகள் மற்றும் Exotel trial call limits காரணமாக, இந்த prototype phone call interface ஐ வலைதளத்தில் நேரடியாக simulate செய்கிறது. Backend AI conversation pipeline அதேதான் மற்றும் AWS, Bhashini மற்றும் Bedrock மூலம் இயக்கப்படுகிறது.',
    subtitle: 'அரசு திட்ட வoice உதவியாளர்',
    description: 'அரசு திட்டங்களைக் கண்டுபிடிக்க உதவும் AI-இயக்கும் voice உதவியாளர்.',
    watchDemo: 'YouTube',
    github: 'GitHub',
    contact: 'தொடர்பு',
    howToUse: 'Trust Leaf Assistant ஐ எவ்வாறு பயன்படுத்துவது',
    howToUseDesc: 'எங்கள் AI-இயக்கும் voice உதவியாளரிடம் பேச இந்த எளிய வழிமுறைகளைப் பின்பற்றவும்.',
    step1Title: '1. அழைப்பைத் தொடங்கவும்',
    step1Desc: 'Phone interfaceஇல் Call Buttonஐ அழுத்தவும். Agentஉடன் இணைக்க Sistem ring ஆகத் தொடங்கும்.',
    step2Title: '2. Micஇல் பேசவும்',
    step2Desc: 'இணைந்ததும், Microphone Buttonஐ அழுத்தி 3 வினாடிகளுக்குள் உங்கள் கேள்வியைக் கேளுங்கள்.',
    step3Title: '3. AI பதிலைப் பெறுங்கள்',
    step3Desc: 'AI உங்கள் கோரிக்கையை செயலாக்கி voice மற்றும் textஇல் பதில் அளிக்கும். மேலும் கேள்விகள் இருந்தால், mic buttonஐ மீண்டும் அழுத்தவும்!',
    applyForSchemes: 'திட்டங்களுக்கு விண்ணப்பிக்க',
    openInNewTab: 'புதிய திரையில் திற',
    footer: '© 2024 Trust Leaf. AI for Bharatக்காக உருவாக்கப்பட்டது.',
    readyForCall: 'Callக்கு தயார்',
    ringing: 'Ringing...',
    connected: 'Connected',
    listening: 'கேட்கிறது...',
    thinking: 'நினைக்கிறது...',
    speaking: 'Assistant பேசுகிறது...',
    callEnded: 'Call முடிந்தது',
    assistantName: 'Trust Leaf Assistant',
  },
  te: {
    notice: 'నోటీస్:',
    noticeText: 'అభివృద్ధి చేస్తున్నప్పుడు Amazon Connect యొక్క తాత్కాలిక లభ్యత సమస్యలు మరియు Exotel ట్రయల్ కాల్limits కారణంగా, ఈ prototype phone call interface ను వెబ్‌సైట్‌లో నేరుగా simulate చేస్తుంది. Backend AI conversation pipeline అదే AWS, Bhashini మరియు Bedrock ద్వారా శక్తివహిస్తుంది.',
    subtitle: 'government scheme voice assistant',
    description: 'rural citizensకు government schemesను కనుగొనుటకు AI-ఆధారిత voice assistant.',
    watchDemo: 'YouTube',
    github: 'GitHub',
    contact: 'contact',
    howToUse: 'Trust Leaf Assistantను ఎలా ఉపయోగించాలి',
    howToUseDesc: 'Our AI-ఆధారిత voice assistantతో మాటాడటానికి ఈ easy stepsను అనుసరించండి.',
    step1Title: '1. Callను ప్రారంభించండి',
    step1Desc: 'Phone interfaceలో Call Buttonను నొక్కండి. System agentకు connected కావడానిక ringing ప్రారంభిస్తుంది.',
    step2Title: '2. Micలో поговоріть',
    step2Desc: 'Connectedైతే, Microphone Buttonను నొక్కి 3 secondsలో�ా మీ प्रश्न ask करें.',
    step3Title: '3. AI Response పొందండि',
    step3Desc: 'AI आपके request process करेगा और voice/text में response देगा. More questions खाने mic button फिर से नोकड़ें!',
    applyForSchemes: 'Schemesकों apply करें',
    openInNewTab: 'New tab में open करें',
    footer: '© 2024 Trust Leaf. AI for Bharatके लिए बनाया गया।',
    readyForCall: 'Callके लिए तैयार',
    ringing: 'Ringing...',
    connected: 'Connected',
    listening: 'सुन रहे हैं...',
    thinking: 'सोच रहे हैं...',
    speaking: 'Assistant बोल रहा है...',
    callEnded: 'Call खत्म',
    assistantName: 'Trust Leaf Assistant',
  },
  bn: {
    notice: 'নোটিশ:',
    noticeText: 'উন্নয়নের সময় Amazon Connect এর অস্থায়ী প্রাপ্যতার সমস্যা এবং Exotel ট্রায়াল কল সীমাবদ্ধতার কারণে, এই প্রোটোটাইপ ফোন কল ইন্টারফেসটি সরাসরি ওয়েবসাইটে সিমুলেট করে। ব্যাকএন্ড AI কথোপকথন পাইপলাইন একই এবং AWS, Bhashini এবং Bedrock দ্বারা চালিত।',
    subtitle: 'সরকারি প্রকল্প ভয়েস সহায়ক',
    description: 'গ্রামীণ নাগরিকদের সরকারি প্রকল্পগুলি আবিষ্কার করতে সাহায্য করার জন্য AI-চালিত ভয়েস সহায়ক।',
    watchDemo: 'YouTube',
    github: 'GitHub',
    contact: 'যোগাযোগ',
    howToUse: 'কীভাবে Trust Leaf Assistant ব্যবহার করবেন',
    howToUseDesc: 'আমাদের AI-চালিত ভয়েস সহায়কের সাথে কথা বলতে এই সহজ পদক্ষেপগুলি অনুসরণ করুন।',
    step1Title: '1. কল শুরু করুন',
    step1Desc: 'ফোন ইন্টারফেসে কল বাটনে ক্লিক করুন। সিস্টেম এজেন্টের সাথে সংযোগ করতে রিং করা শুরু করবে।',
    step2Title: '2. মাইকে কথা বলুন',
    step2Desc: 'সংযুক্ত হওয়ার পরে, মাইক্রোফোন বাটন টিপুন এবং 3 সেকেন্ডের মধ্যে আপনার প্রশ্ন জিজ্ঞাসা করুন।',
    step3Title: '3. AI প্রতিক্রিয়া পান',
    step3Desc: 'AI আপনার অনুরোধ প্রক্রিয়া করবে এবং ভয়েস এবং টেক্সটে উত্তর দেবে। আরও প্রশ্ন থাকলে, মাইক বাটন আবার টিপুন!',
    applyForSchemes: 'প্রকল্পের জন্য আবেদন করুন',
    openInNewTab: 'নতুন ট্যাবে খুলুন',
    footer: '© 2024 Trust Leaf. AI for Bharat এর জন্য তৈরি।',
    readyForCall: 'কলের জন্য প্রস্তুত',
    ringing: 'রিং হচ্ছে...',
    connected: 'সংযুক্ত',
    listening: 'শুনছি...',
    thinking: 'ভাবছি...',
    speaking: 'সহায়ক বলছে...',
    callEnded: 'কল শেষ',
    assistantName: 'Trust Leaf Assistant',
  },
  mr: {
    notice: 'सूचना:',
    noticeText: 'विकासादरम्यान Amazon Connect च्या तात्पुरत्या उपलब्धतेच्या समस्या आणि Exotel ट्रायल कॉल मर्यादांमुळे, हा प्रोटोटाइप फोन कॉल इंटरफेस थेट वेबसाइटवर सिम्युलेट करतो. बॅकएंड AI conversation pipeline हीच AWS, Bhashini आणि Bedrock द्वारे चालविली जाते.',
    subtitle: 'सरकारी योजना व्हॉइस असिस्टंट',
    description: 'ग्रामीण नागरिकांना सरकारी योजना शोधण्यात मदत करणारा AI-चालित व्हॉइस असिस्टंट.',
    watchDemo: 'YouTube',
    github: 'GitHub',
    contact: 'संपर्क',
    howToUse: 'Trust Leaf Assistant कसा वापरावा',
    howToUseDesc: 'आमच्या AI-चालित व्हॉइस असिस्टंटशी बोलण्यासाठी या सोप्या पायऱ्या पाळा.',
    step1Title: '1. कॉल सुरू करा',
    step1Desc: 'फोन इंटरफेसवर कॉल बटणावर क्लिक करा. सिस्टम एजेंटशी कनेक्ट होण्यासाठी रिंग करेल.',
    step2Title: '2. मायकमध्ये बोला',
    step2Desc: 'कनेक्ट झाल्यावर, मायक्रोफोन बटण दाबा आणि 3 सेकंदात आपला प्रश्न विचारा.',
    step3Title: '3. AI प्रतिक्रिया मिळवा',
    step3Desc: 'AI तुमची विनंती प्रक्रिया करेल आणि व्हॉइस आणि मजकूरात उत्तर देईल. जर अधिक प्रश्न असतील, तर पुन्हा मायक बटण दाबा!',
    applyForSchemes: 'योजनांसाठी अर्ज करा',
    openInNewTab: 'नवीन टॅबमध्ये उघडा',
    footer: '© 2024 Trust Leaf. AI for Bharat साठी बनवले.',
    readyForCall: 'कॉलसाठी तयार',
    ringing: 'रिंग होत आहे...',
    connected: 'कनेक्टेड',
    listening: 'ऐकत आहे...',
    thinking: 'विचार करत आहे...',
    speaking: 'असिस्टंट बोलत आहे...',
    callEnded: 'कॉल संपला',
    assistantName: 'Trust Leaf Assistant',
  },
  gu: {
    notice: 'નોટિસ:',
    noticeText: 'વિકાસ દરમિયાન Amazon Connect ની અસ્થાયી ઉપલબ્ધતાની સમસ્યાઓ અને Exotel ટ્રાયલ કોલ મર્યાદાઓને કારણે, આ prototype phone call interface ને વેબસાઈટ પર સીધું simulate કરે છે. Backend AI conversation pipeline એ જ છે અને AWS, Bhashini અને Bedrock દ્વારા સંચાલિત છે.',
    subtitle: 'સરકારી યોજના વૉઇસ સહાયક',
    description: 'ગ્રામીણ નાગરિકોને સરકારી યોજનાઓ શોધવામાં મદદ કરતું AI-સંચાલિત વૉઇસ સહાયક.',
    watchDemo: 'YouTube',
    github: 'GitHub',
    contact: 'સંપર્ક',
    howToUse: 'Trust Leaf Assistant નો ઉપયોગ કેવી રીતે કરવો',
    howToUseDesc: 'અમારા AI-સંચાલિત વૉઇસ સહાયક સાથે વાત કરવા માટે આ સરળ પગલાં અનુસરો.',
    step1Title: '1. કોલ શરૂ કરો',
    step1Desc: 'Phone interface પર Call Button પર ક્લિક કરો. System agent સાથે જોડાવા માટે ring થવા લાગશે.',
    step2Title: '2. Mic માં બોલો',
    step2Desc: 'જ્યારે જોડાય, Microphone Button દબાવો અને 3 સેકન્ડમાં તમારો પ્રશ્ન પૂછો.',
    step3Title: '3. AI પ્રતિભાવ મેળવો',
    step3Desc: 'AI તમારી વિનંતીની પ્રક્રિયા કરશે અને voice અને textમાં જવાબ આપશે. વધુ પ્રશ્નો હોય તો, mic button ફરીથી દબાવો!',
    applyForSchemes: 'યોજનાઓ માટે અરજ કરો',
    openInNewTab: 'નવી ટૅબમાં ખોલો',
    footer: '© 2024 Trust Leaf. AI for Bharat માટે બનાવ્યું.',
    readyForCall: 'કોલ માટે તૈયાર',
    ringing: 'Ringing...',
    connected: 'Connected',
    listening: 'સંભળાય છે...',
    thinking: 'વિચારી રહ્યા છીએ...',
    speaking: 'Assistant બોલી રહ્યો છે...',
    callEnded: 'Call સમાપ્ત',
    assistantName: 'Trust Leaf Assistant',
  },
  kn: {
    notice: 'ನೋಟಿಸ್:',
    noticeText: 'ಅಭಿವೃದ್ಧಿಯ ಸಮಯದಲ್ಲಿ Amazon Connect ನ ತಾತ್ಕಾಲಿಕ ಲಭ್ಯತೆ ಸಮಸ್ಯೆಗಳು ಮತ್ತು Exotel ಟ್ರೈಯಲ್ ಕಾಲ್ ಮಿತಿಗಳಿಂದಾಗಿ, ಈ prototype phone call interface ಅನ್ನು ನೇರವಾಗಿ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ simulate ಮಾಡುತ್ತದೆ. ಬ್ಯಾಕೆಂಡ್ AI conversation pipeline ಅದೇ ಆಗಿದೆ ಮತ್ತು AWS, Bhashini ಮತ್ತು Bedrock ಮೂಲಕ ಚಾಲಿತವಾಗಿದೆ.',
    subtitle: 'ಸರ್ಕಾರಿ ಯೋಜನಾ ವಾಯ್ಸ್ ಸಹಾಯಕ',
    description: 'ಗ್ರಾಮೀಣ ನಾಗರಿಕರಿಗೆ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಕಂಡುಹಿಡಿಯಲು ಸಹಾಯ ಮಾಡುವ AI-ಚಾಲಿತ ವಾಯ್ಸ್ ಸಹಾಯಕ.',
    watchDemo: 'YouTube',
    github: 'GitHub',
    contact: 'ಸಂಪರ್ಕ',
    howToUse: 'Trust Leaf Assistant ಅನ್ನು ಹೇಗೆ ಬಳಸುವುದು',
    howToUseDesc: 'ನಮ್ಮ AI-ಚಾಲಿತ ವಾಯ್ಸ್ ಸಹಾಯಕದೊಂದಿಗೆ ಮಾತನಾಡಲು ಈ ಸರಳ ಹಂತಗಳನ್ನು ಅನುಸರಿಸಿ.',
    step1Title: '1. ಕಾಲ್ ಪ್ರಾರಂಭಿಸಿ',
    step1Desc: 'Phone interface ನಲ್ಲಿ Call Button ಕ್ಲಿಕ್ ಮಾಡಿ. System agentಗೆ ಸಂಪರ್ಕಿಸಲು ರಿಂಗ್ ಆರಂಭವಾಗುತ್ತದೆ.',
    step2Title: '2. Mic ನಲ್ಲಿ ಮಾತನಾಡಿ',
    step2Desc: 'ಸಂಪರ್ಕಗೊಂಡ ನಂತರ, Microphone Button ಒತ್ತಿ 3 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ.',
    step3Title: '3. AI ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪಡೆಯಿರಿ',
    step3Desc: 'AI ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತದೆ ಮತ್ತು voice ಮತ್ತು textನಲ್ಲಿ ಉತ್ತರ ನೀಡುತ್ತದೆ. ಇನ್ನೂ ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ, mic button ಮತ್ತೆ ಒತ್ತಿ!',
    applyForSchemes: 'ಯೋಜನೆಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    openInNewTab: 'ಹೊಸ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ',
    footer: '© 2024 Trust Leaf. AI for Bharat ಗಾಗಿ ಮಾಡಲ್ಪಟ್ಟಿದೆ.',
    readyForCall: 'ಕಾಲಿಗೆ ತಯಾರ್',
    ringing: 'ರಿಂಗ್ ಆಗುತ್ತಿದೆ...',
    connected: 'ಸಂಪರ್ಕಗೊಂಡಿದೆ',
    listening: 'ಕೇಳುತ್ತಿದೆ...',
    thinking: 'ಯೋಚಿಸುತ್ತಿದೆ...',
    speaking: 'Assistant ಮಾತನಾಡುತ್ತಿದೆ...',
    callEnded: 'ಕಾಲ್ ಕೊನೆಗೊಂಡಿತು',
    assistantName: 'Trust Leaf Assistant',
  },
  ml: {
    notice: 'അറിയിപ്പ്:',
    noticeText: 'വികസനത്തിനിടയിലെ Amazon Connect ലഭ്യതയുടെ താത്കാലിക പ്രശ്നങ്ങളും Exotel ട്രയൽ കോൾ പരിധികളും കാരണം, ഈ prototype phone call interface വെബ്‌സൈറ്റിൽ നേരിട്ട് simulate ചെയ്യുന്നു. Backend AI conversation pipeline അതേയാണ്, AWS, Bhashini, Bedrock എന്നിവയാൽ പ്രവർത്തിക്കുന്നു.',
    subtitle: 'സർക്കാർ പദ്ധതി വോയ്‌സ് അസിസ്റ്റന്റ്',
    description: 'ഗ്രാമീണ പൗരന്മാരെ സർക്കാർ പദ്ധതികൾ കണ്ടെത്താനുള്ള AI-പ്രവർത്തിക്കുന്ന വോയ്‌സ് അസിസ്റ്റന്റ്.',
    watchDemo: 'YouTube',
    github: 'GitHub',
    contact: 'ബന്ധപ്പെടുക',
    howToUse: 'Trust Leaf Assistant എങ്ങനെ ഉപയോഗിക്കാം',
    howToUseDesc: 'ഞങ്ങളുടെ AI-പ്രവർത്തിക്കുന്ന വോയ്‌സ് അസിസ്റ്റന്റിനോട് സംസാരിക്കാനുള്ള ലളിതമായ ഘട്ടങ്ങൾ പിന്തുടരുക.',
    step1Title: '1. കോൾ ആരംഭിക്കുക',
    step1Desc: 'Phone interface-ലെ Call Button ക്ലിക്ക് ചെയ്യുക. സിസ്റ്റം ഏജന്റുമായി ബന്ധിപ്പിക്കാൻ റിംഗ് ചെയ്യാനാരംഭിക്കും.',
    step2Title: '2. മിക്കിൽ സംസാരിക്കുക',
    step2Desc: 'ബന്ധിപ്പിച്ച ശേഷം, Microphone Button അമർത്തി 3 സെക്കന്റിനുള്ളിൽ നിങ്ങളുടെ ചോദ്യം ചോദിക്കുക.',
    step3Title: '3. AI പ്രതികരണം ലഭിക്കുക',
    step3Desc: 'AI നിങ്ങളുടെ അഭ്യര്‍ഥന പ്രക്രിയചെയ്യുകയും വോയ്‌സ്, ടെക്സ്റ്റ് എന്നിവയിലൂടെ മറുപടി നൽകുകയും ചെയ്യും. കൂടുതൽ ചോദ്യങ്ങളുണ്ടെങ്കിൽ, മിക്ക് ബട്ടൺ വീണ്ടും അമർത്തുക!',
    applyForSchemes: 'പദ്ധതികൾക്ക് അപേക്ഷിക്കുക',
    openInNewTab: 'പുതിയ ടാബിൽ തുറക്കുക',
    footer: '© 2024 Trust Leaf. AI for Bharat-നായി നിർമ്മിച്ചത്.',
    readyForCall: 'കോലിന് തയ്യാറാണ്',
    ringing: 'റിംഗിങ്...',
    connected: 'ബന്ധിപ്പിച്ചിരിക്കുന്നു',
    listening: 'കേള്‍ക്കുന്നു...',
    thinking: 'ചിന്തിക്കുന്നു...',
    speaking: 'Assistant സംസാരിക്കുന്നു...',
    callEnded: 'കോൾ അവസാനിച്ചു',
    assistantName: 'Trust Leaf Assistant',
  },
  pa: {
    notice: 'ਨੋਟਿਸ:',
    noticeText: 'ਵਿਕਾਸ ਦੇ ਦੌਰਾਨ Amazon Connect ਦੀ ਅਸਥਾਈ ਉਪਲਬਧਤਾ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਅਤੇ Exotel ਟ੍ਰਾਇਲ ਕਾਲ ਸੀਮਾਵਾਂ ਕਰਕੇ, ਇਹ prototype phone call interface ਨੂੰ ਵੈਬਸਾਈਟ ਤੇ ਸਿੱਧਾ simulate ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਬੈਕੈਂਡ AI conversation pipeline ਉਹੀ ਹੈ ਅਤੇ AWS, Bhashini ਅਤੇ Bedrock ਦੁਆਰਾ ਚਲਾਈ ਜਾਂਦੀ ਹੈ।',
    subtitle: 'ਸਰਕਾਰੀ ਯੋਜਨਾ ਵਾਯਸ ਸਹਾਇਕ',
    description: 'ਗ੍ਰਾਮੀਣ ਨਾਗਰਿਕਾਂ ਨੂੰ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਕਰਨ ਵਾਲਾ AI-ਚਲਿਤ ਵਾਯਸ ਸਹਾਇਕ।',
    watchDemo: 'YouTube',
    github: 'GitHub',
    contact: 'ਸੰਪਰਕ',
    howToUse: 'Trust Leaf Assistant ਦੀ ਵਰਤੋਂ ਕਿਵੇਂ ਕਰੀਏ',
    howToUseDesc: 'ਸਾਡੇ AI-ਚਲਿਤ ਵਾਯਸ ਸਹਾਇਕ ਨਾਲ ਗੱਲ ਕਰਨ ਲਈ ਇਹ ਆਸਾਨ ਕਦਮ ਅਪਣਾਓ।',
    step1Title: '1. ਕਾਲ ਸ਼ੁਰੂ ਕਰੋ',
    step1Desc: 'Phone interface ਤੇ Call Button ਕਲਿਕ ਕਰੋ। ਸਿਸਟਮ agent ਨਾਲ ਜੁੜਨ ਲਈ ਰਿੰਗ ਹੋਣਾ ਸ਼ੁਰੂ ਹੋ ਜਾਵੇਗਾ।',
    step2Title: '2. ਮਾਈਕ ਵਿੱਚ ਬੋਲੋ',
    step2Desc: 'ਜੁੜਨ ਤੋਂ ਬਾਅਦ, Microphone Button ਦਬਾਓ ਅਤੇ 3 ਸੈਕਿਂਡਾਂ ਵਿੱਚ ਆਪਣਾ ਸਵਾਲ ਪੁੱਛੋ।',
    step3Title: '3. AI ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰੋ',
    step3Desc: 'AI ਤੁਹਾਡੀ ਬੇਨਤੀ ਨੂੰ ਪ੍ਰਸੰਸਾਧਰਾ ਕਰੇਗਾ ਅਤੇ ਵਾਯਸ ਅਤੇ ਟੈਕਸਟ ਵਿੱਚ ਜਵਾਬ ਦੇਵੇਗਾ। ਜੇ ਹੋਰ ਸਵਾਲ ਹੋਣ, ਤਾਂ ਮਾਈਕ ਬਟਨ ਫਿਰ ਤੋਂ ਦਬਾਓ!',
    applyForSchemes: 'ਯੋਜਨਾਵਾਂ ਲਈ ਅਰਜ਼ੀ ਕਰੋ',
    openInNewTab: 'ਨਵੇਂ ਟੈਬ ਵਿੱਚ ਖੋਲ੍ਹੋ',
    footer: '© 2024 Trust Leaf. AI for Bharat ਲਈ ਬਣਾਇਆ ਗਿਆ।',
    readyForCall: 'ਕਾਲ ਲਈ ਤਿਆਰ',
    ringing: 'Ringing...',
    connected: 'Connected',
    listening: 'ਸੁਣ ਰਿਹਾ ਹੈ...',
    thinking: 'ਸੋਚ ਰਿਹਾ ਹੈ...',
    speaking: 'Assistant ਬੋਲ ਰਿਹਾ ਹੈ...',
    callEnded: 'Call ਖਤਮ',
    assistantName: 'Trust Leaf Assistant',
  },
};

const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('trustleaf-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('trustleaf-language', language);
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

export { languages, type Language, type Translations };
