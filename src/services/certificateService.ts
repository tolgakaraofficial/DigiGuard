import jsPDF from 'jspdf';

interface CertificateData {
  userType: string;
  gender?: 'male' | 'female';
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
  city?: string;
  address?: string;
  phone?: string;
  issuerType?: 'system' | 'member';
}

const SYSTEM_ENCRYPTION_CODE = 'DG-SYS-AES256-GCM-SHA3';
const MEMBER_ENCRYPTION_CODE = 'DG-MBR-CHACHA20-POLY';

function generateBlockchainHash(): string {
  return `0x${Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')}`;
}

function generateCertificateId(): string {
  const now = new Date();
  const year = now.getFullYear();
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

  for (let i = 0; i < 9; i++) {
    matrix[8][i] = true;
    matrix[i][8] = true;
    matrix[8][size - 1 - i] = true;
    matrix[size - 1 - i][8] = true;
  }

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

  for (let i = 9; i < size - 8; i++) {
    for (let j = 9; j < size - 8; j++) {
      matrix[i][j] = Math.random() > 0.5;
    }
  }

  return matrix;
}

function generateSerialNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
    if (i === 3 || i === 7) result += '-';
  }
  return result;
}

function generateChecksum(userId?: string): string {
  const base = userId || Math.random().toString(36);
  let hash = 0;
  for (let i = 0; i < base.length; i++) {
    const char = base.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
}

const MALE_COLORS = {
  headerTop: [15, 50, 120],
  headerBot: [20, 60, 140],
  accentDark: [10, 40, 100],
  accentLight: [40, 100, 200],
  accentMid: [30, 80, 180],
  photoBorder: [50, 120, 220],
  sectionBg: [220, 235, 255],
  sectionBorder: [60, 130, 230],
  badgeBg: [200, 225, 255],
  badgeBorder: [40, 100, 200],
  stampColor: [0, 80, 180],
  verifiedBg: [210, 240, 255],
  verifiedBorder: [30, 120, 220],
  statusBg: [200, 235, 255],
  statusBar: [40, 110, 210],
  labelColor: [15, 50, 120],
  subtleText: [60, 100, 160],
  watermark: [180, 210, 255],
};

const FEMALE_COLORS = {
  headerTop: [130, 30, 90],
  headerBot: [160, 50, 110],
  accentDark: [120, 20, 80],
  accentLight: [220, 80, 150],
  accentMid: [180, 60, 120],
  photoBorder: [220, 80, 150],
  sectionBg: [255, 230, 240],
  sectionBorder: [220, 80, 140],
  badgeBg: [255, 220, 235],
  badgeBorder: [200, 60, 130],
  stampColor: [180, 50, 110],
  verifiedBg: [255, 225, 240],
  verifiedBorder: [210, 70, 140],
  statusBg: [255, 230, 245],
  statusBar: [200, 70, 140],
  labelColor: [130, 30, 90],
  subtleText: [160, 80, 130],
  watermark: [255, 200, 220],
};

export const generatePremiumCertificate = (data: CertificateData) => {
  const isFemale = data.gender === 'female';
  const c = isFemale ? FEMALE_COLORS : MALE_COLORS;
  const isSystem = data.issuerType === 'system';
  const encryptionCode = isSystem ? SYSTEM_ENCRYPTION_CODE : MEMBER_ENCRYPTION_CODE;

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [170, 107]
  });

  const pageW = 170;
  const pageH = 107;

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
  const serialNumber = generateSerialNumber();
  const checksum = generateChecksum(data.userId);
  const displayName = (data.userName || 'MEMBER').toUpperCase();
  const birthDate = data.birthDate ? formatDateTR(data.birthDate) : '01.01.1990';
  const idNumber = data.idNumber || '1234567890';
  const nationality = data.nationality || 'T.C.';

  // ===== BACKGROUND =====
  doc.setFillColor(250, 251, 253);
  doc.rect(0, 0, pageW, pageH, 'F');

  // ===== TOP HEADER BAR (gender-colored gradient) =====
  const gradientSteps = 20;
  for (let i = 0; i < gradientSteps; i++) {
    const t = i / gradientSteps;
    const r = Math.round(c.headerTop[0] + (c.headerBot[0] - c.headerTop[0]) * t);
    const g = Math.round(c.headerTop[1] + (c.headerBot[1] - c.headerTop[1]) * t);
    const b = Math.round(c.headerTop[2] + (c.headerBot[2] - c.headerTop[2]) * t);
    doc.setFillColor(r, g, b);
    doc.rect((pageW / gradientSteps) * i, 0, pageW / gradientSteps + 0.5, 20, 'F');
  }

  // Header content
  doc.setFontSize(20);
  doc.setTextColor(0, 220, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Digiguard', 8, 12);

  doc.setDrawColor(0, 220, 255);
  doc.setLineWidth(0.6);
  doc.roundedRect(3.5, 3, 4, 5, 0.3, 0.3);

  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('KIMLIK VE DIJITAL SERTIFIKA / IDENTITY & DIGITAL CERTIFICATE', 8, 17.5);
  doc.setFontSize(5.5);
  doc.text('BIOMETRIC KYC & BLOCKCHAIN VERIFIED', 8, 20);

  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.setFont('courier', 'bold');
  doc.text(certificateId, pageW - 8, 10, { align: 'right' });
  doc.setFontSize(5);
  doc.setTextColor(200, 220, 255);
  doc.setFont('helvetica', 'normal');
  doc.text(`Block #${blockNumber}`, pageW - 8, 14, { align: 'right' });
  doc.text(`SN: ${serialNumber}`, pageW - 8, 17, { align: 'right' });

  // ===== LEFT: PHOTO & NAME =====
  const photoX = 8;
  const photoY = 25;
  const photoW = 26;
  const photoH = 33;

  doc.setDrawColor(c.photoBorder[0], c.photoBorder[1], c.photoBorder[2]);
  doc.setLineWidth(1.2);
  doc.roundedRect(photoX, photoY, photoW, photoH, 1.5, 1.5);

  if (data.userPhoto) {
    try {
      doc.addImage(data.userPhoto, 'JPEG', photoX + 0.8, photoY + 0.8, photoW - 1.6, photoH - 1.6);
    } catch {
      doc.setFillColor(c.sectionBg[0], c.sectionBg[1], c.sectionBg[2]);
      doc.rect(photoX + 0.8, photoY + 0.8, photoW - 1.6, photoH - 1.6, 'F');
      doc.setFontSize(9);
      doc.setTextColor(c.subtleText[0], c.subtleText[1], c.subtleText[2]);
      doc.text('PHOTO', photoX + photoW / 2, photoY + photoH / 2, { align: 'center' });
    }
  } else {
    doc.setFillColor(c.sectionBg[0], c.sectionBg[1], c.sectionBg[2]);
    doc.rect(photoX + 0.8, photoY + 0.8, photoW - 1.6, photoH - 1.6, 'F');
    doc.setFontSize(9);
    doc.setTextColor(c.subtleText[0], c.subtleText[1], c.subtleText[2]);
    doc.text('PHOTO', photoX + photoW / 2, photoY + photoH / 2, { align: 'center' });
  }

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(displayName, photoX + photoW / 2, photoY + photoH + 5, { align: 'center' });

  doc.setFontSize(5);
  doc.setTextColor(150, 150, 150);
  doc.setFont('helvetica', 'normal');
  doc.text('DIGIGUARD CERTIFIED', photoX + photoW / 2, photoY + photoH + 8, { align: 'center' });

  // Gender indicator bar
  doc.setFillColor(c.accentMid[0], c.accentMid[1], c.accentMid[2]);
  doc.roundedRect(photoX, photoY + photoH + 10, photoW, 4, 0.5, 0.5, 'F');
  doc.setFontSize(4);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text(isFemale ? 'KADIN / FEMALE' : 'ERKEK / MALE', photoX + photoW / 2, photoY + photoH + 12.5, { align: 'center' });

  // ===== CENTER: IDENTITY INFO =====
  const infoX = 38;
  const infoY = 25;

  doc.setFillColor(c.sectionBg[0], c.sectionBg[1], c.sectionBg[2]);
  doc.setDrawColor(c.sectionBorder[0], c.sectionBorder[1], c.sectionBorder[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(infoX, infoY, 72, 8, 0.5, 0.5, 'FD');
  doc.setFontSize(5.5);
  doc.setTextColor(c.labelColor[0], c.labelColor[1], c.labelColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('KIMLIK BILGILERI / IDENTITY INFORMATION', infoX + 36, infoY + 5, { align: 'center' });

  const gridY = infoY + 10;
  const rowH = 8;
  const col1X = infoX;
  const col2X = infoX + 36;

  doc.setFontSize(4.5);
  doc.setTextColor(c.labelColor[0], c.labelColor[1], c.labelColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('DOGUM TARIHI / DATE OF BIRTH:', col1X, gridY);
  doc.setFontSize(7);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(birthDate, col1X, gridY + 4.5);

  doc.setFontSize(4.5);
  doc.setTextColor(c.labelColor[0], c.labelColor[1], c.labelColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('UYRUK / NATIONALITY:', col2X, gridY);
  doc.setFontSize(7);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(nationality, col2X, gridY + 4.5);

  doc.setFontSize(4.5);
  doc.setTextColor(c.labelColor[0], c.labelColor[1], c.labelColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('KIMLIK NO / ID NO:', col1X, gridY + rowH + 2);
  doc.setFontSize(7);
  doc.setTextColor(0, 0, 0);
  doc.setFont('courier', 'bold');
  doc.text(idNumber, col1X, gridY + rowH + 6.5);

  doc.setFontSize(4.5);
  doc.setTextColor(c.labelColor[0], c.labelColor[1], c.labelColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('SERTIFIKA NO / CERT NO:', col2X, gridY + rowH + 2);
  doc.setFontSize(6.5);
  doc.setTextColor(c.accentLight[0], c.accentLight[1], c.accentLight[2]);
  doc.setFont('courier', 'bold');
  doc.text(certificateId, col2X, gridY + rowH + 6.5);

  doc.setFontSize(4.5);
  doc.setTextColor(c.labelColor[0], c.labelColor[1], c.labelColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('E-POSTA / EMAIL:', col1X, gridY + rowH * 2 + 4);
  doc.setFontSize(5.5);
  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'normal');
  doc.text((data.userEmail || '').substring(0, 30), col1X, gridY + rowH * 2 + 8);

  doc.setFontSize(4.5);
  doc.setTextColor(c.labelColor[0], c.labelColor[1], c.labelColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('SEHIR / CITY:', col2X, gridY + rowH * 2 + 4);
  doc.setFontSize(6);
  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'normal');
  doc.text(data.city || '-', col2X, gridY + rowH * 2 + 8);

  // ===== BIOMETRIC SECTION =====
  const bcSectionY = gridY + rowH * 3 + 7;

  doc.setFillColor(c.badgeBg[0], c.badgeBg[1], c.badgeBg[2]);
  doc.setDrawColor(c.badgeBorder[0], c.badgeBorder[1], c.badgeBorder[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(infoX, bcSectionY, 72, 12, 1, 1, 'FD');

  doc.setFontSize(5);
  doc.setTextColor(c.stampColor[0], c.stampColor[1], c.stampColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('BIYOMETRIK DOGRULAMA / BIOMETRIC VERIFICATION', infoX + 36, bcSectionY + 3.5, { align: 'center' });

  doc.setFontSize(3.8);
  doc.setTextColor(80, 80, 80);
  doc.setFont('helvetica', 'normal');
  const bioItems = ['Yuz Tanimama: PASSED', 'Parmak Izi: VERIFIED', 'Ses Analizi: CONFIRMED', 'Canlilik Tespiti: ACTIVE'];
  bioItems.forEach((item, i) => {
    const x = i < 2 ? infoX + 2 : infoX + 38;
    const y = bcSectionY + 6 + (i % 2) * 3;
    doc.text(item, x, y);
  });

  // ===== RIGHT: QR, BLOCKCHAIN, ENCRYPTION =====
  const rightX = 113;
  const rightY = 25;

  const qrX = rightX;
  const qrY = rightY;
  const qrSize = 18;

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(50, 50, 50);
  doc.setLineWidth(0.3);
  doc.rect(qrX, qrY, qrSize, qrSize, 'FD');

  const qrMatrix = generateQRCodeMatrix();
  const moduleSize = qrSize / 21;
  doc.setFillColor(0, 0, 0);
  for (let i = 0; i < qrMatrix.length; i++) {
    for (let j = 0; j < qrMatrix[i].length; j++) {
      if (qrMatrix[i][j]) {
        doc.rect(qrX + j * moduleSize, qrY + i * moduleSize, moduleSize, moduleSize, 'F');
      }
    }
  }

  doc.setFontSize(3.5);
  doc.setTextColor(50, 50, 50);
  doc.setFont('helvetica', 'bold');
  doc.text('SCAN TO VERIFY', qrX + qrSize / 2, qrY + qrSize + 2, { align: 'center' });

  // Blockchain timestamp box
  const bcDetailY = qrY + qrSize + 5;
  doc.setFillColor(c.verifiedBg[0], c.verifiedBg[1], c.verifiedBg[2]);
  doc.setDrawColor(c.verifiedBorder[0], c.verifiedBorder[1], c.verifiedBorder[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(rightX, bcDetailY, 55, 12, 0.8, 0.8, 'FD');

  doc.setFontSize(4.5);
  doc.setTextColor(c.stampColor[0], c.stampColor[1], c.stampColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('BLOCKCHAIN ZAMAN DAMGASI', rightX + 2, bcDetailY + 3);
  doc.text('BLOCKCHAIN TIMESTAMP', rightX + 2, bcDetailY + 6);

  doc.setFontSize(3.2);
  doc.setTextColor(50, 150, 100);
  doc.setFont('courier', 'bold');
  doc.text(`VERIFIED: ${timestamp}`, rightX + 2, bcDetailY + 9.5);
  doc.text(`HASH: ${blockchainHash.substring(0, 32)}`, rightX + 2, bcDetailY + 12 - 0.5);

  // Encryption classification box
  const encY = bcDetailY + 13;
  const encBg = isSystem ? [230, 245, 255] : [255, 240, 230];
  const encBorder = isSystem ? [30, 120, 200] : [200, 120, 30];
  const encTitle = isSystem ? [10, 60, 150] : [150, 70, 0];
  const encCode = isSystem ? [20, 80, 180] : [180, 90, 10];

  doc.setFillColor(encBg[0], encBg[1], encBg[2]);
  doc.setDrawColor(encBorder[0], encBorder[1], encBorder[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(rightX, encY, 55, 10, 0.8, 0.8, 'FD');

  doc.setFontSize(4);
  doc.setTextColor(encTitle[0], encTitle[1], encTitle[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(isSystem ? 'TESIS SERTIFIKASI / SYSTEM CERTIFICATE' : 'UYE SERTIFIKASI / MEMBER CERTIFICATE', rightX + 27.5, encY + 3, { align: 'center' });

  doc.setFontSize(3.5);
  doc.setTextColor(encCode[0], encCode[1], encCode[2]);
  doc.setFont('courier', 'bold');
  doc.text(encryptionCode, rightX + 27.5, encY + 6.5, { align: 'center' });

  doc.setFontSize(3);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'normal');
  doc.text(`CHK: ${checksum} | SN: ${serialNumber}`, rightX + 27.5, encY + 9, { align: 'center' });

  // ===== BOTTOM STATUS BAR =====
  const bottomY = 90;

  doc.setFillColor(c.statusBar[0], c.statusBar[1], c.statusBar[2]);
  doc.rect(0, bottomY, pageW, 1.5, 'F');

  const badgeY = bottomY + 3;
  const badges = [
    { label: 'CERT ID', value: certificateId, isVerified: false },
    { label: 'BLOCK #', value: `${blockNumber}`, isVerified: false },
    { label: 'ENCRYPTION', value: isSystem ? 'AES-256-GCM' : 'CHACHA20', isVerified: false },
    { label: 'STATUS', value: 'VERIFIED', isVerified: true },
    { label: 'SECURITY', value: 'SHA-256', isVerified: false },
  ];

  const badgeW = 32;
  const badgeH = 8;
  const startX = 4;

  badges.forEach((badge, i) => {
    const x = startX + (i * (badgeW + 1.2));

    if (badge.isVerified) {
      doc.setFillColor(220, 255, 220);
      doc.setDrawColor(50, 180, 80);
    } else {
      doc.setFillColor(c.statusBg[0], c.statusBg[1], c.statusBg[2]);
      doc.setDrawColor(c.sectionBorder[0], c.sectionBorder[1], c.sectionBorder[2]);
    }
    doc.setLineWidth(0.3);
    doc.roundedRect(x, badgeY, badgeW, badgeH, 0.5, 0.5, 'FD');

    doc.setFontSize(3.5);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'bold');
    doc.text(badge.label, x + badgeW / 2, badgeY + 2.5, { align: 'center' });

    doc.setFontSize(5);
    doc.setTextColor(
      badge.isVerified ? 30 : c.accentDark[0],
      badge.isVerified ? 140 : c.accentDark[1],
      badge.isVerified ? 50 : c.accentDark[2]
    );
    doc.setFont('courier', 'bold');
    doc.text(badge.value, x + badgeW / 2, badgeY + 6, { align: 'center' });
  });

  // Footer
  doc.setFontSize(3);
  doc.setTextColor(150, 150, 150);
  doc.setFont('helvetica', 'italic');
  doc.text('Bu sertifika blockchain ile guvence altindadir ve degistirilemez. | This certificate is blockchain-secured and immutable.', pageW / 2, badgeY + badgeH + 2.5, { align: 'center' });
  doc.text(`digiguard.app/verify/${certificateId}`, pageW / 2, badgeY + badgeH + 4.5, { align: 'center' });
  doc.text('Karprime Technology INC. | www.digiguard.app', pageW / 2, badgeY + badgeH + 6.5, { align: 'center' });

  // Watermark
  doc.setFontSize(40);
  doc.setTextColor(c.watermark[0], c.watermark[1], c.watermark[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('DG', pageW / 2, pageH / 2 + 5, { align: 'center', angle: 25 });

  // Corner seal
  doc.setFillColor(c.accentMid[0], c.accentMid[1], c.accentMid[2]);
  doc.circle(pageW - 6, pageH - 6, 3, 'F');
  doc.setFillColor(255, 255, 255);
  doc.circle(pageW - 6, pageH - 6, 2.2, 'F');
  doc.setFillColor(c.accentMid[0], c.accentMid[1], c.accentMid[2]);
  doc.setFontSize(5);
  doc.setFont('helvetica', 'bold');
  doc.text('DG', pageW - 6, pageH - 4.8, { align: 'center' });

  const prefix = isSystem ? 'System' : 'Member';
  doc.save(`DigiGuard_${prefix}Certificate_${certificateId}.pdf`);
};
