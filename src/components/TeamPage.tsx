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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">DigiGuard Ekibi</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto drop-shadow-md">
            Dijital kimlik güvenliği konusunda dünyanın en yetenekli uzmanlarından oluşan ekibimizle tanışın
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">Liderlik Ekibi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-slate-800/60 backdrop-blur-md rounded-xl p-5 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 group hover:scale-105"
              >
                <div className="relative mb-3">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-blue-500 group-hover:border-emerald-500 transition-all duration-300 shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-lg">
                    <Award className="h-2.5 w-2.5 inline mr-1" />
                    Verified
                  </div>
                </div>

                <div className="text-center mb-3">
                  <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">{member.name}</h3>
                  <p className="text-blue-400 font-medium text-xs mb-2 drop-shadow-sm">{member.role}</p>
                  <p className="text-slate-300 text-xs leading-relaxed mb-3 drop-shadow-sm">
                    {member.description}
                  </p>
                </div>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {member.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-600/20 backdrop-blur-sm text-blue-400 text-xs px-2.5 py-0.5 rounded-full border border-blue-500/30 hover:bg-blue-600/30 transition-all duration-300 drop-shadow-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center space-x-2 pt-3 border-t border-slate-700/50">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600/80 backdrop-blur-sm hover:bg-blue-600 text-white p-1.5 rounded-lg transition-all duration-300 hover:scale-110 shadow-lg"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="bg-slate-700/80 backdrop-blur-sm hover:bg-slate-600 text-white p-1.5 rounded-lg transition-all duration-300 hover:scale-110 shadow-lg"
                    title="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-700/80 backdrop-blur-sm hover:bg-slate-600 text-white p-1.5 rounded-lg transition-all duration-300 hover:scale-110 shadow-lg"
                      title="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-blue-500/30 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">Danışman Kurulu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <div
                key={index}
                className="bg-slate-800/70 backdrop-blur-md rounded-xl p-5 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-500 flex-shrink-0 shadow-lg">
                    <img
                      src={advisor.image}
                      alt={advisor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-white mb-1 drop-shadow-md">{advisor.name}</h3>
                    <p className="text-cyan-400 font-medium text-xs mb-2 drop-shadow-sm">{advisor.role}</p>
                    <p className="text-slate-300 text-xs leading-relaxed mb-3 drop-shadow-sm">
                      {advisor.description}
                    </p>
                    <a
                      href={advisor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-cyan-600/80 backdrop-blur-sm hover:bg-cyan-600 text-white px-3 py-1.5 rounded-lg transition-all duration-300 text-xs shadow-lg hover:scale-105"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-slate-800/60 backdrop-blur-md rounded-xl p-6 md:p-8 border border-slate-700/50 text-center shadow-xl">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 drop-shadow-lg">Ekibimize Katılın</h3>
          <p className="text-slate-300 mb-5 max-w-2xl mx-auto text-sm md:text-base drop-shadow-md">
            Dijital güvenliğin geleceğini şekillendirmek için yetenekli ve tutkulu insanlar arıyoruz
          </p>
          <a
            href="mailto:kariyer@digiguard.com"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 hover:scale-105 text-sm"
          >
            <Mail className="h-4 w-4" />
            <span>kariyer@digiguard.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};
