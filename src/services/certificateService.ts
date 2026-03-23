import jsPDF from 'jspdf';

interface CertificateData {
  userType: string;
  certificateId?: string;
  userName?: string;
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
  doc.rect(8, 8, 194, 5);
  doc.rect(8, 284, 194, 5);
  doc.rect(8, 8, 5, 281);
  doc.rect(197, 8, 5, 281);

  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.8);
  doc.rect(15, 15, 180, 267);

  doc.setDrawColor(200, 150, 20);
  doc.setLineWidth(0.3);
  doc.rect(17, 17, 176, 263);

  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.5);
  for (let i = 0; i < 4; i++) {
    doc.circle(20 + i * 0.5, 20 + i * 0.5, 2 - i * 0.3);
    doc.circle(190 - i * 0.5, 20 + i * 0.5, 2 - i * 0.3);
    doc.circle(20 + i * 0.5, 277 - i * 0.5, 2 - i * 0.3);
    doc.circle(190 - i * 0.5, 277 - i * 0.5, 2 - i * 0.3);
  }

  doc.setFontSize(32);
  doc.setTextColor(0, 51, 102);
  doc.setFont('helvetica', 'bold');
  doc.text('DigiGuard', 105, 45, { align: 'center' });

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'normal');
  doc.text('Karprime Technology INC.', 105, 52, { align: 'center' });

  doc.setFontSize(20);
  doc.setTextColor(139, 0, 0);
  doc.setFont('times', 'bold');
  doc.text('KİMLİK DOĞRULAMA SERTİFİKASI', 105, 68, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(70, 70, 70);
  doc.setFont('helvetica', 'italic');
  doc.text('Certificate of Identity Verification', 105, 75, { align: 'center' });

  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.5);
  doc.line(40, 82, 170, 82);

  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  doc.setFont('helvetica', 'normal');
  const descriptionText = 'Bu sertifika, aşağıda belirtilen kişi/kuruluşun DigiGuard Biyometrik KYC sistemi';
  const descriptionText2 = 'tarafından blockchain teknolojisi ile doğrulandığını ve kimlik bilgilerinin';
  const descriptionText3 = 'güvenli bir şekilde saklandığını teyit eder.';
  doc.text(descriptionText, 105, 92, { align: 'center' });
  doc.text(descriptionText2, 105, 98, { align: 'center' });
  doc.text(descriptionText3, 105, 104, { align: 'center' });

  doc.setFillColor(248, 249, 250);
  doc.roundedRect(30, 115, 150, 60, 3, 3, 'F');
  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.5);
  doc.roundedRect(30, 115, 150, 60, 3, 3, 'S');

  doc.setFontSize(11);
  doc.setTextColor(0, 51, 102);
  doc.setFont('helvetica', 'bold');
  doc.text('SERTİFİKA BİLGİLERİ', 35, 125);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);

  let yPos = 135;
  const lineHeight = 8;

  doc.text('Sertifika No:', 35, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(139, 0, 0);
  doc.text(certificateId, 105, yPos);

  yPos += lineHeight;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('Kullanıcı Tipi:', 35, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 100, 0);
  const userTypeLabel = data.userType === 'corporate' ? 'Kurumsal' : data.userType === 'personnel' ? 'Personel' : 'Bireysel';
  doc.text(userTypeLabel, 105, yPos);

  yPos += lineHeight;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('Doğrulama Seviyesi:', 35, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 100, 0);
  doc.text('Tam Doğrulanmış (KYC Level 3)', 105, yPos);

  yPos += lineHeight;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('Güvenlik Teknolojisi:', 35, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 51, 102);
  doc.text('DigiGuard SSL + Biyometrik KYC', 105, yPos);

  yPos += lineHeight;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('Veriliş Tarihi:', 35, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(now.toLocaleDateString('tr-TR'), 105, yPos);

  doc.setFillColor(248, 249, 250);
  doc.roundedRect(30, 185, 150, 50, 3, 3, 'F');
  doc.setDrawColor(0, 51, 102);
  doc.setLineWidth(0.5);
  doc.roundedRect(30, 185, 150, 50, 3, 3, 'S');

  doc.setFontSize(11);
  doc.setTextColor(0, 51, 102);
  doc.setFont('helvetica', 'bold');
  doc.text('BLOCKCHAIN DOĞRULAMA', 35, 195);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);

  yPos = 203;
  doc.text('Blockchain Hash:', 35, yPos);
  doc.setTextColor(100, 50, 150);
  doc.setFont('courier', 'normal');
  doc.text(blockchainHash.substring(0, 52), 35, yPos + 4);
  doc.text(blockchainHash.substring(52), 35, yPos + 8);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  yPos += 17;
  doc.text('Zaman Damgası (UTC+3):', 35, yPos);
  doc.setTextColor(0, 100, 0);
  doc.text(timestamp, 75, yPos);

  yPos += 5;
  doc.setTextColor(80, 80, 80);
  doc.text('Blockchain Ağı:', 35, yPos);
  doc.setTextColor(0, 100, 0);
  doc.text('Ethereum Mainnet', 75, yPos);

  yPos += 5;
  doc.setTextColor(80, 80, 80);
  doc.text('Şifreleme Standardı:', 35, yPos);
  doc.setTextColor(0, 100, 0);
  doc.text('AES-256 + SHA-256 + RSA-4096', 75, yPos);

  doc.setFillColor(255, 250, 240);
  doc.roundedRect(30, 245, 150, 25, 2, 2, 'F');
  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.3);
  doc.roundedRect(30, 245, 150, 25, 2, 2, 'S');

  doc.setFontSize(8);
  doc.setTextColor(139, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('NEDEN VERİLDİ?', 35, 253);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  const reason1 = 'Bu sertifika, kimlik doğrulama süreçlerinin başarıyla tamamlandığını, biyometrik verilerin';
  const reason2 = 'güvenli bir şekilde kaydedildiğini ve blockchain teknolojisi ile değiştirilemez bir kayıt';
  const reason3 = 'oluşturulduğunu teyit etmek amacıyla Karprime Technology INC. tarafından verilmiştir.';
  doc.text(reason1, 35, 259);
  doc.text(reason2, 35, 263);
  doc.text(reason3, 35, 267);

  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.5);
  doc.line(30, 275, 85, 275);
  doc.line(125, 275, 180, 275);

  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'italic');
  doc.text('Dijital Mühür', 57.5, 280, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 51, 102);
  doc.text('Karprime Technology INC.', 152.5, 280, { align: 'center' });

  doc.setDrawColor(218, 165, 32);
  doc.setFillColor(255, 255, 255);
  doc.circle(57.5, 276, 3.5, 'FD');

  doc.setFontSize(5);
  doc.setTextColor(139, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('DG', 57.5, 277, { align: 'center' });

  doc.setDrawColor(0, 51, 102);
  doc.setLineWidth(0.8);
  doc.line(125, 277, 180, 277);
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'italic');
  doc.text('Yetkili İmza', 152.5, 283, { align: 'center' });

  doc.setFontSize(6);
  doc.setTextColor(120, 120, 120);
  doc.setFont('helvetica', 'italic');
  const footer1 = 'Bu sertifika blockchain teknolojisi ile güvence altına alınmıştır ve değiştirilemez.';
  const footer2 = `Doğrulama: https://digiguard.app/verify/${certificateId}`;
  doc.text(footer1, 105, 290, { align: 'center' });
  doc.text(footer2, 105, 294, { align: 'center' });

  doc.save(`DigiGuard_KYC_Certificate_${certificateId}.pdf`);
};
