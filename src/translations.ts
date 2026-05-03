export type Language = 'en' | 'hi';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      learn: 'Learn',
      chat: 'AI Chat',
      quiz: 'Quiz',
      timeline: 'Timeline',
    },
    hero: {
      title: 'Learn How to Vote Easily',
      subtitle: 'Your interactive guide to becoming an empowered voter.',
      cta: 'Get Started',
    },
    learn: {
      title: 'Election Process',
      steps: [
        {
          title: 'Voter Registration',
          desc: 'Register online or offline to get your name on the electoral roll.',
        },
        {
          title: 'Verify Voter ID',
          desc: 'Check your details on the voter list to ensure your ID is active.',
        },
        {
          title: 'Find Polling Booth',
          desc: 'Locate your designated polling station using your EPIC number.',
        },
        {
          title: 'Voting Process',
          desc: 'Cast your vote at the booth and get the ink mark on your finger.',
        },
      ],
    },
    chat: {
      title: 'VoteSmart AI Assistant',
      placeholder: 'Ask anything about voting...',
      welcome: 'Hello! I am VoteSmart AI. How can I help you today?',
    },
    quiz: {
      title: 'Election Quiz',
      start: 'Start Quiz',
      next: 'Next',
      score: 'Your Score',
      restart: 'Restart',
    },
    timeline: {
      title: 'Election Phases',
    },
    bonus: {
      voteSim: 'Practice Voting',
      darkMode: 'Dark Mode',
      language: 'Language',
      accessibility: 'Accessibility Mode',
    },
    tools: {
      persona: {
        student: 'Student Guide',
        first: 'First Time Voter',
        senior: 'Senior Citizen',
      },
      map: {
        title: 'Election Map',
        desc: 'Interactive state-wise election profile.',
      },
      detector: {
        title: 'Misinfo Detector',
        placeholder: 'Paste news or claims here...',
        button: 'Analyze News',
      },
      certificate: {
        title: 'Smart Voter Certificate',
      }
    }
  },
  hi: {
    nav: {
      home: 'होम',
      learn: 'सीखें',
      chat: 'एआई चैट',
      quiz: 'क्विज़',
      timeline: 'समयरेखा',
    },
    hero: {
      title: 'आसानी से वोट देना सीखें',
      subtitle: 'एक सशक्त मतदाता बनने के लिए आपका इंटरैक्टिव गाइड।',
      cta: 'शुरू करें',
    },
    learn: {
      title: 'चुनाव प्रक्रिया',
      steps: [
        {
          title: 'मतदाता पंजीकरण',
          desc: 'मतदाता सूची में अपना नाम दर्ज कराने के लिए ऑनलाइन या ऑफलाइन पंजीकरण करें।',
        },
        {
          title: 'वोटर आईडी सत्यापित करें',
          desc: 'यह सुनिश्चित करने के लिए कि आपकी आईडी सक्रिय है, मतदाता सूची में अपना विवरण जांचें।',
        },
        {
          title: 'मतदान केंद्र खोजें',
          desc: 'अपने ईपीआईसी नंबर का उपयोग करके अपने निर्धारित मतदान केंद्र का पता लगाएं।',
        },
        {
          title: 'मतदान प्रक्रिया',
          desc: 'बूथ पर अपना वोट डालें और अपनी उंगली पर स्याही का निशान लगवाएं।',
        },
      ],
    },
    chat: {
      title: 'वोटस्मार्ट एआई सहायक',
      placeholder: 'वोटिंग के बारे में कुछ भी पूछें...',
      welcome: 'नमस्ते! मैं वोटस्मार्ट एआई हूँ। मैं आज आपकी क्या मदद कर सकता हूँ?',
    },
    quiz: {
      title: 'चुनाव क्विज़',
      start: 'क्विज़ शुरू करें',
      next: 'अगला',
      score: 'आपका स्कोर',
      restart: 'दोबारा शुरू करें',
    },
    timeline: {
      title: 'चुनाव के चरण',
    },
    bonus: {
      voteSim: 'मतदान का अभ्यास',
      darkMode: 'डार्क मोड',
      language: 'भाषा',
      accessibility: 'एक्सेसिबिलिटी मोड',
    },
    tools: {
      persona: {
        student: 'छात्र गाइड',
        first: 'पहली बार मतदाता',
        senior: 'वरिष्ठ नागरिक',
      },
      map: {
        title: 'चुनाव मानचित्र',
        desc: 'इंटरैक्टिव राज्य-वार चुनाव प्रोफ़ाइल।',
      },
      detector: {
        title: 'भ्रामक सूचना डिटेक्टर',
        placeholder: 'यहाँ समाचार या दावे पेस्ट करें...',
        button: 'समाचार का विश्लेषण करें',
      },
      certificate: {
        title: 'स्मार्ट वोटर प्रमाणपत्र',
      }
    }
  }
};
