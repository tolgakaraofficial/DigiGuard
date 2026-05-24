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

function generateBlockchainHash(): string {
  return `0x${Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')}`;
}

function generateCertificateId(): string {
  const now = new Date();
  return `DG-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

export const generatePremiumCertificate = (data: CertificateData) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [105, 148]
  });

  const pageW = 148;
  const pageH = 105;

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

  const blockchainHash = generateBlockchainHash();
  const certificateId = data.certificateId || generateCertificateId();
  const blockNumber = Math.floor(Math.random() * 10000000) + 15000000;

  const userTypeLabel = data.userType === 'corporate' ? 'KURUMSAL' : data.userType === 'personnel' ? 'PERSONEL' : 'BİREYSEL';
  const displayName = data.userName || 'Kullanıcı';
  const displayEmail = data.userEmail || '';

  // --- Background ---
  doc.setFillColor(10, 18, 32);
  doc.rect(0, 0, pageW, pageH, 'F');

  // --- Top accent bar ---
  doc.setFillColor(6, 182, 212);
  doc.rect(0, 0, pageW, 1.5, 'F');

  // --- Side accent ---
  doc.setFillColor(6, 182, 212);
  doc.rect(0, 0, 1.5, pageH, 'F');

  // --- Header area ---
  doc.setFillColor(15, 30, 55);
  doc.rect(1.5, 1.5, pageW - 3, 18, 'F');

  // Shield icon placeholder (hexagonal badge shape)
  doc.setFillColor(6, 182, 212);
  const shieldCx = 12;
  const shieldCy = 10.5;
  const shieldR = 6;
  doc.circle(shieldCx, shieldCy, shieldR, 'F');

  // "DG" text inside shield
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('DG', shieldCx, shieldCy + 1, { align: 'center' });

  // Title text
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('DigiGuard', 22, 8);

  doc.setFontSize(6);
  doc.setTextColor(6, 182, 212);
  doc.setFont('helvetica', 'normal');
  doc.text('DIGITAL IDENTITY VERIFICATION SYSTEM', 22, 12);

  doc.setFontSize(4.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Karprime Technology INC.', 22, 16);

  // Certificate ID top-right
  doc.setFontSize(4);
  doc.setTextColor(148, 163, 184);
  doc.setFont('courier', 'normal');
  doc.text(certificateId, pageW - 3, 6, { align: 'right' });

  doc.setFontSize(3.5);
  doc.text(`Block #${blockNumber}`, pageW - 3, 9, { align: 'right' });

  // --- Horizontal divider ---
  doc.setFillColor(6, 182, 212);
  doc.rect(1.5, 19.5, pageW - 3, 0.3, 'F');

  // --- Photo placeholder area ---
  const photoX = 5;
  const photoY = 23;
  const photoW = 22;
  const photoH = 28;

  doc.setFillColor(20, 35, 60);
  doc.roundedRect(photoX, photoY, photoW, photoH, 1, 1, 'F');
  doc.setDrawColor(6, 182, 212);
  doc.setLineWidth(0.3);
  doc.roundedRect(photoX, photoY, photoW, photoH, 1, 1, 'S');

  // Person silhouette icon
  doc.setFillColor(40, 60, 90);
  doc.circle(photoX + photoW / 2, photoY + 10, 4, 'F');
  doc.roundedRect(photoX + photoW / 2 - 6, photoY + 16, 12, 10, 2, 2, 'F');

  doc.setFontSize(3);
  doc.setTextColor(100, 130, 170);
  doc.setFont('helvetica', 'normal');
  doc.text('BIYOMETRIK', photoX + photoW / 2, photoY + photoH - 2, { align: 'center' });

  // --- Identity info section ---
  const infoX = 30;
  let infoY = 24;
  const lineH = 5.5;

  // KIMLIK KARTI label
  doc.setFontSize(8);
  doc.setTextColor(6, 182, 212);
  doc.setFont('helvetica', 'bold');
  doc.text('KIMLIK DOGRULAMA KARTI', infoX, infoY);

  doc.setFontSize(3.5);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('Identity Verification Card', infoX, infoY + 3);

  infoY += 7;

  // Name
  doc.setFontSize(3.5);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('AD SOYAD / FULL NAME', infoX, infoY);
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text(displayName.substring(0, 30), infoX, infoY + 3.5);

  infoY += lineH + 1.5;

  // Email
  doc.setFontSize(3.5);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('E-POSTA / EMAIL', infoX, infoY);
  doc.setFontSize(5);
  doc.setTextColor(203, 213, 225);
  doc.setFont('helvetica', 'normal');
  doc.text(displayEmail.substring(0, 40), infoX, infoY + 3.5);

  infoY += lineH;

  // User type badge
  doc.setFontSize(3.5);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('KULLANICI TIPI / USER TYPE', infoX, infoY);

  const badgeColor = data.userType === 'corporate' ? [147, 51, 234] :
                     data.userType === 'personnel' ? [234, 88, 12] : [6, 182, 212];
  doc.setFillColor(badgeColor[0], badgeColor[1], badgeColor[2]);
  doc.roundedRect(infoX, infoY + 1, 18, 3.5, 0.5, 0.5, 'F');
  doc.setFontSize(4.5);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text(userTypeLabel, infoX + 9, infoY + 3.5, { align: 'center' });

  infoY += lineH + 1;

  // Registration date
  doc.setFontSize(3.5);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('KAYIT TARIHI / REGISTRATION', infoX, infoY);
  const regDate = data.registrationDate ? new Date(data.registrationDate) : now;
  doc.setFontSize(5);
  doc.setTextColor(203, 213, 225);
  doc.setFont('helvetica', 'normal');
  doc.text(regDate.toLocaleDateString('tr-TR'), infoX, infoY + 3.5);

  // --- Right column: Blockchain verification ---
  const bcX = 95;
  let bcY = 23;

  doc.setFillColor(15, 30, 55);
  doc.roundedRect(bcX - 1, bcY - 1, pageW - bcX - 2, 28, 1, 1, 'F');
  doc.setDrawColor(6, 182, 212);
  doc.setLineWidth(0.2);
  doc.roundedRect(bcX - 1, bcY - 1, pageW - bcX - 2, 28, 1, 1, 'S');

  doc.setFontSize(5);
  doc.setTextColor(6, 182, 212);
  doc.setFont('helvetica', 'bold');
  doc.text('BLOCKCHAIN', bcX + 1, bcY + 2);
  doc.setFontSize(3.5);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('DOGRLAMA / VERIFICATION', bcX + 1, bcY + 5);

  bcY += 8;

  // Blockchain network
  doc.setFontSize(3);
  doc.setTextColor(100, 116, 139);
  doc.text('Ag / Network:', bcX + 1, bcY);
  doc.setTextColor(34, 197, 94);
  doc.setFont('helvetica', 'bold');
  doc.text('Ethereum', bcX + 20, bcY);

  bcY += 3.5;

  // Hash (truncated)
  doc.setFontSize(3);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('TX Hash:', bcX + 1, bcY);
  doc.setTextColor(167, 139, 250);
  doc.setFont('courier', 'normal');
  doc.text(blockchainHash.substring(0, 28), bcX + 12, bcY);
  doc.text(blockchainHash.substring(28, 52), bcX + 1, bcY + 2.5);

  bcY += 6;

  // Timestamp
  doc.setFontSize(3);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('Zaman Damgasi:', bcX + 1, bcY);
  doc.setTextColor(34, 197, 94);
  doc.text(timestamp.substring(0, 28), bcX + 1, bcY + 2.5);

  bcY += 5.5;

  // Encryption
  doc.setFontSize(3);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('Sifreleme:', bcX + 1, bcY);
  doc.setTextColor(6, 182, 212);
  doc.text('AES-256 + SHA-256', bcX + 15, bcY);

  // --- Verified status bar ---
  const statusY = 55;
  doc.setFillColor(34, 197, 94);
  doc.roundedRect(photoX, statusY, pageW - 10, 5, 0.5, 0.5, 'F');
  doc.setFontSize(5);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('DOGRLANDI  -  KYC TAMAMLANDI  -  VERIFIED', pageW / 2 - 3, statusY + 3.2, { align: 'center' });

  // --- QR code placeholder area ---
  const qrX = 5;
  const qrY = 62;
  const qrSize = 16;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(qrX, qrY, qrSize, qrSize, 0.5, 0.5, 'F');

  // Simulated QR pattern
  doc.setFillColor(10, 18, 32);
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (Math.random() > 0.4) {
        doc.rect(qrX + 2 + col * 1.5, qrY + 2 + row * 1.5, 1.2, 1.2, 'F');
      }
    }
  }
  // QR corner markers
  doc.setFillColor(10, 18, 32);
  // Top-left
  doc.rect(qrX + 1.5, qrY + 1.5, 3, 3, 'F');
  doc.setFillColor(255, 255, 255);
  doc.rect(qrX + 2.2, qrY + 2.2, 1.6, 1.6, 'F');
  doc.setFillColor(10, 18, 32);
  doc.rect(qrX + 2.5, qrY + 2.5, 1, 1, 'F');

  doc.setFontSize(2.5);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('DOGRLAMA QR', qrX + qrSize / 2, qrY + qrSize + 2.5, { align: 'center' });

  // --- Bottom details section ---
  const detX = 24;
  let detY = 63;
  const detLineH = 3.5;

  // Certificate ID
  doc.setFontSize(3);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('Sertifika No / Certificate ID:', detX, detY);
  doc.setFont('courier', 'bold');
  doc.setTextColor(6, 182, 212);
  doc.setFontSize(4.5);
  doc.text(certificateId, detX, detY + 3);

  detY += detLineH + 3;

  // User ID
  doc.setFontSize(3);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('Kullanici ID / User ID:', detX, detY);
  doc.setFont('courier', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(3.5);
  doc.text((data.userId || '').substring(0, 36), detX, detY + 2.5);

  detY += detLineH + 2;

  // Compliance badges
  doc.setFontSize(3);
  doc.setTextColor(100, 116, 139);
  doc.text('Uyum / Compliance:', detX, detY);

  const badges = ['KVKK', 'GDPR', 'ISO 27001', 'AES-256'];
  let badgeX = detX;
  badges.forEach((badge, i) => {
    const bw = doc.getTextWidth(badge) + 2.5;
    doc.setFillColor(20, 40, 70);
    doc.roundedRect(badgeX, detY + 1.5, bw, 2.8, 0.3, 0.3, 'F');
    doc.setTextColor(6, 182, 212);
    doc.setFontSize(2.8);
    doc.setFont('helvetica', 'bold');
    doc.text(badge, badgeX + 1.2, detY + 3.3);
    badgeX += bw + 1.2;
  });

  // --- Bottom accent bar ---
  doc.setFillColor(6, 182, 212);
  doc.rect(0, pageH - 1.5, pageW, 1.5, 'F');

  // --- Footer ---
  doc.setFontSize(2.8);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'italic');
  doc.text('Bu sertifika blockchain ile guvence altindadir ve degistirilemez. | This certificate is blockchain-secured and immutable.', pageW / 2, pageH - 4.5, { align: 'center' });

  doc.setFontSize(2.5);
  doc.text(`Dogrulama: digiguard.app/verify/${certificateId.substring(0, 20)}`, pageW / 2, pageH - 7, { align: 'center' });

  // --- Signature area (right side of bottom) ---
  const sigX = pageW - 40;
  const sigY = 82;

  doc.setDrawColor(6, 182, 212);
  doc.setLineWidth(0.2);
  doc.line(sigX, sigY, sigX + 30, sigY);

  doc.setFontSize(3);
  doc.setTextColor(6, 182, 212);
  doc.setFont('helvetica', 'bold');
  doc.text('Karprime Technology INC.', sigX + 15, sigY + 2.5, { align: 'center' });

  doc.setFontSize(2.5);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'italic');
  doc.text('Yetkili Imza / Authorized Signature', sigX + 15, sigY + 5, { align: 'center' });

  // --- DigiGuard seal (bottom right) ---
  const sealCx = pageW - 8;
  const sealCy = pageH - 14;
  const sealR = 4;

  doc.setFillColor(6, 182, 212);
  doc.circle(sealCx, sealCy, sealR, 'F');
  doc.setFillColor(10, 18, 32);
  doc.circle(sealCx, sealCy, sealR - 0.8, 'F');
  doc.setFillColor(6, 182, 212);
  doc.circle(sealCx, sealCy, sealR - 1.6, 'F');

  doc.setFontSize(3);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('DG', sealCx, sealCy + 1, { align: 'center' });

  doc.save(`DigiGuard_Kimlik_Karti_${certificateId}.pdf`);
};
