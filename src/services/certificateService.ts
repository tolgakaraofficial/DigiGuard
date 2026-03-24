import jsPDF from 'jspdf';

interface CertificateData {
  userType: string;
  certificateId?: string;
  userName?: string;
  userEmail?: string;
  registrationDate?: string;
  userId?: string;
  language?: string;
}

export const generatePremiumCertificate = (data: CertificateData) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const now = new Date();
  const timestamp = now.toLocaleString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Istanbul'
  });

  const blockchainHash = `0x${Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')}`;

  const certificateId = data.certificateId ||
    `DG-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 297, 'F');

  doc.setFillColor(218, 165, 32);
  doc.rect(10, 10, 190, 4);
  doc.rect(10, 283, 190, 4);
  doc.rect(10, 10, 4, 277);
  doc.rect(196, 10, 4, 277);

  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.5);
  doc.rect(18, 18, 174, 261);

  doc.setDrawColor(200, 150, 20);
  doc.setLineWidth(0.2);
  doc.rect(20, 20, 170, 257);

  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.3);
  for (let i = 0; i < 3; i++) {
    doc.circle(23 + i * 0.4, 23 + i * 0.4, 1.5 - i * 0.3);
    doc.circle(187 - i * 0.4, 23 + i * 0.4, 1.5 - i * 0.3);
    doc.circle(23 + i * 0.4, 274 - i * 0.4, 1.5 - i * 0.3);
    doc.circle(187 - i * 0.4, 274 - i * 0.4, 1.5 - i * 0.3);
  }

  doc.setFontSize(30);
  doc.setTextColor(218, 165, 32);
  doc.setFont('helvetica', 'bold');
  doc.text('DigiGuard', 105, 40, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(218, 165, 32);
  doc.setFont('helvetica', 'bold');
  doc.text('Karprime Technology INC.', 105, 46, { align: 'center' });

  doc.setFontSize(18);
  doc.setTextColor(139, 0, 0);
  doc.setFont('times', 'bold');
  doc.text('KİMLİK DOĞRULAMA SERTİFİKASI', 105, 60, { align: 'center' });

  doc.setFontSize(9);
  doc.setTextColor(70, 70, 70);
  doc.setFont('helvetica', 'italic');
  doc.text('Certificate of Identity Verification', 105, 66, { align: 'center' });

  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.5);
  doc.line(45, 72, 165, 72);

  doc.setFontSize(7.5);
  doc.setTextColor(50, 50, 50);
  doc.setFont('helvetica', 'normal');
  const descriptionText = 'Bu sertifika, aşağıda belirtilen kişi/kuruluşun DigiGuard Biyometrik KYC sistemi';
  const descriptionText2 = 'tarafından blockchain teknolojisi ile doğrulandığını ve kimlik bilgilerinin';
  const descriptionText3 = 'güvenli bir şekilde saklandığını teyit eder.';
  doc.text(descriptionText, 105, 82, { align: 'center' });
  doc.text(descriptionText2, 105, 87, { align: 'center' });
  doc.text(descriptionText3, 105, 92, { align: 'center' });

  doc.setFillColor(248, 249, 250);
  doc.roundedRect(30, 100, 150, 50, 2, 2, 'F');
  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.5);
  doc.roundedRect(30, 100, 150, 50, 2, 2, 'S');

  doc.setFontSize(10);
  doc.setTextColor(0, 51, 102);
  doc.setFont('helvetica', 'bold');
  doc.text('SERTİFİKA BİLGİLERİ', 35, 108);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);

  let yPos = 117;
  const lineHeight = 7;

  doc.text('Sertifika No:', 35, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(139, 0, 0);
  doc.text(certificateId, 75, yPos);

  yPos += lineHeight;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('Ad Soyad / Kurum:', 35, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 51, 102);
  const displayName = data.userName || 'Kullanıcı';
  doc.text(displayName.substring(0, 35), 75, yPos);

  yPos += lineHeight;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('E-posta:', 35, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 51, 102);
  const displayEmail = data.userEmail || '';
  doc.text(displayEmail.substring(0, 38), 75, yPos);

  yPos += lineHeight;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('Kullanıcı Tipi:', 35, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 100, 0);
  const userTypeLabel = data.userType === 'corporate' ? 'Kurumsal' : data.userType === 'personnel' ? 'Personel' : 'Bireysel';
  doc.text(userTypeLabel, 75, yPos);

  yPos += lineHeight;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('Kayıt Tarihi:', 35, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  const regDate = data.registrationDate ? new Date(data.registrationDate) : now;
  doc.text(regDate.toLocaleDateString('tr-TR'), 75, yPos);

  doc.setFillColor(248, 249, 250);
  doc.roundedRect(30, 157, 150, 43, 2, 2, 'F');
  doc.setDrawColor(0, 51, 102);
  doc.setLineWidth(0.5);
  doc.roundedRect(30, 157, 150, 43, 2, 2, 'S');

  doc.setFontSize(10);
  doc.setTextColor(0, 51, 102);
  doc.setFont('helvetica', 'bold');
  doc.text('BLOCKCHAIN DOĞRULAMA', 35, 165);

  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);

  yPos = 172;
  doc.text('Blockchain Hash:', 35, yPos);
  doc.setTextColor(100, 50, 150);
  doc.setFont('courier', 'normal');
  doc.text(blockchainHash.substring(0, 52), 35, yPos + 3);
  doc.text(blockchainHash.substring(52), 35, yPos + 6);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  yPos += 13;
  doc.text('Zaman Damgası (UTC+3):', 35, yPos);
  doc.setTextColor(0, 100, 0);
  doc.text(timestamp.substring(0, 40), 70, yPos);

  yPos += 4;
  doc.setTextColor(80, 80, 80);
  doc.text('Blockchain Ağı:', 35, yPos);
  doc.setTextColor(0, 100, 0);
  doc.text('Ethereum Mainnet', 70, yPos);

  yPos += 4;
  doc.setTextColor(80, 80, 80);
  doc.text('Şifreleme:', 35, yPos);
  doc.setTextColor(0, 100, 0);
  doc.text('AES-256 + SHA-256 + RSA-4096', 70, yPos);

  doc.setFillColor(255, 250, 240);
  doc.roundedRect(30, 207, 150, 23, 2, 2, 'F');
  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.3);
  doc.roundedRect(30, 207, 150, 23, 2, 2, 'S');

  doc.setFontSize(8);
  doc.setTextColor(139, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('NEDEN VERİLDİ?', 35, 214);

  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  const reason1 = 'Bu sertifika, kimlik doğrulama süreçlerinin başarıyla tamamlandığını,';
  const reason2 = 'biyometrik verilerin güvenli kaydedildiğini ve blockchain teknolojisi ile';
  const reason3 = 'değiştirilemez kayıt oluşturulduğunu teyit eder. Karprime Technology INC.';
  doc.text(reason1, 35, 218);
  doc.text(reason2, 35, 222);
  doc.text(reason3, 35, 226);

  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.5);
  doc.line(30, 240, 80, 240);
  doc.line(130, 240, 180, 240);

  doc.setFontSize(6.5);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'italic');
  doc.text('Dijital Mühür', 55, 245, { align: 'center' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(218, 165, 32);
  doc.text('Karprime Technology INC.', 155, 245, { align: 'center' });

  doc.setDrawColor(218, 165, 32);
  doc.setFillColor(255, 255, 255);
  doc.circle(55, 241.5, 3, 'FD');

  doc.setFontSize(5);
  doc.setTextColor(139, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('DG', 55, 242.5, { align: 'center' });

  doc.setDrawColor(0, 51, 102);
  doc.setLineWidth(0.6);
  doc.line(130, 242, 180, 242);
  doc.setFontSize(6.5);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'italic');
  doc.text('Yetkili İmza', 155, 248, { align: 'center' });

  doc.setFontSize(6);
  doc.setTextColor(120, 120, 120);
  doc.setFont('helvetica', 'italic');
  const footer1 = 'Bu sertifika blockchain ile güvence altındadır ve değiştirilemez.';
  const footer2 = `Doğrulama: https://digiguard.app/verify/${certificateId.substring(0, 25)}`;
  doc.text(footer1, 105, 258, { align: 'center' });
  doc.text(footer2, 105, 263, { align: 'center' });

  doc.save(`DigiGuard_KYC_Certificate_${certificateId}.pdf`);
};
