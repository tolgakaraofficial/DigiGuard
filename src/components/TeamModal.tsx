import React from 'react';
import { Users, Linkedin, Award, Code, Shield, X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TeamMember {
  name: string;
  title: string;
  role: string;
  expertise: string[];
  linkedin: string;
  image: string;
  achievements: string[];
}

export const TeamModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const teamMembers: TeamMember[] = [
    {
      name: 'Ekip Üyesi',
      title: 'Konum Beklemede',
      role: 'Siber Güvenlik Uzmanı',
      expertise: ['Güvenlik', 'Blockchain', 'Yazılım'],
      linkedin: 'https://www.linkedin.com/company/digiguard-official',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: ['Yakında duyurulacak', 'Yakında duyurulacak', 'Yakında duyurulacak'],
    },
    {
      name: 'Ekip Üyesi',
      title: 'Konum Beklemede',
      role: 'Teknoloji Lideri',
      expertise: ['Yazılım', 'Cloud', 'DevOps'],
      linkedin: 'https://www.linkedin.com/company/digiguard-official',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: ['Yakında duyurulacak', 'Yakında duyurulacak', 'Yakında duyurulacak'],
    },
    {
      name: 'Ekip Üyesi',
      title: 'Konum Beklemede',
      role: 'UX/UI Uzmanı',
      expertise: ['Tasarım', 'Kullanıcı', 'Deneyim'],
      linkedin: 'https://www.linkedin.com/company/digiguard-official',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: ['Yakında duyurulacak', 'Yakında duyurulacak', 'Yakında duyurulacak'],
    },
    {
      name: 'Ekip Üyesi',
      title: 'Konum Beklemede',
      role: 'Blockchain Geliştirici',
      expertise: ['Smart Contract', 'Ethereum', 'Web3'],
      linkedin: 'https://www.linkedin.com/company/digiguard-official',
      image: 'https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: ['Yakında duyurulacak', 'Yakında duyurulacak', 'Yakında duyurulacak'],
    },
    {
      name: 'Ekip Üyesi',
      title: 'Konum Beklemede',
      role: 'AI & ML Uzmanı',
      expertise: ['Machine Learning', 'Biyometrik', 'Veri Bilimi'],
      linkedin: 'https://www.linkedin.com/company/digiguard-official',
      image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: ['Yakında duyurulacak', 'Yakında duyurulacak', 'Yakında duyurulacak'],
    },
    {
      name: 'Ekip Üyesi',
      title: 'Konum Beklemede',
      role: 'Güvenlik Müdürü',
      expertise: ['Penetration Testing', 'Kriptografi', 'Denetim'],
      linkedin: 'https://www.linkedin.com/company/digiguard-official',
      image: 'https://images.pexels.com/photos/3184599/pexels-photo-3184599.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: ['Yakında duyurulacak', 'Yakında duyurulacak', 'Yakında duyurulacak'],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2.5 rounded-lg shadow-lg shadow-orange-500/50">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">DigiGuard Ekibi</h2>
              <p className="text-slate-300 text-sm">Güvenliğiniz için çalışan uzmanlar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Dünya Standartlarında Ekip
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              DigiGuard ekibi, siber güvenlik, blockchain teknolojisi, yapay zeka ve
              yazılım geliştirme alanlarında uzmanlaşmış, sektörde kanıtlanmış profesyonellerden
              oluşmaktadır. Daha fazla ekip üyesi yakında duyurulacaktır.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-slate-700/50 rounded-xl border border-slate-600 overflow-hidden hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/20"
              >
                <div className="aspect-square bg-gradient-to-br from-slate-600 to-slate-700 relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-amber-400 font-medium text-sm">{member.title}</p>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Shield className="h-4 w-4 text-blue-400" />
                      <span className="text-slate-300 text-sm font-medium">{member.role}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <Code className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-slate-400 mb-1">Uzmanlık Alanları:</p>
                          <div className="flex flex-wrap gap-1">
                            {member.expertise.map((skill, idx) => (
                              <span
                                key={idx}
                                className="bg-slate-600 text-slate-200 text-xs px-2 py-0.5 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Award className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-slate-400 mb-1">Başarılar:</p>
                          <ul className="space-y-1">
                            {member.achievements.map((achievement, idx) => (
                              <li key={idx} className="text-xs text-slate-300 flex items-start">
                                <span className="text-yellow-400 mr-1">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all shadow-lg shadow-blue-500/30 text-sm"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn Profilini Gör</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
              <Award className="h-5 w-5 text-amber-400" />
              <span>Ekip Gelişimi</span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              DigiGuard ailesi büyümeye devam ediyor. Ekibimize katılmakla ilgili detaylı bilgi için
              <a href="https://www.linkedin.com/company/digiguard-official" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 ml-1">
                LinkedIn sayfamızı ziyaret edin
              </a>.
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-lg shadow-orange-500/30"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
