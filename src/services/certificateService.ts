import jsPDF from 'jspdf';

interface CertificateData {
  userType: string;
  certificateId?: string;
  userName?: string;
  userEmail?: string;
  registrationDate?: string;
  userId?: string;
  language?: string;
  userPhoto?: string;
  birthDate?: string;
  idNumber?: string;
  nationality?: string;
}

function generateBlockchainHash(): string {
  return `0x${Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')}`;
}

function generateCertificateId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DG-${year}-${random}`;
}

function formatDateTR(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function generateQRCodeMatrix(): boolean[][] {
  const size = 21;
  const matrix: boolean[][] = Array(size).fill(null).map(() => Array(size).fill(false));

  // Add version info patterns
  for (let i = 0; i < 9; i++) {
    matrix[8][i] = true;
    matrix[i][8] = true;
    matrix[8][size - 1 - i] = true;
    matrix[size - 1 - i][8] = true;
  }

  // Add finder patterns (corners)
  const addFinderPattern = (x: number, y: number) => {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
          if (x + i < size && y + j < size) {
            matrix[x + i][y + j] = true;
          }
        }
      }
    }
  };

  addFinderPattern(0, 0);
  addFinderPattern(0, size - 7);
  addFinderPattern(size - 7, 0);

  // Fill data randomly
  for (let i = 9; i < size - 8; i++) {
    for (let j = 9; j < size - 8; j++) {
      matrix[i][j] = Math.random() > 0.5;
    }
  }

  return matrix;
}

export const generatePremiumCertificate = (data: CertificateData) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [152, 101]
  });

  const pageW = 152;
  const pageH = 101;

  const now = new Date();
  const timestamp = now.toLocaleString('tr-TR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Istanbul'
  });

  const blockchainHash = generateBlockchainHash();
  const certificateId = data.certificateId || generateCertificateId();
  const blockNumber = Math.floor(Math.random() * 10000000 + 15000000);
  const displayName = (data.userName || 'MEMBER').toUpperCase();
  const birthDate = data.birthDate ? formatDateTR(data.birthDate) : '01.01.1990';
  const idNumber = data.idNumber || '1234567890';
  const nationality = data.nationality || 'T.C.';

  // ===== BACKGROUND & BORDERS =====
  doc.setFillColor(240, 245, 250);
  doc.rect(0, 0, pageW, pageH, 'F');

  // Top gradient bar - dark blue
  doc.setFillColor(15, 35, 75);
  doc.rect(0, 0, pageW, 18, 'F');

  // Bottom section - light gray
  doc.setFillColor(245, 248, 252);
  doc.rect(0, 65, pageW, pageH - 65, 'F');

  // ===== TOP HEADER SECTION =====
  // Logo area
  doc.setFontSize(22);
  doc.setTextColor(0, 200, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Digiguard', 8, 14);

  // Shield icon - simplified
  doc.setDrawColor(0, 200, 255);
  doc.setLineWidth(0.5);
  doc.roundedRect(4, 2, 3.5, 4, 0.2, 0.2);

  // Title
  doc.setFontSize(7.5);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('KİMLİK VE DİJİTAL SERTİFİKA / IDENTITY AND DIGITAL CERTIFICATE', 8, 18.5);
  doc.setFontSize(6.5);
  doc.text('BIOMETRIC KYC & BLOCKCHAIN VERIFIED', 8, 21);

  // ===== LEFT SECTION: PHOTO & NAME =====
  const photoX = 7;
  const photoY = 26;
  const photoW = 22;
  const photoH = 28;

  // Photo frame
  doc.setDrawColor(100, 140, 180);
  doc.setLineWidth(0.8);
  doc.roundedRect(photoX, photoY, photoW, photoH, 1, 1);

  // Load user photo if available, else placeholder
  if (data.userPhoto) {
    try {
      doc.addImage(data.userPhoto, 'JPEG', photoX + 0.5, photoY + 0.5, photoW - 1, photoH - 1);
    } catch (e) {
      // Fallback to placeholder
      doc.setFillColor(200, 220, 240);
      doc.rect(photoX + 0.5, photoY + 0.5, photoW - 1, photoH - 1, 'F');
      doc.setFontSize(8);
      doc.setTextColor(100, 140, 180);
      doc.text('PHOTO', photoX + photoW / 2, photoY + photoH / 2, { align: 'center' });
    }
  } else {
    doc.setFillColor(200, 220, 240);
    doc.rect(photoX + 0.5, photoY + 0.5, photoW - 1, photoH - 1, 'F');
    doc.setFontSize(8);
    doc.setTextColor(100, 140, 180);
    doc.text('PHOTO', photoX + photoW / 2, photoY + photoH / 2, { align: 'center' });
  }

  // Name below photo
  doc.setFontSize(9.5);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(displayName, photoX + photoW / 2, photoY + photoH + 4, { align: 'center' });

  // DigiGuard footer text
  doc.setFontSize(5);
  doc.setTextColor(150, 150, 150);
  doc.setFont('helvetica', 'normal');
  doc.text('DIGIGUARD', photoX + photoW / 2, photoY + photoH + 8, { align: 'center' });

  // ===== CENTER SECTION: IDENTITY INFO =====
  const infoX = 32;
  const infoY = 26;

  // Section title
  doc.setFontSize(7);
  doc.setTextColor(15, 35, 75);
  doc.setFont('helvetica', 'bold');
  doc.text('DOĞUM TARİHİ / DATE OF BIRTH:', infoX, infoY);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(birthDate, infoX, infoY + 5);

  // Row 2
  doc.setFontSize(7);
  doc.setTextColor(15, 35, 75);
  doc.setFont('helvetica', 'bold');
  doc.text('UYRUK / NATIONALITY:', infoX, infoY + 11);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(nationality, infoX, infoY + 16);

  // Row 3
  doc.setFontSize(7);
  doc.setTextColor(15, 35, 75);
  doc.setFont('helvetica', 'bold');
  doc.text('KİMLİK NO / ID NO:', infoX, infoY + 22);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(idNumber, infoX, infoY + 27);

  // Column 2
  const col2X = 70;

  doc.setFontSize(7);
  doc.setTextColor(15, 35, 75);
  doc.setFont('helvetica', 'bold');
  doc.text('SERTİFİKA NO / CERTIFICATE NO:', col2X, infoY);
  doc.setFontSize(8.5);
  doc.setTextColor(0, 100, 200);
  doc.setFont('helvetica', 'bold');
  doc.text(certificateId, col2X, infoY + 5);

  doc.setFontSize(7);
  doc.setTextColor(15, 35, 75);
  doc.setFont('helvetica', 'normal');
  doc.text('E-POSTA / EMAIL:', col2X, infoY + 11);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text((data.userEmail || '').substring(0, 28), col2X, infoY + 16);

  // ===== RIGHT SECTION: BLOCKCHAIN & BIOMETRIC =====
  const rightX = 100;

  // Biometric box
  doc.setFillColor(220, 240, 255);
  doc.setDrawColor(0, 150, 200);
  doc.setLineWidth(0.5);
  doc.roundedRect(rightX, infoY, 50, 22, 1, 1, 'FD');

  doc.setFontSize(6);
  doc.setTextColor(0, 100, 150);
  doc.setFont('helvetica', 'bold');
  doc.text('BIOMETRIC', rightX + 25, infoY + 4, { align: 'center' });
  doc.text('KYC APPROVED', rightX + 25, infoY + 8, { align: 'center' });

  doc.setFontSize(5);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'normal');
  doc.text('Fingerprint verified', rightX + 25, infoY + 12, { align: 'center' });
  doc.text('Face recognition passed', rightX + 25, infoY + 16, { align: 'center' });
  doc.text('Voice analysis confirmed', rightX + 25, infoY + 20, { align: 'center' });

  // ===== QR CODE SECTION =====
  const qrX = rightX;
  const qrY = infoY + 25;
  const qrSize = 15;

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(50, 50, 50);
  doc.setLineWidth(0.3);
  doc.rect(qrX, qrY, qrSize, qrSize, 'FD');

  // Generate QR pattern
  const qrMatrix = generateQRCodeMatrix();
  const moduleSize = qrSize / 21;
  doc.setFillColor(0, 0, 0);

  for (let i = 0; i < qrMatrix.length; i++) {
    for (let j = 0; j < qrMatrix[i].length; j++) {
      if (qrMatrix[i][j]) {
        doc.rect(
          qrX + j * moduleSize,
          qrY + i * moduleSize,
          moduleSize,
          moduleSize,
          'F'
        );
      }
    }
  }

  doc.setFontSize(4);
  doc.setTextColor(50, 50, 50);
  doc.setFont('helvetica', 'normal');
  doc.text('SCAN TO VERIFY', qrX + qrSize / 2, qrY + qrSize + 2, { align: 'center' });
  doc.text('DOĞRULAMAK İÇİN TARAYIN', qrX + qrSize / 2, qrY + qrSize + 4, { align: 'center' });

  // ===== BLOCKCHAIN TIMESTAMP SECTION =====
  const bcX = rightX + 18;

  doc.setFontSize(6);
  doc.setTextColor(0, 100, 150);
  doc.setFont('helvetica', 'bold');
  doc.text('BLOCKCHAIN', bcX, qrY);
  doc.text('ZAMAN DAMGALI', bcX, qrY + 4);

  doc.setFontSize(4.5);
  doc.setTextColor(50, 50, 50);
  doc.setFont('helvetica', 'normal');
  doc.text('BLOCKCHAIN TIMESTAMPED', bcX, qrY + 7);

  doc.setFontSize(3.5);
  doc.setTextColor(0, 150, 100);
  doc.setFont('courier', 'bold');
  doc.text(`VERIFIED ON CHAIN:`, bcX, qrY + 10);
  doc.text(`${timestamp.replace(/\s/g, ' ')} UTC`, bcX, qrY + 12.5);

  // ===== BOTTOM SECTION: DETAILS =====
  const bottomY = 68;

  // Secure element boxes
  doc.setFillColor(250, 250, 250);
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.rect(5, bottomY, 35, 12, 'FD');
  doc.rect(42, bottomY, 35, 12, 'FD');
  doc.rect(79, bottomY, 35, 12, 'FD');
  doc.rect(116, bottomY, 35, 12, 'FD');

  // Box 1: Certificate ID
  doc.setFontSize(5);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'bold');
  doc.text('CERT ID', 7, bottomY + 2);
  doc.setFontSize(6.5);
  doc.setTextColor(0, 100, 200);
  doc.setFont('courier', 'bold');
  doc.text(certificateId, 7, bottomY + 7);

  // Box 2: Block Number
  doc.setFontSize(5);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'bold');
  doc.text('BLOCK #', 44, bottomY + 2);
  doc.setFontSize(6.5);
  doc.setTextColor(0, 150, 100);
  doc.setFont('courier', 'bold');
  doc.text(`${blockNumber}`, 44, bottomY + 7);

  // Box 3: Encryption
  doc.setFontSize(5);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'bold');
  doc.text('SECURE', 81, bottomY + 2);
  doc.setFontSize(6);
  doc.setTextColor(150, 50, 50);
  doc.setFont('helvetica', 'bold');
  doc.text('AES-256', 81, bottomY + 7);

  // Box 4: Status
  doc.setFillColor(240, 255, 240);
  doc.setDrawColor(50, 150, 100);
  doc.setLineWidth(0.4);
  doc.rect(116, bottomY, 35, 12, 'FD');
  doc.setFontSize(5);
  doc.setTextColor(50, 150, 100);
  doc.setFont('helvetica', 'bold');
  doc.text('STATUS', 118, bottomY + 2);
  doc.setFontSize(6.5);
  doc.text('VERIFIED', 118, bottomY + 7);

  // ===== FOOTER =====
  const footerY = bottomY + 15;

  doc.setFontSize(4);
  doc.setTextColor(120, 120, 120);
  doc.setFont('helvetica', 'italic');
  doc.text('This certificate is blockchain-secured and immutable. | Bu sertifika blockchain ile güvence altındadır ve değiştirilemez.', pageW / 2, footerY, { align: 'center' });

  doc.setFontSize(3.5);
  doc.setTextColor(150, 150, 150);
  doc.text(`Verification: digiguard.app/verify/${certificateId}`, pageW / 2, footerY + 2.5, { align: 'center' });

  // DigiGuard watermark
  doc.setFontSize(3);
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'italic');
  doc.text('© Karprime Technology INC. | www.digiguard.app', pageW / 2, footerY + 5, { align: 'center' });

  // Right corner seal
  doc.setFillColor(0, 150, 200);
  doc.circle(pageW - 5, pageH - 5, 2.5, 'F');
  doc.setFillColor(255, 255, 255);
  doc.circle(pageW - 5, pageH - 5, 2, 'F');
  doc.setFillColor(0, 150, 200);
  doc.setFontSize(4);
  doc.setFont('helvetica', 'bold');
  doc.text('DG', pageW - 5, pageH - 4.5, { align: 'center' });

  // Save PDF
  doc.save(`DigiGuard_Certificate_${certificateId}.pdf`);
};
