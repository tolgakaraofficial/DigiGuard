import React from 'react';
import { Linkedin, Mail, Github, Award } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  expertise: string[];
  linkedin: string;
  email: string;
  github?: string;
  image: string;
}

export const TeamPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Dr. Ayşe Yılmaz',
      role: 'Kurucu & CEO',
      description: 'Bilgisayar Mühendisliği doktorası. 15 yıllık siber güvenlik ve blockchain deneyimi.',
      expertise: ['Blockchain', 'Kriptografi', 'Siber Güvenlik'],
      linkedin: 'https://linkedin.com/in/ayse-yilmaz',
      email: 'ayse@digiguard.com',
      github: 'https://github.com/ayseyilmaz',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Mehmet Kaya',
      role: 'CTO',
      description: 'MIT mezunu. AI ve makine öğrenimi uzmanı. Önceden Google ve Microsoft\'ta çalıştı.',
      expertise: ['AI/ML', 'Biyometrik Sistemler', 'Web4'],
      linkedin: 'https://linkedin.com/in/mehmet-kaya',
      email: 'mehmet@digiguard.com',
      github: 'https://github.com/mehmetkaya',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Elif Demir',
      role: 'Baş Güvenlik Mimarı',
      description: 'CISSP ve CEH sertifikalı. Kritik altyapı güvenliği ve penetrasyon testi uzmanı.',
      expertise: ['Penetrasyon Testi', 'Güvenlik Mimarisi', 'Uyumluluk'],
      linkedin: 'https://linkedin.com/in/elif-demir',
      email: 'elif@digiguard.com',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Can Öztürk',
      role: 'Blockchain Geliştirici',
      description: 'Ethereum ve Solana ekosisteminde 8 yıllık deneyim. Smart contract uzmanı.',
      expertise: ['Smart Contracts', 'DeFi', 'Web3'],
      linkedin: 'https://linkedin.com/in/can-ozturk',
      email: 'can@digiguard.com',
      github: 'https://github.com/canozturk',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Zeynep Arslan',
      role: 'AI Mühendisi',
      description: 'Stanford mezunu. Yüz tanıma ve doğal dil işleme sistemleri geliştirdi.',
      expertise: ['Computer Vision', 'NLP', 'Deep Learning'],
      linkedin: 'https://linkedin.com/in/zeynep-arslan',
      email: 'zeynep@digiguard.com',
      github: 'https://github.com/zeyneparslan',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Burak Şahin',
      role: 'Full Stack Developer',
      description: 'React, Node.js ve bulut teknolojileri uzmanı. AWS ve Azure sertifikalı.',
      expertise: ['React', 'Node.js', 'Cloud Architecture'],
      linkedin: 'https://linkedin.com/in/burak-sahin',
      email: 'burak@digiguard.com',
      github: 'https://github.com/buraksahin',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Selin Yıldız',
      role: 'Ürün Yöneticisi',
      description: 'UX/UI tasarımı ve ürün stratejisi konusunda 10 yıllık deneyim.',
      expertise: ['Ürün Stratejisi', 'UX/UI', 'Kullanıcı Araştırması'],
      linkedin: 'https://linkedin.com/in/selin-yildiz',
      email: 'selin@digiguard.com',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Emre Aydın',
      role: 'DevOps Mühendisi',
      description: 'Kubernetes ve mikroservis mimarisi uzmanı. Yüksek erişilebilirlik sistemleri kurdu.',
      expertise: ['Kubernetes', 'CI/CD', 'Sistem Mimarisi'],
      linkedin: 'https://linkedin.com/in/emre-aydin',
      email: 'emre@digiguard.com',
      github: 'https://github.com/emreaydin',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Deniz Koç',
      role: 'Veri Bilimci',
      description: 'Big data ve veri analitiği uzmanı. Hadoop ve Spark ekosisteminde 7 yıllık deneyim.',
      expertise: ['Data Science', 'Big Data', 'Analytics'],
      linkedin: 'https://linkedin.com/in/deniz-koc',
      email: 'deniz@digiguard.com',
      github: 'https://github.com/denizkoc',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Aslı Eren',
      role: 'Hukuk ve Uyumluluk Müdürü',
      description: 'Siber güvenlik hukuku ve GDPR/KVKK uyumluluk uzmanı. Avrupa ve Türkiye\'de çalıştı.',
      expertise: ['GDPR', 'KVKK', 'Siber Hukuk'],
      linkedin: 'https://linkedin.com/in/asli-eren',
      email: 'asli@digiguard.com',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Onur Çetin',
      role: 'Mobil Uygulama Geliştirici',
      description: 'iOS ve Android platformlarında native uygulama geliştirme. React Native uzmanı.',
      expertise: ['iOS', 'Android', 'React Native'],
      linkedin: 'https://linkedin.com/in/onur-cetin',
      email: 'onur@digiguard.com',
      github: 'https://github.com/onurcetin',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Merve Akın',
      role: 'Müşteri Başarı Yöneticisi',
      description: 'B2B SaaS deneyimi. Kurumsal müşteri ilişkileri ve onboarding süreçleri uzmanı.',
      expertise: ['Customer Success', 'B2B Sales', 'Onboarding'],
      linkedin: 'https://linkedin.com/in/merve-akin',
      email: 'merve@digiguard.com',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Cem Yılmaz',
      role: 'Backend Geliştirici',
      description: 'Python ve Go dillerinde mikroservis mimarisi. Redis ve PostgreSQL optimizasyonu.',
      expertise: ['Python', 'Go', 'Microservices'],
      linkedin: 'https://linkedin.com/in/cem-yilmaz',
      email: 'cem@digiguard.com',
      github: 'https://github.com/cemyilmaz',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Gizem Taş',
      role: 'QA ve Test Mühendisi',
      description: 'Otomatik test sistemleri ve kalite güvence süreçleri. Selenium ve Cypress uzmanı.',
      expertise: ['Test Automation', 'QA', 'CI/CD Testing'],
      linkedin: 'https://linkedin.com/in/gizem-tas',
      email: 'gizem@digiguard.com',
      github: 'https://github.com/gizemtas',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Barış Tekin',
      role: 'Ağ Güvenliği Uzmanı',
      description: 'Firewall, IDS/IPS ve ağ izleme sistemleri. Cisco ve Fortinet sertifikalı.',
      expertise: ['Network Security', 'Firewall', 'IDS/IPS'],
      linkedin: 'https://linkedin.com/in/baris-tekin',
      email: 'baris@digiguard.com',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Esra Polat',
      role: 'İçerik ve Pazarlama Yöneticisi',
      description: 'Dijital pazarlama ve içerik stratejisi. SEO ve sosyal medya kampanyaları uzmanı.',
      expertise: ['Digital Marketing', 'Content Strategy', 'SEO'],
      linkedin: 'https://linkedin.com/in/esra-polat',
      email: 'esra@digiguard.com',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Kaan Özkan',
      role: 'Bilgi Güvenliği Analisti',
      description: 'SOC operasyonları ve olay müdahale ekibi lideri. SIEM sistemleri uzmanı.',
      expertise: ['SOC', 'SIEM', 'Incident Response'],
      linkedin: 'https://linkedin.com/in/kaan-ozkan',
      email: 'kaan@digiguard.com',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Nihan Şen',
      role: 'UI/UX Tasarımcı',
      description: 'Kullanıcı deneyimi ve arayüz tasarımı. Adobe Creative Suite ve Figma uzmanı.',
      expertise: ['UI Design', 'UX Research', 'Figma'],
      linkedin: 'https://linkedin.com/in/nihan-sen',
      email: 'nihan@digiguard.com',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Serkan Kurt',
      role: 'Finans Direktörü (CFO)',
      description: 'Startup finansı ve yatırım stratejileri. Big 4 muhasebe firmalarında 12 yıl deneyim.',
      expertise: ['Financial Planning', 'Investment', 'Fundraising'],
      linkedin: 'https://linkedin.com/in/serkan-kurt',
      email: 'serkan@digiguard.com',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Pınar Güneş',
      role: 'İnsan Kaynakları Müdürü',
      description: 'Yetenek kazanımı ve organizasyonel gelişim. Tech startup HR deneyimi.',
      expertise: ['Talent Acquisition', 'HR Strategy', 'Culture'],
      linkedin: 'https://linkedin.com/in/pinar-gunes',
      email: 'pinar@digiguard.com',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const advisors = [
    {
      name: 'Prof. Dr. Ali Veli',
      role: 'Teknik Danışman',
      description: 'Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölüm Başkanı. Kriptografi alanında 30+ yayın.',
      linkedin: 'https://linkedin.com/in/prof-ali-veli',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Fatma Çelik',
      role: 'İş Geliştirme Danışmanı',
      description: 'Eski Vodafone Türkiye CEO\'su. Telekom ve fintech sektöründe 25 yıllık deneyim.',
      linkedin: 'https://linkedin.com/in/fatma-celik',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Dr. Ömer Acar',
      role: 'Blockchain Danışmanı',
      description: 'Ethereum Foundation eski üyesi. DeFi protokolleri ve Web3 altyapısı konusunda global danışman.',
      linkedin: 'https://linkedin.com/in/dr-omer-acar',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Aylin Karaca',
      role: 'Siber Güvenlik Danışmanı',
      description: 'NATO Siber Savunma Merkezi eski direktörü. Uluslararası güvenlik standartları uzmanı.',
      linkedin: 'https://linkedin.com/in/aylin-karaca',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">DigiGuard Ekibi</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Dijital kimlik güvenliği konusunda dünyanın en yetenekli uzmanlarından oluşan ekibimizle tanışın
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Liderlik Ekibi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 group"
              >
                <div className="relative mb-4">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-500 group-hover:border-emerald-500 transition-colors">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    <Award className="h-3 w-3 inline mr-1" />
                    Verified
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {member.description}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center space-x-3 pt-4 border-t border-slate-700">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors"
                    title="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors"
                      title="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 border border-blue-500/30">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Danışman Kurulu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <div
                key={index}
                className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-purple-500 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-purple-500 flex-shrink-0">
                    <img
                      src={advisor.image}
                      alt={advisor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{advisor.name}</h3>
                    <p className="text-purple-400 font-medium text-sm mb-2">{advisor.role}</p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      {advisor.description}
                    </p>
                    <a
                      href={advisor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-slate-800/50 rounded-2xl p-8 border border-slate-700 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ekibimize Katılın</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Dijital güvenliğin geleceğini şekillendirmek için yetenekli ve tutkulu insanlar arıyoruz
          </p>
          <a
            href="mailto:kariyer@digiguard.com"
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span>kariyer@digiguard.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};
