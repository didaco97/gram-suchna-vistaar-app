
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  source: string;
  date: string;
  imageUrl: string;
  category: string;
}

serve(async (req) => {
  console.log('News function called with method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, refresh, language = 'en' } = await req.json();
    
    console.log(`Fetching news for category: ${category}, language: ${language}, refresh: ${refresh}`);
    
    // Simulate fetching news (in a real app this would call an actual news API)
    const news = generateMockNews(category, language);
    
    console.log(`Generated ${news.length} news items`);
    
    return new Response(
      JSON.stringify({
        success: true,
        data: news,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in fetch-news function:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

function generateMockNews(category: string, language: string = 'en'): NewsItem[] {
  console.log(`Generating mock news for ${category} in ${language}`);
  
  const newsItems: Record<string, Record<string, NewsItem[]>> = {
    'en': {
      'agriculture': [
        {
          id: '1',
          title: 'New Organic Farming Techniques Show Promise',
          content: 'Farmers across the country are adopting new organic farming techniques that are showing improved yields while being environmentally friendly.',
          source: 'Rural News Network',
          date: '2025-03-28',
          imageUrl: 'https://placehold.co/600x400?text=Agriculture+News',
          category: 'agriculture'
        },
        {
          id: '2',
          title: 'Government Announces Increased Subsidies for Farmers',
          content: 'The central government has announced a 15% increase in subsidies for small and marginal farmers to boost agricultural productivity.',
          source: 'National Daily',
          date: '2025-03-26',
          imageUrl: 'https://placehold.co/600x400?text=Agriculture+News',
          category: 'agriculture'
        },
      ],
      'healthcare': [
        {
          id: '3',
          title: 'Rural Health Centers to Get Technology Upgrade',
          content: 'The Health Ministry has announced a comprehensive plan to upgrade technology infrastructure in rural health centers nationwide.',
          source: 'Health Today',
          date: '2025-03-29',
          imageUrl: 'https://placehold.co/600x400?text=Healthcare+News',
          category: 'healthcare'
        },
        {
          id: '4',
          title: 'New Vaccination Drive Launched in Rural Areas',
          content: 'A new vaccination campaign targeting preventable diseases has been launched specifically for rural communities with limited healthcare access.',
          source: 'Medical Journal',
          date: '2025-03-25',
          imageUrl: 'https://placehold.co/600x400?text=Healthcare+News',
          category: 'healthcare'
        },
      ],
      'education': [
        {
          id: '5',
          title: 'Digital Learning Initiative Reaches Remote Villages',
          content: 'A government-backed digital learning initiative has successfully connected schools in 500 remote villages to online educational resources.',
          source: 'Education Times',
          date: '2025-03-27',
          imageUrl: 'https://placehold.co/600x400?text=Education+News',
          category: 'education'
        },
        {
          id: '6',
          title: 'Rural Schools Show Improvement in Literacy Rates',
          content: 'Recent data shows significant improvement in literacy rates among rural schools that implemented the new national curriculum.',
          source: 'Academic Review',
          date: '2025-03-24',
          imageUrl: 'https://placehold.co/600x400?text=Education+News',
          category: 'education'
        },
      ],
      'local news': [
        {
          id: '7',
          title: 'Village Council Implements New Water Conservation Project',
          content: 'The local village council has successfully implemented a new water conservation project that has improved water availability for farming.',
          source: 'Local Daily',
          date: '2025-03-30',
          imageUrl: 'https://placehold.co/600x400?text=Local+News',
          category: 'local news'
        },
        {
          id: '8',
          title: 'Community-Led Road Repair Initiative Completed',
          content: 'Residents of Greenfield village have completed a community-led initiative to repair the main access road damaged during monsoon.',
          source: 'Community News',
          date: '2025-03-23',
          imageUrl: 'https://placehold.co/600x400?text=Local+News',
          category: 'local news'
        },
      ]
    },
    'hi': {
      'agriculture': [
        {
          id: '1',
          title: 'नई जैविक खेती तकनीकें आशाजनक दिखती हैं',
          content: 'देश भर के किसान नई जैविक खेती तकनीकों को अपना रहे हैं जो पर्यावरण के अनुकूल होने के साथ बेहतर उपज दिखा रहे हैं।',
          source: 'ग्रामीण समाचार नेटवर्क',
          date: '2025-03-28',
          imageUrl: 'https://placehold.co/600x400?text=कृषि+समाचार',
          category: 'agriculture'
        },
        {
          id: '2',
          title: 'सरकार ने किसानों के लिए बढ़ी हुई सब्सिडी की घोषणा की',
          content: 'केंद्र सरकार ने कृषि उत्पादकता बढ़ाने के लिए छोटे और सीमांत किसानों के लिए सब्सिडी में 15% की वृद्धि की घोषणा की है।',
          source: 'राष्ट्रीय दैनिक',
          date: '2025-03-26',
          imageUrl: 'https://placehold.co/600x400?text=कृषि+समाचार',
          category: 'agriculture'
        },
      ],
      'healthcare': [
        {
          id: '3',
          title: 'ग्रामीण स्वास्थ्य केंद्रों को प्रौद्योगिकी अपग्रेड मिलेगा',
          content: 'स्वास्थ्य मंत्रालय ने देशभर के ग्रामीण स्वास्थ्य केंद्रों में प्रौद्योगिकी बुनियादी ढांचे को अपग्रेड करने की एक व्यापक योजना की घोषणा की है।',
          source: 'हेल्थ टुडे',
          date: '2025-03-29',
          imageUrl: 'https://placehold.co/600x400?text=स्वास्थ्य+समाचार',
          category: 'healthcare'
        },
        {
          id: '4',
          title: 'ग्रामीण क्षेत्रों में नया टीकाकरण अभियान शुरू',
          content: 'सीमित स्वास्थ्य देखभाल पहुंच वाले ग्रामीण समुदायों के लिए विशेष रूप से रोके जा सकने वाले रोगों को लक्षित करने वाला एक नया टीकाकरण अभियान शुरू किया गया है।',
          source: 'मेडिकल जर्नल',
          date: '2025-03-25',
          imageUrl: 'https://placehold.co/600x400?text=स्वास्थ्य+समाचार',
          category: 'healthcare'
        },
      ],
      'education': [
        {
          id: '5',
          title: 'डिजिटल लर्निंग पहल दूरदराज के गांवों तक पहुंची',
          content: 'सरकार समर्थित डिजिटल लर्निंग पहल ने 500 दूरदराज के गांवों के स्कूलों को ऑनलाइन शैक्षिक संसाधनों से सफलतापूर्वक जोड़ा है।',
          source: 'शिक्षा टाइम्स',
          date: '2025-03-27',
          imageUrl: 'https://placehold.co/600x400?text=शिक्षा+समाचार',
          category: 'education'
        },
        {
          id: '6',
          title: 'ग्रामीण स्कूलों में साक्षरता दर में सुधार दिखाई देता है',
          content: 'हाल के आंकड़े नए राष्ट्रीय पाठ्यक्रम को लागू करने वाले ग्रामीण स्कूलों में साक्षरता दर में महत्वपूर्ण सुधार दिखाते हैं।',
          source: 'अकादमिक समीक्षा',
          date: '2025-03-24',
          imageUrl: 'https://placehold.co/600x400?text=शिक्षा+समाचार',
          category: 'education'
        },
      ],
      'local news': [
        {
          id: '7',
          title: 'ग्राम परिषद ने नई जल संरक्षण परियोजना लागू की',
          content: 'स्थानीय ग्राम परिषद ने एक नई जल संरक्षण परियोजना को सफलतापूर्वक लागू किया है जिसने खेती के लिए पानी की उपलब्धता में सुधार किया है।',
          source: 'लोकल डेली',
          date: '2025-03-30',
          imageUrl: 'https://placehold.co/600x400?text=स्थानीय+समाचार',
          category: 'local news'
        },
        {
          id: '8',
          title: 'समुदाय के नेतृत्व वाली सड़क मरम्मत पहल पूरी हुई',
          content: 'ग्रीनफील्ड गांव के निवासियों ने मानसून के दौरान क्षतिग्रस्त मुख्य पहुंच सड़क की मरम्मत के लिए एक समुदाय के नेतृत्व वाली पहल पूरी कर ली है।',
          source: 'समुदाय समाचार',
          date: '2025-03-23',
          imageUrl: 'https://placehold.co/600x400?text=स्थानीय+समाचार',
          category: 'local news'
        },
      ]
    },
    'mr': {
      'agriculture': [
        {
          id: '1',
          title: 'नवीन सेंद्रिय शेती तंत्रज्ञान आशादायक दिसत आहे',
          content: 'देशभरातील शेतकरी नवीन सेंद्रिय शेती तंत्रज्ञान स्वीकारत आहेत जे पर्यावरणास अनुकूल असताना सुधारित उत्पादन दाखवत आहेत.',
          source: 'ग्रामीण बातम्या नेटवर्क',
          date: '2025-03-28',
          imageUrl: 'https://placehold.co/600x400?text=कृषी+बातम्या',
          category: 'agriculture'
        },
        {
          id: '2',
          title: 'सरकारने शेतकऱ्यांसाठी वाढीव अनुदानाची घोषणा केली',
          content: 'कृषी उत्पादकता वाढविण्यासाठी केंद्र सरकारने लहान आणि सीमांत शेतकऱ्यांसाठी अनुदानात 15% वाढ करण्याची घोषणा केली आहे.',
          source: 'नॅशनल डेली',
          date: '2025-03-26',
          imageUrl: 'https://placehold.co/600x400?text=कृषी+बातम्या',
          category: 'agriculture'
        },
      ],
      'healthcare': [
        {
          id: '3',
          title: 'ग्रामीण आरोग्य केंद्रांना तंत्रज्ञान अपग्रेड मिळणार',
          content: 'आरोग्य मंत्रालयाने देशभरातील ग्रामीण आरोग्य केंद्रांमध्ये तंत्रज्ञान पायाभूत सुविधा अपग्रेड करण्यासाठी सर्वसमावेशक योजनेची घोषणा केली आहे.',
          source: 'हेल्थ टुडे',
          date: '2025-03-29',
          imageUrl: 'https://placehold.co/600x400?text=आरोग्य+बातम्या',
          category: 'healthcare'
        },
        {
          id: '4',
          title: 'ग्रामीण भागात नवीन लसीकरण मोहीम सुरू',
          content: 'मर्यादित आरोग्य सेवा असलेल्या ग्रामीण समुदायांसाठी विशेषतः प्रतिबंधित करण्यायोग्य आजारांना लक्ष्य करणारी नवीन लसीकरण मोहीम सुरू करण्यात आली आहे.',
          source: 'मेडिकल जर्नल',
          date: '2025-03-25',
          imageUrl: 'https://placehold.co/600x400?text=आरोग्य+बातम्या',
          category: 'healthcare'
        },
      ],
      'education': [
        {
          id: '5',
          title: 'डिजिटल लर्निंग उपक्रम दुर्गम गावांपर्यंत पोहोचला',
          content: 'सरकारी समर्थित डिजिटल लर्निंग उपक्रमाने 500 दुर्गम गावांतील शाळा ऑनलाइन शैक्षणिक संसाधनांशी यशस्वीरित्या जोडल्या आहेत.',
          source: 'एज्युकेशन टाइम्स',
          date: '2025-03-27',
          imageUrl: 'https://placehold.co/600x400?text=शिक्षण+बातम्या',
          category: 'education'
        },
        {
          id: '6',
          title: 'ग्रामीण शाळांमध्ये साक्षरता दरात सुधारणा दिसून येत आहे',
          content: 'अलीकडील आकडेवारी दर्शवते की नवीन राष्ट्रीय अभ्यासक्रम राबविणाऱ्या ग्रामीण शाळांमध्ये साक्षरता दरात लक्षणीय सुधारणा झाली आहे.',
          source: 'अकादमिक रिव्ह्यू',
          date: '2025-03-24',
          imageUrl: 'https://placehold.co/600x400?text=शिक्षण+बातम्या',
          category: 'education'
        },
      ],
      'local news': [
        {
          id: '7',
          title: 'ग्राम परिषदेने नवीन पाणी संवर्धन प्रकल्प राबविला',
          content: 'स्थानिक ग्राम परिषदेने नवीन पाणी संवर्धन प्रकल्प यशस्वीरित्या राबविला आहे ज्यामुळे शेतीसाठी पाण्याची उपलब्धता सुधारली आहे.',
          source: 'लोकल डेली',
          date: '2025-03-30',
          imageUrl: 'https://placehold.co/600x400?text=स्थानिक+बातम्या',
          category: 'local news'
        },
        {
          id: '8',
          title: 'समुदाय-नेतृत्व रस्ता दुरुस्ती उपक्रम पूर्ण',
          content: 'ग्रीनफील्ड गावातील रहिवाशांनी पावसाळ्यात नुकसान झालेल्या मुख्य प्रवेश रस्त्याच्या दुरुस्तीसाठी समुदाय-नेतृत्व उपक्रम पूर्ण केला आहे.',
          source: 'समुदाय बातम्या',
          date: '2025-03-23',
          imageUrl: 'https://placehold.co/600x400?text=स्थानिक+बातम्या',
          category: 'local news'
        },
      ]
    }
  };

  // Return either the requested category or an empty array if category doesn't exist
  return newsItems[language]?.[category] || [];
}
